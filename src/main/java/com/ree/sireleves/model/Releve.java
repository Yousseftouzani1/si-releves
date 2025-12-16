package com.ree.sireleves.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Releve {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double ancienIndex;

    private double nouvelIndex;

    private double consommation;

    private LocalDateTime dateReleve;

    @ManyToOne(optional = false)
    private Compteur compteur;

    /* Getters & Setters */
}
