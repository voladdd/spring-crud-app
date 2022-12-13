package com.example.demo.category;

import com.example.demo.product.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("")
    public List<Category> getCategories() {
        return categoryService.getCategories();
    }

    @PostMapping("")
    public void registerNewCategory(@RequestBody Category category) {
        categoryService.addNewCategory(category);
    }

    @DeleteMapping(path = "/{categoryId}")
    public void deleteProduct(@PathVariable("categoryId") Long categoryId) {
        categoryService.deleteProduct(categoryId);
    }

    @PutMapping(path = "/{categoryId}")
    public void updateProduct(
            @PathVariable("categoryId") Long categoryId,
            @RequestParam(required = false) String title) {
        categoryService.updateCategory(categoryId, title);
    }
}
