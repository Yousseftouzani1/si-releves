# =========================
# STAGE 1 : BUILD
# =========================
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# Copier le pom.xml et télécharger les dépendances
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copier le reste du projet
COPY src ./src

# Build de l'application (sans tests)
RUN mvn clean package -DskipTests


# =========================
# STAGE 2 : RUN
# =========================
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copier le JAR généré
COPY --from=build /app/target/*.jar app.jar

# Exposer le port de l'application
EXPOSE 8080

# Lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
