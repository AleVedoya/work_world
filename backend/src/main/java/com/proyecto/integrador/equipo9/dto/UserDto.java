package com.proyecto.integrador.equipo9.dto;

import com.proyecto.integrador.equipo9.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Role role;
    private Set<ReservationDto> reservationDtos = new HashSet<>();
}
