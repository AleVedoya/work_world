package com.proyecto.integrador.equipo9;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.PropertyConfigurator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Equipo9Application {

	public static void main(String[] args) {

		PropertyConfigurator.configure("src\\main\\resources\\log4j.properties");
		SpringApplication.run(Equipo9Application.class, args);
	}
}
