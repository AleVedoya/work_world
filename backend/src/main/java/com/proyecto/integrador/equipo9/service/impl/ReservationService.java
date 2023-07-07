package com.proyecto.integrador.equipo9.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.proyecto.integrador.equipo9.dto.*;

import com.proyecto.integrador.equipo9.handler.exception.BadRequestException;
import com.proyecto.integrador.equipo9.handler.exception.ResourceNotFoundException;
import com.proyecto.integrador.equipo9.model.Product;
import com.proyecto.integrador.equipo9.model.Reservation;
import com.proyecto.integrador.equipo9.model.User;
import com.proyecto.integrador.equipo9.repository.ProductRepository;
import com.proyecto.integrador.equipo9.repository.ReservationRepository;
import com.proyecto.integrador.equipo9.repository.UserRepository;
import com.proyecto.integrador.equipo9.service.IReservationService;
import lombok.RequiredArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ReservationService implements IReservationService {

    private final ReservationRepository reservationRepository;
    private final ProductRepository productRepository;
    private final ObjectMapper mapper;
    private static final Logger LOGGER = Logger.getLogger(ReservationService.class);
    private final UserRepository userRepository;

    @Override
    public ReservationDto createReservation(LocalDate startDate,
                                            LocalDate endDate,
                                            Long productId,
                                            String userEmail
    ) throws ResourceNotFoundException, BadRequestException {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Product reservedProduct = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (user == null || !user.isAccountNonExpired()) {
            LOGGER.info("User not logged in");
            throw new BadRequestException("User not logged in");
        } else if (startDate == null || endDate == null) {
            LOGGER.info("Complete all reservation data");
            throw new BadRequestException("Complete all reservation data");
        }

        boolean productAlreadyReserved = reservationRepository
                .existsByProductAndCheckInDateLessThanEqualAndCheckOutDateGreaterThanEqual(reservedProduct, endDate, startDate);

        if (productAlreadyReserved) {
            LOGGER.debug("Product already reserved");
            throw new BadRequestException("Product already reserved in the specified date range");
        }

        Reservation newReservation = new Reservation();
        newReservation.setCheckInDate(startDate);
        newReservation.setCheckOutDate(endDate);
        newReservation.setProduct(reservedProduct);
        newReservation.setUser(user);

        reservationRepository.save(newReservation);
        LOGGER.debug("Reservation created with ID: " + newReservation.getId());
        return mapper.convertValue(newReservation, ReservationDto.class);
    }

    @Override
    public ReservationDto findReservationById(Long reservationId) throws ResourceNotFoundException {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found"));

        User user = reservation.getUser();
        Product product = reservation.getProduct();

        ReservationDto reservationDto = mapper.convertValue(reservation, ReservationDto.class);
        UserDto userDto = mapper.convertValue(user, UserDto.class);
        ProductDto productDto = mapper.convertValue(product, ProductDto.class);
        CityDto cityDto = mapper.convertValue(product.getCity(), CityDto.class);
        CategoryDto categoryDto = mapper.convertValue(product.getCategory(), CategoryDto.class);

        productDto.setCityDto(cityDto);
        productDto.setCategoryDto(categoryDto);
        
        reservationDto.setUserDto(userDto);
        reservationDto.setProductDto(productDto);

        LOGGER.debug("Reservation found with id: " + reservationId);
        return reservationDto;
    }

    @Override
    public List<ReservationDto> getAllReservation() throws ResourceNotFoundException {
        List<Reservation> reservationList = reservationRepository.findAll();
        if (reservationList.isEmpty()) {
            throw new ResourceNotFoundException("The list of reservation is empty");
        }

        return reservationList.stream().map((reservation) -> {

            Product product = reservation.getProduct();
            User user = reservation.getUser();

//            if (product == null || user == null) {
//                try {
//                    throw new ResourceNotFoundException("Product or User not found for Reservation: " + reservation.getId());
//                } catch (ResourceNotFoundException e) {
//                    throw new RuntimeException(e);
//                }
//            }

            ReservationDto reservationDto = mapper.convertValue(reservation, ReservationDto.class);
            ProductDto productDto = mapper.convertValue(product, ProductDto.class);
            UserDto userDto = mapper.convertValue(user, UserDto.class);

            reservationDto.setProductDto(productDto);
            reservationDto.setUserDto(userDto);

            return reservationDto;
        }).collect(Collectors.toList());
    }

    @Override
    public List<ReservationDto> findReservationByUser(UserDto userDto) throws ResourceNotFoundException {
        List<Reservation> reservationList = reservationRepository.getAllReservationByUser(
                mapper.convertValue(userDto, User.class));
        if (reservationList.isEmpty()) {
            throw new ResourceNotFoundException("The list of reservation is empty");
        }
        return reservationList
                .stream()
                .map((reservation) -> mapper.convertValue(reservation, ReservationDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public void updateReservation(ReservationDto reservationDto) throws ResourceNotFoundException {
        Reservation reservation = reservationRepository.findById(reservationDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found"));
        reservationRepository.save(reservation);
    }

    @Override
    public void deleteReservation(Long reservationId) throws ResourceNotFoundException {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found"));
        reservationRepository.delete(reservation);
    }

    public List<ProductDto> getProductByDatesRange(LocalDate checkIn, LocalDate checkOut) {
        List<Product> products = reservationRepository
                .findProductByCheckInDateLessThanEqualAndCheckOutDateGreaterThanEqual(checkIn, checkOut);
        return Collections.singletonList(mapper.convertValue(products, ProductDto.class));
    }

    @Override
    public List<LocalDate> getAvailableReservationDatesInDateRange(LocalDate checkInDate, LocalDate checkOutDate) {
        List<Reservation> allReservations = reservationRepository.findAll();
        List<LocalDate> reservedDates = new ArrayList<>();

        for (Reservation reservation : allReservations) {
            if (reservation.getCheckInDate().isBefore(checkOutDate) && reservation.getCheckOutDate().isAfter(checkInDate)) {
                LocalDate startDate = reservation.getCheckInDate().isBefore(checkInDate) ? checkInDate : reservation.getCheckInDate();
                LocalDate endDate = reservation.getCheckOutDate().isAfter(checkOutDate) ? checkOutDate : reservation.getCheckOutDate();

                for (LocalDate date = startDate; date.isBefore(endDate); date = date.plusDays(1)) {
                    reservedDates.add(date);
                }
            }
        }
        List<LocalDate> availableDates = new ArrayList<>();

        for (LocalDate date = checkInDate; date.isBefore(checkOutDate); date = date.plusDays(1)) {
            if (!reservedDates.contains(date)) {
                availableDates.add(date);
            }
        }
        return availableDates;
    }

    @Override
    public List<ReservationDto> findReservationByProduct(ProductDto productDto) throws ResourceNotFoundException {
        Product product = mapper.convertValue(productDto, Product.class);
        List<Reservation> reservationList = reservationRepository.getAllReservationByProduct(product);
        if (reservationList.isEmpty()) {
            LOGGER.debug("Reservation list is empty");
            throw new ResourceNotFoundException("The list of reservation is empty");
        }
        LOGGER.debug("Reservation found");
        return reservationList
                .stream()
                .map((reservation) -> mapper.convertValue(reservation, ReservationDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<Reservation> findAllReservationsByProduct(Long productId) throws ResourceNotFoundException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        List<Reservation> reservationList = reservationRepository.findAllReservationsByProduct(product);
        if (reservationList.isEmpty()) {
            throw new ResourceNotFoundException("The list of reservation is empty");
        }
        return reservationList;
    }

}
