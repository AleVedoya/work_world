package com.proyecto.integrador.equipo9.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "city")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String state;

    @OneToMany(fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Product> products;

    @OneToMany(fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<User> users;

    public City(String name, String state) {
        this.name = name;
        this.state = state;
    }
}
