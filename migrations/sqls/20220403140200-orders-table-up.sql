CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE cascade,
    status VARCHAR(30)
);