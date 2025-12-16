package com.ree.sireleves.repository;

import com.ree.sireleves.model.Releve;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReleveRepository extends JpaRepository<Releve, Long> {

    List<Releve> findByCompteurIdOrderByDateReleveDesc(Long compteurId);
}
