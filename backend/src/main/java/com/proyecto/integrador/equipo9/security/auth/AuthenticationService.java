package com.proyecto.integrador.equipo9.security.auth;

import com.proyecto.integrador.equipo9.handler.exception.ResourceAlreadyExistsException;
import com.proyecto.integrador.equipo9.model.User;
import com.proyecto.integrador.equipo9.model.enums.Role;
import com.proyecto.integrador.equipo9.repository.UserRepository;
import com.proyecto.integrador.equipo9.security.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {

        User user = this.repository.findByEmail(request.getEmail()).orElse((null));
        if(user != null) {
            throw new ResourceAlreadyExistsException("User already exists");
        }
       user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .email(user.getEmail())
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var email = user.getEmail();
        return AuthenticationResponse.builder()
                .email(email)
                .token(jwtToken)
                .build();
    }
}
