package com.proyecto.integrador.equipo9.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.proyecto.integrador.equipo9.dto.ProductDto;
import com.proyecto.integrador.equipo9.dto.ReservationDto;
import com.proyecto.integrador.equipo9.dto.UserDto;
import com.proyecto.integrador.equipo9.handler.exception.BadRequestException;
import com.proyecto.integrador.equipo9.handler.exception.ResourceNotFoundException;
import com.proyecto.integrador.equipo9.model.Reservation;
import com.proyecto.integrador.equipo9.model.User;
import com.proyecto.integrador.equipo9.service.impl.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import static com.proyecto.integrador.equipo9.handler.ResponseBuilder.responseBuilder;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/reservation")
public class ReservationController {

    private final ReservationService reservationService;
    private final ObjectMapper mapper;

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> addReservation(@Validated @RequestBody Map<String, Object> request, Authentication authentication) throws BadRequestException {
        LocalDate startDate = LocalDate.parse((String) request.get("startDate"));
        LocalDate endDate = LocalDate.parse((String) request.get("endDate"));
        Long productId = Long.parseLong(request.get("productId").toString());
        User user = (User) authentication.getPrincipal();
        UserDto userDto = mapper.convertValue(user, UserDto.class);
        Reservation reservationCreated = new Reservation();
        ReservationDto reservationDtoCreated = mapper.convertValue(reservationCreated, ReservationDto.class);
        try {
            reservationDtoCreated = reservationService.createReservation(startDate, endDate, productId, userDto.getEmail());
            return responseBuilder(HttpStatus.OK, reservationDtoCreated.getId());
        } catch (ResourceNotFoundException ex) {
            return responseBuilder(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }

    @GetMapping("/date/{checkIn}&&{checkOut}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getProductsInReservationByDates(@PathVariable("checkIn") String checkIn, @PathVariable("checkOut") String checkOut) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate starDate = LocalDate.parse(checkIn, formatter);
        LocalDate endDate = LocalDate.parse(checkOut, formatter);
        List<ProductDto> productDtos = reservationService.getProductByDatesRange(starDate, endDate);
        return ResponseEntity.ok(productDtos);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getReservationById(@PathVariable("id") Long reservationId) throws ResourceNotFoundException {
        return responseBuilder(HttpStatus.OK, reservationService.findReservationById(reservationId));
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getAllReservation() throws ResourceNotFoundException {
        return responseBuilder(HttpStatus.OK, reservationService.getAllReservation());
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void delete(@PathVariable("id") Long reservationId) throws ResourceNotFoundException {
        reservationService.deleteReservation(reservationId);
    }

    @GetMapping("/available-dates")
    public ResponseEntity<List<LocalDate>> getAvailableReservationDates(
            @RequestParam("checkInDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam("checkOutDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate) {
        List<LocalDate> availableDates = reservationService.getAvailableReservationDatesInDateRange(checkInDate, checkOutDate);
        return ResponseEntity.ok(availableDates);
    }
}