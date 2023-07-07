package com.proyecto.integrador.equipo9.controller;

import com.proyecto.integrador.equipo9.dto.ImageDto;
import com.proyecto.integrador.equipo9.handler.exception.ResourceNotFoundException;
import com.proyecto.integrador.equipo9.service.impl.ImageService;
import lombok.RequiredArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static com.proyecto.integrador.equipo9.handler.ResponseBuilder.responseBuilder;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/images")
public class ImageController {

    private final ImageService imageService;
    private static final Logger LOGGER = Logger.getLogger(ImageController.class);

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ImageDto> createImage(@RequestPart(value = "file") MultipartFile imageFile) {
        return ResponseEntity.ok(imageService.createImage(imageFile));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllImages() throws ResourceNotFoundException {
        LOGGER.info("Get all images");
        return responseBuilder(HttpStatus.OK, imageService.listImages());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getImageById(@PathVariable("id") Long imageId) throws ResourceNotFoundException {
        LOGGER.info("Image found with id: " + imageId);
        return responseBuilder(HttpStatus.OK, imageService.listImages());
    }

    @PutMapping("/update")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateImage(@RequestBody ImageDto imageDto) throws ResourceNotFoundException {
        imageService.updateImage(imageDto.getId());
        LOGGER.info("Image updated whit id: " + imageDto.getId());
        return responseBuilder(HttpStatus.OK, imageDto);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteImage(@PathVariable("id") Long imageId) throws ResourceNotFoundException {
        imageService.deleteImage(imageId);
        LOGGER.info("Image deleted with id:  " + imageId);
    }
}
