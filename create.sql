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

CREATE TABLE app.ride (
	ride_id VARCHAR(255),
	passenger_id VARCHAR(255),
	driver_id VARCHAR(255),
	status TEXT NOT NULL,
	fare NUMERIC NOT NULL,
	distance NUMERIC NOT NULL,
	from_lat NUMERIC NOT NULL,
	from_long NUMERIC NOT NULL,
	to_lat NUMERIC NOT NULL,
	to_long NUMERIC NOT NULL,
	date TIMESTAMP NOT NULL,
	--
	PRIMARY KEY (ride_id),
	FOREIGN KEY (passenger_id) REFERENCES app.account(account_id) ON UPDATE cascade,
	FOREIGN KEY (driver_id) REFERENCES app.account(account_id) ON UPDATE cascade
);