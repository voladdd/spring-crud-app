package com.example.demo.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/product")
public class ProductController {

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    private final ProductService productService;

    @GetMapping("")
    public List<Product> getProducts() {
        return productService.getProducts();
    }

}