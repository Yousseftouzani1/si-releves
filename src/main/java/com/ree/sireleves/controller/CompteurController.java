package com.ree.sireleves.controller;

import com.ree.sireleves.dto.CompteurRequest;
import com.ree.sireleves.model.Compteur;
import com.ree.sireleves.service.CompteurService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/compteurs")
public class CompteurController {

    private final CompteurService compteurService;

    public CompteurController(CompteurService compteurService) {
        this.compteurService = compteurService;
    }

    @PostMapping
    public Compteur creer(@Valid @RequestBody CompteurRequest request) {
        return compteurService.creerCompteur(
                request.getAdresseId(),
                request.getType()
        );
    }
}
