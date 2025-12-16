package com.ree.sireleves.controller;

import com.ree.sireleves.dto.UtilisateurRequest;
import com.ree.sireleves.model.Utilisateur;
import com.ree.sireleves.service.UtilisateurService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/utilisateurs")
@PreAuthorize("hasRole('SUPERADMIN')")
public class UtilisateurController {

    private final UtilisateurService utilisateurService;

    public UtilisateurController(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    @PostMapping
    public Utilisateur creer(@Valid @RequestBody UtilisateurRequest request) {
        return utilisateurService.creerUtilisateur(request);
    }
}
