package com.proyecto.integrador.equipo9.service;

import com.proyecto.integrador.equipo9.dto.CategoryDto;
import com.proyecto.integrador.equipo9.handler.exception.ResourceNotFoundException;

import java.util.List;

public interface ICategoryService {

    CategoryDto createCategory(CategoryDto categoryDto);

    CategoryDto findCategoryById(Long categoryId) throws ResourceNotFoundException;

    void updateCategory(CategoryDto categoryDto) throws ResourceNotFoundException;

    void deleteCategory(Long categoryId) throws ResourceNotFoundException;

    List<CategoryDto> listCategories() throws ResourceNotFoundException;
}
