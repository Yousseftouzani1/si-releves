# Cahier de Tests
## SI Relevés - Application Backoffice Web

---

## 1. Stratégie de Tests

### 1.1 Types de Tests
| Type | Outil | Couverture |
|------|-------|------------|
| Tests Unitaires | JUnit 5 + Mockito | Backend Java |
| Tests API | Postman / Thunder Client | Endpoints REST |
| Tests Intégration | Spring Boot Test | Backend complet |
| Tests Fonctionnels | Manuel + Selenium | Frontend React |
| Tests UI | Browser DevTools | Interface utilisateur |

### 1.2 Environnements
| Environnement | URL Backend | URL Frontend |
|---------------|-------------|--------------|
| Développement | http://localhost:8080 | http://localhost:5173 |
| Production | https://api.sireleves.ree.ma | https://sireleves.ree.ma |

---

## 2. Scénarios de Tests Fonctionnels

### 2.1 Module Authentification

#### TF-AUTH-01: Connexion réussie
| Attribut | Valeur |
|----------|--------|
| **Précondition** | Utilisateur avec compte valide existe |
| **Données** | Email: admin@ree.ma, MDP: Admin123! |
| **Actions** | 1. Accéder /login<br>2. Saisir credentials<br>3. Cliquer Connexion |
| **Résultat attendu** | Redirection vers /dashboard |
| **Statut** | ✅ |

#### TF-AUTH-02: Connexion échouée - MDP incorrect
| Attribut | Valeur |
|----------|--------|
| **Précondition** | Utilisateur existe |
| **Données** | Email: admin@ree.ma, MDP: wrongpass |
| **Actions** | Saisir credentials erronés |
| **Résultat attendu** | Message "Identifiants invalides" |
| **Statut** | ✅ |

#### TF-AUTH-03: Déconnexion automatique après inactivité
| Attribut | Valeur |
|----------|--------|
| **Précondition** | Utilisateur connecté |
| **Actions** | Attendre 10 minutes sans activité |
| **Résultat attendu** | Modal avertissement, puis déconnexion |
| **Statut** | ✅ |

#### TF-AUTH-04: Changement de mot de passe
| Attribut | Valeur |
|----------|--------|
| **Précondition** | Utilisateur connecté |
| **Données** | Ancien MDP + Nouveau MDP (8+ chars) |
| **Actions** | 1. Accéder /change-password<br>2. Remplir formulaire<br>3. Valider |
| **Résultat attendu** | Message succès, MDP mis à jour |
| **Statut** | ✅ |

---

### 2.2 Module Dashboard

#### TF-DASH-01: Affichage KPIs
| Attribut | Valeur |
|----------|--------|
| **Précondition** | Utilisateur connecté |
| **Actions** | Accéder /dashboard |
| **Résultat attendu** | Affichage: Total compteurs, Agents, Relevés, Taux couverture |
| **Statut** | ✅ |

#### TF-DASH-02: Graphique consommation
| Attribut | Valeur |
|----------|--------|
| **Précondition** | Données relevés existent |
| **Actions** | Observer graphique sur dashboard |
| **Résultat attendu** | Graphique avec évolution mensuelle |
| **Statut** | ✅ |

---

### 2.3 Module Compteurs

#### TF-COMPT-01: Liste des compteurs
| Attribut | Valeur |
|----------|--------|
| **Précondition** | Compteurs existent en base |
| **Actions** | Accéder /compteurs |
| **Résultat attendu** | Liste avec ID, Adresse, Type, Index |
| **Statut** | ✅ |

#### TF-COMPT-02: Détail compteur
| Attribut | Valeur |
|----------|--------|
| **Précondition** | Compteur ID existe |
| **Actions** | Cliquer sur un compteur |
| **Résultat attendu** | Page détail avec historique relevés |
| **Statut** | ✅ |

#### TF-COMPT-03: Ajout compteur
| Attribut | Valeur |
|----------|--------|
| **Précondition** | Adresse sans compteur de ce type existe |
| **Données** | Adresse, Type: EAU |
| **Actions** | 1. Cliquer Ajouter<br>2. Sélectionner adresse<br>3. Choisir type<br>4. Enregistrer |
| **Résultat attendu** | Compteur créé avec numéro 9 chiffres, index=0 |
| **Statut** | ✅ |

#### TF-COMPT-04: Unicité compteur par type/adresse
| Attribut | Valeur |
|----------|--------|
| **Précondition** | Adresse a déjà compteur EAU |
| **Données** | Même adresse, Type: EAU |
| **Actions** | Tenter d'ajouter un compteur EAU |
| **Résultat attendu** | Erreur "Compteur EAU existe déjà pour cette adresse" |
| **Statut** | ✅ |

---

### 2.4 Module Agents

#### TF-AGENT-01: Liste des agents
| Attribut | Valeur |
|----------|--------|
| **Actions** | Accéder /agents |
| **Résultat attendu** | Liste: Nom, Téléphone, Quartier |
| **Statut** | ✅ |

#### TF-AGENT-02: Détail agent avec performances
| Attribut | Valeur |
|----------|--------|
| **Actions** | Cliquer sur un agent |
| **Résultat attendu** | Infos + graphe performances 3 mois |
| **Statut** | ⚠️ Graphe à améliorer |

