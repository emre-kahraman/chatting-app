# chatting-app

This is a restful api for chatting-app.

# Install

npm install

# Run the app

    docker-compose up -d

# REST API

## API Resources

  - [GET /api/user/getUsers](#get-users)
  - [GET /api/user/getOnlineUsers](#get-online-users)
  - [POST /api/user/register](#register-user)
  - [POST /api/user/addFriend/:id](#add-friend)
  - [GET /api/user/getFriends/:id](#get-friends)
  - [PUT /api/user/deleteFriend/:id](#delete-friend)
  - [POST /api/user/login](#login)
  - [POST /api/user/refreshToken](#refresh-token)
  - [POST /api/user/logout](#logout)
  - [POST /api/message/addMessage](#add-message)
  - [GET /api/message/findMessage/:conversation](#find-message)
  - [GET /api/message/searchMessage/:text](#search-message)
  - [POST /api/chat/addChat](#add-chat)

## Get Users

### Request
GET /api/user/getUsers

    curl --location --request GET 'localhost:5000/api/user/getUsers' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.dGVzdEBnbWFpbC5jb20.ndABZG7XtdL0FAA-HFGc5RatvoPzRHJ2FwPntu9GffM'

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

## Get Online Users

### Request
GET /api/user/getOnlineUsers

    curl --location --request GET 'localhost:5000/api/user/getOnlineUsers' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.dGVzdEBnbWFpbC5jb20.ndABZG7XtdL0FAA-HFGc5RatvoPzRHJ2FwPntu9GffM'

### Response 

    {
    "_id": "62444229da59d3de54257d7a",
    "username": "test",
    "password": "$2b$10$bXSCt8R1S91K3sKslCm33OAhOKovMGEA0PNR0ZKzRvAHrLyBqyAp6",
    "email": "test@gmail.com",
    "friendlist": [],
    "__v": 0,
    "online": true
    }

## Register User

### Request

POST /api/user/register

    curl --location --request POST 'localhost:5000/api/user/register' \--header 'Content-Type: application/json' \--data-raw '{"username":"test","password":"test", "email": "test@gmail.com"}'
    
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
 
     curl --location --request POST 'localhost:5000/api/user/addfriend/61ade606df1e44d8e945f4ed' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.dGVzdEBnbWFpbC5jb20.ndABZG7XtdL0FAA-HFGc5RatvoPzRHJ2FwPntu9GffM' \
    --header 'Content-Type: application/json' \
    --data-raw '{ "userid": "62444229da59d3de54257d7a" }'

### Response
    [
    "61ade606df1e44d8e945f4ed"
    ]

## Get Friends

### Request

GET /api/user/getFriends/:id

    curl --location --request GET 'localhost:5000/api/user/getfriends/61ade606df1e44d8e945f4ed' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.dGVzdEBnbWFpbC5jb20.ndABZG7XtdL0FAA-HFGc5RatvoPzRHJ2FwPntu9GffM'

### Response

    [
    "62444229da59d3de54257d7a"
    ]

## Delete Friend

### Request

PUT /api/user/deleteFriend/:id
 
     curl --location --request DELETE 'localhost:5000/api/user/deleteFriend/61ade606df1e44d8e945f4ed' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.dGVzdEBnbWFpbC5jb20.ndABZG7XtdL0FAA-HFGc5RatvoPzRHJ2FwPntu9GffM' \
    --header 'Content-Type: application/json' \
    --data-raw '{ "userid": "62444229da59d3de54257d7a" }'

### Response

    []

## Login

### Request

POST /api/user/login

    curl --location --request POST 'localhost:5000/api/user/login' \--header 'Content-Type: application/json' \--data-raw '{"email": "test@gmail.com","password": "test"}'

### Response

    {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2NjAxNTQyOTMsImV4cCI6MTY2MDE1NjA5M30.bXXZkzAx6jjB8lyjIX1XF1VQM0Hxq03hKQBG0E_2W6Y",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2NjAxNTQyOTMsImV4cCI6MTY2MDE1Nzg5M30.9KGtuCxIaA7nAoVZ4yyBjp_4zsyZYLxtOxFPN6niE8g"
    }

## RefreshToken

### Request

POST /api/user/refreshToken

    curl --location --request POST 'localhost:5000/api/user/refreshToken' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2NjAxNTQyOTMsImV4cCI6MTY2MDE1Nzg5M30.9KGtuCxIaA7nAoVZ4yyBjp_4zsyZYLxtOxFPN6niE8g'

### Response

    {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2NjAxNTQzOTgsImV4cCI6MTY2MDE1NjE5OH0.2Y5_7HL2lji-UhXqkm3sO-IvvLpJCmAFOAoCbcuo5aU",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2NjAxNTQzOTgsImV4cCI6MTY2MDE1Nzk5OH0.bIgA7wUcC-eYet5ozRkQuuSO0YH1ES4M7SfrRWgS6wM"
    }

## Logout

### Request

POST /api/user/logout

    curl --location --request POST 'localhost:5000/api/user/logout' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.dGVzdEBnbWFpbC5jb20.ndABZG7XtdL0FAA-HFGc5RatvoPzRHJ2FwPntu9GffM' \
    --header 'Content-Type: application/json' \
    --data-raw '{ "email": "test@gmail.com" }'

### Response

    {
    "_id": "62444229da59d3de54257d7a",
    "username": "test",
    "password": "$2b$10$bXSCt8R1S91K3sKslCm33OAhOKovMGEA0PNR0ZKzRvAHrLyBqyAp6",
    "email": "test@gmail.com",
    "friendlist": [],
    "__v": 0,
    "online": false
    }

## Add Message

### Request

POST /api/message/addMessage

    curl --location --request POST 'localhost:5000/api/message/addMessage' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.dGVzdEBnbWFpbC5jb20.ndABZG7XtdL0FAA-HFGc5RatvoPzRHJ2FwPntu9GffM' \
    --header 'Content-Type: application/json' \
    --data-raw '{ "sender": "62444229da59d3de54257d7a", "conversation": "6244561aef7e1b875bada74f", "text": "test message" }'

### Response

    {
    "sender": "62444229da59d3de54257d7a",
    "conversation": "6244561aef7e1b875bada74f",
    "text": "test message",
    "_id": "62c2ea648f2fec3558e34db8",
    "createdAt": "2022-07-04T13:25:56.418Z",
    "updatedAt": "2022-07-04T13:25:56.418Z",
    "__v": 0
    }

## Find Message

### Request

GET /api/message/findMessage/:conversation

    curl --location --request GET 'localhost:5000/api/message/findMessage/6244561aef7e1b875bada74f' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.dGVzdEBnbWFpbC5jb20.ndABZG7XtdL0FAA-HFGc5RatvoPzRHJ2FwPntu9GffM'

### Response

    [
    {
        "_id": "62c2ea648f2fec3558e34db8",
        "sender": "62444229da59d3de54257d7a",
        "conversation": "6244561aef7e1b875bada74f",
        "text": "test message",
        "createdAt": "2022-07-04T13:25:56.418Z",
        "updatedAt": "2022-07-04T13:25:56.418Z",
        "__v": 0
    }
    ]

## Search Message

### Request

GET /api/message/searchMessage/:text

    curl --location --request GET 'localhost:5000/api/message/searchMessage/test message' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.dGVzdEBnbWFpbC5jb20.ndABZG7XtdL0FAA-HFGc5RatvoPzRHJ2FwPntu9GffM'

### Response

    [
    {
        "_id": "62c2ea648f2fec3558e34db8",
        "sender": "62444229da59d3de54257d7a",
        "conversation": "6244561aef7e1b875bada74f",
        "text": "test message",
        "createdAt": "2022-07-04T13:25:56.418Z",
        "updatedAt": "2022-07-04T13:25:56.418Z",
        "__v": 0
    }
    ]

## Add Chat

### Request

POST /api/chat/addChat

    curl --location --request POST 'localhost:5000/api/chat/addChat' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.dGVzdEBnbWFpbC5jb20.ndABZG7XtdL0FAA-HFGc5RatvoPzRHJ2FwPntu9GffM' \
    --header 'Content-Type: application/json' \
    --data-raw '{ "user1": "62444229da59d3de54257d7a","user2": "6244410b8a754cd6da293afc" }'

### Response

    {
    "users": [
        "62444229da59d3de54257d7a",
        "6244410b8a754cd6da293afc"
    ],
    "_id": "6244561aef7e1b875bada74f",
    "__v": 0
    }
