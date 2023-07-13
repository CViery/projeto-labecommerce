-- Active: 1689074503695@@127.0.0.1@3306
-- Active: 1687994845127@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(20) NOT NULL,
    createdAt TEXT DEFAULT (DATETIME()) NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE products (
    id TEXT UNIQUE NOT NULL,
    name VARCHAR(30) NOT NULL,
    price DOUBLE NOT NULL,
    description VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS purchases (
    id TEXT UNIQUE NOT NULL,
    buyer INT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT (DATETIME()),
    PRIMARY KEY(id),
    Foreign Key (buyer) REFERENCES users(id)
        ON UPDATE CASCADE
	    ON DELETE CASCADE 
);

CREATE TABLE IF NOT EXISTS purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INT NOT NULL,
    Foreign Key (purchase_id) REFERENCES purchases(id)
    Foreign Key (product_id) REFERENCES products(id)
    ON UPDATE CASCADE
	ON DELETE CASCADE 
) ;
DROP TABLE users;
DROP TABLE products;
DROP TABLE purchases;
DROP TABLE purchases_products;

SELECT 
users.name as Cliente,
users.email as EmailCliente,
products.name as Item,
products.price as Valordoitem,
purchases.total_price as ValorTotal,
quantity,
purchases.created_at as DatadaCompra,
purchases.id as Iddecompra
FROM purchases_products
INNER JOIN products ON product_id = products.id
INNER JOIN purchases ON purchase_id = purchases.id 
INNER JOIN users ON purchases.buyer = users.id
WHERE purchases.id = "pur001";

