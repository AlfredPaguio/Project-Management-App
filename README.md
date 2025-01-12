<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

# Project Management System

This is a project management web application built with Laravel, React, TypeScript, and TailwindCSS. It allows users to manage projects, tasks, and user permissions.

## Features

-   **Project Management**: Create, update, and manage projects with a due date and status.
-   **Task Management**: Create, assign, update, and filter tasks within projects.
-   **User Management**: Create and manage users, edit profile information, assign roles, and control permissions.
-   **Role and Permission Based Access Control**: Different roles and permissions with different access levels to manage tasks and projects.
-   **Search and Filter**: Search and filter projects, tasks, roles, and permissions based on various criteria.
-   **Dashboard Overview**: Display key metrics and summary information on the dashboard.

## Tech Stack

-   **Back-end**: [Laravel 11 (PHP)](https://laravel.com)
-   **Middle-end 🤔?**: [Inertia.js v2](https://inertiajs.com/)
-   **Front-end**: [React 18](https://18.react.dev/), [TypeScript](https://www.typescriptlang.org/)
    -   **UI**: [TailwindCSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
    -   **shadcn/ui** included those:
        -   [Recharts](https://recharts.org/) for data visualization
        -   [@tanstack/react-table](https://tanstack.com/table/latest/docs/introduction) for table management
        -   [React Hook Form](https://react-hook-form.com/) for form handling
        -   [Zod](https://zod.dev/) for schema validation
    -   **Icons**: [Lucide](https://lucide.dev/guide/packages/lucide-react)
-   **Database**: [SQLite](https://www.sqlite.org/) for the database
-   **Authentication**: [Laravel Breeze](https://github.com/laravel/breeze) for authentication, [spatie/laravel-permission](https://spatie.be/docs/laravel-permission/v6/introduction) for role/permission-based access control.
-   **Development Tools**:
    -   [barryvdh/laravel-debugbar](https://github.com/barryvdh/laravel-debugbar) (for debugging during development)
-   **Image Provider**: [Picsum](https://picsum.photos/)

## Installation

### Prerequisites

-   PHP >= 8.1
-   Composer
-   Node.js and npm/yarn
-   MySQL or SQLite
-   Laravel 11.x
-   React 18.x

### Steps to Set Up

1. Clone the repository:

    ```bash
    git clone https://github.com/AlfredPaguio/Project-Management-App.git
    ```

2. Navigate to the project's root directory:

    ```bash
    cd Project-Management-App
    ```

3. Install backend dependencies:

    ```bash
    composer install
    ```

4. Set up your `.env` file by copying from `.env.example`:

    ```bash
    cp .env.example .env
    ```

5. Generate the application key:

    ```bash
    php artisan key:generate
    ```

6. Run migrations and seed the database:

    ```bash
    php artisan migrate --seed
    ```

    This will create the necessary tables and insert the default data.

7. Install frontend dependencies:

    ```bash
    npm install
    ```

8. Compile frontend assets:

    ```bash
    npm run dev
    ```

9. Start the development server:
    ```bash
    php artisan serve
    ```

### Running Tests

To run tests for the backend:

```bash
php artisan test
```

For the frontend (React):

```bash
npm run test
```

## Usage

1. **Authentication**: Sign up and log in to the app using Laravel Breeze for authentication.
2. **Roles and Permissions**: Assign roles and permissions to users to control access to projects and tasks.
3. **Projects and Tasks**: Create projects, assign tasks, and manage their status and deadlines.

## Environment Configuration

The application uses the `.env` file for environment configuration. Ensure you set up the following:

-   **Database Configuration**:

    -   `DB_CONNECTION=mysql` or `DB_CONNECTION=sqlite`
    -   `DB_HOST=127.0.0.1`
    -   `DB_PORT=3306`
    -   `DB_DATABASE=your_database_name`
    -   `DB_USERNAME=your_database_username`
    -   `DB_PASSWORD=your_database_password`

-   **Mail Configuration**: Set up mailer settings if needed for notifications.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
