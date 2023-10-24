-- initialize the database user used by prisma to have all privileges, so prisma can generate the database and tables
grant all privileges on *.* to 'user'@'%';
