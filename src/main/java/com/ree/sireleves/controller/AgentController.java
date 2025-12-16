package com.ree.sireleves.controller;

import com.ree.sireleves.dto.AgentRequest;
import com.ree.sireleves.model.Agent;
import com.ree.sireleves.service.AgentService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/agents")
public class AgentController {

    private final AgentService agentService;

    public AgentController(AgentService agentService) {
        this.agentService = agentService;
    }

    @PutMapping("/{agentId}/quartier")
    public Agent affecter(@PathVariable Long agentId,
                          @Valid @RequestBody AgentRequest request) {
        return agentService.affecterAgent(agentId, request.getQuartierId());
    }
}
