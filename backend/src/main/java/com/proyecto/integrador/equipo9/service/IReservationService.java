package com.proyecto.integrador.equipo9.service;

import com.proyecto.integrador.equipo9.dto.ProductDto;
import com.proyecto.integrador.equipo9.dto.ReservationDto;
import com.proyecto.integrador.equipo9.dto.UserDto;
import com.proyecto.integrador.equipo9.handler.exception.BadRequestException;
import com.proyecto.integrador.equipo9.handler.exception.ResourceNotFoundException;
import com.proyecto.integrador.equipo9.model.Reservation;

import java.time.LocalDate;
import java.util.List;

public interface IReservationService {

    ReservationDto createReservation(LocalDate startDate, LocalDate endDate, Long productId, String userEmail) throws ResourceNotFoundException, BadRequestException;

    ReservationDto findReservationById(Long reservationId) throws ResourceNotFoundException;

    List<ReservationDto> getAllReservation() throws ResourceNotFoundException;

    List<ReservationDto> findReservationByUser(UserDto userDto) throws ResourceNotFoundException;

    void updateReservation(ReservationDto reservationDto) throws ResourceNotFoundException;

    void deleteReservation(Long reservationId) throws ResourceNotFoundException;

    List<ReservationDto> findReservationByProduct(ProductDto productDto) throws ResourceNotFoundException;

    List<LocalDate> getAvailableReservationDatesInDateRange(LocalDate checkInDate, LocalDate checkOutDate);

    List<Reservation> findAllReservationsByProduct(Long productId) throws ResourceNotFoundException;
}
