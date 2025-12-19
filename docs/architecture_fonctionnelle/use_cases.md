# Diagrammes Use Case
## SI Relevés - Application Backoffice Web

---

## 1. Vue Générale du Système

```mermaid
graph TB
    subgraph "SI Relevés - Backoffice Web"
        UC1[Authentification]
        UC2[Dashboard]
        UC3[Gestion Relevés]
        UC4[Gestion Agents]
        UC5[Gestion Compteurs]
        UC6[Rapports PDF]
        UC7[Gestion Utilisateurs]
    end
    
    SUPER[Superadmin] --> UC1
    SUPER --> UC7
    USER[Utilisateur] --> UC1
    USER --> UC2
    USER --> UC3
    USER --> UC4
    USER --> UC5
    USER --> UC6
    
    EXT1[(SI Commercial)] -.-> UC5
    EXT2[(SI RH)] -.-> UC4
    MOB[App Mobile] -.-> UC3
    FACT[(SI Facturation)] <-.-> UC3
```

---

## 2. Use Cases par Acteur

### 2.1 Use Cases - Superadmin

```mermaid
graph LR
    SUPER((Superadmin))
    
    SUPER --> UC_LOGIN[Se connecter]
    SUPER --> UC_LOGOUT[Se déconnecter]
    SUPER --> UC_PWD[Changer mot de passe]
    
    SUPER --> UC_LIST_USERS[Lister utilisateurs]
    SUPER --> UC_CREATE_USER[Créer utilisateur]
    SUPER --> UC_EDIT_USER[Modifier utilisateur]
    SUPER --> UC_RESET_PWD[Réinitialiser MDP]
    SUPER --> UC_LOGS[Consulter logs connexion]
```

### 2.2 Use Cases - Utilisateur

```mermaid
graph LR
    USER((Utilisateur))
    
    USER --> UC_LOGIN[Se connecter]
    USER --> UC_LOGOUT[Se déconnecter]
    USER --> UC_PWD[Changer mot de passe]
    
    USER --> UC_DASHBOARD[Consulter Dashboard]
    
    USER --> UC_LIST_REL[Lister relevés]
    USER --> UC_DETAIL_REL[Voir détail relevé]
    
    USER --> UC_LIST_AGENT[Lister agents]
    USER --> UC_DETAIL_AGENT[Voir détail agent]
    USER --> UC_AFFECT_AGENT[Affecter quartier]
    
    USER --> UC_LIST_COMPT[Lister compteurs]
    USER --> UC_DETAIL_COMPT[Voir détail compteur]
    USER --> UC_ADD_COMPT[Ajouter compteur]
    
    USER --> UC_RAPPORT[Exporter rapports PDF]
```

---

## 3. Use Cases Détaillés

### UC-01: Se Connecter

| Attribut | Valeur |
|----------|--------|
| **Acteur** | Superadmin, Utilisateur |
| **Précondition** | L'utilisateur a un compte valide |
| **Déclencheur** | L'utilisateur accède à la page login |
| **Scénario nominal** | 1. Saisie email + mot de passe<br>2. Validation des credentials<br>3. Génération token JWT<br>4. Redirection dashboard |
| **Scénario alternatif** | Credentials invalides → Message erreur |
| **Postcondition** | Utilisateur connecté, session active |

### UC-02: Consulter Dashboard

| Attribut | Valeur |
|----------|--------|
| **Acteur** | Utilisateur |
| **Précondition** | Utilisateur connecté |
| **Déclencheur** | Accès page /dashboard |
| **Scénario nominal** | 1. Affichage KPIs<br>2. Graphiques consommation<br>3. Stats par quartier |
| **Extensions** | Filtrage par période |
| **Postcondition** | Dashboard affiché |

### UC-03: Ajouter Compteur

| Attribut | Valeur |
|----------|--------|
| **Acteur** | Utilisateur |
| **Précondition** | Utilisateur connecté |
| **Déclencheur** | Clic bouton "Ajouter" |
| **Scénario nominal** | 1. Ouverture popup adresses<br>2. Sélection adresse<br>3. Choix type (Eau/Elec)<br>4. Validation<br>5. Génération ID automatique |
| **Scénario alternatif** | Adresse a déjà ce type → Erreur |
| **Postcondition** | Compteur créé avec index = 0 |

### UC-04: Affecter Agent à Quartier

| Attribut | Valeur |
|----------|--------|
| **Acteur** | Utilisateur |
| **Précondition** | Agent existe, Utilisateur connecté |
| **Déclencheur** | Modification sur page détail agent |
| **Scénario nominal** | 1. Sélection quartier<br>2. Sauvegarde |
| **Postcondition** | Agent affecté au quartier |

### UC-05: Exporter Rapport PDF

| Attribut | Valeur |
|----------|--------|
| **Acteur** | Utilisateur |
| **Précondition** | Utilisateur connecté |
| **Déclencheur** | Clic bouton export |
| **Scénario nominal** | 1. Sélection type rapport<br>2. Génération PDF<br>3. Téléchargement |
| **Postcondition** | Fichier PDF téléchargé |

### UC-06: Créer Utilisateur

| Attribut | Valeur |
|----------|--------|
| **Acteur** | Superadmin |
| **Précondition** | Superadmin connecté |
| **Déclencheur** | Clic bouton "Ajouter" |
| **Scénario nominal** | 1. Saisie nom (MAJUSCULES)<br>2. Saisie prénom<br>3. Choix rôle<br>4. Validation<br>5. Génération MDP<br>6. Envoi email |
| **Postcondition** | Utilisateur créé, email envoyé |

### UC-07: Réinitialiser Mot de Passe

| Attribut | Valeur |
|----------|--------|
| **Acteur** | Superadmin |
| **Précondition** | Superadmin connecté, utilisateur existe |
| **Déclencheur** | Clic bouton "Réinitialiser MDP" |
| **Scénario nominal** | 1. Confirmation<br>2. Génération nouveau MDP<br>3. Envoi email<br>4. Flag changement obligatoire |
| **Postcondition** | MDP réinitialisé |

---

## 4. Matrice CRUD

| Entité | Superadmin | Utilisateur |
|--------|:----------:|:-----------:|
| Utilisateur | CRUD | R (self) |
| Compteur | R | CRU |
| Agent | R | RU |
| Relevé | R | R |
| Quartier | R | R |
| LogConnexion | R | - |

**Légende** : C=Create, R=Read, U=Update, D=Delete

---

*Document généré avec assistance IA*
*Date : Décembre 2024*
