## Directory Structure and Functionality

Below is an outline of the project's directory structure along with a description of the contents and functionality of each directory and file.
- `/prisma` - contains the prisma configuration
   - `manual_sql_statement` - contains the manual sql statement
   - `/migrations` - contains the migration files
   - `/schema.prisma` - contains the schema
   - `/seed.ts` - contains the seed data
- `/src` - contains source code
   - `/assets` - contains the media
   - `/configs` - contains all configuration
      - `/databaseClient.ts` - database configuration
      - `/api.ts` - define the api
      - `/apiConfig.ts` - contains api configuration
      - `/interceptors.ts` - contains the interceptors for the axios request and response
   - `/controllers` - contains all the controllers
      - `/authController.ts` - contains all authorization related controller, including login, logout, register
      - `/ingredientController.ts` - contains ingredient related controller
      - `/preferenceController.ts` - contains user preference related controller
      - `/recipeController.ts` - contains recipe related controller
   - `/middlewares` - contains all the middlewares
      - `/verifyToken.ts` - verify the jwt token
   - `/models` - contains model 
      - `/auth.ts` - contains the auth model
      - `/ingredient.ts` - contains the ingredient model
      - `/preference.ts` - contains the preference model
      - `/recipe.ts` - contains the recipe model
   - `routes` - contains all the routes
      - `/auth.ts` - contains all the auth related routes
      - `/ingredient.ts` - contains all the ingredient related routes
      - `/preference.ts` - contains all the preference related routes
      - `/recipe.ts` - contains all the recipe related routes
   - `/utils` - contains the tools
      - `/encryption.ts` - hash the password
      - `/jwt.ts` - handle the jwt token
      - `recipeRecommend.ts` - handle the recipe recommendation
      - `validation.ts` - handle the validation
- `/index.tsx` - entry file

