package com.ree.sireleves.model;

import com.ree.sireleves.enums.TypeCompteur;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * Entité Compteur
 * Représente un compteur d'eau ou d'électricité associé à une adresse.
 *
 * Contraintes métier (CDC) :
 * - Un seul compteur par type (EAU / ELECTRICITE) et par adresse
 * - Identifiant du compteur unique sur 9 chiffres
 * - Index initial fixé à 0
 */
@Getter
@Setter
@Entity
@Table(name = "compteur", uniqueConstraints = {
        @UniqueConstraint(name = "uk_compteur_adresse_type", columnNames = { "adresse_id", "type" })
})
public class Compteur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Numéro unique du compteur (9 chiffres, zéros inclus)
     */
    @Column(name = "numero", length = 9, nullable = false, unique = true)
    private String numero;

    /**
     * Type du compteur : EAU ou ELECTRICITE
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 20)
    private TypeCompteur type;

    /**
     * Index actuel du compteur
     * Initialisé à 0 à la création
     */
    @Column(name = "index_actuel", nullable = false)
    private double indexActuel = 0;

    /**
     * Adresse à laquelle le compteur est associé
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "adresse_id", nullable = false)
    private Adresse adresse;
}
