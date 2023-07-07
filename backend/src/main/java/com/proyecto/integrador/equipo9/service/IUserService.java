package com.proyecto.integrador.equipo9.service;

import com.proyecto.integrador.equipo9.dto.UserDto;
import com.proyecto.integrador.equipo9.handler.exception.ResourceNotFoundException;
import com.proyecto.integrador.equipo9.model.User;

import java.util.List;

public interface IUserService {

    User getUser() throws ResourceNotFoundException;
    UserDto updateUser(UserDto userDto, String userEmail) throws ResourceNotFoundException;
    void deleteUser(String email) throws ResourceNotFoundException;
    List<UserDto> listUser() throws ResourceNotFoundException;
    User findUserByEmail(String userEmail) throws ResourceNotFoundException;
}
