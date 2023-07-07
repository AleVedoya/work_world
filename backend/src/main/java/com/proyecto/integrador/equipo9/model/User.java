package com.proyecto.integrador.equipo9.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.proyecto.integrador.equipo9.model.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String firstname;
  private String lastname;
  @Column(unique = true, nullable = false)
  private String email;
  private String password;

  @Enumerated(EnumType.STRING)
  private Role role;

  @ManyToOne @JoinColumn(name = "city_id")
  @JsonIgnoreProperties({"users","products"})
  private City city;

  @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
  @JsonIgnoreProperties("user")
  private Set<Reservation> reservations = new HashSet<>();

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority(role.name()));
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
