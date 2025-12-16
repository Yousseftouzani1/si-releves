package com.ree.sireleves.controller;

import com.ree.sireleves.dto.ReleveRequest;
import com.ree.sireleves.model.Releve;
import com.ree.sireleves.service.ReleveService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/releves")
public class ReleveController {

    private final ReleveService releveService;

    public ReleveController(ReleveService releveService) {
        this.releveService = releveService;
    }

    @PostMapping
    public Releve enregistrer(@Valid @RequestBody ReleveRequest request) {
        return releveService.enregistrerReleve(
                request.getCompteurId(),
                request.getNouvelIndex()
        );
    }
}
