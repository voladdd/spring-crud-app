package com.example.demo.product;

import com.example.demo.category.Category;
import com.example.demo.category.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }


    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public void addNewProduct(Product product) {
        Optional<Product> productOptional = productRepository.findProductByTitle(product.getTitle());
        if (productOptional.isPresent()) {
            throw new IllegalStateException("title taken");
        }
        productRepository.save(product);
    }

    public void deleteProduct(Long productId) {
        boolean exists = productRepository.existsById(productId);
        if (!exists) {
            throw new IllegalStateException("product with id " + productId + " does not exists");
        }
        productRepository.deleteById(productId);
    }

    @Transactional
    public void updateProduct(Long productId, String title, Integer price) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new IllegalStateException(
                "product with id " + productId + " does not exists"));

        if (title != null && title.length() > 0 && !Objects.equals(product.getTitle(), title)) {
            Optional<Product> productOptional = productRepository.findProductByTitle(title);
            if (productOptional.isPresent()) {
                throw new IllegalStateException("title taken");
            }
            product.setTitle(title);
        }

        if (price != null && price > 0 && !Objects.equals(product.getPrice(), price)) {
            product.setPrice(price);
        }
    }

    public List<Product> getProductsByCategoryId(Long categoryId) {
        List<Product> productOptional = productRepository.findProductsByCategoriesId(categoryId);
        if (productOptional.size() < 1){
            throw new IllegalStateException("products were not found");
        }
        return productOptional;
    }

    public void addCategoryToProduct(Long productId, Long categoryId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new IllegalStateException(
                "product with id " + productId + " does not exists"));
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new IllegalStateException(
                "category with id " + categoryId + " does not exists"));

        product.addCategory(category);
        productRepository.save(product);
    }

    public void deleteCategoryFromProduct(Long productId, Long categoryId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new IllegalStateException(
                "product with id " + productId + " does not exists"));

        if(!categoryRepository.existsById(categoryId)){
            throw new IllegalStateException("category with id " + categoryId + " does not exists");
        }

        product.removeCategory(categoryId);
        productRepository.save(product);
    }
}
