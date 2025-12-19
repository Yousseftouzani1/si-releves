# Spécifications Fonctionnelles Détaillées
## SI Relevés - Application Backoffice Web
### Rabat Énergie & Eau (REE)

---

## 1. Présentation Générale

### 1.1 Contexte
Le système **SI Relevés** est une application web backoffice développée pour **Rabat Énergie & Eau (REE)** dans le cadre de sa transformation digitale. Cette application gère les compteurs d'eau et d'électricité ainsi que l'affectation des agents de terrain.

### 1.2 Objectifs
- Digitaliser le processus de relevé des compteurs
- Automatiser le calcul des consommations
- Faciliter le suivi et le contrôle des opérations
- Gérer l'affectation des agents aux quartiers

### 1.3 Périmètre
L'application couvre uniquement le volet **Backoffice Web "SI Relevés"** :
- Gestion des compteurs
- Affectation des agents aux quartiers
- Tableaux de bord et KPIs
- Rapports et statistiques

---

## 2. Acteurs du Système

### 2.1 Superadmin (Administrateur Système)
- Gestion complète des utilisateurs
- Création/modification des comptes
- Attribution des rôles
- Accès aux logs de connexion
- Réinitialisation des mots de passe

### 2.2 Utilisateur (Admin Backoffice)
- Consultation du dashboard et KPIs
- Gestion des compteurs (CRUD)
- Gestion des agents et affectations
- Consultation des relevés
- Export des rapports PDF
- Modification de son mot de passe

### 2.3 Agent de Terrain (Utilisateur Mobile - Simulé)
- Effectue les relevés sur le terrain
- Transmet les données via application mobile

---

## 3. Fonctionnalités Détaillées

### 3.1 Authentification

#### F01 - Connexion
| Champ | Type | Validation |
|-------|------|------------|
| Email | String | Format email valide |
| Mot de passe | String | Min 8 caractères |

**Règles :**
- Déconnexion automatique après 10 minutes d'inactivité
- Tokens JWT avec expiration 30 minutes
- Mots de passe cryptés BCrypt

#### F02 - Déconnexion
- Suppression du token JWT
- Redirection vers page login

#### F03 - Changement de mot de passe
- Accessible à tous les utilisateurs connectés
- Validation : ancien mot de passe requis
- Nouveau mot de passe : min 8 caractères, complexité

---

### 3.2 Dashboard (Rôle: Utilisateur)

#### F04 - Taux de couverture
- **Formule** : (Compteurs relevés / Total compteurs) × 100
- **Affichage** : Jauge visuelle + pourcentage
- **Détail** : Par quartier

#### F05 - Relevés par jour par agent
- **Formule** : Moyenne de compteurs relevés par agent
- **Affichage** : Comparaison entre agents
- **Détail** : Par quartier, par agent

#### F06 - Évolution consommation moyenne
- **Types** : Eau (m³), Électricité (kWh)
- **Période** : Mensuelle avec graphique tendanciel
- **Comparaison** : N vs N-1

---

### 3.3 Gestion des Relevés (Rôle: Utilisateur)

#### F07 - Liste des relevés
| Colonne | Description |
|---------|-------------|
| Date relève | Timestamp |
| Agent | Nom complet |
| Adresse | Tronquée si longue |
| Type compteur | Eau / Électricité |
| Consommation | Valeur calculée |

**Filtres** : jour, quartier, agent, client, type
**Tri** : jour (défaut, desc), quartier, agent

#### F08 - Détail d'un relevé (Lecture seule)
- Date de la relève
- Agent ayant effectué la relève
- Adresse complète
- Client associé
- Identifiant compteur
- Type (Eau / Électricité)
- Ancien index
- Nouvel index
- Consommation calculée

---

### 3.4 Gestion des Agents (Rôle: Utilisateur)

#### F09 - Liste des agents
| Colonne | Description |
|---------|-------------|
| Nom Prénom | Nom complet |
| Téléphone | N° professionnel |
| Quartier | Affectation |

**Filtres** : quartier
**Tri** : nom (défaut, asc), quartier

