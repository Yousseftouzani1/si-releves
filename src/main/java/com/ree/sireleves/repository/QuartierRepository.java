package com.ree.sireleves.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ree.sireleves.model.Quartier;

public interface QuartierRepository extends JpaRepository<Quartier, Long> {

    Optional<Quartier> findByNom(String nom);
}
