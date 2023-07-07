package com.proyecto.integrador.equipo9.controller;

import com.proyecto.integrador.equipo9.dto.CityDto;
import com.proyecto.integrador.equipo9.handler.exception.ResourceNotFoundException;
import com.proyecto.integrador.equipo9.service.impl.CityService;
import lombok.RequiredArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static com.proyecto.integrador.equipo9.handler.ResponseBuilder.responseBuilder;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/cities")
public class CityController {

    private final CityService cityService;
    private static final Logger LOGGER = Logger.getLogger(CityController.class);


    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> createCity(@Validated @RequestBody CityDto cityDto, BindingResult result) throws ResourceNotFoundException {
        if (result.hasErrors()) {
            LOGGER.error(result);
            return responseBuilder(HttpStatus.BAD_REQUEST, result);
        }
        LOGGER.info("City created");
        return responseBuilder(HttpStatus.CREATED, cityService.createCity(cityDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> searchCity(@PathVariable("id") Long cityId) throws ResourceNotFoundException {
        LOGGER.info("City found with id: " + cityId);
        return responseBuilder(HttpStatus.OK, cityService.getCityById(cityId));
    }

    @GetMapping("/get-by-name/{name}")
    public ResponseEntity<?> searchcityByName(@PathVariable("name") String cityName) throws ResourceNotFoundException {
        LOGGER.info("City found with the name: " + cityName);
        return responseBuilder(HttpStatus.OK, cityService.getCityByName(cityName));
    }


    @PutMapping("/update")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateCity(@RequestBody CityDto cityDto) throws ResourceNotFoundException {
        cityService.updateCity(cityDto.getId(), cityDto);
        LOGGER.info("City updated whit id: " + cityDto.getId());
        return responseBuilder(HttpStatus.OK, cityDto);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteCity(@Validated @PathVariable("id") Long cityId) throws ResourceNotFoundException {
        cityService.deleteCityById(cityId);
        LOGGER.info("City deleted whit id: " + cityId);
    }

    @GetMapping("/all")
    public ResponseEntity<?> listAllCities() throws ResourceNotFoundException {
        LOGGER.info("Get cities list");
        return responseBuilder(HttpStatus.OK, cityService.ListAllCities());
    }
}
