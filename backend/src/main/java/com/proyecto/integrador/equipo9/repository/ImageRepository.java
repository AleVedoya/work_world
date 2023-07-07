package com.proyecto.integrador.equipo9.repository;

import com.proyecto.integrador.equipo9.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {

    List<Image> findByUrlImage(String imageUrl);
}
