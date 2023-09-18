CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    available BOOLEAN DEFAULT TRUE
);

CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY, 
    client_name VARCHAR(255) NOT NULL, 
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE current_book_loans (
    loan_id SERIAL PRIMARY KEY,
    client_id INT REFERENCES clients(client_id),
    book_id INT REFERENCES books(book_id),
    loan_date DATE NOT NULL,
    due_date DATE NOT NULL,
);

-- Sample data for the books table
INSERT INTO books (title, available) VALUES
    ('The Great Gatsby', TRUE),
    ('To Kill a Mockingbird', TRUE),
    ('1984', TRUE),
    ('Pride and Prejudice', TRUE),
    ('The Catcher in the Rye', TRUE),
    ('The Hobbit', TRUE),
    ('Brave New World', TRUE),
    ('The Lord of the Rings', TRUE),
    ('Moby-Dick', TRUE),
    ('War and Peace', TRUE);

-- Sample data for the clients table
INSERT INTO clients (client_name, email) VALUES
    ('John Smith', 'john.smith@example.com'),
    ('Jane Doe', 'jane.doe@example.com'),
    ('Alice Johnson', 'alice.johnson@example.com'),
    ('Bob Wilson', 'bob.wilson@example.com'),
    ('Eva Brown', 'eva.brown@example.com');

-- Sample data for the current_book_loans table
INSERT INTO current_book_loans (client_id, book_id, loan_date, due_date) VALUES
    (1, 6, '2023-09-18', '2023-10-02'),
    (2, 7, '2023-09-18', '2023-10-02'),
    (3, 8, '2023-09-18', '2023-10-02'),
    (4, 9, '2023-09-18', '2023-10-02');