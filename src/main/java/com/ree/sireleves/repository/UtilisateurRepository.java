package com.ree.sireleves.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ree.sireleves.model.Utilisateur;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    Optional<Utilisateur> findByEmail(String email);

    boolean existsByEmail(String email);
}
