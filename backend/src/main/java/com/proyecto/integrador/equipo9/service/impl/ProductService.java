package com.proyecto.integrador.equipo9.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.proyecto.integrador.equipo9.dto.*;
import com.proyecto.integrador.equipo9.handler.exception.ResourceNotFoundException;
import com.proyecto.integrador.equipo9.imageConfig.CloudinaryService;
import com.proyecto.integrador.equipo9.model.*;
import com.proyecto.integrador.equipo9.repository.*;
import com.proyecto.integrador.equipo9.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static org.apache.logging.log4j.LogManager.getLogger;

@RequiredArgsConstructor
@Service
@Transactional
public class ProductService implements IProductService {

    private final ProductRepository productRepository;
    private final ReservationRepository reservationRepository;
    private final CloudinaryService cloudinaryService;
    private final ObjectMapper mapper;
    private static final Logger LOGGER = getLogger(ProductService.class);
    private final ImageRepository imageRepository;
    private final CategoryRepository categoryRepository;
    private final CityRepository cityRepository;

    public ProductDto createProduct(ProductDto productDto, List<MultipartFile> files) throws ResourceNotFoundException {
        Product product = mapper.convertValue(productDto, Product.class);
        product.setCity(mapper.convertValue(productDto.getCityDto(), City.class));
        product.setCategory(mapper.convertValue(productDto.getCategoryDto(), Category.class));

        // Inicializar el conjunto de imágenes si es nulo
        if (productDto.getImageDtos() == null) {
            productDto.setImageDtos(new HashSet<>());
        }

        // Obtener la URL de cada archivo y crear los ImageDto correspondientes
        for (MultipartFile file : files) {
            String fileUrl;
            try {
                // Subir la imagen a Cloudinary y obtener la URL
                fileUrl = cloudinaryService.uploadImage(file);
            } catch (IOException e) {
                throw new RuntimeException("Error uploading image to Cloudinary: " + e.getMessage());
            }

            ImageDto imageDto = new ImageDto();
            imageDto.setUrlImage(fileUrl);

            productDto.getImageDtos().add(imageDto);
        }
        Set<ImageDto> imageDtos = productDto.getImageDtos();
        Set<Image> images = new HashSet<>();
        for (ImageDto imageDto : imageDtos) {
            Image image = null;
            if (imageDto.getId() != null) {
                image = imageRepository.findById(imageDto.getId())
                        .orElseThrow(() -> new ResourceNotFoundException("Image not found: " + imageDto.getId()));
            } else if (imageDto.getUrlImage() != null) {
                List<Image> imageList = imageRepository.findByUrlImage(imageDto.getUrlImage());
                if (!imageList.isEmpty()) {
                    image = imageList.get(0); // Obtener la primera imagen de la lista
                }
            }
            if (image == null) {
                image = mapper.convertValue(imageDto, Image.class);
                image = imageRepository.save(image);
            }
            images.add(image);
        }
        product.setImages(images);
        Product productSaved = productRepository.save(product);
        return mapper.convertValue(productSaved, ProductDto.class);
    }

    public ProductDto findProductById(Long productId) throws ResourceNotFoundException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        LOGGER.debug("Product found with id: " + product.getId());

        ProductDto productDto = mapper.convertValue(product, ProductDto.class);

