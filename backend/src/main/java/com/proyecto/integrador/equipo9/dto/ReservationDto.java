package com.proyecto.integrador.equipo9.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDto {

    Long id;
    LocalDate checkInDate;
    LocalDate checkOutDate;
    ProductDto productDto;
    UserDto userDto;
}
