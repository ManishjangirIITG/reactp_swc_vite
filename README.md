# Vite React Weather Forecast App

This is a simple and user-friendly weather forecast application built with Vite, React, and Tailwind CSS. The app fetches and displays a 5-day weather forecast for any city using the AccuWeather API.

## Features

- Search for a city and fetch its 5-day weather forecast
- Display city name, minimum and maximum temperatures, and weather conditions for each day
- Responsive design with a visually appealing UI
- Graceful error handling for invalid city names and network issues

## Demo
![image](https://github.com/ManishjangirIITG/reactp_swc_vite/assets/121192543/72ee1bd5-dc68-44ca-9c4e-04e64a37f9fc)


## Technologies Used

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (version 6 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/my-weather-app.git
   cd my-weather-app
2. Install the dependencies:

   ```bash
   npm install
3. Create a .env file in the root of the project and add your AccuWeather API key:

   ```bash
   VITE_ACCUWEATHER_API_KEY=your_accuweather_api_key_here

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
2. Open your browser and navigate to http://localhost:3000 to see the app in action.

### Build for Production
  To build the application for production, run:

    ```bash
    npm run build

This will create a dist directory with the production build of the app.

### Project Structure
    ```plaintext
    my-weather-app/
    ├── node_modules/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   └── Weather.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   ├── main.jsx
    ├── .env
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    └── vite.config.js

### API Proxy Configuration
  The Vite development server is configured to proxy API requests to the AccuWeather API. This configuration is set up in vite.config.js:
  
   ```js
         import { defineConfig } from 'vite';
         import react from '@vitejs/plugin-react';
         // https://vitejs.dev/config/
         export default defineConfig({
         plugins: [react()],
          server: {
           proxy: {
           '/api': {
              target: 'http://dataservice.accuweather.com',
               changeOrigin: true,
               rewrite: (path) => path.replace(/^\/api/, ''),
              },
            },   
          },
      });
   ```
### Usage
1. Enter the name of the city you want to search for in the input field.
2. Click the "Fetch Forecast" button to retrieve and display the current weather forecast.
