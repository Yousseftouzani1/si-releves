package com.ree.sireleves.service;

import com.ree.sireleves.dto.UtilisateurRequest;
import com.ree.sireleves.enums.Role;
import com.ree.sireleves.model.Utilisateur;
import com.ree.sireleves.repository.UtilisateurRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    public UtilisateurService(UtilisateurRepository utilisateurRepository,
                              PasswordEncoder passwordEncoder) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Création d'un utilisateur backoffice
     * Contrainte CDC :
     * - le mot de passe est généré automatiquement
     * - rôle imposé (SUPERADMIN ou UTILISATEUR)
     */
    public Utilisateur creerUtilisateur(UtilisateurRequest request) {

        if (utilisateurRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Un utilisateur avec cet email existe déjà");
        }

        String motDePasseGenere = UUID.randomUUID().toString().substring(0, 8);

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setNom(request.getNom().toUpperCase());
        utilisateur.setPrenom(
                request.getPrenom().substring(0, 1).toUpperCase()
                        + request.getPrenom().substring(1).toLowerCase()
        );
        utilisateur.setEmail(request.getEmail());
        utilisateur.setRole(request.getRole());
        utilisateur.setMotDePasse(passwordEncoder.encode(motDePasseGenere));

        return utilisateurRepository.save(utilisateur);
    }
}
