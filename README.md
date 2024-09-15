# movie-library-web-app

## Objective

The goal of create an interactive movie library application using React Router for navigation, React Hooks for managing state and side effects, and performance optimization techniques to ensure a smooth user experience.

## Features

1. **Home Page**:

   - View a list of movies.
   - Filter movies by genre and search by name.
   - Navigate to detailed movie information.

2. **Movie Details Page**:

   - View detailed information about a selected movie.
   - Add or remove the movie from the "Favorites" list.

3. **Favorites Page**:

   - View a list of favorite movies.
   - Remove movies from the favorites list.

4. **Navigation**:
   - Use React Router for navigation between pages.

## Technology Stack

- React: For building the user interface.
- React Router: For handling navigation.
- React Hooks: For managing state and side effects.
- React.memo: For optimizing component re-renders.
- useMemo: For memoizing expensive computations.
- React.lazy and Suspense: For code-splitting and dynamic imports.
- API: Movies load from https://www.themoviedb.org/

## Setup and Installation

### Prerequisites

- VS Code, Node.js and npm (or Yarn) installed on your machine.

### Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/amila-sampath/movie-library-web-app.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd movie-library-web-app
   ```

3. **Install dependencies:**
   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

### Running the Application

1. **Start the development server:**
   Using npm:

   ```bash
   npm start
   ```

   Or using Yarn:

   ```bash
   yarn start
   ```

2. If not auto open, then Open your browser and go to [http://localhost:3000] to view the application.
