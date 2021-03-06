# Livy Challenge

## Description:
This challenge was made only for evaluating development skill for applying for a job position.
It contains a simple restfull api service with authentication and some basic operations.
For simplify ussage this sample application loads data on an in memory mongo db database.
There are security aspects that are pending like removing .env file secret and encrypting user passwords.
In case of continuing with this demo project it is desirable to add more source code commets, to expand documentation, to add more controls in tests and to enter a test phase to improve error management. 

## Usage:

### 1) Start api application
```bash
npm start
```

### 2) Test api application
```bash
npm test
```

### 3) Login with test users using post method:
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
    "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}

### 4) Make get calls adding access-token header with token retrived by login request.

Sample call for getting clients by id:
http://localhost:4000/client/id/e8fd159b-57c4-4d36-9bd7-a59ca13057bb

Sample call for getting clients by name:
http://localhost:4000/client/name/Lessie

Sample call for getting policies by user name:
http://localhost:4000/policy/client_name/Manning

Sample call for getting clients by policy id:
http://localhost:4000/client/policy_id/56b415d6-53ee-4481-994f-4bffa47b5239



