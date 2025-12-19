# Technologies et Frameworks
## SI Relevés - Stack Technique

---

## 1. Backend

### 1.1 Framework Principal
| Technologie | Version | Description |
|-------------|---------|-------------|
| **Spring Boot** | 3.2.0 | Framework Java pour API REST |
| **Java** | 17 LTS | Langage de programmation |
| **Maven** | 3.9.x | Gestion des dépendances |

### 1.2 Dépendances Backend
| Dépendance | Version | Usage |
|------------|---------|-------|
| spring-boot-starter-web | 3.2.0 | API REST |
| spring-boot-starter-data-mongodb | 3.2.0 | Persistance MongoDB |
| spring-boot-starter-security | 3.2.0 | Sécurité & JWT |
| spring-boot-starter-validation | 3.2.0 | Validation données |
| jjwt-api | 0.11.5 | JSON Web Tokens |
| lombok | 1.18.30 | Réduction boilerplate |
| springdoc-openapi | 2.3.0 | Documentation API |

### 1.3 Sécurité
| Technologie | Usage |
|-------------|-------|
| **JWT** | Tokens d'authentification |
| **BCrypt** | Hashage mots de passe |
| **Spring Security** | Contrôle d'accès |

---

## 2. Frontend

### 2.1 Framework Principal
| Technologie | Version | Description |
|-------------|---------|-------------|
| **React** | 18.2.0 | Bibliothèque UI |
| **Vite** | 5.0.0 | Build tool & dev server |
| **JavaScript** | ES6+ | Langage (JSX) |

### 2.2 Dépendances Frontend
| Dépendance | Version | Usage |
|------------|---------|-------|
| react-router-dom | 6.20.0 | Routing SPA |
| axios | 1.6.2 | Requêtes HTTP |
| lucide-react | 0.294.0 | Icônes |
| recharts | 2.10.3 | Graphiques |
| jspdf | 2.5.1 | Export PDF |
| html2canvas | 1.4.1 | Capture PDF |

### 2.3 Styling
| Technologie | Usage |
|-------------|-------|
| **CSS Variables** | Thème dark/light |
| **Flexbox/Grid** | Layout responsive |
| **CSS Modules** | Encapsulation styles |

---

## 3. Base de Données

| Technologie | Version | Description |
|-------------|---------|-------------|
| **MongoDB** | 7.0 | Base NoSQL |
| **MongoDB Atlas** | Cloud | Hébergement (option) |

---

## 4. Outils de Développement

### 4.1 IDE & Éditeurs
| Outil | Usage |
|-------|-------|
| **VS Code** | Développement Frontend |
| **IntelliJ IDEA** | Développement Backend |
| **Cursor** | Assistance IA |

### 4.2 Tests
| Outil | Usage |
|-------|-------|
| **JUnit 5** | Tests unitaires Java |
| **Mockito** | Mocking |
| **Postman** | Tests API |
| **Thunder Client** | Tests API (VS Code) |

### 4.3 Versioning
| Outil | Usage |
|-------|-------|
| **Git** | Contrôle de versions |
| **GitHub** | Hébergement repos |

---

## 5. Déploiement

### 5.1 Serveurs
| Composant | Technologie |
|-----------|-------------|
| Backend | Spring Boot embedded Tomcat |
| Frontend | Vite dev server / Nginx |

### 5.2 Ports
| Service | Port |
|---------|:----:|
| Backend API | 8080 |
| Frontend Dev | 5173 |
| MongoDB | 27017 |

### 5.3 Variables d'Environnement
```properties
# Backend
MONGODB_URI=mongodb://localhost:27017/sireleves
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1800000

# Frontend
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 6. Compatibilité Navigateurs

| Navigateur | Version Min |
|------------|:-----------:|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

---

*Document généré avec assistance IA*
*Date : Décembre 2024*
