-- uncomment it when the table already exist
-- DROP TABLE users_recipe;
-- DROP TABLE users_preference;
-- DROP TABLE ingredient_stock;
-- DROP TABLE recipe_tag;
-- DROP TABLE recipe_step;
-- DROP TABLE recipe_ingredient;
-- DROP TABLE ingredient;
-- DROP TABLE recipe;
-- DROP TABLE users;

CREATE TABLE recipe (
    r_id SERIAL PRIMARY KEY,
    r_name VARCHAR NOT NULL,
    r_description VARCHAR NOT NULL,
    r_image VARCHAR,
    r_calories DECIMAL NOT NULL,
    r_fat DECIMAL NOT NULL,
    r_protein DECIMAL NOT NULL,
    r_sugar DECIMAL NOT NULL,
    pt_time DECIMAL NOT NULL, -- preparation time
    ct_time DECIMAL NOT NULL -- cooking time
);

CREATE TABLE ingredient (
    i_id SERIAL PRIMARY KEY,
    i_name VARCHAR NOT NULL,
    i_description VARCHAR NOT NULL,
    i_image VARCHAR 
);

CREATE TABLE recipe_ingredient (
    ri_id SERIAL PRIMARY KEY,
    r_id INT NOT NULL,
    i_id INT NOT NULL,
    ri_quantity DECIMAL NOT NULL,
    ri_unit VARCHAR NOT NULL,
    FOREIGN KEY (r_id) REFERENCES recipe(r_id),
    FOREIGN KEY (i_id) REFERENCES ingredient(i_id)
);

CREATE TABLE recipe_step (
    rs_id SERIAL PRIMARY KEY,
    r_id INT NOT NULL,
    rs_description VARCHAR NOT NULL,
    rs_image VARCHAR,
    FOREIGN KEY (r_id) REFERENCES recipe(r_id)
);

CREATE TABLE recipe_tag (
    rt_id SERIAL PRIMARY KEY,
    r_id INT NOT NULL,
    rt_name VARCHAR NOT NULL,
    FOREIGN KEY (r_id) REFERENCES recipe(r_id)
);

CREATE TABLE users (
    u_id SERIAL PRIMARY KEY,
    u_name VARCHAR NOT NULL,
    u_email VARCHAR NOT NULL,
    u_password VARCHAR NOT NULL,
    u_image VARCHAR NOT NULL
);

CREATE TABLE ingredient_stock (
    is_id SERIAL PRIMARY KEY,
    i_id INT NOT NULL,
    is_quantity DECIMAL,
    is_unit VARCHAR NOT NULL,
    FOREIGN KEY (i_id) REFERENCES ingredient(i_id)
);

CREATE TABLE users_preference (
    up_id SERIAL PRIMARY KEY,
    u_id INT NOT NULL,
    rt_id INT NOT NULL,
    FOREIGN KEY (u_id) REFERENCES users(u_id),
    FOREIGN KEY (rt_id) REFERENCES recipe_tag(rt_id)
);

CREATE TABLE users_recipe (
    ur_id SERIAL PRIMARY KEY,
    u_id INT NOT NULL,
    r_id INT NOT NULL,
    FOREIGN KEY (u_id) REFERENCES users(u_id),
    FOREIGN KEY (r_id) REFERENCES recipe(r_id)
);

