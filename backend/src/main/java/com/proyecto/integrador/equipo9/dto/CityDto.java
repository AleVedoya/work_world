package com.proyecto.integrador.equipo9.dto;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CityDto {

    Long id;
    String name;
    String state;
    Set<ProductDto> productDtos = new HashSet<>();
    Set<UserDto> userDtos = new HashSet<>();
}
