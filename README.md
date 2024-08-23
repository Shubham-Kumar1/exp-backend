# Project Name: Experience

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)

## Description

This application provides a platform for users to share comprehensive reviews about their experiences with various companies. Users can post feedback on multiple aspects, such as work culture, remote work options, the friendliness of the environment, opportunities for learning and growth, and compensation details (CTC). The goal is to create a community where individuals can share valuable insights and help others make informed career decisions.

## Features

- **User Registration and Authentication**: Secure and easy registration and login for both employers and job seekers.
- **Company Reviews**: Users can share detailed reviews about companies, covering aspects like work culture, remote work options, environment friendliness, learning and growth opportunities, and compensation (CTC).
- **Post Management**: Users can create, update, and delete posts about their job experiences and company reviews.
- **Browse and Search**: Easily browse all shared posts and search for specific posts by ID.
- **User Profile Management**:  Manage user profiles, including password resets and updates to personal information.

## Technologies

- **Web-app**: TypeScript, NodeJS
- **Database**: Prisma ORM, Postgres
- **Containerization**: Docker

## Getting Started

To get started with the Experience app, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/Shubham-Kumar1/exp-backend.git
   ```

Follow these steps to set up the repository locally and run it.

### Configuration

1. Create a `.env` file in the root folder of your project. Update it following the convention of the `.env.example` file. Here's an example:

   ```bash
   DATABASE_URL="postgres://<username>:<password>@<localhost>:5432/postgres"
   PORT=""
   JWT_SECRET="5SjH50Qcc2u98AKJINefFlVGV3uqeLT8cdlR2ACsglu2"
   ```

2. To generate AUTH_SECRET,

   Run this command in your terminal:

   ```bash
   openssl rand -base64 33
   ```

   or

   [Run in browser](https://www.cryptool.org/en/cto/openssl/)

### Running the Project without Docker

1. Install the necessary dependencies:

   ```bash
   npm install
   ```

2. Set up your environment variables:

3. Generate Prisma Client:
    ```bash
    npx prisma generate
   ```

4. Run Prisma Migrations:
    ```bash
    npx prisma migrate dev
   ```
   
5. Start the development server:

   ```bash
   npm run dev
   ```

Now, you can run the project and make changes as needed.

### Running the Project with Docker

```bash
COMING SOON
```