package com.example.demo.utils;

import com.example.demo.category.Category;
import com.example.demo.category.CategoryRepository;
import com.example.demo.product.Product;
import com.example.demo.product.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class Config {

    @Bean
    CommandLineRunner commandLineRunner(ProductRepository productRepository, CategoryRepository categoryRepository) {
        return args -> {
            Category c1 = new Category("Мыла");
            Category c2 = new Category("Шампуни");
            Category c3 = new Category("Хоз-товары");

            Product p1 = new Product(
                    "Мыло душистое",
                    100
            );
            p1.addCategory(c1);

            Product p2 = new Product(
                    "Мыло банное",
                    70
            );
            p2.addCategory(c1);

            Product p3 = new Product(
                    "Мыло весеннее",
                    120
            );
            p3.addCategory(c1);

            Product p4 = new Product(
                    "Шампунь шауа",
                    490
            );
            p4.addCategory(c2);

            Product p5 = new Product(
                    "Веники",
                    490
            );
            p5.addCategory(c3);

            categoryRepository.saveAll(List.of(c1,c2,c3));
            productRepository.saveAll(List.of(p1,p2,p3));
        };
    }

}
