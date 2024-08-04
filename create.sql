DROP SCHEMA IF EXISTS app cascade;

CREATE SCHEMA app;

CREATE TABLE app.account (
	account_id VARCHAR(255) PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT NOT NULL,
	password TEXT NOT NULL,
	cpf TEXT NOT NULL,
	car_plate TEXT null,
	is_passenger BOOLEAN NOT NULL DEFAULT false,
	is_driver BOOLEAN NOT NULL DEFAULT false,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);