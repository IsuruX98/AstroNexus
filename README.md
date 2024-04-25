# AstroNexus

AstroNexus is a web application developed to explore data from NASA's public APIs. It allows users to interact with various endpoints, including Mars Rover Photos, Astronomy Picture of the Day, and Earth Polychromatic Imaging Camera.

The project utilizes React for the frontend, Node.js with Express for the backend, and MongoDB for data storage. User authentication is implemented using JWT tokens and secure cookies for session management.

The frontend is styled using Tailwind CSS for a modern and responsive design.

## Features

- **User Authentication**: Users can register, login, and logout securely. JWT tokens are used for authentication, and user sessions are managed with secure cookies.
- **Profile Management**: Authenticated users can view and update their profiles.
- **NASA API Integration**: The application integrates with multiple NASA APIs, including Mars Rover Photos, Astronomy Picture of the Day, and Earth Polychromatic Imaging Camera. Users can interact with these APIs to view relevant data and images.
- **Search and Filter**: Users can search for Mars Rover photos by Martian sol or Earth date, optionally filtering by camera. They can also view Astronomy Picture of the Day by selecting a specific date or date range.
- **Responsive Design**: The application is designed to provide a seamless experience across different devices and screen sizes.

## Technologies Used

- Frontend:
  - React
  - Tailwind CSS
- Backend:
  - Node.js
  - Express
  - MongoDB
- Authentication:
  - JWT Tokens
  - Secure Cookies

## Setup Instructions

1. **Clone the Repository**: `git clone https://github.com/sliitcsse/se3040-assignment02-IsuruX98.git`
2. **Install Dependencies**:
   - Frontend: `cd se3040-assignment02-IsuruX98/frontend && npm install`
   - Backend: `cd ../backend && npm install`
3. **Set Environment Variables**:
   - **Backend**:
     - Create a `.env` file in the `backend` directory and add the following environment variables:
       ```
       PORT=your_backend_port_here
       MONGO_URI=your_mongodb_uri_here
       NODE_ENV=your_development_environment_here
       JWT_SECRET=your_jwt_secret_here
       ```
   - **Frontend**:
     - Create a `.env` file in the `frontend` directory and add the following environment variable:
       ```
       REACT_APP_NASA_API_KEY=your_nasa_api_key_here
       ```
4. **Start the Servers**:
   - Frontend: `npm start` (from the `frontend` directory)
   - Backend: `npm start` (from the `backend` directory)
5. **Access the Application**: Open your browser and navigate to `http://localhost:3000` to access the application.

## Testing

The application has been thoroughly tested using Jest and React Testing Library for frontend testing. Backend routes and functionality have been tested using Postman.

## Deployment

- Frontend: The frontend is hosted on Vercel. You can access it [here](https://astro-nexus.vercel.app/).
- Backend: The backend is hosted on Render. You can access it [here](https://astronexus.onrender.com).

## API Documentation

For detailed documentation on NASA's APIs used in this project, refer to the official NASA API documentation:

- [NASA API Documentation](https://api.nasa.gov/)

## Screenshots

![Screenshot_25-4-2024_13324_localhost](https://github.com/sliitcsse/se3040-assignment02-IsuruX98/assets/104721314/8f620b10-0f66-41ca-a9eb-c8863aa235de)

## Report: AstroNexus Project

### Chosen APIs:

1. **Mars Rover Photos API**: This API provides access to photos taken by NASA's Mars rovers. It allows users to search for photos by Martian sol or Earth date, optionally filtering by camera.
2. **Astronomy Picture of the Day (APOD) API**: This API provides a new astronomy-related image or video each day, along with a brief description. Users can view images and information from the past as well.

3. **Earth Polychromatic Imaging Camera (EPIC) API**: This API provides imagery of the Earth's surface taken by the EPIC instrument onboard the DSCOVR spacecraft.

### Challenges Faced:

1. **Understanding API Documentation**: The main challenge was understanding the documentation for each API and learning how to interact with them effectively. Each API had its own set of parameters and endpoints, requiring careful study and experimentation to use them correctly.

2. **Authentication and Authorization**: Implementing user authentication and session management using JWT tokens and secure cookies posed some challenges, especially ensuring security and protecting user data.

3. **Data Parsing and Display**: Parsing and displaying data from the APIs in a user-friendly manner, especially handling different data formats and structures, required attention to detail and careful data processing.

### How Challenges Were Resolved:

1. **Thorough Documentation Review**: We thoroughly reviewed the documentation for each API, paying close attention to parameters, endpoints, and example requests. We also utilized the provided code samples and tutorials to understand the API usage better.

2. **Security Best Practices**: We followed security best practices for implementing user authentication, including securely storing passwords, using JWT tokens with short expiration times, and protecting sensitive endpoints with authorization checks.

3. **Data Processing and Presentation**: We implemented robust data processing and presentation logic, including error handling, data validation, and proper formatting for display. We also optimized data fetching to minimize latency and improve performance.

### Conclusion:

Overall, working with NASA's APIs in the AstroNexus project was an enriching experience. Despite some initial challenges, we were able to effectively integrate the APIs into our application and provide users with a seamless experience for exploring astronomy-related data and imagery.
