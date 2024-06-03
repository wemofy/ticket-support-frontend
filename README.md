# Ticketly Frontend Documentation

This documentation provides an overview of the Ticketly Frontend project, including setup, environment variables, and commands to build, run, and start the project.

## Overview

Ticketly Frontend is a React-based application that serves as the user interface for the Ticketly ticket management system. It allows users to view, manage, and update tickets, as well as interact with other users through ticket assignments and messaging.

## Prerequisites

Before you start, make sure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn (v1.22 or higher)

## Setup

1. **Clone the Repository**

   ```sh
   git clone https://github.com/your-username/ticketly-frontend.git
   cd ticketly-frontend
   ```

2. **Install Dependencies**

   Using npm:

   ```sh
   npm install
   ```

   Using yarn:

   ```sh
   yarn install
   ```

## Environment Variables

The application requires a base URL for the backend API. Create a `.env` file in the root directory of the project and add the following environment variable:

```sh
REACT_APP_BASE_URL=http://your-backend-url.com
```

Replace `http://your-backend-url.com` with the actual URL of your backend API.

## Scripts

### Start the Development Server

To start the development server, run the following command:

Using npm:

```sh
npm start
```

Using yarn:

```sh
yarn start
```

This will start the application in development mode and open it in your default web browser. The development server will reload whenever you make changes to the code.

### Build the Project

To create an optimized production build of the project, run the following command:

Using npm:

```sh
npm run build
```

Using yarn:

```sh
yarn build
```

This will generate the production-ready files in the `build` directory. You can then deploy these files to your web server.


### Lint the Code

To lint the code and ensure it follows the project's coding standards, run:

Using npm:

```sh
npm run lint
```

Using yarn:

```sh
yarn lint
```

This will check the code for any linting errors and report them in the console.

## Project Structure

The project structure is organized as follows:

```
ticketly-frontend/
├── public/             # Public assets and index.html
├── src/                # Source code
│   ├── assets/         # Static assets (images, fonts, etc.)
│   ├── components/     # Reusable components
│   ├── context/        # Context providers and hooks
│   ├── hooks/          # Custom hooks
│   ├── views/          # Page components
│   ├── App.js          # Main application component
│   ├── index.js        # Entry point of the application
│   ├── routes.js       # Application routes
│   └── styles/         # Global styles
├── .env                # Environment variables
├── package.json        # Project configuration and dependencies
└── README.md           # Project documentation
```

## Key Features

- **Ticket Management**: View, create, update, and delete tickets.
- **User Management**: Assign tickets to users and update ticket statuses.
- **Messaging**: Send and receive messages related to tickets.
- **Responsive Design**: Optimized for desktop and mobile devices.

