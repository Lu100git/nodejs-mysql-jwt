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
