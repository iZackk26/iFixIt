-- Crear la tabla Owner
CREATE TABLE Owner (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL,
    phone BIGINT
);

-- add dni to Owner
ALTER TABLE Owner ADD COLUMN dni VARCHAR(255);

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

-- add workshop to employee
ALTER TABLE Employee ADD COLUMN workshop VARCHAR(255);

-- Crear el tipo ENUM para el estado de la registration
CREATE TYPE registration_status AS ENUM ('pendiente', 'en proceso', 'completado');

-- Crear la tabla Registration con las nuevas columnas
CREATE TABLE Registration (
    id SERIAL PRIMARY KEY,
    orderNumber VARCHAR(255) NOT NULL,
    ownerID INT,
    employeeID INT,
    vehicleID INT,
    date DATE NOT NULL,
    status registration_status NOT NULL DEFAULT 'pendiente', -- Enum para el estado
    billing BOOLEAN NOT NULL DEFAULT FALSE, -- Si está pagado o no
    price DECIMAL(10, 2), -- Precio asociado con la reparación

    CONSTRAINT fk_owner_registration FOREIGN KEY(ownerID) REFERENCES Owner(id) ON DELETE SET NULL,
    CONSTRAINT fk_employee_registration FOREIGN KEY(employeeID) REFERENCES Employee(id) ON DELETE SET NULL,
    CONSTRAINT fk_vehicle_registration FOREIGN KEY(vehicleID) REFERENCES Vehicle(id) ON DELETE SET NULL
);

ALTER TABLE Registration
ADD COLUMN appointmentAvailable BOOLEAN NOT NULL DEFAULT FALSE, -- Indica si es posible agendar una cita
ADD COLUMN appointmentDate DATE DEFAULT NULL; -- Fecha de la cita, inicialmente vacía



CREATE TABLE RegistrationComments (
    id SERIAL PRIMARY KEY,
    registrationID INT NOT NULL,  -- Relación con la tabla Registration
    comment TEXT NOT NULL,         -- El comentario en sí
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación del comentario

    -- Llave foránea para relacionar con Registration
    CONSTRAINT fk_registration_comments FOREIGN KEY(registrationID) REFERENCES Registration(id) ON DELETE CASCADE
);


CREATE OR REPLACE FUNCTION set_appointment_available()
RETURNS TRIGGER AS $$
BEGIN
  -- Verificar si `price` está siendo actualizado y no es NULL
  IF NEW.price IS NOT NULL AND OLD.price IS DISTINCT FROM NEW.price THEN
    NEW.appointmentAvailable := TRUE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Actualizar el trigger a BEFORE UPDATE
CREATE TRIGGER trigger_set_appointment_available
BEFORE UPDATE OF price ON Registration
FOR EACH ROW
WHEN (NEW.price IS NOT NULL)
EXECUTE FUNCTION set_appointment_available();

