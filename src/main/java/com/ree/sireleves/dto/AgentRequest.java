package com.ree.sireleves.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AgentRequest {

    @NotNull
    private Long quartierId;

    /* Getters & Setters */
}
