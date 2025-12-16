package com.ree.sireleves.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ree.sireleves.model.Agent;

public interface AgentRepository extends JpaRepository<Agent, Long> {

    List<Agent> findByQuartierId(Long quartierId);
}
