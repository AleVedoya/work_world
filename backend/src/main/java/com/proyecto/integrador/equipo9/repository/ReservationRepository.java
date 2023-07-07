package com.proyecto.integrador.equipo9.repository;

import com.proyecto.integrador.equipo9.model.Product;
import com.proyecto.integrador.equipo9.model.Reservation;
import com.proyecto.integrador.equipo9.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> getAllReservationByUser(User user);
    List<Product> findProductByCheckInDateLessThanEqualAndCheckOutDateGreaterThanEqual(LocalDate endDate, LocalDate startDate);
    List<Reservation> findAllByCheckInDateLessThanEqualAndCheckOutDateGreaterThanEqual(
            LocalDate checkOutDate, LocalDate checkInDate);
    List<Reservation> getAllReservationByProduct(Product product);
    boolean existsByProductAndCheckInDateLessThanEqualAndCheckOutDateGreaterThanEqual(Product reservedProduct, LocalDate endDate, LocalDate startDate);

    List<Reservation> findAllReservationsByProduct(Product product);
}