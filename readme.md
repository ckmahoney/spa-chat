# Node.js Chat Application

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Description

This is a chat application built with Node.js. It utilizes various security features, including JWT authentication, rate limiting, and secure communications.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [License](#license)

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- MySQL

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/nodejs-chat-app.git

    Navigate to the project directory:

    shell

cd nodejs-chat-app

Install dependencies:

shell

npm install

Set up the database:

    Create a MySQL database.
    Update the database configuration in config.js with your database credentials.

Configure environment variables:

    Create a .env file in the root directory.

    Set the following environment variables in the .env file:

    env

DB_HOST=<your-database-host>
DB_USER=<your-database-username>
DB_PASSWORD=<your-database-password>
DB_DATABASE=<your-database-name>
ACCESS_TOKEN_SECRET=<your-access-token-secret>
REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
