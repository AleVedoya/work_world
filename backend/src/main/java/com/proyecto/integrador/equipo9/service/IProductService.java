package com.proyecto.integrador.equipo9.service;

import com.proyecto.integrador.equipo9.dto.CategoryDto;
import com.proyecto.integrador.equipo9.dto.CityDto;
import com.proyecto.integrador.equipo9.dto.ProductDto;
import com.proyecto.integrador.equipo9.handler.exception.ResourceNotFoundException;
import com.proyecto.integrador.equipo9.model.Category;
import com.proyecto.integrador.equipo9.model.City;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IProductService {

    ProductDto createProduct(ProductDto productoDto, List<MultipartFile> files) throws ResourceNotFoundException, IOException;
    ProductDto findProductById(Long productId) throws ResourceNotFoundException;
    void updateProduct(ProductDto productDto) throws ResourceNotFoundException;
    void deleteProduct(Long productId) throws ResourceNotFoundException;
    List<ProductDto> listProduct() throws ResourceNotFoundException;
    List<ProductDto>getProductsByCategory(Long categoryId) throws ResourceNotFoundException;
    List<ProductDto>getProductsByCity(Long cityId) throws ResourceNotFoundException;

}