        City city = product.getCity();
        if (city != null) {
            CityDto cityDto = mapper.convertValue(city, CityDto.class);
            productDto.setCityDto(cityDto);
        }
        Category category = product.getCategory();
        if (category != null) {
            CategoryDto categoryDto = mapper.convertValue(category, CategoryDto.class);
            productDto.setCategoryDto(categoryDto);
        }
        return productDto;
    }

    public void updateProduct(ProductDto productDto) throws ResourceNotFoundException {
        Product product = productRepository.findById(productDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        ProductDto productUpdated = mapper.convertValue(productRepository.save(product), ProductDto.class);
        LOGGER.debug("Product modified with id: " + productUpdated.getId());
    }

    public void deleteProduct(Long productId) throws ResourceNotFoundException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        productRepository.delete(product);
        LOGGER.debug("Product deleted with id: " + product.getId());
    }

    public List<ProductDto> listProduct() throws ResourceNotFoundException {
        List<Product> products = productRepository.findAll();
        if (products.isEmpty()) {
            LOGGER.info("The list is empty");
            throw new ResourceNotFoundException("Product list is empty");
        }

        List<ProductDto> productsDto = products
                .stream()
                .map(product -> {
                    List<ImageDto> imageDtos = product.getImages()
                            .stream()
                            .map(image -> mapper.convertValue(image, ImageDto.class))
                            .collect(Collectors.toList());

                    List<ReservationDto> reservationDtos = product.getReservations()
                            .stream()
                            .map(reservation -> mapper.convertValue(reservation, ReservationDto.class))
                            .collect(Collectors.toList());

                    ProductDto productDto = mapper.convertValue(product, ProductDto.class);
                    productDto.setImageDtos(new HashSet<>(imageDtos));
                    productDto.setReservationDtos(new HashSet<>(reservationDtos));
                    productDto.setCityDto(mapper.convertValue(product.getCity(), CityDto.class));
                    productDto.setCategoryDto(mapper.convertValue(product.getCategory(), CategoryDto.class));

                    return productDto;
                })
                .collect(Collectors.toList());

        LOGGER.debug("Show product list with size: " + productsDto.size());
        return productsDto;
    }

    public List<ProductDto> getProductsByCategory(Long categoryId) throws ResourceNotFoundException {
        Category category = mapper.convertValue(categoryRepository.findById(categoryId), Category.class);
        List<Product> products = productRepository.getAllProductsByCategory(category);
        if (products.isEmpty()) {
            throw new ResourceNotFoundException("Product list is empty");
        }
        List<ProductDto> productsDto = products
                .stream()
                .map(product -> mapper.convertValue(product, ProductDto.class))
                .collect(Collectors.toList());
        LOGGER.debug("Show product list with size: " + productsDto.size());
        return productsDto;
    }

    public List<ProductDto> getProductsByCity(Long cityId) throws ResourceNotFoundException {
        City city = mapper.convertValue(cityRepository.findById(cityId), City.class);
        List<Product> products = productRepository.findByCity(city);
        if (products.isEmpty()) {
            throw new ResourceNotFoundException("Product list is empty");
        }
        List<ProductDto> productsDto = products
                .stream()
                .map(product -> mapper.convertValue(product, ProductDto.class))
                .collect(Collectors.toList());
        LOGGER.debug("Show product list with size: " + city.getId());
        return productsDto;
    }

    public List<ProductDto> getAvailableProductsInDateRange(LocalDate checkInDate, LocalDate checkOutDate) {
        List<Product> allProducts = productRepository.findAll();
        List<Product> reservedProducts = reservationRepository
                .findAllByCheckInDateLessThanEqualAndCheckOutDateGreaterThanEqual(checkOutDate, checkInDate)
                .stream()
                .map(Reservation::getProduct)
                .filter(Objects::nonNull)
                .toList();
        List<Product> availableProducts = new ArrayList<>(allProducts);
        availableProducts.removeAll(reservedProducts);
        return availableProducts
                .stream()
                .map(product -> mapper.convertValue(product, ProductDto.class))
                .collect(Collectors.toList());
    }

    public List<LocalDate> getAvailableDatesForProduct(ProductDto productDto) {
        List<LocalDate> availableDates = new ArrayList<>();

        Set<LocalDate> reservedDates = new HashSet<>();
        for (ReservationDto reservationDto : productDto.getReservationDtos()) {
            LocalDate checkInDate = reservationDto.getCheckInDate();
            LocalDate checkOutDate = reservationDto.getCheckOutDate();

            LocalDate currentDate = checkInDate;
            while (currentDate.isBefore(checkOutDate) || currentDate.isEqual(checkOutDate)) {
                reservedDates.add(currentDate);
                currentDate = currentDate.plusDays(1);
            }
        }

        LocalDate startDate = LocalDate.now();
        LocalDate endDate = LocalDate.now().plusMonths(6);

        LocalDate currentDate = startDate;
        while (currentDate.isBefore(endDate) || currentDate.isEqual(endDate)) {
            if (!reservedDates.contains(currentDate)) {
                availableDates.add(currentDate);
            }
            currentDate = currentDate.plusDays(1);
        }
        return availableDates;
    }

    public List<Reservation> getReservationsByProduct(Long productId) throws ResourceNotFoundException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return reservationRepository.findAllReservationsByProduct(product);
    }
}
