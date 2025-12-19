package com.ree.sireleves.config;

import com.ree.sireleves.enums.Role;
import com.ree.sireleves.model.Utilisateur;
import com.ree.sireleves.model.Quartier;
import com.ree.sireleves.repository.UtilisateurRepository;
import com.ree.sireleves.repository.QuartierRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Initialise les données de test au démarrage de l'application
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private final UtilisateurRepository utilisateurRepository;
    private final QuartierRepository quartierRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UtilisateurRepository utilisateurRepository,
            QuartierRepository quartierRepository,
            PasswordEncoder passwordEncoder) {
        this.utilisateurRepository = utilisateurRepository;
        this.quartierRepository = quartierRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Créer les utilisateurs de test
        if (utilisateurRepository.count() == 0) {
            System.out.println("🔧 Initialisation des utilisateurs de test...");

            // SuperAdmin
            Utilisateur admin = new Utilisateur();
            admin.setNom("ADMIN");
            admin.setPrenom("Super");
            admin.setEmail("superadmin@ree.ma");
            admin.setMotDePasse(passwordEncoder.encode("Admin123!"));
            admin.setRole(Role.SUPERADMIN);
            admin.setActif(true);
            utilisateurRepository.save(admin);

            // Utilisateur normal
            Utilisateur user = new Utilisateur();
            user.setNom("TOUZANI");
            user.setPrenom("Youssef");
            user.setEmail("youssef@ree.ma");
            user.setMotDePasse(passwordEncoder.encode("User123!"));
            user.setRole(Role.UTILISATEUR);
            user.setActif(true);
            utilisateurRepository.save(user);

            // Agent terrain
            Utilisateur agent = new Utilisateur();
            agent.setNom("ALAMI");
            agent.setPrenom("Mohammed");
            agent.setEmail("agent@ree.ma");
            agent.setMotDePasse(passwordEncoder.encode("Agent123!"));
            agent.setRole(Role.AGENT);
            agent.setActif(true);
            utilisateurRepository.save(agent);

            System.out.println("✅ Utilisateurs de test créés :");
            System.out.println("   - superadmin@ree.ma / Admin123! (SUPERADMIN)");
            System.out.println("   - youssef@ree.ma / User123! (UTILISATEUR)");
            System.out.println("   - agent@ree.ma / Agent123! (AGENT)");
        }

        // Créer les quartiers de test
        if (quartierRepository.count() == 0) {
            System.out.println("🔧 Initialisation des quartiers de Rabat...");

            String[] quartiers = { "Agdal", "Hay Riad", "Océan", "Hassan", "Yacoub El Mansour",
                    "Souissi", "Akkari", "Takaddoum", "Youssoufia", "Médina" };

            for (String nom : quartiers) {
                Quartier q = new Quartier();
                q.setNom(nom);
                quartierRepository.save(q);
            }

            System.out.println("✅ " + quartiers.length + " quartiers créés");
        }
    }
}
