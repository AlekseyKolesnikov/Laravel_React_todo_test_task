TODO test task

1) Create an empty file for the database (f.e. todo\database\laravel.sqlite)

2) In the 'todo' folder rename '.env.example' to '.env' and specify the full path to the database in DB_DATABASE

3) In the 'todo' folder run:
   composer install
   php artisan key:generate
   php artisan migrate

4) Run 'index.php' from the root folder
