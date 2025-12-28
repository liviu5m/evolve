FROM maven:3.8.3-openjdk-17-slim AS build
WORKDIR /app

# 1. Copy only pom.xml first to cache dependencies
# This makes subsequent builds MUCH faster
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 2. Copy the actual source code
COPY src ./src

# 3. Build the application
RUN mvn clean package -DskipTests

# --- Stage 2: Runtime ---
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy the jar from the build stage
COPY --from=build /app/target/evolve-0.0.1-SNAPSHOT.jar app.jar

# Render usually maps to PORT 8080 by default, but uses the $PORT env var
EXPOSE 8080

# Optimization flags for memory-constrained environments (like Render Free Tier)
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]