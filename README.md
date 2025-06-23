# PERN Stack Project Boilerplate

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

## Quick Start Guide

This project uses Yarn as the package manager. Make sure you have Yarn installed before proceeding.

### 1. Set Up Node.js Version

We use a specific Node.js version for consistency (defined in the `.nvmrc` file):

```bash
# Install nvm if you haven't already
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# Use the Node.js version specified in .nvmrc
nvm use
```

### 2. Install All Dependencies

We provide a convenience script to install dependencies for the root project, frontend, and backend:

```bash
# Install all dependencies at once
yarn install-all
```

### 3. Start the Development Database
Before running the application, start the PostgreSQL database using Docker:

```bash
# Start the database container
docker-compose up -d db

# Verify the container is running
docker ps
```

### 4. Generate prisma client and create DB Migrations
Run the following commands for prisma and postgres setup

```bash
# Generate prisma client by first going into the backend directory
cd backend && yarn db:generate

# Create database migration by running the following command
yarn db:migration

# You can also see your database in prisma studio
yarn db:studio
```

Go back to the root directory after generating and migrating
```bash
cd ..
```

### 5. Run the Application
You have several options to run the application:

```bash
# Run both frontend and backend concurrently
yarn dev

# Or run them separately
yarn frontend  # Starts only the Next.js frontend
yarn backend   # Starts only the Express backend
```

The frontend will be available at http://localhost:3000 and the backend at http://localhost:5000.
