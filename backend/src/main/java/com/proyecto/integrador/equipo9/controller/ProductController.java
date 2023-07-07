package com.proyecto.integrador.equipo9.controller;

import com.proyecto.integrador.equipo9.dto.CategoryDto;
import com.proyecto.integrador.equipo9.dto.CityDto;
import com.proyecto.integrador.equipo9.dto.ProductDto;
import com.proyecto.integrador.equipo9.handler.exception.ResourceNotFoundException;
import com.proyecto.integrador.equipo9.model.Reservation;
import com.proyecto.integrador.equipo9.service.impl.CategoryService;
import com.proyecto.integrador.equipo9.service.impl.CityService;
import com.proyecto.integrador.equipo9.service.impl.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.apache.log4j.Logger;

import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

import static com.proyecto.integrador.equipo9.handler.ResponseBuilder.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/productos")
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;
    private final CityService cityService;
    private static final Logger LOGGER = Logger.getLogger(ProductController.class);

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> agregarProductoImagen(@RequestParam("files") List<MultipartFile> files,
                                                   @RequestParam("name") String name,
                                                   @RequestParam("description") String description,
                                                   @RequestParam("address") String address,
                                                   @RequestParam("price") String price,
                                                   @RequestParam("rate") String rate,
                                                   @RequestParam("city") Long cityId,
                                                   @RequestParam("category") Long categoryId) throws Exception {
        // Obtener la categoría de producto por su ID
        CategoryDto categoryDto = categoryService.findCategoryById(categoryId);

        // Obtener la ciudad por su ID
        CityDto cityDto = cityService.getCityById(cityId);

        // Construir el objeto ProductoDto con los datos recibidos
        ProductDto productDto = new ProductDto();
        productDto.setName(name);
        productDto.setDescription(description);
        productDto.setAddress(address);
        productDto.setPrice(Double.parseDouble(price));
        productDto.setRate(Integer.parseInt(rate));
        productDto.setCategoryDto(categoryDto);
        productDto.setCityDto(cityDto);

        // Pasar el objeto ProductoDto junto con la lista de archivos al servicio
        ProductDto productCreated = productService.createProduct(productDto, files);

        return ResponseEntity.ok(productCreated);
}

    @GetMapping("/all") //Listar todos los productos
    public ResponseEntity<?> listProducts() throws ResourceNotFoundException {
        LOGGER.info("Listar productos: ");
        return responseBuilder(HttpStatus.OK, productService.listProduct());
    }

    @GetMapping("/{id}") //Buscar un producto por ID
    public ResponseEntity<?> getProduct(@PathVariable("id") Long productId) throws ResourceNotFoundException {
        LOGGER.info("Buscar un producto por ID: " + productId);
        return responseBuilder(HttpStatus.OK, productService.findProductById(productId));
    }

    //no va, esta devolviendo una entidad, acopla con la capa de persistencia
    @PutMapping("/update")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> modifyProduct(@RequestBody ProductDto productDto) throws ResourceNotFoundException {
        productService.updateProduct(productDto);
        LOGGER.info("Modificar un producto: ");
        return responseBuilder(HttpStatus.OK, productDto);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void delete(@PathVariable("id") Long productId) throws ResourceNotFoundException {
        LOGGER.info("Eliminar un producto con id: " + productId);
        productService.deleteProduct(productId);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<?> searchProductByCategory(@PathVariable("id") Long categoryId) throws ResourceNotFoundException {
        LOGGER.info("Buscar un producto por la categoria don el id : " + categoryId);
        return responseBuilder(HttpStatus.OK, productService.getProductsByCategory(categoryId));
    }

    @GetMapping("/city/{id}")
    public ResponseEntity<?> searchProductByCity(@PathVariable("id") Long cityId) throws ResourceNotFoundException {
        LOGGER.info("Buscar un producto por la ciudad con el id: " + cityId);
        return responseBuilder(HttpStatus.OK, productService.getProductsByCity(cityId));
    }

    @GetMapping("/available/{checkInDate}/{checkOutDate}")
    public ResponseEntity<List<ProductDto>> getAvailableProducts(
            @PathVariable("checkInDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate checkInDate,
            @PathVariable("checkOutDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate checkOutDate) {
        List<ProductDto> availableProducts = productService.getAvailableProductsInDateRange(checkInDate, checkOutDate);
        return ResponseEntity.ok(availableProducts);
    }

    @GetMapping("/{productId}/available-dates")
    public ResponseEntity<List<LocalDate>> getAvailableDatesForProduct(@PathVariable("productId") Long productId) {
        try {
            ProductDto productDto = productService.findProductById(productId);
            List<LocalDate> availableDates = productService.getAvailableDatesForProduct(productDto);
            return ResponseEntity.ok(availableDates);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/reservas")
    public ResponseEntity<List<Reservation>> getReservationsByProduct(@PathVariable("id") Long productId) throws ResourceNotFoundException {
        LOGGER.info("Buscar reservas por producto: " + productId);
        List<Reservation> reservations = productService.getReservationsByProduct(productId);
        return ResponseEntity.ok(reservations);
    }


}
