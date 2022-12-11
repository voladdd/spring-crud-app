package com.example.demo.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

/*    @GetMapping("")
    public List<Product> getProducts() {
        return "";
    }*/


}
