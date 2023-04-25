# Tour Booking Full Stack Project

This is a full stack web application for booking tours. It uses Node.js with Express for the backend, MongoDB for the database, and HTML Pug for the frontend. The application also includes JWT authentication and Stripe for payment processing.

## Requirements

To run this application, you will need the following:

- Node.js installed on your local machine
- MongoDB Atlas account or a local installation of MongoDB
- Stripe account for payment processing

## Installation

1. Clone the repository to your local machine using `git clone`.
2. Navigate to the root directory of the project in your terminal.
3. Install the dependencies by running `npm install`.
4. Create a `.env` file in the root directory of the project and add the following variables:

```
DATABASE_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=your_jwt_expires_in_here
JWT_COOKIE_EXPIRES_IN=your_jwt_cookie_expires_in_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
```

## Usage

To start the application, run `npm start` in your terminal. This will start the server and make the application available at `http://localhost:3000`.

## Features

- User authentication using JWT tokens
- Users can create and manage their accounts
- Users can browse available tours and book them
- Users can manage their booked tours and payments
- Admin users can manage tours and users

## Technologies Used

- Node.js
- Express
- MongoDB
- HTML Pug
- Stripe
- JWT authentication

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. All contributions are welcome!
