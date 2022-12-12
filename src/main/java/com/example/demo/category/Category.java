package com.example.demo.category;

import com.example.demo.product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "categories")
    @JsonIgnore
    private Set<Product> products = new HashSet<>();

    @Transient
    private Integer totalPrice;

    public List<Integer> getTopPrices() {
        return topPrices;
    }

    public void setTopPrices(List<Integer> topPrices) {
        this.topPrices = topPrices;
    }

    @Transient
    private List<Integer> topPrices;

    public Integer getTotalPrice() {
        AtomicReference<Integer> sum = new AtomicReference<>(0);
        this.products.forEach((product -> sum.updateAndGet(v -> v + product.getPrice())));
        return sum.get();
    }

    public Category() {
    }


    public Category(String title) {
        this.title = title;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
}
