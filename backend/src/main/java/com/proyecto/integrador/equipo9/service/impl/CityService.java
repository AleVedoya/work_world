package com.proyecto.integrador.equipo9.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.proyecto.integrador.equipo9.dto.CityDto;
import com.proyecto.integrador.equipo9.dto.ProductDto;
import com.proyecto.integrador.equipo9.dto.UserDto;
import com.proyecto.integrador.equipo9.handler.exception.ResourceNotFoundException;
import com.proyecto.integrador.equipo9.model.City;
import com.proyecto.integrador.equipo9.model.Product;
import com.proyecto.integrador.equipo9.model.User;
import com.proyecto.integrador.equipo9.repository.CityRepository;
import com.proyecto.integrador.equipo9.repository.ProductRepository;
import com.proyecto.integrador.equipo9.repository.UserRepository;
import com.proyecto.integrador.equipo9.service.ICityService;
import lombok.RequiredArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CityService implements ICityService {

    private final CityRepository cityRepository;
    private final ObjectMapper mapper;
    private static final Logger LOGGER = Logger.getLogger(CityService.class);
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CityDto createCity(CityDto cityDto) throws ResourceNotFoundException {
        City city = new City();
        city.setName(cityDto.getName());

        if (!cityDto.getProductDtos().isEmpty()) {
            Product firstProductDto = mapper.convertValue(cityDto.getProductDtos().iterator().next(), Product.class);
            Long productoId = firstProductDto.getId();

            Product ralatedProduct = productRepository.findById(productoId)
                    .orElseThrow(() -> new ResourceNotFoundException("Producto not found: " + productoId));

            ralatedProduct.setCity(city);

            city.getProducts().add(ralatedProduct);
        }

        City savedCity = cityRepository.save(city);

        CityDto savedCityDto = new CityDto();
        savedCityDto.setId(savedCity.getId());
        savedCityDto.setName(savedCity.getName());
        List<Product> products = productRepository.findByCity(savedCity);
        Set<ProductDto> productDtos = products
                .stream()
                .map(product -> mapper.convertValue(product, ProductDto.class))
                .collect(Collectors.toSet());
        savedCityDto.setProductDtos(productDtos);

        return savedCityDto;
    }

    public CityDto getCityById(Long cityId) throws ResourceNotFoundException {
        City city = cityRepository.findById(cityId)
                .orElseThrow(() -> {
                    LOGGER.error("City not found with the id: " + cityId);
                    return new ResourceNotFoundException("City not found with the id: " + cityId);
                });

        List<Product> products = productRepository.findByCity(city);
        Set<ProductDto> productDtos = products
                .stream()
                .map(product -> mapper.convertValue(product, ProductDto.class))
                .collect(Collectors.toSet());

        List<User> users = userRepository.findAllByCity(city);
        Set<UserDto> userDtos = users
                .stream()
                .map(user -> mapper.convertValue(user, UserDto.class))
                .collect(Collectors.toSet());

        CityDto cityDto = mapper.convertValue(city, CityDto.class);
        cityDto.setProductDtos(productDtos);
        cityDto.setUserDtos(userDtos);
        LOGGER.debug("City found with id: " + cityDto.getId());

        return cityDto;
    }

    public CityDto getCityByName(String cityName) throws ResourceNotFoundException {
        City city = cityRepository.findByName(cityName)
                .orElseThrow(() -> new ResourceNotFoundException("City not found"));

        List<Product> products = productRepository.findByCity(city);
        Set<ProductDto> productDtos = products
                .stream()
                .map(product -> mapper.convertValue(product, ProductDto.class))
                .collect(Collectors.toSet());

        List<User> users = userRepository.findAllByCity(city);
        Set<UserDto> userDtos = users
                .stream()
                .map(user -> mapper.convertValue(user, UserDto.class))
                .collect(Collectors.toSet());

        CityDto cityDto = mapper.convertValue(city, CityDto.class);
        cityDto.setProductDtos(productDtos);
        cityDto.setUserDtos(userDtos);
        LOGGER.debug("City found with id: " + cityDto.getId());

        return cityDto;
    }

    public void updateCity(Long cityId, CityDto updatedCityDto) throws ResourceNotFoundException {
        City city = cityRepository.findById(cityId)
                .orElseThrow(() -> new ResourceNotFoundException("City not found"));
        city.setName(updatedCityDto.getName());
        city.setState(updatedCityDto.getState());
        cityRepository.save(city);
    }

    public void deleteCityById(Long cityId) throws ResourceNotFoundException {
        City city = cityRepository.findById(cityId)
                .orElseThrow(() -> new ResourceNotFoundException("City not found"));
        cityRepository.delete(city);
    }

    public List<CityDto> ListAllCities() throws ResourceNotFoundException {
        List<City> cities = cityRepository.findAll();
        if (cities.isEmpty()) {
            throw new ResourceNotFoundException("City list is empty");
        }
        List<CityDto> cityDtos = cities.stream()
                .map(city -> {
                    List<Product> products = productRepository.findByCity(city);
                    Set<ProductDto> productDtos = products
                            .stream()
                            .map(product -> mapper.convertValue(product, ProductDto.class))
                            .collect(Collectors.toSet());

                    List<User> users = userRepository.findAllByCity(city);
                    Set<UserDto> userDtos = users
                            .stream()
                            .map(user -> mapper.convertValue(user, UserDto.class))
                            .collect(Collectors.toSet());

                    CityDto cityDto = mapper.convertValue(city, CityDto.class);
                    cityDto.setProductDtos(productDtos);
                    cityDto.setUserDtos(userDtos);

                    return cityDto;
                })
                .collect(Collectors.toList());
        LOGGER.debug("Show city list with size: " + cities.size());
        return cityDtos;
    }
}
