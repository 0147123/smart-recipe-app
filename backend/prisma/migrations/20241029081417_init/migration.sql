/*
  Warnings:

  - A unique constraint covering the columns `[u_email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_u_email_key" ON "users"("u_email");
