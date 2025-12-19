package com.ree.sireleves.controller;

import com.ree.sireleves.model.LogConnexion;
import com.ree.sireleves.repository.LogConnexionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller pour les logs de connexion (Admin only)
 */
@RestController
@RequestMapping("/api/admin/logs")
public class LogConnexionController {

    private final LogConnexionRepository logConnexionRepository;

    public LogConnexionController(LogConnexionRepository logConnexionRepository) {
        this.logConnexionRepository = logConnexionRepository;
    }

    /**
     * Liste tous les logs de connexion (pour admin)
     */
    @GetMapping
    public List<LogConnexion> getAll() {
        return logConnexionRepository.findAll();
    }
}
