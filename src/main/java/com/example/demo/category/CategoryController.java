package com.example.demo.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/")
public class CategoryController {
    @Autowired
    CategoryRepository categoryRepository;
}
