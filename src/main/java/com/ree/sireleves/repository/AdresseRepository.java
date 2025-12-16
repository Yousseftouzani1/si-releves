package com.ree.sireleves.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ree.sireleves.model.Adresse;

public interface AdresseRepository extends JpaRepository<Adresse, Long> {

    List<Adresse> findByQuartierId(Long quartierId);

    List<Adresse> findByClientId(Long clientId);
}