#### F10 - Détail d'un agent
**Lecture seule** :
- Nom, Prénom
- Téléphone personnel
- Téléphone professionnel

**Modifiable** :
- Quartier associé

**Performances** :
- Relevés moyens par jour
- Graphe évolution sur 3 mois
- Slider période : 1 semaine → 1 an

---

### 3.5 Gestion des Compteurs (Rôle: Utilisateur)

#### F11 - Liste des compteurs
| Colonne | Description |
|---------|-------------|
| Identifiant | 9 chiffres |
| Adresse | Tronquée |
| Type | Eau / Électricité |

#### F12 - Détail d'un compteur (Lecture seule)
- Identifiant compteur
- Adresse associée
- Client associé
- Index actuel
- Date dernière relève
- Historique (10 derniers relevés)
- Bouton "Plus de détails" → Liste relevés filtrée

#### F13 - Ajout d'un compteur
**Formulaire** :
- Sélection adresse (popup)
- Type : Eau / Électricité

**Popup Adresse** :
- Liste adresses sans compteur du type sélectionné
- Filtre par quartier
- Recherche textuelle

**Auto-généré** :
- Identifiant unique (9 chiffres, ex: 000000001)
- Index initial = 0

---

### 3.6 Rapports (Rôle: Utilisateur)

#### F14 - Rapport mensuel des relevés (PDF)
- Répartition agents par quartier
- Moyenne relevés/agent/jour/quartier
- Nombre relevés par quartier

#### F15 - Évolution consommation (PDF)
- Par type (Eau m³, Électricité kWh)
- Graphique tendanciel mensuel
- Comparaison N vs N-1

---

### 3.7 Gestion des Utilisateurs (Rôle: Superadmin)

#### F16 - Liste des utilisateurs
| Colonne | Description |
|---------|-------------|
| Nom Prénom | Nom complet |
| Rôle | Superadmin / Utilisateur |
| Date ajout | Timestamp création |
| Dernière modification | Timestamp |

**Filtres** : rôle
**Tri** : nom (défaut, asc), rôle

#### F17 - Détail utilisateur (Modifiable)
- Nom
- Prénom
- Rôle

**Actions** :
- Réinitialiser mot de passe
  - Génération automatique (8+ caractères)
  - Envoi par email
  - Changement obligatoire à la prochaine connexion

#### F18 - Ajout utilisateur
**Formulaire** :
- Nom (MAJUSCULES)
- Prénom (Première lettre majuscule)
- Rôle

**Auto** :
- Génération mot de passe temporaire
- Envoi email

---

## 4. Règles Métier

| ID | Règle | Implémentation |
|----|-------|----------------|
| R01 | 1 compteur max par type par adresse | Contrainte unique DB |
| R02 | Identifiant compteur = 9 chiffres | Validation + auto-génération |
| R03 | Index initial = 0 | Défaut création |
| R04 | NOM en MAJUSCULES | toUpperCase() |
| R05 | Prénom en Nom Propre | Capitalize |
| R06 | Consommation = Nouvel index - Ancien index | Calcul automatique |
| R07 | Session expire après 10 min inactivité | JWT + Frontend timer |
| R08 | Plusieurs agents par quartier | Relation ManyToMany |
| R09 | 1 agent ≈ 300 adresses (recommandé) | Indicateur dashboard |

---

## 5. Interfaces Externes

### 5.1 SI Commercial → SI Relevés
- Identifiant client
- Adresses associées
- (Batch récurrent planifié - Simulé)

### 5.2 SI RH → SI Relevés
- Nom/Prénom agent
- Téléphones (perso/pro)
- (Batch récurrent planifié - Simulé)

### 5.3 Application Mobile → SI Relevés
- N° compteur
- Nouvel index
- Date/heure relève
- (Web service - Simulé)

### 5.4 SI Relevés → SI Facturation
- Identifiant client
- Adresse
- N° compteur
- Consommation eau/électricité
- (Web service automatique - Simulé)

---

*Document généré avec assistance IA*
*Date : Décembre 2024*
