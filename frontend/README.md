# PERN Stack Project

This repository contains a full-stack web application boilerplate using the PERN stack (PostgreSQL, Express, React, Node.js) with TypeScript. It provides a well-structured foundation for building modern web applications with a clear separation between frontend and backend services.

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Node Version](#node-version)
  - [Setting Up the Database](#setting-up-the-database)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [Development Workflow](#development-workflow)
- [Frontend](#frontend)
- [Backend](#backend)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project provides a modern, scalable, and type-safe template for building web applications using the PERN stack. It includes:

- A Next.js frontend with TypeScript, Tailwind CSS, and React Query
- An Express backend with TypeScript, Prisma ORM, and PostgreSQL
- Docker setup for development database
- Comprehensive testing setup
- Linting and code formatting configurations

## Technologies

### Frontend

- **Next.js**: React framework with server-side rendering capabilities
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Query (@tanstack/react-query)**: Data fetching and state management library
- **Axios**: HTTP client for API requests

### Backend

- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **TypeScript**: Type-safe JavaScript
- **Prisma**: Modern ORM for database access
- **PostgreSQL**: Relational database
- **Zod**: Schema validation library
- **JWT**: Authentication using JSON Web Tokens
- **bcrypt**: Password hashing
- **Morgan**: HTTP request logger
- **Helmet**: Security middleware

### Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Jest**: Testing framework
- **Supertest**: HTTP testing
- **Docker & Docker Compose**: Containerization
- **nodemon**: Development server with hot reload
- **concurrently**: Run multiple commands concurrently


## Project Setup Guide

### Prerequisites

- Node.js (use version specified in `.nvmrc`)
- Docker and Docker Compose
- Git

### Getting Started

#### Clone the Repository

```bash
git clone https://github.com/yourusername/basic-pern-project-structure.git
cd basic-pern-project-structure
```

#### Node Version Setup

We use a specific Node.js version for consistency across development environments:

```bash
# Install nvm if you haven't already
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# Use the Node.js version specified in .nvmrc
nvm use
```

#### Setting Up the Database with Docker

We use Docker Compose to manage our PostgreSQL database:

```bash
# Start the database container
docker-compose up -d db

# Verify the container is running
docker ps
```

#### Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
yarn migrate

# Start the backend server in development mode
yarn dev
```

The backend API will be available at http://localhost:3000.

#### Frontend Setup

```bash
# Navigate to the frontend directory
cd ../frontend

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start the frontend development server
yarn dev
```

The frontend will be available at http://localhost:5173.

#### Running the Entire Stack with Docker

To run the entire application stack (frontend, backend, and database) using Docker:

```bash
# Build and start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f
```

## How to Contribute

We welcome contributions from developers of all skill levels! Here's how you can contribute:

### Git Workflow

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a new branch for your feature or bugfix:

```bash
# For features
git checkout -b feature/your-feature-name

# For bug fixes
git checkout -b fix/bug-description
```

### Branching Convention

- `main`: Production-ready code
- `develop`: Development branch, base for feature branches
- `feature/*`: New features
- `fix/*`: Bug fixes
- `hotfix/*`: Urgent fixes for production

### Making Changes

1. Implement your changes
2. Write or update tests (for backend changes)
3. Ensure your code follows the project's style guidelines
4. Commit your changes with descriptive messages:

```bash
git add .
git commit -m "feat: add user authentication feature"
```

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Testing Backend Changes

```bash
# Navigate to the backend directory
cd backend

# Run tests
yarn test

# Generate test coverage report
yarn test:coverage
```

### Creating a Pull Request

1. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Create a pull request through the GitHub interface

3. Include in your PR:
   - Description of changes
   - Screenshots (if applicable)
   - For backend changes, attach test reports
   - Reference any related issues

4. Wait for code review and address any feedback

### Attaching Test Reports to PRs

For backend changes, generate and attach test reports:

```bash
cd backend
yarn test:report
```

This will generate a report in the `backend/coverage` directory. Take a screenshot or export it as a PDF and attach it to your PR.

## Project Structure

```
basic-pern-project-structure/
├── backend/                 # Express application
│   ├── src/                 # Source code
│   ├── tests/               # Backend tests
│   └── prisma/              # Database schema and migrations
├── frontend/                # React application
│   ├── src/                 # Source code
│   └── public/              # Static assets
├── docker-compose.yml       # Docker Compose configuration
└── .nvmrc                   # Node.js version specification
```

## Need Help?

- Check existing issues or create a new one
- Read the project documentation
- Join our community chat

We appreciate your contributions, no matter how small!
