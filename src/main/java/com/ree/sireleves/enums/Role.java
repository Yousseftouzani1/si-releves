package com.ree.sireleves.enums;

/**
 * Rôles disponibles dans l'application SI Relevés
 */
public enum Role {
    /**
     * Administrateur système - Accès complet
     */
    SUPERADMIN,

    /**
     * Utilisateur backoffice - Lecture/Écriture compteurs, agents, relevés
     */
    UTILISATEUR,

    /**
     * Agent releveur terrain - Saisie des relevés (app mobile)
     */
    AGENT
}
