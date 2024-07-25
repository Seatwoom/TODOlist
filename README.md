# React To-Do List with Cat Cards

## Project Overview

This site is a React that combines a to-do list with the function of displaying random cat cards pulled from the API. The application includes user registration and login, session management, and the ability to save to-do lists and cat cards for each user in PostgreSQL. The backend is built on Express.js.

## Features

- **To-Do List:**
- **Cat Cards:**
- **User Authentication:**
- **Session Timeout:**
- **Adaptive design**

## How to start?

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/Seatwoom/TODOlist
   cd todo-list
   ```

2. **Install dependencies**

   ```
   # Frontend
   cd client
   npm install

   # Backend
   cd ../server
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `server` directory and add the following variables:

   ```env
   PORT=5000
   DB_HOST=host
   DB_USER=username
   DB_PASSWORD=password
   DB_NAME=db_name
   JWT_SECRET=secret_key
   ```

4. **Start the backend server:**

   ```bash
   cd server
   node server.js
   ```

5. **Start the frontend development server:**

   ```bash
   cd ../client
   npm run start
   ```

## Usage

1. **Register a new user:**

   Go to `http://localhost:3000/register` and create a new account.

2. **Login:**

   Go to `http://localhost:3000/login` and log in with your credentials.

3. **To-Do List:**

   - Add tasks
   - Edit tasks
   - Mark completed tasks
   - Delete unnecessary or completed items

4. **Cat Cards:**

   - View random cat cards.
   - Click the "Random" button to fetch a new set of cat cards.
   - Click on a cat card to view detailed information about the breed.

## Project Structure

- **client:** Contains the React frontend code.
- **server:** Contains the Express.js backend code.
- **.env:** Environment variables for configuring the application.

## API Endpoints

### Authentication

- `POST /api/register`: Register a new user.
- `POST /api/login`: Log in and receive a JWT token.

### To-Do List

- `GET /api/todos`: Get the current user's to-do list.
- `POST /api/todos`: Add a new task.
- `PUT /api/todos/:id`: Edit a task.
- `DELETE /api/todos/:id`: Delete a task.

### Cat Cards

- `GET /api/cats`: Get the current user's saved cat cards.
- `POST /api/cats`: Save a new set of cat cards.

## Your suggestions

If you want to make your own changes, create a repository and submit a pull request.
