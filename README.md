# Library Management System

## Overview

This project is a Library Management System built using React for the frontend and Node.js with MySQL for the backend. It includes functionalities for adding, deleting, issuing, and returning books, as well as user login.

## Features

- **Add Books**: Add new books to the library database with default status set to 'available'.
- **Delete Books**: Remove books from the library, with restrictions on deleting occupied books. Updates availability status in the `books_issued` table.
- **Issue Books**: Issue books to users, update the book's status to 'occupied', and track the issued books in the `books_issued` table.
- **Return Books**: Return issued books, update their status to 'available', and make them available for reissue.
- **View Books**: View the list of all books with their current statuses.
- **User Login**: Simple login system with JWT authentication.

## Technologies Used

- **Frontend**: React, CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JSON Web Tokens (JWT)
- **API Requests**: Axios

## Installation

### Prerequisites

- Node.js and npm installed
- MySQL server running

### Frontend

1. Navigate to the `frontend` directory.
2. Install the dependencies:

    ```bash
    cd frontend
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

### Backend

1. Navigate to the `backend` directory.
2. Install the dependencies:

    ```bash
    cd backend
    npm install
    ```

3. Start the server:

    ```bash
    node index.js
    ```

### Database Setup

1. Import the provided SQL schema file to create the necessary tables in your MySQL database.
2. Ensure that the `books` and `books_issued` tables are set up as described in the project.

## API Endpoints

- **POST /login**: Authenticate user and return a JWT token.
- **POST /add**: Add a new book to the library.
- **DELETE /delete**: Delete a book from the library.
- **GET /view**: Retrieve all books.
- **POST /issue**: Issue a book to a user.
- **POST /return**: Return a book and update its availability.

## Frontend Details

The frontend is a React application with components for adding, deleting, issuing, and returning books. It includes:
- **Add Book Form**: Form to add new books.
- **Return Book Form**: Form to return books.
- **View Books Table**: Table displaying the list of books with their statuses.
  
![Frontend Screenshot](https://drive.google.com/uc?export=view&id=1HDmHDVE2L910BF5BOC4s_tTA_dRE8SvW)

## Error Handling

- **Invalid Credentials**: Shows an error message when login credentials are invalid.
- **Book Status Management**: Ensures proper handling of book statuses when books are added, issued, returned, or deleted.

## Contributing

Feel free to fork the repository and submit pull requests. For any issues or feature requests, please create a new issue in the repository.
