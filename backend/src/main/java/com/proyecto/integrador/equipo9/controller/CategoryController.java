package com.proyecto.integrador.equipo9.controller;

import com.proyecto.integrador.equipo9.dto.CategoryDto;
import com.proyecto.integrador.equipo9.handler.exception.ResourceNotFoundException;
import com.proyecto.integrador.equipo9.service.impl.CategoryService;
import lombok.RequiredArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static com.proyecto.integrador.equipo9.handler.ResponseBuilder.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {

    private final CategoryService categoryService;
    private static final Logger LOGGER = Logger.getLogger(CategoryController.class);

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> createCategory(@Validated @RequestBody CategoryDto categoryDto, BindingResult result) {
        if (result.hasErrors()) {
            LOGGER.error(result);
            return responseBuilder(HttpStatus.BAD_REQUEST, result);
        }
        LOGGER.info("Category created");
        return responseBuilder(HttpStatus.CREATED, categoryService.createCategory(categoryDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> searchCategory(@PathVariable("id") Long categoryId) throws ResourceNotFoundException {
        LOGGER.info("Category found with id: " + categoryId);
        return responseBuilder(HttpStatus.OK, categoryService.findCategoryById(categoryId));
    }

    @PutMapping("/update")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateCategory(@RequestBody CategoryDto categoryDto) throws ResourceNotFoundException {
        categoryService.updateCategory(categoryDto);
        LOGGER.info("Category updated whit id: " + categoryDto.getId());
        return responseBuilder(HttpStatus.OK, categoryDto);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteCategory(@Validated @PathVariable("id") Long categoryId) throws ResourceNotFoundException {
        categoryService.deleteCategory(categoryId);
        LOGGER.info("Category deleted with id:  " + categoryId);
    }

    @GetMapping("/all")
    public ResponseEntity<?> listCategory() throws ResourceNotFoundException {
        LOGGER.info("Get categories list");
        return responseBuilder(HttpStatus.OK, categoryService.listCategories());
    }
}
