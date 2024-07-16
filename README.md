# Number Processing App

This application allows users to input a number between 1 and 25, multiplies the number by 7, and categorizes the result into different files based on its value. It also includes APIs to list all processed numbers and delete all entries.

## Prerequisites

- Node.js (v14.x or higher)
- PostgreSQL (v12.x or higher)
- npm (v6.x or higher)

## Setup

### Step 1: Clone the Repository


git clone <repository_url>
cd <repository_directory>

### Step 2: Install the dependencies

npm install 

### Step 3: Set up the DB and Create table

CREATE TABLE numbers (
    id SERIAL PRIMARY KEY,
    input_number INTEGER NOT NULL,
    multiplied_number INTEGER NOT NULL,
    file CHAR(1) NOT NULL
);

### Step 4: Set Up Environment Variables

- PGUSER=your_postgres_user
- PGHOST=your_postgres_host
- PGDATABASE=your_database_name
- PGPASSWORD=your_postgres_password
- PGPORT=your_postgres_port
- PORT=3000

### Step 5: Run the application

npm run dev
