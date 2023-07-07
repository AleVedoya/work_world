package com.proyecto.integrador.equipo9.repository;

import com.proyecto.integrador.equipo9.model.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CityRepository extends JpaRepository<City, Long> {
    Optional<City> findByName(String nombre);
}
