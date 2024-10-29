-- CreateTable
CREATE TABLE "users" (
    "u_id" SERIAL NOT NULL,
    "u_name" VARCHAR NOT NULL,
    "u_email" VARCHAR NOT NULL,
    "u_hashedpassword" VARCHAR NOT NULL,
    "u_image" VARCHAR NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("u_id")
);

-- CreateTable
CREATE TABLE "refresh_token" (
    "token_id" SERIAL NOT NULL,
    "token" TEXT,
    "expires_at" TIMESTAMP(3) NOT NULL DEFAULT (now() + '30 days'::interval),
    "u_id" INTEGER NOT NULL,

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("token_id")
);

-- CreateTable
CREATE TABLE "ingredient" (
    "i_id" SERIAL NOT NULL,
    "i_name" VARCHAR NOT NULL,
    "i_description" VARCHAR NOT NULL,
    "i_image" VARCHAR,

    CONSTRAINT "ingredient_pkey" PRIMARY KEY ("i_id")
);

-- CreateTable
CREATE TABLE "ingredient_stock" (
    "is_id" SERIAL NOT NULL,
    "i_id" INTEGER NOT NULL,
    "u_id" INTEGER NOT NULL,
    "is_quantity" DECIMAL,
    "is_unit" VARCHAR NOT NULL,

    CONSTRAINT "ingredient_stock_pkey" PRIMARY KEY ("is_id")
);

-- CreateTable
CREATE TABLE "recipe" (
    "r_id" SERIAL NOT NULL,
    "r_name" VARCHAR NOT NULL,
    "r_description" VARCHAR NOT NULL,
    "r_image" VARCHAR,
    "r_calories" DECIMAL NOT NULL,
    "r_fat" DECIMAL NOT NULL,
    "r_protein" DECIMAL NOT NULL,
    "r_sugar" DECIMAL NOT NULL,
    "pt_time" DECIMAL NOT NULL,
    "ct_time" DECIMAL NOT NULL,

    CONSTRAINT "recipe_pkey" PRIMARY KEY ("r_id")
);

-- CreateTable
CREATE TABLE "recipe_ingredient" (
    "ri_id" SERIAL NOT NULL,
    "r_id" INTEGER NOT NULL,
    "i_id" INTEGER NOT NULL,
    "ri_quantity" DECIMAL NOT NULL,
    "ri_unit" VARCHAR NOT NULL,

    CONSTRAINT "recipe_ingredient_pkey" PRIMARY KEY ("ri_id")
);

-- CreateTable
CREATE TABLE "recipe_step" (
    "rs_id" SERIAL NOT NULL,
    "r_id" INTEGER NOT NULL,
    "rs_description" VARCHAR NOT NULL,
    "rs_image" VARCHAR,

    CONSTRAINT "recipe_step_pkey" PRIMARY KEY ("rs_id")
);

-- CreateTable
CREATE TABLE "recipe_tag" (
    "rt_id" SERIAL NOT NULL,
    "r_id" INTEGER NOT NULL,
    "rt_name" VARCHAR NOT NULL,

    CONSTRAINT "recipe_tag_pkey" PRIMARY KEY ("rt_id")
);

-- CreateTable
CREATE TABLE "users_preference" (
    "up_id" SERIAL NOT NULL,
    "u_id" INTEGER NOT NULL,
    "rt_id" INTEGER NOT NULL,

    CONSTRAINT "users_preference_pkey" PRIMARY KEY ("up_id")
);

-- CreateTable
CREATE TABLE "users_recipe" (
    "ur_id" SERIAL NOT NULL,
    "u_id" INTEGER NOT NULL,
    "r_id" INTEGER NOT NULL,
    "ur_visited_time" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_recipe_pkey" PRIMARY KEY ("ur_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_token_key" ON "refresh_token"("token");

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_u_id_fkey" FOREIGN KEY ("u_id") REFERENCES "users"("u_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ingredient_stock" ADD CONSTRAINT "ingredient_stock_i_id_fkey" FOREIGN KEY ("i_id") REFERENCES "ingredient"("i_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ingredient_stock" ADD CONSTRAINT "ingredient_stock_u_id_fkey" FOREIGN KEY ("u_id") REFERENCES "users"("u_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_i_id_fkey" FOREIGN KEY ("i_id") REFERENCES "ingredient"("i_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_r_id_fkey" FOREIGN KEY ("r_id") REFERENCES "recipe"("r_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recipe_step" ADD CONSTRAINT "recipe_step_r_id_fkey" FOREIGN KEY ("r_id") REFERENCES "recipe"("r_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recipe_tag" ADD CONSTRAINT "recipe_tag_r_id_fkey" FOREIGN KEY ("r_id") REFERENCES "recipe"("r_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_preference" ADD CONSTRAINT "users_preference_rt_id_fkey" FOREIGN KEY ("rt_id") REFERENCES "recipe_tag"("rt_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_preference" ADD CONSTRAINT "users_preference_u_id_fkey" FOREIGN KEY ("u_id") REFERENCES "users"("u_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_recipe" ADD CONSTRAINT "users_recipe_r_id_fkey" FOREIGN KEY ("r_id") REFERENCES "recipe"("r_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_recipe" ADD CONSTRAINT "users_recipe_u_id_fkey" FOREIGN KEY ("u_id") REFERENCES "users"("u_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
