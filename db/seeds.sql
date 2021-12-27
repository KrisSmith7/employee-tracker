USE business_db;

INSERT INTO departments (dept_name)
VALUES ("Sales"),
("Engineering"),
("Finances"),
("Legal"),
("Service");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 80000, 1),
("Lead Engineer", 150000, 2),
("Lead Accountant", 100000, 3),
("Lawyer", 175000, 4),
("Customer Service Lead", 60000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Halpert", 1, 1),
("Creed", "Bratton", 2, 2),
("Angela", "Martin", 3, NULL),
("Toby", "Flenderson", 4, 1),
("Kelly", "Kapoor", 5, 1),
("Pam", "Beesly", 5, 1);
