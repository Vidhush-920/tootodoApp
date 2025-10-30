#Stage 1:  Build the Application
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

#Copy the Maven Wrapper and Configuration
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Fetch dependencies (layer optimization)
RUN ./mvnw dependency:go-offline -B

# Copy the rest of the source code
COPY src src

# Package the application into a JAR file
RUN ./mvnw package -DskipTests

# STAGE 2: Create the Runtime Image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the packaged JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port Spring Boot runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
