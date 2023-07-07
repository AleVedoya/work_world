package com.proyecto.integrador.equipo9.dto;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {

    Long id;
    String name;
    String description;
    String address;
    double price;
    int rate;
    double latitude;
    double longitude;
    CityDto cityDto;
    CategoryDto categoryDto;
    Set<ImageDto> imageDtos = new HashSet<>();
    Set<ReservationDto> reservationDtos = new HashSet<>();

}
