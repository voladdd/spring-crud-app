package com.example.demo.product;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ProductConfig {

    @Bean
    CommandLineRunner commandLineRunner(ProductRepository repository) {
        return args -> {
            Product p1 = new Product(
                    "Мыло душистое",
                    100
            );
            Product p2 = new Product(
                    "Мыло банное",
                    70
            );

            Product p3 = new Product(
                    "Мыло весеннее",
                    120
            );

            repository.saveAll(List.of(p1,p2,p3));
        };
    }

}
