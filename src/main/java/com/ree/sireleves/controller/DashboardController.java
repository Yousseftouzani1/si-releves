package com.ree.sireleves.controller;

import com.ree.sireleves.repository.*;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Controller pour le Dashboard - KPIs et statistiques
 */
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final CompteurRepository compteurRepository;
    private final AgentRepository agentRepository;
    private final ReleveRepository releveRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final QuartierRepository quartierRepository;

    public DashboardController(
            CompteurRepository compteurRepository,
            AgentRepository agentRepository,
            ReleveRepository releveRepository,
            UtilisateurRepository utilisateurRepository,
            QuartierRepository quartierRepository) {
        this.compteurRepository = compteurRepository;
        this.agentRepository = agentRepository;
        this.releveRepository = releveRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.quartierRepository = quartierRepository;
    }

    /**
     * Récupère les KPIs principaux du dashboard
     */
    @GetMapping("/kpis")
    public Map<String, Object> getKpis() {
        Map<String, Object> kpis = new HashMap<>();

        // Compteurs
        kpis.put("totalCompteurs", compteurRepository.count());

        // Agents
        kpis.put("totalAgents", agentRepository.count());

        // Relevés
        kpis.put("totalReleves", releveRepository.count());

        // Relevés du jour (simulation - à améliorer avec requête date)
        kpis.put("relevesAujourdhui", Math.min(releveRepository.count(), 50));

        // Utilisateurs
        kpis.put("totalUtilisateurs", utilisateurRepository.count());

        // Quartiers
        kpis.put("totalQuartiers", quartierRepository.count());

        return kpis;
    }

    /**
     * Récupère les statistiques de consommation
     */
    @GetMapping("/stats/consommation")
    public Map<String, Object> getConsommationStats() {
        Map<String, Object> stats = new HashMap<>();

        // TODO: Implémenter les vraies stats de consommation
        // Pour l'instant, retourne des données de démonstration
        stats.put("consommationEauMensuelle", 4520.5);
        stats.put("consommationElectriciteMensuelle", 8750.3);
        stats.put("evolutionEau", "+5.2%");
        stats.put("evolutionElectricite", "+3.8%");

        return stats;
    }
}
