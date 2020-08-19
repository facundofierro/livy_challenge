# Livy Challenge

Usage:

1) Start api application
npm start

2) Login with test users using post method:
http://localhost:4000/login

Post content for sample admin user:
{"user":"Facundo",
"password":"clave1"}

Post content for sample user with users role:
{"user":"Matias",
"password":"clave2"}

Response sample:
{
    "mensaje": "Authentication successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwidXNlciI6eyJuYW1lIjoiRmFjdW5kbyIsImVtYWlsIjoiIiwicGFzc3dvcmQiOiJjbGF2ZTEiLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNTk3ODc4MTg1LCJleHAiOjE1OTc4Nzk2MjV9.whBuLxAikNdikNQTeb3TdIu8uRux3aIiT7MDREPL7h0"
}

3) Make get calls adding access-token header with token retrived by login request.

Sample call for getting clients by id:
http://localhost:4000/ClientsById/e8fd159b-57c4-4d36-9bd7-a59ca13057bb

Sample call for getting clients by name:
http://localhost:4000/ClientsByName/Lessie

Sample call for getting policies by user name:
http://localhost:4000/PoliciesByUserName/Manning

Sample call for getting clients by policy id:
http://localhost:4000/ClientByPolicyId/56b415d6-53ee-4481-994f-4bffa47b5239



