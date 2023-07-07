package com.proyecto.integrador.equipo9.handler;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorDetail {
    private String name;
    private String message;

    public ErrorDetail(Exception e) {
        this.name = e.getClass().getName();
        this.message = e.getMessage();
    }
}
