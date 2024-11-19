# Store Inventory

This project is a store inventory management system built with Laravel and Docker.

# Installation

Follow the steps below to set up and run the project locally.

# 1. Clone the Repository

Open your WSL editor (or any preferred terminal/IDE) and clone the repository:

git clone https://github.com/MARTKJASON/store-inventory.git

# 2. Set Up Your Container

Navigate to the project directory:

Build and start the Docker container

docker-compose up --build

This will build the Docker images and start the containers for your Laravel app and MySQL database.

# 3. Start the Containers

Once the containers are built, start them with the following command:

docker-compose start

# 4. Set Up Your Environment File

Copy the .env.example file to .env:

DB_CONNECTION=mysql
DB_HOST=laravel_db
DB_PORT=3306
DB_DATABASE=system-inventory
DB_USERNAME=mark
DB_PASSWORD=mark

# 5. Run Migrations and Seed the Database

Now that your environment is set up, run the following commands to migrate the database and seed it with sample data:

docker-compose exec app php artisan migrate:fresh --seed
This will:

Drop all existing tables.
Run the migrations to create the necessary tables.
Seed the database with sample data. 6. Access the Application
Once the application is running, you can access it through your browser at:

http://localhost

# 7. Additional Commands

-   Stop containers:

    -   docker-compose down

-   Restart containers:
    -   docker-compose restart

Notes

Ensure you have Docker and Docker Compose installed on your machine before following these instructions.

This project uses WSL (Windows Subsystem for Linux) and assumes you're working in a Linux environment. Make sure to install WSL if you're running on Windows.
The default database credentials in .env are configured for the mark user, but you can modify them as needed.
