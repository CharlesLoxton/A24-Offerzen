# A24 Group Offerzen Assessment API

This repository contains the Express.js API built for the A24 Group Offerzen Assessment by Charles Loxton. The API provides functionality to shorten URLs and retrieve the original URLs using the shortened versions.

## Features

- Shorten URLs via a REST API
- Retrieve original URLs from shortened versions

## Routes

The API supports two main routes:

1. **POST /short** - For shortening URLs
2. **GET /:url** - For retrieving the original URL using the shortened version

## Environment Variables

Before running the application, ensure you have the following environment variables configured:

- `PORT=3000` - The port number on which the API will run.
- `DB_CONNECT=<your_mongodb_uri>` - Your MongoDB connection URI.
- `DOMAIN=http://localhost:3000/` - The domain of your API.

## Getting Started

To use this API, you will need to send requests to its routes as described below:

### Shortening a URL

- **Endpoint:** `POST /short`
- **Body:** JSON object containing `original_url` field.
    - Example: `{"original_url": "https://example.com"}`

**Response:**

- If successful, returns a JSON object with `original_url` and the `short_url`.
    - Example response: `{"original_url": "https://example.com", "short_url": "http://localhost:3000/abc123"}`
- If `original_url` is not provided or invalid, returns an error message.

### Retrieving the Original URL

- **Endpoint:** `GET /:url`
- **Parameter:** `url` is the shortened part of the URL you wish to expand.

**Response:**

- If successful, redirects to the original URL.
- If the shortened URL does not exist or is not provided, returns an error message.

## Error Handling

- **400 Bad Request:** Returned when the input does not meet the requirements (missing URL, invalid URL format).
- **404 Not Found:** Returned when a shortened URL does not exist.
- **500 Internal Server Error:** Returned when an unexpected error occurs on the server.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies by running `npm install`.
3. Set up your environment variables as per the "Environment Variables" section.
4. Start the server using `npm start`.

## Dependencies

- Express.js: For handling server requests and responses.
- Mongoose: For database interactions with MongoDB.
- dotenv: For managing environment variables.

Make sure to replace `<your_mongodb_uri>` with your actual MongoDB URI in the `.env` file.

Enjoy using the API for your URL shortening needs!