#### TF-AGENT-03: Modification quartier agent
| Attribut | Valeur |
|----------|--------|
| **Précondition** | Agent existe |
| **Actions** | 1. Ouvrir détail<br>2. Modifier quartier<br>3. Sauvegarder |
| **Résultat attendu** | Quartier mis à jour |
| **Statut** | ✅ |

---

### 2.5 Module Relevés

#### TF-REL-01: Liste des relevés
| Attribut | Valeur |
|----------|--------|
| **Actions** | Accéder /releves |
| **Résultat attendu** | Liste triée par date desc |
| **Statut** | ✅ |

#### TF-REL-02: Filtrage relevés
| Attribut | Valeur |
|----------|--------|
| **Données** | Filtre: quartier="Agdal" |
| **Actions** | Appliquer filtre quartier |
| **Résultat attendu** | Seuls les relevés d'Agdal affichés |
| **Statut** | ✅ |

#### TF-REL-03: Détail relevé
| Attribut | Valeur |
|----------|--------|
| **Actions** | Cliquer sur un relevé |
| **Résultat attendu** | Ancien index, Nouvel index, Consommation calculée |
| **Statut** | ✅ |

---

### 2.6 Module Utilisateurs (Superadmin)

#### TF-USER-01: Liste utilisateurs
| Attribut | Valeur |
|----------|--------|
| **Précondition** | Connecté en Superadmin |
| **Actions** | Accéder /admin/utilisateurs |
| **Résultat attendu** | Liste tous les utilisateurs |
| **Statut** | ✅ |

#### TF-USER-02: Création utilisateur
| Attribut | Valeur |
|----------|--------|
| **Données** | Nom: ALAMI, Prénom: Fatima, Rôle: UTILISATEUR |
| **Actions** | Remplir formulaire + Enregistrer |
| **Résultat attendu** | Utilisateur créé, email envoyé |
| **Statut** | ✅ |

#### TF-USER-03: Réinitialisation MDP
| Attribut | Valeur |
|----------|--------|
| **Précondition** | Utilisateur existe |
| **Actions** | Cliquer "Réinitialiser MDP" |
| **Résultat attendu** | MDP généré, email envoyé |
| **Statut** | ⚠️ À implémenter |

---

### 2.7 Module Rapports

#### TF-RAP-01: Export PDF rapport mensuel
| Attribut | Valeur |
|----------|--------|
| **Actions** | Cliquer export rapport mensuel |
| **Résultat attendu** | Téléchargement PDF avec stats agents/quartiers |
| **Statut** | ❌ À implémenter |

#### TF-RAP-02: Export PDF évolution consommation
| Attribut | Valeur |
|----------|--------|
| **Actions** | Cliquer export évolution |
| **Résultat attendu** | Téléchargement PDF avec graphiques |
| **Statut** | ❌ À implémenter |

---

## 3. Tests API (Postman)

### 3.1 Collection Tests

```json
{
  "auth": [
    {"name": "Login Success", "method": "POST", "url": "/api/auth/login", "status": 200},
    {"name": "Login Fail", "method": "POST", "url": "/api/auth/login", "status": 401}
  ],
  "compteurs": [
    {"name": "Get All", "method": "GET", "url": "/api/compteurs", "status": 200},
    {"name": "Get By ID", "method": "GET", "url": "/api/compteurs/1", "status": 200},
    {"name": "Create", "method": "POST", "url": "/api/compteurs", "status": 201}
  ],
  "agents": [
    {"name": "Get All", "method": "GET", "url": "/api/agents", "status": 200}
  ],
  "releves": [
    {"name": "Get All", "method": "GET", "url": "/api/releves", "status": 200}
  ]
}
```

---

## 4. Jeux de Données de Test

### 4.1 Utilisateurs
| Email | MDP | Rôle |
|-------|-----|------|
| superadmin@ree.ma | SuperAdmin123! | SUPERADMIN |
| user@ree.ma | User123! | UTILISATEUR |

### 4.2 Agents
| Nom | Prénom | Quartier |
|-----|--------|----------|
| BENALI | Mohammed | Agdal |
| ALAOUI | Fatima | Hassan |
| TAZI | Ahmed | Hay Riad |

### 4.3 Compteurs
| Numéro | Type | Adresse |
|--------|------|---------|
| 000000001 | EAU | 12 Rue Moulay Hassan, Agdal |
| 000000002 | ELECTRICITE | 12 Rue Moulay Hassan, Agdal |
| 000000003 | EAU | 45 Avenue Mohammed V, Hassan |

---

## 5. Couverture de Tests

| Module | Tests Prévus | Tests OK | Tests KO | Couverture |
|--------|:------------:|:--------:|:--------:|:----------:|
| Authentification | 4 | 4 | 0 | 100% |
| Dashboard | 2 | 2 | 0 | 100% |
| Compteurs | 4 | 4 | 0 | 100% |
| Agents | 3 | 2 | 1 | 67% |
| Relevés | 3 | 3 | 0 | 100% |
| Utilisateurs | 3 | 2 | 1 | 67% |
| Rapports | 2 | 0 | 2 | 0% |
| **TOTAL** | **21** | **17** | **4** | **81%** |

---

*Document généré avec assistance IA*
*Date : Décembre 2024*
