# OpenAPI Studio

OpenAPI Studio is an open-source API development workspace designed to help developers build, test, inspect, and organize API requests from a single, lightweight interface.

The project is currently in **early development**. The repository is being built incrementally with a focus on maintainability, testing, accessibility, security, and contributor-friendly architecture.

## Project Status

OpenAPI Studio is not production-ready yet.

The current repository contains the initial frontend foundation:

- React
- TypeScript
- Vite
- Tailwind CSS integration planned
- ESLint
- Prettier
- Vitest
- React Testing Library
- jsdom

API request functionality and the rest of the product roadmap will be implemented incrementally.

## Planned Features

The long-term goal is to provide a developer-focused API workspace with features including:

- HTTP request builder
- HTTP method selection
- URL and query parameter editing
- Request headers
- Request body editing
- Response inspection
- Response headers
- Response timing
- JSON formatting
- Raw response viewing
- Request history
- Collections and folders
- Environments and variables
- Authentication helpers
- cURL import and export
- Collection import and export
- OpenAPI specification support
- API testing and assertions

Features will be introduced incrementally and may change as the project evolves.

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS (planned)
- React Router (planned)
- Zustand when global state is justified
- Monaco Editor for advanced code and JSON editing (planned)

### Testing

- Vitest
- React Testing Library
- jsdom
- Playwright for end-to-end testing when the application has meaningful end-to-end workflows

### Package Manager

- pnpm

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js
- pnpm
- Git

### Installation

Clone the repository and install dependencies:

```bash
pnpm install
```

## License

OpenAPI Studio is licensed under the MIT License.

See the `LICENSE` file for the full license text.
