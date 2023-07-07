package com.proyecto.integrador.equipo9.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String address;
    private double price;
    private int rate;
    private double latitude;
    private double longitude;

//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "city_id", referencedColumnName = "id")
//    @JsonIgnoreProperties({"users","products"})
//    private City city;

    @ManyToOne @JoinColumn(name = "city_id")
    @JsonIgnoreProperties({"users","products"})
    private City city;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @OneToMany(fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Reservation> reservations = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER)
    private Set<Image> images = new HashSet<>();
}
