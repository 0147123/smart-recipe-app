#!/bin/bash

# Database credentials
DB_HOST="localhost" # example
DB_PORT="5432"
DB_NAME="your_database_name" # example
DB_USER="your_user_name" # example
DB_PASSWORD="your_password" # example

# Export password for non-interactive authentication
export PGPASSWORD=$DB_PASSWORD

# Execute the SQL query
psql -h $DB_HOST -p $DB_PORT -d $DB_NAME -U $DB_USER -c "DELETE FROM ingredient_stock WHERE expires_at < NOW();"

# Unset the password after execution
unset PGPASSWORD