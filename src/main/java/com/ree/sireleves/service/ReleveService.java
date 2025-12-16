package com.ree.sireleves.service;

import com.ree.sireleves.model.Compteur;
import com.ree.sireleves.model.Releve;
import com.ree.sireleves.repository.CompteurRepository;
import com.ree.sireleves.repository.ReleveRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReleveService {

    private final CompteurRepository compteurRepository;
    private final ReleveRepository releveRepository;

    public ReleveService(CompteurRepository compteurRepository,
                            ReleveRepository releveRepository) {
        this.compteurRepository = compteurRepository;
        this.releveRepository = releveRepository;
    }

    /**
     * Enregistrement d'un relevé
     * Contraintes CDC :
     * - nouvel index >= ancien index
     * - consommation = nouvel - ancien
     * - historisation obligatoire
     */
    public Releve enregistrerReleve(Long compteurId, double nouvelIndex) {

        Compteur compteur = compteurRepository.findById(compteurId)
                .orElseThrow(() -> new RuntimeException("Compteur introuvable"));

        if (nouvelIndex < compteur.getIndexActuel()) {
            throw new RuntimeException(
                    "Le nouvel index ne peut pas être inférieur à l'ancien");
        }

        double consommation = nouvelIndex - compteur.getIndexActuel();

        Releve releve = new Releve();
        releve.setCompteur(compteur);
        releve.setAncienIndex(compteur.getIndexActuel());
        releve.setNouvelIndex(nouvelIndex);
        releve.setConsommation(consommation);
        releve.setDateReleve(LocalDateTime.now());

        compteur.setIndexActuel(nouvelIndex);

        compteurRepository.save(compteur);
        return releveRepository.save(releve);
    }
}
