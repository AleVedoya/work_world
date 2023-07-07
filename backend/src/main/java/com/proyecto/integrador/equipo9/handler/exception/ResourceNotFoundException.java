package com.proyecto.integrador.equipo9.handler.exception;

public class ResourceNotFoundException extends Exception {

    public ResourceNotFoundException(String message) { //Con el constructor le paso el mensaje
        super(message);
    }
}
