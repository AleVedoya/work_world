package com.proyecto.integrador.equipo9.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.proyecto.integrador.equipo9.controller.CategoryController;
import com.proyecto.integrador.equipo9.dto.CategoryDto;
import com.proyecto.integrador.equipo9.dto.ProductDto;
import com.proyecto.integrador.equipo9.handler.exception.ResourceNotFoundException;
import com.proyecto.integrador.equipo9.model.Category;
import com.proyecto.integrador.equipo9.model.Product;
import com.proyecto.integrador.equipo9.repository.CategoryRepository;
import com.proyecto.integrador.equipo9.repository.ProductRepository;
import com.proyecto.integrador.equipo9.service.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CategoryService implements ICategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final ObjectMapper mapper;
    private static final Logger LOGGER = Logger.getLogger(CategoryController.class);

    public CategoryDto createCategory(CategoryDto categoryDto) {
        Category newCategory = mapper.convertValue(categoryDto, Category.class);
        Category categoryCreated = categoryRepository.save(newCategory);
        LOGGER.info("Category created with ID: " + categoryCreated.getId());
        return mapper.convertValue(categoryCreated, CategoryDto.class);
    }

    public CategoryDto findCategoryById(Long categoryId) throws ResourceNotFoundException {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> {
                    LOGGER.error("Category not found with the id: " + categoryId);
                    return new ResourceNotFoundException("Category not found with the id: " + categoryId);
                });

        List<Product> products = productRepository.findAllByCategory(category);
        Set<ProductDto> productDtos = products.stream()
                .map(product -> mapper.convertValue(product, ProductDto.class))
                .collect(Collectors.toSet());

        CategoryDto categoryDto = mapper.convertValue(category, CategoryDto.class);
        categoryDto.setProductDtos(productDtos);

        LOGGER.debug("Category found with id: " + category.getId());
        return categoryDto;
    }

    public void updateCategory(CategoryDto categoryDto) throws ResourceNotFoundException {
        Category category = categoryRepository.findById(categoryDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryDto.getId()));

        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());

        categoryRepository.save(category);

        LOGGER.debug("Category modified with id: " + category.getId());
    }

    public void deleteCategory(Long categoryId) throws ResourceNotFoundException {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> {
                    LOGGER.error("Product not found with the id: " + categoryId);
                    return new ResourceNotFoundException("Product not found with the id: " + categoryId);
                });
        LOGGER.debug("Category deleted with id: " + category.getId());
    }

    public List<CategoryDto> listCategories() throws ResourceNotFoundException {
        List<Category> categories = categoryRepository.findAll();
        if (categories.isEmpty()) {
            LOGGER.error("The categories list is empty");
            throw new ResourceNotFoundException("Category list is empty");
        }

        List<CategoryDto> categoryDtos = categories
                .stream()
                .map(category -> {
                    CategoryDto categoryDto = mapper.convertValue(category, CategoryDto.class);
                    List<Product> products = productRepository.findAllByCategory(category);

                    Set<ProductDto> productDtos = products
                            .stream()
                            .map(product -> mapper.convertValue(product, ProductDto.class))
                            .collect(Collectors.toSet());

                    categoryDto.setProductDtos(productDtos);

                    return categoryDto;
                })
                .collect(Collectors.toList());

        LOGGER.debug("Show category list with size: " + categoryDtos.size());
        return categoryDtos;
    }
}
