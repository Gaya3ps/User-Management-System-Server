# User Management Dashboard (Server)

This is the **FeathersJS backend** for the User Management Dashboard.  
It exposes REST endpoints for managing users stored in a **PostgreSQL** database with **Knex migrations**.

---

## 🚀 Features
- Node.js + FeathersJS framework
- PostgreSQL with Knex migrations
- RESTful endpoints 
- Soft delete using `deleted` field
- Configurable via `.env`

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Gaya3ps/user-management-server.git
cd user-management-server

```
Install dependencies:

npm install

⚙️ Configuration

Create a .env file in the root directory:

Server config:

PORT=5000

Database config (using connection string):

DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/feathers_users

🗂️ Database Setup

1.Make sure PostgreSQL is running.

2.Create the database manually:

CREATE DATABASE feathers_users;

3.Run migrations:

npm run migrate

Check migration status:

npm run migrate:status

Rollback if needed:

npm run rollback


✅ The users table is created via migrations:
migrations/20250820074620_create_users_table.js

▶️ Running Locally
Start the development server with nodemon:

npm run dev

Or start normally:

npm start

The API will be available at:

👉 http://localhost:3030

🔑 Notes:

Soft delete is implemented by setting deleted = true instead of removing rows.

The users table is created via migrations:
migrations/20250820074620_create_users_table.js

Migrations are managed via Knex.js.

