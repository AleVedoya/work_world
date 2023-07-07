package com.proyecto.integrador.equipo9.dto;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDto {

    Long id;
    String name;
    String description;
    String imageUrl;
    Set<ProductDto> productDtos = new HashSet<>();
}
