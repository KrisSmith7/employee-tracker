USE business_db;

INSERT INTO department (dept_name)
VALUES
("Management"),
("Sales"),
("Engineering"),
("Finances"),
("Legal"),
("Service");

INSERT INTO roles (title, salary, department_id)
VALUES
("Regional Manager", 80000, 1),
("Sales Lead", 75000, 2),
("Sales Associate", 60000, 2),
("Lead Engineer", 150000, 3),
("Lead Accountant", 100000, 4),
("Lawyer", 175000, 5),
("Customer Service Lead", 60000, 6),
("Office Administrator", 45000, 6),
("Junior Accountant", 75000, 3);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES 
("Michael", "Scott", 1, 1),
("Jim", "Halpert", 2, NULL),
("Creed", "Bratton", 4, NULL),
("Angela", "Martin", 5, NULL),
("Toby", "Flenderson", 6, 1),
("Kelly", "Kapoor", 7, NULL),
("Pam", "Beesly", 8, 1),
("Kevin", "Malone", 9, 4),
("Dwight", "Schrute", 3, 2)
