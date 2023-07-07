package com.proyecto.integrador.equipo9.repository;

import com.proyecto.integrador.equipo9.model.Category;
import com.proyecto.integrador.equipo9.model.City;
import com.proyecto.integrador.equipo9.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> getAllProductsByCategory(Category category);
    List<Product> findByCity(City city);
    List<Product> findAllByCategory(Category category);
}
