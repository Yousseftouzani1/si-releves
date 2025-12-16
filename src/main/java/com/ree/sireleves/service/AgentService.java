package com.ree.sireleves.service;

import com.ree.sireleves.model.Agent;
import com.ree.sireleves.model.Quartier;
import com.ree.sireleves.repository.AgentRepository;
import com.ree.sireleves.repository.QuartierRepository;
import org.springframework.stereotype.Service;

@Service
public class AgentService {

    private final AgentRepository agentRepository;
    private final QuartierRepository quartierRepository;

    public AgentService(AgentRepository agentRepository,
                        QuartierRepository quartierRepository) {
        this.agentRepository = agentRepository;
        this.quartierRepository = quartierRepository;
    }

    /**
     * Affectation d'un agent à un quartier
     * Contraintes CDC :
     * - plusieurs agents possibles par quartier
     * - 1 agent = 1 quartier
     */
    public Agent affecterAgent(Long agentId, Long quartierId) {

        Agent agent = agentRepository.findById(agentId)
                .orElseThrow(() -> new RuntimeException("Agent introuvable"));

        Quartier quartier = quartierRepository.findById(quartierId)
                .orElseThrow(() -> new RuntimeException("Quartier introuvable"));

        agent.setQuartier(quartier);
        return agentRepository.save(agent);
    }
}
