package com.ree.sireleves.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReleveRequest {

    @NotNull
    private Long compteurId;

    @Min(0)
    private double nouvelIndex;

    /* Getters & Setters */
}
