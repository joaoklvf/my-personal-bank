CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE category (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_description VARCHAR(50) NOT NULL,
    category_color VARCHAR(7) NOT NULL,
    category_background_color VARCHAR(7) NOT NULL
);
CREATE TABLE wallet (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_description VARCHAR(50) NOT NULL,
    wallet_color VARCHAR(7) NOT NULL,
    wallet_background_color VARCHAR(7) NOT NULL
);
CREATE TABLE payment_status (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_status_description VARCHAR(50) NOT NULL
);
CREATE TABLE installment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    installment_number INT NOT NULL,
    installment_date DATE NOT NULL,
    payment_status_id UUID NOT NULL REFERENCES payment_status(id),
    movement_id UUID NOT NULL REFERENCES movement(id)
);
CREATE TABLE movement (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    movement_description VARCHAR(50) NOT NULL,
    movement_date DATE NOT NULL,
    category_id UUID NOT NULL REFERENCES category(id),
    wallet_id UUID NOT NULL REFERENCES wallet(id),
    amount NUMERIC(12, 2) NOT NULL
);