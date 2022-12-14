package com.example.demo.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/products")
public class ProductController {


    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("")
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategoryId(@PathVariable("categoryId") Long categoryId) {
        return productService.getProductsByCategoryId(categoryId);
    }

    @PostMapping("")
    public void registerNewProduct(@RequestBody Product product) {
        productService.addNewProduct(product);
    }
    @PostMapping("/{productId}/category")
    public void registerCategoryToProduct(@PathVariable("productId") Long productId,
                                          @RequestParam(required = true) Long categoryId) {
        productService.addCategoryToProduct(productId, categoryId);
    }

    @DeleteMapping(path = "/{productId}")
    public void deleteProduct(@PathVariable("productId") Long productId) {
        productService.deleteProduct(productId);
    }

    @DeleteMapping("/{productId}/category")
    public void deleteCategoryFromProduct(@PathVariable("productId") Long productId,
                                          @RequestParam(required = true) Long categoryId) {
        productService.deleteCategoryFromProduct(productId, categoryId);
    }

    @PutMapping(path = "/{productId}")
    public void updateProduct(
            @PathVariable("productId") Long productId,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Integer price) {
        productService.updateProduct(productId, title, price);
    }
}
