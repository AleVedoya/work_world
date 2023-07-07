package com.proyecto.integrador.equipo9.repository;

import com.proyecto.integrador.equipo9.model.City;
import com.proyecto.integrador.equipo9.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByEmail(String email);
    List<User> findAllByCity(City city);
}
