# AstroNexus

AstroNexus is a React frontend application developed as part of the assignment for SE3040 – Application Frameworks, BSc (Hons) in Information Technology, specialized in Software Engineering, 3rd Year at SLIIT.

## Overview

AstroNexus is a creative frontend application that utilizes NASA's public APIs to provide users with daily or historical astronomy-related data. Users can explore various endpoints such as Mars Rover Photos, Astronomy Picture of the Day, and Earth imagery APIs. The application aims to showcase skills in front-end development, API integration, usability enhancement through Tailwind CSS framework, user session management, version control with Git, deployment, and testing.

## Features

- View daily or historical astronomy-related data.
- Integration with at least two different endpoints from NASA's APIs.
- User authentication using JWT for accessing personalized features.
- Dynamic display of data based on user input or interactions.
- Responsive design for consistent experience across different devices and screen sizes.

## Technology Stack

### Frontend

- React (with functional components)
- Language: JavaScript
- CSS Framework: Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- JWT for authentication

### Hosting

- frontend - Vercel
- backend - Render

### Session Management

- Implemented using JWT

### Version Control

- Git

## Setup Instructions

### Frontend

1. Clone the repository:

```bash
git clone https://github.com/yourusername/AstroNexus.git
```

2. Navigate to the frontend directory:

```bash
cd AstroNexus/frontend
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

5. Open your browser and visit `http://localhost:3000` to view the frontend application.

### Backend

1. Navigate to the backend directory:

```bash
cd AstroNexus/backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

## API Usage

To utilize NASA's APIs, you need to obtain an API key from the NASA API portal and add it to your environment variables or directly in the code where API requests are made. Ensure to follow security best practices in handling API keys.

## Documentation

### Application Structure

The project follows a standard React application structure with components organized in a modular manner under the `frontend/src/components` directory. Stylesheets are implemented using Tailwind CSS.

The backend follows the MVC (Model-View-Controller) architecture with routes, controllers, and models organized under the `backend/routes`, `backend/controllers`, and `backend/models` directories, respectively.

### Testing

Comprehensive unit and integration tests are implemented using Jest and React Testing Library for the frontend, and Mocha and Chai for the backend. Tests cover critical functionalities and components of the application to ensure correctness and reliability.

### Deployment

The application is deployed on [Hosting Platform](URL). Visit the deployed application [here](URL).

## Report

For a detailed report discussing the chosen APIs, challenges faced, and their resolutions, refer to the `report.md` file in the root directory of the repository.
