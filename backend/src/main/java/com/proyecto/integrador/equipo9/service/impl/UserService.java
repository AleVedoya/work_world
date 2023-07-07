package com.proyecto.integrador.equipo9.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.proyecto.integrador.equipo9.controller.CategoryController;
import com.proyecto.integrador.equipo9.dto.ProductDto;
import com.proyecto.integrador.equipo9.dto.ReservationDto;
import com.proyecto.integrador.equipo9.dto.UserDto;
import com.proyecto.integrador.equipo9.handler.exception.ResourceNotFoundException;
import com.proyecto.integrador.equipo9.model.Product;
import com.proyecto.integrador.equipo9.model.Reservation;
import com.proyecto.integrador.equipo9.model.User;
import com.proyecto.integrador.equipo9.repository.UserRepository;
import com.proyecto.integrador.equipo9.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.context.MessageSource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import static com.proyecto.integrador.equipo9.model.enums.EMessageCode.RESOURCE_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final MessageSource messenger;
    private final ObjectMapper mapper;
    private static final Logger LOGGER = Logger.getLogger(CategoryController.class);

    public User getUser() throws ResourceNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return this.userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException(messenger.getMessage(RESOURCE_NOT_FOUND.name(),
                        new Object[]{User.class.getName()}, Locale.getDefault())));
    }

    public UserDto getMyUser() throws ResourceNotFoundException {
        return mapper.convertValue(getUser(), UserDto.class);
    }

    @Override
    public UserDto updateUser(UserDto userDto, String userEmail) throws ResourceNotFoundException {
        User user = getUser();

        user.setFirstname(userDto.getFirstname());
        user.setLastname(userDto.getLastname());
        user.setEmail(userDto.getEmail());
        user.setRole(userDto.getRole());
        if (userDto.getPassword() != null && !userDto.getPassword().equals(""))
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        return mapper.convertValue(userRepository.save(user), UserDto.class);
    }

    @Override
    public void deleteUser(String email) throws ResourceNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        userRepository.delete(user);
    }

    @Override
    public List<UserDto> listUser() throws ResourceNotFoundException {
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            LOGGER.error("The users list is empty");
            throw new ResourceNotFoundException("User list is empty");
        }
        List<UserDto> userDtos = users
                .stream()
                .map(user -> mapper.convertValue(user, UserDto.class))
                .collect(Collectors.toList());
        LOGGER.debug("Show users list with size: " + userDtos.size());
        return userDtos;
    }

    @Override
    public User findUserByEmail(String userEmail) throws ResourceNotFoundException {
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException(messenger.getMessage(RESOURCE_NOT_FOUND.name(),
                        new Object[]{User.class.getName(), userEmail}, Locale.getDefault())));
    }

    public List<ReservationDto> getUserReservationsWithDetails(String email) throws ResourceNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found in reservation"));

        List<ReservationDto> reservationDtos = new ArrayList<>();

        for (Reservation reservation : user.getReservations()) {
            Product product = reservation.getProduct();
            LocalDate checkInDate = reservation.getCheckInDate();
            LocalDate checkOutDate = reservation.getCheckOutDate();

            ProductDto productDto = mapper.convertValue(product, ProductDto.class);

            ReservationDto reservationDto = new ReservationDto();
            reservationDto.setId(reservation.getId());
            reservationDto.setCheckInDate(checkInDate);
            reservationDto.setCheckOutDate(checkOutDate);
            reservationDto.setProductDto(productDto);
            reservationDto.setUserDto(mapper.convertValue(user, UserDto.class));

            reservationDtos.add(reservationDto);
        }
        if (reservationDtos.isEmpty()) {
            throw new ResourceNotFoundException("The user don´t have reservation");
        }
        return reservationDtos;
    }
}
