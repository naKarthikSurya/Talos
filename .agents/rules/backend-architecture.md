# Backend Architecture Rule

This rule defines the architectural standards for all backend developments in this workspace.

## Core Principles

- **Statelessness**: Avoid in-memory state. Use Redis or database for persistent state to ensure horizontal scalability.
- **Modularity**: Implement features as isolated modules with clear boundaries.
- **Defensive Design**: Always validate inputs using `class-validator` and `class-transformer` (if using NestJS).
- **Observability**: Include structured logging and relevant metrics for every new endpoint.
- **Error Handling**: Use a centralized exception filter. Never leak internal stack traces to the client.

## Preferred Patterns

- Use **DTOs** for all request and response bodies.
- Adhere to the **Single Responsibility Principle** (SRP) in services.
- Prefer **Composition** over Inheritance.
- Ensure all business logic is testable in isolation.
