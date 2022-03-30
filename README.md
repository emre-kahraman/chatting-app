# chatting-app

This is a restful api for chatting-app.

# Install

npm install

# Run the app

node index.js

# REST API

## API Resources

  - [GET /api/user/getUsers](#get-users)
  - [POST /api/user/register](#register-user)
  - [POST /api/user/addFriend/:id](#add-friend)
  - [GET /api/user/getFriends/:id](#get-friends)
  - [PUT /api/user/deleteFriend/:id](#delete-friend)
  - [POST /api/user/login](#login)
  - [POST /api/message/addMessage](#add-message)
  - [GET /api/message/findMessage/:conversation](#find-message)
  - [GET /api/message/searchMessage/:text](#search-message)

## Get Users

### Request
GET /api/user/getUsers

    curl --location --request GET 'localhost:5000/api/user/getUsers'

### Response 

    [
    {
        "_id": "61ade606df1e44d8e945f4ed",
        "username": "testuser",
        "password": "$2b$10$ldaY2e275KCiR1q4QDie2uEv70EZRZpc98f8txb7m1vgKq3/qImnS",
        "email": "testuser@gmail.com",
        "__v": 0,
        "friendlist": []
    },
    {
        "_id": "61d57f0ad177bbe31f670b13",
        "username": "testuser2",
        "password": "$2b$10$SLQqdIBU6eAJVKjChLdeHOEutinFA3f6k3KBo8l/NOg4ZttDxgRJq",
        "email": "testuser2@gmail.com",
        "__v": 0,
        "friendlist": []
    }
    ]

## Register User

### Request

POST /api/user/register

    curl --location --request POST 'localhost:5000/api/user/register' \--header 'Content-Type: application/json' \--data-raw '{"username":"testuser","password":"testuser", "email": "testuser@gmail.com"}'
    
### Response
    {
    "username": "test",
    "password": "$2b$10$bXSCt8R1S91K3sKslCm33OAhOKovMGEA0PNR0ZKzRvAHrLyBqyAp6",
    "email": "test@gmail.com",
    "friendlist": [],
    "_id": "62444229da59d3de54257d7a",
    "__v": 0
    }
 
## Add friend
 
### Request
 
POST /api/user/addFriend/:id
 
     curl --location --request POST 'localhost:5000/api/user/addfriend/6244410b8a754cd6da293afc' \--header 'Content-Type: application/json' \--data-raw '{"userid":"62444229da59d3de54257d7a"}'

### Response
    "user added to friendlist"

## Get Friends

### Request

GET /api/user/getFriends/:id

    curl --location --request GET 'localhost:5000/api/user/getFriends/62444229da59d3de54257d7a'

### Response

    [
    "6244410b8a754cd6da293afc"
    ]

## Delete Friend

### Request

PUT /api/user/deleteFriend/:id
 
     curl --location --request POST 'localhost:5000/api/user/deletefriend/62444229da59d3de54257d7a' \--header 'Content-Type: application/json' \--data-raw '{"userid": "6244410b8a754cd6da293afc"}'

### Response

    {
    "_id": "62444229da59d3de54257d7a",
    "username": "test",
    "password": "$2b$10$bXSCt8R1S91K3sKslCm33OAhOKovMGEA0PNR0ZKzRvAHrLyBqyAp6",
    "email": "test@gmail.com",
    "friendlist": [],
    "__v": 0
    }

## Login

### Request

POST /api/user/login

    curl --location --request POST 'localhost:5000/api/user/login' \--header 'Content-Type: application/json' \--data-raw '{"email": "test@gmail.com","password": "test"}'

### Response

    {
    "_id": "62444229da59d3de54257d7a",
    "username": "test",
    "password": "$2b$10$bXSCt8R1S91K3sKslCm33OAhOKovMGEA0PNR0ZKzRvAHrLyBqyAp6",
    "email": "test@gmail.com",
    "friendlist": [],
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiJ9.dGVzdEBnbWFpbC5jb20.ndABZG7XtdL0FAA-HFGc5RatvoPzRHJ2FwPntu9GffM"
}
