package com.ree.sireleves.service;

import com.ree.sireleves.enums.TypeCompteur;
import com.ree.sireleves.model.Adresse;
import com.ree.sireleves.model.Compteur;
import com.ree.sireleves.repository.AdresseRepository;
import com.ree.sireleves.repository.CompteurRepository;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class CompteurService {

    private final CompteurRepository compteurRepository;
    private final AdresseRepository adresseRepository;

    public CompteurService(CompteurRepository compteurRepository,
                           AdresseRepository adresseRepository) {
        this.compteurRepository = compteurRepository;
        this.adresseRepository = adresseRepository;
    }

    /**
     * Création d'un compteur
     * Contraintes CDC :
     * - 1 seul compteur par type et par adresse
     * - identifiant sur 9 chiffres
     * - index initial = 0
     */
    public Compteur creerCompteur(Long adresseId, TypeCompteur type) {

        Adresse adresse = adresseRepository.findById(adresseId)
                .orElseThrow(() -> new RuntimeException("Adresse introuvable"));

        if (compteurRepository.existsByAdresseIdAndType(adresseId, type)) {
            throw new RuntimeException(
                    "Un compteur de ce type existe déjà pour cette adresse");
        }

        Compteur compteur = new Compteur();
        compteur.setAdresse(adresse);
        compteur.setType(type);
        compteur.setIndexActuel(0);
        compteur.setNumero(String.format("%09d",
                new Random().nextInt(1_000_000_000)));

        return compteurRepository.save(compteur);
    }
}
