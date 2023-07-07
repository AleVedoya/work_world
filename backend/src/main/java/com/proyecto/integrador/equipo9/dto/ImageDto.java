package com.proyecto.integrador.equipo9.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImageDto {
    Long id;
    String urlImage;
    ProductDto productDto;
}
