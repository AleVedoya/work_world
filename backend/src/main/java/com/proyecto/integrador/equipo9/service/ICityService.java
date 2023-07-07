package com.proyecto.integrador.equipo9.service;

import com.proyecto.integrador.equipo9.dto.CityDto;
import com.proyecto.integrador.equipo9.handler.exception.ResourceNotFoundException;

import java.util.List;

public interface ICityService {

    CityDto createCity(CityDto cityDto) throws ResourceNotFoundException;
    CityDto getCityById(Long cityId) throws ResourceNotFoundException;
    CityDto getCityByName(String cityName) throws ResourceNotFoundException;
    void updateCity (Long cityId, CityDto cityDto) throws ResourceNotFoundException;
    void deleteCityById(Long cityId) throws ResourceNotFoundException;
    List<CityDto> ListAllCities() throws ResourceNotFoundException;

}