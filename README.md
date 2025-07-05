# nodejs-mysql-jwt
this is a simple project that uses mysql connection and JWTs, and hashes passwords in the database
I didn't build a register html page, since I was already exhausted  after dealing with a lot of obscure bugs
if you want to register a user in mysql, you can use a tool like postman or bruno
and use this endpoint: /api/register
and send a body like this:
{
  "username": "admin",
  "password": "password"
}

then you can use mysql workbench, or access mysql directly on the shell and you will see the hashed password
after you attempt to login, then you can use username and password you entered, nodeJS will handle the hashes,
I already tested and it works :)


I own a lot to midulive, if it wasn't for him, I wouldn't be able to get this project done
I believe he is from spain, but his spanish web dev tutorials are fire!
https://www.youtube.com/watch?v=UqnnhAZxRac

instructions:


install mysql,
make sure once it's installed run this command:
sudo mysql_secure_installation
this will properly configure MySQL so you don't get login or connection issues
ater mysql is installed, you can copy paste database.sql 
into mysql sheell after login, or run it on mysql worbench to create the database
after the database is created, if you already installed nodeJS in your machine
all you have to do, is to run npm install, so you can get all the node_mdules
ALSO, DON'T FORGTE TO CREATE A .env file in the root directory of this project so you can
assign the enviromental variables, here is an example:


PORT=8000


SALT_ROUNDS=10


SECRET_JWT_KEY=your secret key


DB_USERNAME=your mysql user


DB_PASSWORD=your mysql user password


DB_NAME=your database


finally run server.js:
node server.js
and that's pretty much it
