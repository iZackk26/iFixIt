-- Crear la tabla Owner
CREATE TABLE Owner (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL,
    phone BIGINT
);

-- Crear la tabla Vehicle
CREATE TABLE Vehicle (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    licensePlate VARCHAR(255) NOT NULL,
    ownerID INT,
    CONSTRAINT fk_owner FOREIGN KEY(ownerID) REFERENCES Owner(id) ON DELETE SET NULL
);

-- Crear la tabla Employee
CREATE TABLE Employee (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL,
    phone BIGINT,
    position VARCHAR(255),
    password VARCHAR(255)
);

-- Crear la tabla Registration
CREATE TABLE Registration (
    id SERIAL PRIMARY KEY,
    orderNumber VARCHAR(255) NOT NULL,
    ownerID INT,
    employeeID INT,
    vehicleID INT,
    date DATE NOT NULL,
    CONSTRAINT fk_owner_registration FOREIGN KEY(ownerID) REFERENCES Owner(id) ON DELETE SET NULL,
    CONSTRAINT fk_employee_registration FOREIGN KEY(employeeID) REFERENCES Employee(id) ON DELETE SET NULL,
    CONSTRAINT fk_vehicle_registration FOREIGN KEY(vehicleID) REFERENCES Vehicle(id) ON DELETE SET NULL
);
