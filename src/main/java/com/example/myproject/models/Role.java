package com.example.myproject.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
@Entity
@Table(name = "roles")  // Name of the table in your database
public class Role {

    // Getters and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // ✅ Getter & Setter
    @Setter
    @Getter
    private String name; // The role name: "admin", "manager", or "customer"

    @ManyToMany(mappedBy = "roles")  // This defines the inverse side of the relationship
    @JsonIgnore // Avoid circular reference
    @JsonManagedReference
    @JsonBackReference

    private Set<User> users;  // A role can be assigned to many users

    // Constructors, Getters and Setters
    public Role() {}

    public Role(String name) {
        this.name = name;
    }

}



