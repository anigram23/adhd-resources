# Build
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
RUN chmod +x mvnw && ./mvnw dependency:go-offline

COPY src ./src
RUN ./mvnw clean package -DskipTests

# Run
FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /app/target/adhd-resources-*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

