INSERT INTO products VALUES
    (1,'Hamburguesa Simple', 'Una hamburguesa simple, para una persona simple', 500,['www.imagen.com'], 20, now(), now()),
    (2,'Hamburguesa Doble', 'Una hamburguesa y ya no se que poner', 600, 'www.imagen.com', 0, now(), now()),
    (3,'Hamburguesa Triple', 'Una hamburguesa que triplica tu felicidad', 700, ['www.imagen.com'], 20, now(), now()),
    (4,'Hamburguesa Bacon', 'Una hamburguesa con extra bacon', 750, ['www.imagen.com'], 20, now(), now()),
    (5,'Hamburguesa Cheddar', 'Una hamburguesa con extra Cheddar', 750, ['www.imagen.com'], 20, now(), now()),
    (6,'Ensalada Cesar', 'Una ensalada con salsa de anchoas', 300, ['www.imagen.com'],  20, now(), now()),
    (7,'Ensalada Mixta', 'Una ensalada con tomate, lechuga, cebolla y queso', 350,['www.imagen.com'],  20, now(), now()),
    (8,'Ensalada La verde', 'Una ensalada con mix de verdes', 400,['www.imagen.com'],  20, now(), now());
    (9,'Agua', 'Calmá tu sed', 20,'www.imagen.com', 20, now(), now()),
    (10,'Coca', 'Clásica, infaltable', 130,'www.imagen.com', 20, now(), now()),
    (11,'Fanta', 'Sabor naranja', 130,'www.imagen.com', 20, now(), now()),
    (12,'Sprite', 'Burbujeante y sabrosa', 130,'www.imagen.com', 20, now(), now()),
    (13,'Jugo', 'Exprimido en el momento', 100, 'www.imagen.com', 20, now(), now()),
    (14,'Cerveza', 'Importada, refrescante', 200, 'www.imagen.com', 20, now(), now()),
    (15,'Pizza muzza', 'la pizza blanca le decimos', 300, 'www.imagen.com', 0, now(), now()),
    (16,'Pizza pepperoni', 'decorado con circulos rojos picantes', 300 ,'www.imagen.com', 0, now(), now()),
    (17,'Pizza tomate', 'topping natural de tomate fresco', 300,'www.imagen.com', 0, now(), now()),
    (18,'Pizza 4 quesos', '4 tipos de quesos en 1 solo lugar', 300, 'www.imagen.com', 0, now(), now());

INSERT INTO categories VALUES
    (1, 'Hamburguesas', 'Super Ricas!', now(), now()),
    (2, 'Ensaladas', 'Frescas y sabrosas', now(), now()),
    (3, 'Bebidas', 'Las que no pueden faltar', now(), now()),
    (4, 'Pizzas', 'Masa madre al horno de barro', now(), now());


INSERT INTO productcategory VALUES
    (now(), now(), 1, 3),
    (now(), now(), 2, 3),
    (now(), now(), 3, 3),
    (now(), now(), 4, 3),
    (now(), now(), 5, 3),
    (now(), now(), 6, 3),
    (now(), now(), 7, 3),
    (now(), now(), 8, 3),
    (now(), now(), 9, 3),
    (now(), now(), 10, 3),
    (now(), now(), 11, 3),
    (now(), now(), 12, 3),
    (now(), now(), 13, 3),
    (now(), now(), 14, 3),
    (now(), now(), 15, 4),
    (now(), now(), 16, 4),
    (now(), now(), 17, 4),
    (now(), now(), 18, 4);

INSERT INTO users VALUES
    (1, 'Marcos', 'Grizzuti', 'marcos.grizzuti@gmail.com', 'pass', 'Admin', now(), now()),
    (2, 'Adrian', 'Angioni', 'zed.iaf@gmail.com', 'pass', 'Admin', now(), now()),
    (3, 'Daniel', 'Oquendo', 'danieloquendo66@gmail.com', 'pass', 'Admin', now(), now()),
    (4, 'Jose', 'Ramirez', 'ramirezjoseluis676@Gmail.com', 'pass', 'Admin', now(), now());
   

  
INSERT INTO orders VALUES
    (1, 'proceso', now(), now(), 3),
    (2, 'completa', now(), now(), 1),
    (3, 'completa', now(), now(), 1),
    (4, 'creada', now(), now(), 1),
    (5, 'completa', now(), now(), 4);
  

   
  

   
INSERT INTO orderlines VALUES
    (1, 4, 1500, now(), now(), 2, 2),
    (2, 2, 12000, now(), now(), 3, 3),
    (3, 3, 15000, now(), now(), 5, 5),
    (4, 4, 1500, now(), now(), 2, 4),
    (5, 4, 1500, now(), now(), 6, 4),
    (6, 4, 1500, now(), now(), 9, 2),
    (7, 2, 12000, now(), now(), 1, 3),
    (8, 3, 15000, now(), now(), 10, 5),
    (9, 4, 1500, now(), now(), 7, 4),
    (10, 4, 1500, now(), now(), 11, 4);


    INSERT INTO reviews VALUES
    (1, 4, 'Muy buen producto.', now(), now(), 1, 2),
    (2, 5, 'Exquisito sabores al probarlo.', now(), now(), 2, 3),
    (3, 3, 'Falto mas esencia para disfrutar', now(), now(), 1, 1);
    
 
   