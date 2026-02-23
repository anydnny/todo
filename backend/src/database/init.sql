CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$
BEGIN
    CREATE USER app_user WITH PASSWORD 'app_password';
EXCEPTION
    WHEN duplicate_object THEN
        RAISE NOTICE 'User app_user already exists';
END $$;

DO $$
BEGIN
    CREATE DATABASE taskApp OWNER app_user;
EXCEPTION
    WHEN duplicate_database THEN
        RAISE NOTICE 'Database taskApp already exists';
END $$;

\c taskApp;

CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'todo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    project_id VARCHAR(255) NOT NULL,
    is_task_edit BOOLEAN DEFAULT false
);
GRANT ALL PRIVILEGES ON DATABASE taskApp TO app_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO app_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO app_user;
