package com.ree.sireleves.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ree.sireleves.enums.TypeCompteur;
import com.ree.sireleves.model.Compteur;

public interface CompteurRepository extends JpaRepository<Compteur, Long> {

    boolean existsByAdresseIdAndType(Long adresseId, TypeCompteur type);

    List<Compteur> findByAdresseId(Long adresseId);
}
