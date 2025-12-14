-- File: database_setup.sql

-- Create database
CREATE DATABASE IF NOT EXISTS da_aloo_orders;
USE da_aloo_orders;

-- Outlets table
CREATE TABLE outlets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample outlets (modify with your actual outlets)
INSERT INTO outlets (name, address, latitude, longitude, phone) VALUES
('Da Aloo - Patan', 'Patan, Lalitpur', 27.6780, 85.3250, '9779847695529'),
('Da Aloo - Kathmandu', 'Kathmandu Center', 27.7000, 85.3000, '9779847375984'),
('Da Aloo - Baneshwor', 'Baneshwor, Kathmandu', 27.6905, 85.3420, '9779847000001');

-- Orders table
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(20) UNIQUE,
    customer_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    outlet_id INT,
    assigned_outlet_id INT,
    items TEXT NOT NULL, -- JSON format
    subtotal DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_type ENUM('cash', 'online') DEFAULT 'cash',
    status ENUM('pending', 'accepted', 'preparing', 'ready', 'delivered', 'cancelled') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (outlet_id) REFERENCES outlets(id),
    FOREIGN KEY (assigned_outlet_id) REFERENCES outlets(id)
);

-- Users table for admin/outlet login
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    outlet_id INT,
    user_type ENUM('admin', 'outlet') DEFAULT 'outlet',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (outlet_id) REFERENCES outlets(id)
);

-- Insert admin user (username: admin, password: admin123)
INSERT INTO users (username, password, user_type) VALUES
('admin', '$2y$10$YourHashedPasswordHere', 'admin');

-- Note: Use password_hash('admin123', PASSWORD_DEFAULT) to generate hash