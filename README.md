# Hotel Booking App

**WGU D387 · Advanced Java**

A full-stack hotel reservation app: guests browse rooms and book them. The backend is a Spring Boot REST API, and the frontend is Angular.

## How it's built

The backend is split into layers, each with one job:

- **Entities:** rooms and reservations as database tables (JPA).
- **Repositories:** database access, including paging so room lists don't load everything at once.
- **Converters:** translate between database objects and API objects, so changing the database doesn't break the API.
- **Services:** hold the business logic, so controllers stay thin.
- **REST endpoints:** all URL paths are defined in one place (`ResourceConstants`).
- **Links in responses:** each response includes links to related data, so the frontend doesn't hard-code URLs.
- **Database:** H2, an in-memory database for development.

The Angular frontend calls the API to show rooms and make bookings.

## Run it

```
./mvnw spring-boot:run          # backend

cd src/main/UI                  # frontend
npm install
npm start
```

## Files

- `src/main/java/`: backend (entities, repositories, services, converters, endpoints, config)
- `src/main/UI/`: Angular frontend
- `src/test/`: tests
- `pom.xml`: Maven build

**Built with:** Java, Spring Boot, Spring Data JPA, H2, Angular, TypeScript, Maven, JUnit
