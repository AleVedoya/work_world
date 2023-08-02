package com.proyecto.integrador.equipo9.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.proyecto.integrador.equipo9.dto.ImageDto;
import com.proyecto.integrador.equipo9.handler.exception.ResourceNotFoundException;
import com.proyecto.integrador.equipo9.imageConfig.CloudinaryService;
import com.proyecto.integrador.equipo9.model.Image;
import com.proyecto.integrador.equipo9.repository.ImageRepository;
import com.proyecto.integrador.equipo9.service.IImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ImageService implements IImageService {

    private final ImageRepository imageRepository;
    private final CloudinaryService cloudinaryService;
    private final ObjectMapper mapper;

    public ImageDto createImage(MultipartFile imageFile) {
        String urlImage;
        try {
            // Utilizamos el servicio CloudinaryService para subir el archivo
            urlImage = cloudinaryService.uploadImage(imageFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        Image imageEntity = new Image();
        imageEntity.setUrlImage(urlImage);
        return mapper.convertValue(imageRepository.save(imageEntity), ImageDto.class);
    }

    public ImageDto findImageById(Long imageId) throws ResourceNotFoundException {
        Image image = imageRepository.findById(imageId)
                .orElseThrow(() -> new ResourceNotFoundException("Image not found: " + imageId));
        return mapper.convertValue(image, ImageDto.class);
    }

    public void updateImage(Long imageId) throws ResourceNotFoundException {
        Image image = imageRepository.findById(imageId)
                        .orElseThrow(() -> new ResourceNotFoundException(""));
        imageRepository.save(image);
    }

    public void deleteImage(Long imageId) throws ResourceNotFoundException {
        Image image = imageRepository.findById(imageId)
                .orElseThrow(() -> new ResourceNotFoundException("Image not found: " + imageId));
        imageRepository.delete(image);
    }

    public List<ImageDto> listImages() throws ResourceNotFoundException {
        List<Image> images = imageRepository.findAll();
        if (images.isEmpty()) {
            throw new ResourceNotFoundException("No images found");
        }
        return images
                .stream()
                .map(image -> mapper.convertValue(image, ImageDto.class))
               .collect(Collectors.toList());
    }
}
