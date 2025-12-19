package com.ree.sireleves.controller;

import com.ree.sireleves.model.Quartier;
import com.ree.sireleves.repository.QuartierRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller pour la gestion des Quartiers
 */
@RestController
@RequestMapping("/api/quartiers")
public class QuartierController {

    private final QuartierRepository quartierRepository;

    public QuartierController(QuartierRepository quartierRepository) {
        this.quartierRepository = quartierRepository;
    }

    /**
     * Liste tous les quartiers
     */
    @GetMapping
    public List<Quartier> getAll() {
        return quartierRepository.findAll();
    }

    /**
     * Récupère un quartier par ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Quartier> getById(@PathVariable Long id) {
        return quartierRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Crée un nouveau quartier
     */
    @PostMapping
    public Quartier create(@Valid @RequestBody Quartier quartier) {
        return quartierRepository.save(quartier);
    }

    /**
     * Met à jour un quartier
     */
    @PutMapping("/{id}")
    public ResponseEntity<Quartier> update(@PathVariable Long id, @Valid @RequestBody Quartier quartierDetails) {
        return quartierRepository.findById(id)
                .map(quartier -> {
                    quartier.setNom(quartierDetails.getNom());
                    return ResponseEntity.ok(quartierRepository.save(quartier));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Supprime un quartier
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return quartierRepository.findById(id)
                .map(quartier -> {
                    quartierRepository.delete(quartier);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
