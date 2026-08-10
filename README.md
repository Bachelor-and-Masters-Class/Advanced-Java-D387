**Overview**

This repository contains my completed submission for the WGU course **D387 – Advanced Java**.

The project is a full-stack hotel reservation system built as a **Spring Boot REST API** with an **Angular** front end. It exposes endpoints for browsing reservable rooms and creating reservations, backed by JPA persistence against an H2 database and structured using a layered enterprise architecture.

The course emphasis is on advanced Java patterns rather than basic syntax: separation of concerns across architectural layers, explicit conversion between persistence entities and API contracts, dependency injection, and hypermedia-aware REST resource design.

**Scenario**

A hotel needs a web application that allows guests to view available rooms and book reservations. The system must expose a clean REST API that a separate front-end application can consume, without leaking internal database structure to API clients.

**Project Objectives**

-Design and implement a RESTful API using Spring Boot

-Model reservations and rooms as JPA entities with proper relationships

-Implement a repository layer for data access, including pageable queries

-Separate internal entities from external request and response models

-Implement bidirectional conversion between entities and API models

-Build a service layer that encapsulates business logic away from controllers

-Deliver an Angular front end that consumes the API

**Architecture**

**Entity Layer**
ReservationEntity and RoomEntity define the JPA-mapped persistence model, including the relationship between a reservation and the room it reserves.

**Repository Layer**
RoomRepository, ReservationRepository, and PageableRoomRepository provide Spring Data access. The pageable repository supports paginated room queries, avoiding unbounded result sets as inventory grows.

**Converter Layer**
Dedicated converters translate between persistence entities and API models in both directions: incoming ReservationRequest objects become ReservationEntity instances, and outgoing entities become ReservationResponse and ReservableRoomResponse objects. This keeps the database schema decoupled from the public API contract, so internal changes do not become breaking API changes.

**Service Layer**
ReservationService and RoomService, with their implementations, hold the business logic. Controllers remain thin and delegate to services rather than embedding logic in request handling.

**REST Layer**
ReservationResource exposes the HTTP endpoints, with ResourceConstants centralizing URI path definitions so routes are defined in exactly one place.

**Model Layer**
Links and Self model classes support hypermedia-style responses, allowing clients to discover related resources from the response payload rather than hard-coding URLs.

**Configuration**
ApiConfig, ConversionConfig, and DatabaseConfig register beans for API settings, the conversion service, and datasource setup. H2Bootstrap initializes the in-memory database for development and testing.

**Front End**
An Angular application under the UI source directory provides the client interface, with routing, components, and a service layer that calls the Spring Boot API.

**Technologies**

-Java and Spring Boot

-Spring Data JPA and Hibernate

-H2 in-memory database

-Maven build and dependency management

-Angular and TypeScript

-JUnit for testing

**Skills Demonstrated**

-Layered enterprise application architecture

-RESTful API design and implementation

-JPA entity modeling and relationship mapping

-Repository pattern and pagination

-DTO pattern and entity-to-model conversion

-Dependency injection and Spring configuration

-Hypermedia-aware response design

-Full-stack integration between a Java backend and an Angular front end

-Maven project structure and build lifecycle

**How to Run**

Start the backend:

```
./mvnw spring-boot:run
```

Start the Angular front end from the UI directory:

```
npm install
npm start
```

**Repository Contents**

-`src/main/java/` – Spring Boot application: entities, repositories, services, converters, REST resources, and configuration

-`src/main/UI/` – Angular front-end application

-`src/test/` – Application tests

-`pom.xml` – Maven build configuration
