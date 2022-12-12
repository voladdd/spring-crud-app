package com.example.demo.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
/*    List<Product> findProductsByCategoryId(Long categoryId);*/

    @Query("SELECT p FROM Product p WHERE p.title = ?1")
    Optional<Product> findProductByTitle(String title);
}
