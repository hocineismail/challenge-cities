# Solution: [#Demo](https://deploy-dev--famous-palmier-e79f2f.netlify.app/)

<div style="display: flex; flex-direction: row;">
  <img src="https://github.com/hocineismail/challenge-cities-card/blob/main/examples/example_1.png?raw=true" alt="Example 1" width="400" />
  <img src="https://github.com/hocineismail/challenge-cities-card/blob/main/examples/example-2.png?raw=true" alt="Example 2" width="400" />
</div>
## Features

1. **Technology Stack:**

   Backend:

   - [x] Node.Js Express.Js
   - [x] Tests: Jest
   - [x] Typescript

   Frontend:

   - [x] React
   - [x] Tests: Jest + React-library-testing + cypress
   - [x] Typescript

2. **Displaying Cities:**

   - The frontend fetches cities data from the backend and displays it

3. **City Details in a Modal:**

   - When the user clicks on the "Details" button on a city card, a modal opens, showing the location using OpenMapmore and information about the city.

4. **API Endpoint:**

   - The backend exposes an API endpoint to return cities data in JSON format.

5. **Services and Controllers Architecture:**

   - The application follows a well-structured architecture using services and controllers to organize code logically, promoting maintainability and separation of concerns.

6. **Decorator for Route Configuration:**

   - Implemented decorators to simplify and streamline route configuration.
   - `@controller("/cities")`: A decorator used to define the base path for the cities-related routes.
   - `@GET("/")`: A decorator used to specify the HTTP method and relative path for the route that retrieves cities.

7. **Logger Middleware:**
   - Created a logger middleware to log request details to the console.
   - The logger middleware captures and displays important information about incoming requests, helping in debugging and monitoring.
     example:
     ![alt text](https://github.com/hocineismail/challenge-cities-card/blob/main/examples/logger.png?raw=true)

# ✔️ Pre-requisites

- Install [Node.js](https://nodejs.org/en/)

To run program, run the following command.

# Setup and Usage

1. Clone the repository: `git clone https://github.com/hocineismail/challenge-cities-card.git`

## 🔨 Running Code (backend)

To run program, run the following command.

1. Use the terminal to execute the following commands:
   - Use `cd ottonova-backend` to navigate to the "ottonova-backend" directory where the backend code is located
   - Use `npm install` or `yarn install` to install the dependencies for the Backend.
   - Use`npm start` or `npm start:nodemon`to start the the application

### 🔨 Running Test

1. To run tests, run the following command.

```bash
  npm run test
```

## 🔨 Running Code (frontend)

To run program, run the following command.

1. Use the terminal to execute the following commands:

   - Use `cd ottonova-backend` to navigate to the "ottonova-frontend" directory where the frontend code is located
   - Use `npm install` or `yarn install` to install the dependencies for the React application.
   - Use`npm start` or `yarn start`to run the application

1. Open your browser on `http://localhost:3000` to see the page

### 🔨 Running Test

1. To run tests, run the following command.

```bash
  npm run test
```

## API Endpoints

- **GET /api/v1/cities**: Returns cities data in JSON format.

## 🌐 Links

- [Deployed] [DEMO](https://deploy-dev--famous-palmier-e79f2f.netlify.app/)

## Author

- [@Ismail Hocine](https://github.com/hocineismail)
