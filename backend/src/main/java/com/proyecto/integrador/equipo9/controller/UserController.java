package com.proyecto.integrador.equipo9.controller;

import com.proyecto.integrador.equipo9.dto.ReservationDto;
import com.proyecto.integrador.equipo9.dto.UserDto;
import com.proyecto.integrador.equipo9.handler.exception.ResourceNotFoundException;
import com.proyecto.integrador.equipo9.service.impl.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.proyecto.integrador.equipo9.handler.ResponseBuilder.responseBuilder;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private static final Logger LOGGER = Logger.getLogger(UserController.class);

    @GetMapping("/me")
    public ResponseEntity<?> getMyUser() throws ResourceNotFoundException {
        LOGGER.info("Get my user details");
        return responseBuilder(HttpStatus.OK, userService.getMyUser());
    }

    @PutMapping("/update/{email}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateUser(@Validated @PathVariable("email") String userEmail, @RequestBody UserDto userDto) throws ResourceNotFoundException {
        LOGGER.info("Update user with email: "  + userEmail);
        return responseBuilder(HttpStatus.OK,userService.updateUser(userDto, userEmail));
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAllUser() throws ResourceNotFoundException {
        LOGGER.info("Get all users");
        return responseBuilder(HttpStatus.OK, userService.listUser());
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getUserByEmail(@Validated @PathVariable("email") String userEmail) throws ResourceNotFoundException {
        LOGGER.info("Get user with email: "  + userEmail);
        return responseBuilder(HttpStatus.OK, userService.findUserByEmail(userEmail));
    }

    @DeleteMapping("/delete/{email}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteUser(@Validated @PathVariable("email") String userEmail) throws ResourceNotFoundException {
        LOGGER.info("Delete user with email: "  + userEmail);
        userService.deleteUser(userEmail);
    }

    @GetMapping("/reservations/{email}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getUserReservations(@PathVariable("email") String email) throws ResourceNotFoundException {
        List<ReservationDto> reservationDtos = userService.getUserReservationsWithDetails(email);
        return responseBuilder(HttpStatus.OK, reservationDtos);
    }
}
