package com.proyecto.integrador.equipo9.service;

import com.proyecto.integrador.equipo9.dto.ImageDto;
import com.proyecto.integrador.equipo9.handler.exception.ResourceNotFoundException;
import com.proyecto.integrador.equipo9.model.Image;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IImageService {
    ImageDto createImage(MultipartFile imageFile) throws ResourceNotFoundException;
    ImageDto findImageById(Long imageId) throws ResourceNotFoundException;
    void updateImage(Long imageId) throws ResourceNotFoundException;
    void deleteImage(Long imageId) throws ResourceNotFoundException;
    List<ImageDto> listImages() throws ResourceNotFoundException;
}
