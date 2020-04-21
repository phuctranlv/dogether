echo "Setting up cassandra schema"
cqlsh < ./database/schema.sql

echo "Creating data files"
node --max-old-space-size=8192 database/createData.js 

echo "Seeding songs table"
cqlsh < ./database/seedData.sql