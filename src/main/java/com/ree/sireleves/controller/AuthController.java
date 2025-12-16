package com.ree.sireleves.controller;

import com.ree.sireleves.dto.LoginRequest;
import com.ree.sireleves.dto.LoginResponse;
import com.ree.sireleves.model.LogConnexion;
import com.ree.sireleves.model.Utilisateur;
import com.ree.sireleves.repository.LogConnexionRepository;
import com.ree.sireleves.repository.UtilisateurRepository;
import com.ree.sireleves.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final LogConnexionRepository logConnexionRepository;

    public AuthController(UtilisateurRepository utilisateurRepository,
                            PasswordEncoder passwordEncoder,
                            JwtUtil jwtUtil,
                            LogConnexionRepository logConnexionRepository) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.logConnexionRepository = logConnexionRepository;
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request,
                                HttpServletRequest httpRequest) {

        Utilisateur user = utilisateurRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        if (!passwordEncoder.matches(request.getMotDePasse(), user.getMotDePasse())) {
            throw new RuntimeException("Mot de passe incorrect");
        }

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        // Log de connexion
        LogConnexion log = new LogConnexion();
        log.setUtilisateur(user);
        log.setDateConnexion(LocalDateTime.now());
        log.setAdresseIp(httpRequest.getRemoteAddr());
        logConnexionRepository.save(log);

        return new LoginResponse(token, user.getRole().name());
    }
}
