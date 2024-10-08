# Cinema Manager Frontend

Cinema Manager Frontend is a web application built with Next.js and TypeScript, designed to provide an intuitive interface for users to interact with the Cinema Manager API. This application allows clients to browse films, make reservations, and manage their accounts seamlessly.

## Project Overview

This project aims to enhance the user experience for cinema patrons by providing a responsive and user-friendly interface. It integrates with the Cinema Manager API to facilitate film browsing, seat reservations, and user account management.


##  Backend Repository
You can find the backend repository here: [Cinema Manager API](https://github.com/YassineBouchama1/Cinema-Manager-Api).

## Architecture

- **App:** Contains the main application pages, leveraging Next.js's file-based routing.
- **Featurs:** Contains All Features WIth Hooks and Design.
- **Context:** Implements React context for global state management, enabling authentication and user sessions.
- **Types:** Defines TypeScript interfaces and types for data consistency and type safety throughout the application.

## Main Features

- **User Management:**
  - Client registration and authentication via JWT.
  - User account management, including profile updates and password changes.

- **Film Browsing:**
  - View a list of available films with detailed information.
  - Filter and search for films based on various criteria.

- **Reservation Management:**
  - Clients can select films, view available screenings, and reserve seats.
  - Confirmation of reservations and details displayed on the user dashboard.

## Getting Started



1. **Clone the Repository**
   ```bash
   git clone [https://github.com/YassineBouchama1/Cinema-Manager-Front.git]


2. **Install Dependencies**
   ```cd [project-directory]
   npm install
   
3. **Create Environment File**
   ```cp .env.example .env
   Open the .env file and add your specific values for the environment variables.

4. **Run the Application**
   ```npm start
