package com.ree.sireleves.dto;

import com.ree.sireleves.enums.TypeCompteur;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompteurRequest {

    @NotNull
    private Long adresseId;

    @NotNull
    private TypeCompteur type;

    /* Getters & Setters */
}
