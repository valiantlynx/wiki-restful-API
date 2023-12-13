# Node.js Wiki Project

## Overview

This Node.js project creates a simple RESTful API for a wiki-style content management system. It uses Express.js for server-side operations, EJS for templating, and MongoDB with Mongoose for database interactions.

## Features

- **CRUD Operations**: Supports Create, Read, Update, and Delete operations on articles.
- **MongoDB Integration**: Uses Mongoose to interact with a MongoDB database.
- **RESTful API Design**: Offers a clean, RESTful API for handling articles.

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. Clone the repository to your local machine.
2. Install the dependencies:
   ```bash
   npm install
    ```

### Running the Application

1. Start the server:
   ```
   node app.js
   ```

2. Access the API at `http://localhost:3000/`.

## API Endpoints

### `/articles`

- `GET`: Fetch all articles.
- `POST`: Add a new article.
- `DELETE`: Delete all articles.

### `/articles/:ArticleTitle`

- `GET`: Fetch a specific article by title.
- `PUT`: Update an article by replacing it entirely.
- `PATCH`: Update parts of an article.
- `DELETE`: Delete a specific article by title.

## Models

### Article

- **title**: `String` - The title of the article.
- **content**: `String` - The content of the article.

## Contributing

Contributions to improve the project are welcome. Please follow the standard fork-and-pull request workflow.

## License

This project is open-sourced under the [MIT License](LICENSE.md).

