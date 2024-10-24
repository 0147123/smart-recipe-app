## Steps for apply change on schema
1. migrate change
```
npx prisma migrate dev --name init
```

## Steps for apply change on both schema and seed.ts
1. migrate change, generate migration file
```
npx prisma migrate dev --name init
```
2. reset database
```
npx prisma migrate reset
```
- since if not first migration, migrate command will not apply seeding
- not recommon use reset database command in production phase

## Steps for apply change on seed.ts
1. reset database 
```
npx prisma migrate reset
```
- since if use seed command, it may cause duplicate record. we need to delete all seeding data
- then use reset command, delete all data will faster la
- not recommon use reset database command in production phase


## Recommantation if too many migration file
1. delete ./migrations folder
2. migrate change, generate migration file
```
npx prisma migrate dev --name init
```

## Prisma useful command

```
npx prisma migrate reset
```
- reset database
- use it when change the seed file

```
npx prisma generate
```
- Generate Prisma Client
- use it when other dev changed the table structure

```
npx prisma migrate dev --name init
```
1. Creates a new SQL migration file for this migration
2. Runs the SQL migration file against the database

```
npx prisma migrate deploy --preview-feature
```
- deploy the change

```
npx prisma db seed
```
- do the seeding, can change the data by change data on seed.ts
- **don't need to use normally, since migrate command will Seeded data**