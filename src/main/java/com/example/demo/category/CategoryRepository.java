package com.example.demo.category;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
/*    List<Category> findCategoriesByProductId(Long productId);*/
}
