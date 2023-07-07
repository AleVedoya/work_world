package com.proyecto.integrador.equipo9.security.config;

import com.proyecto.integrador.equipo9.model.User;
import com.proyecto.integrador.equipo9.model.enums.Role;
import com.proyecto.integrador.equipo9.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class DataConfig implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
//        User user = new User();
//        user.setFirstname("admin");
//        user.setLastname("grupo-9");
//        user.setEmail("camada7.grupo9@gmail.com");
//        user.setPassword(passwordEncoder.encode("123456"));
//        user.setRole(Role.ADMIN);
//
//        userRepository.save(user);
    }
}


