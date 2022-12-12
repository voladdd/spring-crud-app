package com.example.demo.category;

import com.example.demo.product.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    public void addNewCategory(Category category) {
        Optional<Product> productOptional = categoryRepository.findCategoryByTitle(category.getTitle());
        if (productOptional.isPresent()) {
            throw new IllegalStateException("title taken");
        }
        categoryRepository.save(category);
    }

    public void deleteProduct(Long categoryId) {
        boolean exists = categoryRepository.existsById(categoryId);
        if (!exists) {
            throw new IllegalStateException("category with id " + categoryId + " does not exists");
        }
        categoryRepository.deleteById(categoryId);
    }

    @Transactional
    public void updateCategory(Long categoryId, String title) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new IllegalStateException(
                "product with id " + categoryId + " does not exists"));

        if (title != null && title.length() > 0 && !Objects.equals(category.getTitle(), title)) {
            Optional<Product> productOptional = categoryRepository.findCategoryByTitle(title);
            if (productOptional.isPresent()) {
                throw new IllegalStateException("title taken");
            }
            category.setTitle(title);
        }
    }
}
