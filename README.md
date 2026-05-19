# UniFind

UniFind is a campus lost-and-found platform that helps students and staff report missing belongings, list items they've found, and reconnect owners with their property. Built as a modern single-page application on Laravel with a React frontend via Inertia.js.

## Features

- **Lost item reports** — Post details, location, date, optional reward, photo, and category
- **Found item reports** — List items you've picked up with location, date, and contact info
- **Browse & search** — Explore lost and found listings with category filters and search
- **Claims** — Authenticated users can claim found items; owners can unclaim their claims
- **My Reports** — Signed-in users see all lost and found reports they've submitted
- **Status tracking** — Lost items (`pending`, `resolved`) and found items (`unclaimed`, `claimed`, `returned`)
- **Admin dashboard** — Platform stats, user management, and oversight of all reports (admin-only)
- **Authentication** — Registration, login, password reset, and email verification (Laravel Breeze-style)
- **Responsive UI** — React 19, Tailwind CSS 4, and shadcn/ui components with light/dark mode

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Backend  | PHP 8.2+, Laravel 12                |
| Frontend | React 19, TypeScript, Inertia.js v2 |
| Styling  | Tailwind CSS 4, shadcn/ui, Radix UI |
| Build    | Vite 7                              |
| Database | MySQL                               |
| Testing  | Pest PHP                            |

## Prerequisites

- [PHP](https://www.php.net/) 8.2 or higher with extensions: `pdo`, `sqlite` (or `mysql`), `mbstring`, `openssl`, `fileinfo`
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) 22+ and npm
- [Git](https://git-scm.com/)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd UniFind
```

### 2. Install dependencies

```bash
composer install
npm install
```

### 3. Environment setup

```bash
cp .env.example .env
php artisan key:generate
```

By default, the app uses SQLite. Create the database file if it does not exist:

```bash
touch database/database.sqlite
```

To use MySQL instead, update `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=unifind
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Run migrations and seed categories

```bash
php artisan migrate
php artisan db:seed --class=CategorySeeder
```

Categories include IDs, electronics, bags, clothing, keys, and more.

### 5. Link storage for item photos

```bash
php artisan storage:link
```

Uploaded images are stored in `storage/app/public` and served from `/storage`.

### 6. Start the development servers

**Option A — single command (recommended):**

```bash
composer run dev
```

This runs the Laravel server, queue worker, and Vite dev server concurrently.

**Option B — separate terminals:**

```bash
php artisan serve
npm run dev
```

Visit [http://localhost:8000](http://localhost:8000).

## Creating an Admin User

Admin routes are protected by the `admin` middleware (`is_admin` flag on the user model). After registering a user, promote them in the database:

```bash
php artisan tinker
```

```php
\App\Models\User::where('email', 'you@example.com')->update(['is_admin' => true]);
```

Admins can access `/admin-dashboard` to view platform statistics, manage users, and review all lost/found reports.

## Project Structure

```
app/
├── Http/Controllers/     # API & page controllers (LostItem, FoundItem, Claim, Admin, etc.)
├── Http/Middleware/      # Admin gate, Inertia shared data, appearance
└── Models/               # User, LostItem, FoundItem, Claim, Category

resources/js/
├── pages/                # Inertia page components
│   ├── home/             # Landing page with stats & search
│   ├── lost-items/       # Lost item CRUD & listings
│   ├── found-items/      # Found item CRUD & listings
│   ├── my-reports/       # User's own reports
│   ├── admin-dashboard/  # Admin panel
│   └── auth/             # Login, register, password flows
├── components/           # Reusable UI (SearchBar, ItemCard, shadcn/ui)
└── layouts/              # App, auth, and settings layouts

database/
├── migrations/           # Schema for users, items, claims, categories
└── seeders/              # CategorySeeder
```

## Available Scripts

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `composer run dev`  | Start Laravel, queue, and Vite |
| `composer run test` | Run Pest test suite            |
| `npm run dev`       | Vite development server        |
| `npm run build`     | Production frontend build      |
| `npm run lint`      | ESLint with auto-fix           |
| `npm run format`    | Prettier format `resources/`   |
| `vendor/bin/pint`   | Laravel Pint (PHP code style)  |

## Item Status Reference

**Lost items**

| Status     | Meaning                  |
| ---------- | ------------------------ |
| `pending`  | Still reported as lost   |
| `resolved` | Owner confirmed recovery |

**Found items**

| Status      | Meaning                        |
| ----------- | ------------------------------ |
| `unclaimed` | Available for someone to claim |
| `claimed`   | A user has submitted a claim   |
| `returned`  | Returned to the rightful owner |

## CI

GitHub Actions workflows run on pushes and pull requests to `main` and `develop`:

- **tests** — Installs dependencies, builds assets, runs Pest
- **linter** — Laravel Pint, Prettier, and ESLint

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
