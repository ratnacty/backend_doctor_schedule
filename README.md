## Backend - Doctor Schedule

This project is a CRUD application built with Express for the backend with database PostgreSQL also JWT for token authentication.

## Setup

1. **Install dependencies**:
   
* Run the following command to install the necessary packages:
     
```bash

   npm install

```

## Notes

* Create `.env` file:** Use the `.env.example` file as a template and create a `.env` file.
* Database Setup:** Create a PostgreSQL database with the name `doctor_schedule`. Ensure this matches the `DB_DATABASE` value in the `.env` file.
  
* Run the following command to generate database:
     
```bash

   npx prisma generate
   npx prisma migrate dev
   npm run dev

```


## API Doc

* dont forget to apply Barier token in authorization to access other endpoint after login
  

### User & Auth

1. Create User / Registration
   
* Enpoint
     
```bash
   Post
   /api/register
```

* Example request
     
```bash
{

        "username": "Jhon Doe",
        "email": "jhon@example.com",
        "password": "some password",
        
}
```
* Example response
     
```bash

 {
     "message": "register successfull",
    "userData": {
        "id": 2 ,
        "username": "admin",
        "email": "admin@example.com",
        "password": "$2b$10........",
        "created_at": "2024-12-22T10:35:57.217Z",
        "updated_at": "2024-12-22T10:35:57.217Z"
    }
}

```

2. Login

 * Endpoint
     
```bash
   Post
   /api/login
```

 * Example request
     
```bash
{

        "email": "jhon@example.com",
        "password": "some password",
}
```

* Example response
     
```bash

    "message": "Login successfull",
    "token": "eyJhbGc..........."

```

3. Get Users (All)

 * Endpoint
     
```bash

   Get
   /api/users

```

 * Example response
     
```bash

{
    "message": "Users fetched successfully",
    "users": [
        {
            "id": 1,
            "username": "Jhon Doe",
            "email": "jhon@example.com",
            "password": "$2b$10$Cj...........",
            "created_at": "2024-12-15T14:00:21.974Z",
            "updated_at": "2024-12-15T14:00:21.974Z"
        },
        {
            "id": 2,
            "username": "Shamanta",
            "email": "shamanta@example.com",
           "password": "$2b$10$Cj...........",
            "created_at": "2024-12-15T22:50:20.454Z",
            "updated_at": "2024-12-15T22:50:20.454Z"
        },
       
       
       
    ]
}

```


4. Get User (by Id)

 * Endpoint
     
```bash

   Get
   /api/user/:id

```

 * Example response
     
```bash

{
    "message": "User fetched successfully",
    "user": {

           "id": 1,
            "username": "Jhon Doe",
            "email": "jhon@example.com",
            "password": "$2b$10$Cj...........",
            "created_at": "2024-12-15T14:00:21.974Z",
            "updated_at": "2024-12-15T14:00:21.974Z"
    }
}

```

5. Update User (has login)

* Endpoint
     
```bash

   Put
   /api/user

```

* Example Request

```bash

{
  "username": "update Jhon Doe",
  "email": "jhon@example.com",
  "password": "some password",
}

```

* Example response
     
```bash

{
    "message": "User updated successfully",
    "updatedUser": {
       "id": 2",
        "username": "update Jhon Doe",
        "email": "jhon@example.com",
        "password": "$2b$10.........",
        "created_at": "2024-12-15T14:00:21.974Z",
        "updated_at": "2024-12-15T14:00:21.974Z"
    }
}

```

### Doctor

1. Get Doctors (All)

* Endpoint
     
```bash

   Get
   /api/doctors

```

* Example Response

```bash

  {
    "data": {
        "pagination": {
            "current_page": 1,
            "total_pages": 1,
            "total_data": 4
        },
        "data": [
            {
                "id": 1,
                "name": "Jhon Doe",
                "category": "GENERAL",
                "gender": "male",
                "nip": "SKI2014890DY",
                "created_at": "2024-12-22T09:50:50.268Z",
                "updated_at": "2024-12-22T09:50:50.268Z"
            },
            {
                "id": 2,
                "name": "Shamanta S.Kep",
                "category": "SPECIALIST",
                "gender": "female",
                "nip": "SKI20129076FK",
                "created_at": "2024-12-22T09:52:03.446Z",
                "updated_at": "2024-12-22T09:52:03.446Z"
            },
            {
                "id": 3,
                "name": "Reymon Sanuga",
                "category": "SURGEON",
                "gender": "male",
                "nip": "SKI2009603JIH",
                "created_at": "2024-12-22T09:56:39.449Z",
                "updated_at": "2024-12-22T09:56:39.449Z"
            },
            {
                "id": 4,
                "name": "Keyra Oman",
                "category": "GENERAL",
                "gender": "female",
                "nip": "SKI20108073JKN",
                "created_at": "2024-12-22T09:57:54.332Z",
                "updated_at": "2024-12-22T09:57:54.332Z"
            }
        ]
    }
}

```

2. Get Doctor ( by Id)

* Endpoint
     
```bash

   Get
   /api/doctors/:id

```

* Example Response
   
```bash

{
    "message": "Doctor found",
    "doctor": {
        "id": 2,
        "name": "Shamanta S.Kep",
        "category": "SPECIALIST",
        "gender": "female",
        "nip": "SKI20129076FK",
        "created_at": "2024-12-22T09:52:03.446Z",
        "updated_at": "2024-12-22T09:52:03.446Z"
    }
}

```


3. Create Doctor

* Endpoint
     
```bash

   Post
  /api/doctor

```

* Example Request

```bash

  {
    "name": "Keyra Oman",
    "category": "GENERAL",
    "gender": "female",
    "nip":"SKI20108073JKN"
}

```

* Example Response
   
```bash

{
    "message": "Doctor Created Successfully",
    "newDoctor": {
        "id": 4,
        "name": "Keyra Oman",
        "category": "GENERAL",
        "gender": "female",
        "nip": "SKI20108073JKN",
        "created_at": "2024-12-22T09:57:54.332Z",
        "updated_at": "2024-12-22T09:57:54.332Z"
    }
}

```


### Schedule

1. Create Schedule

* Endpoint
     
```bash

   Post
  /api/schedule/:doctorid

```

* Example Request

```bash

 {
  "day": "Tuesday",
  "time_start": "10:00",
  "time_finish": "14:00",
  "quota": 18,
  "status": true,
  "date": "2024-12-24T00:00:00.000Z" 
}

```

* Example Response

```

{
    "message": "Schedule Created Successfully",
    "newSchedule": {
        "id": 4,
        "doctorId": 1,
        "day": "Tuesday",
        "time_start": "10:00",
        "time_finish": "14:00",
        "quota": 18,
        "status": true,
        "date": "2024-12-24T00:00:00.000Z",
        "userId": 1,
        "created_at": "2024-12-22T10:30:55.756Z",
        "updated_at": "2024-12-22T10:30:55.756Z"
    }
}

```


2. Get Schedule (All)

* Endpoint
     
```bash

   Get
  /api/schedule

```

* Example Response

```

{
    "data": {
        "pagination": {
            "current_page": 1,
            "total_pages": 1,
            "total_data": 4
        },
        "data": [
            {
                "id": 1,
                "doctorId": 2,
                "day": "Monday",
                "time_start": "09:00",
                "time_finish": "12:00",
                "quota": 10,
                "status": true,
                "date": "2024-12-23T00:00:00.000Z",
                "userId": 1,
                "created_at": "2024-12-22T10:27:45.126Z",
                "updated_at": "2024-12-22T10:27:45.126Z"
            },
            {
                "id": 2,
                "doctorId": 1,
                "day": "Monday",
                "time_start": "13:00",
                "time_finish": "15:00",
                "quota": 20,
                "status": true,
                "date": "2024-12-23T00:00:00.000Z",
                "userId": 1,
                "created_at": "2024-12-22T10:28:27.752Z",
                "updated_at": "2024-12-22T10:28:27.752Z"
            },
            {
                "id": 3,
                "doctorId": 3,
                "day": "Monday",
                "time_start": "10:30",
                "time_finish": "13:00",
                "quota": 12,
                "status": true,
                "date": "2024-12-23T00:00:00.000Z",
                "userId": 1,
                "created_at": "2024-12-22T10:29:47.794Z",
                "updated_at": "2024-12-22T10:29:47.794Z"
            },
            {
                "id": 4,
                "doctorId": 1,
                "day": "Tuesday",
                "time_start": "10:00",
                "time_finish": "14:00",
                "quota": 18,
                "status": true,
                "date": "2024-12-24T00:00:00.000Z",
                "userId": 1,
                "created_at": "2024-12-22T10:30:55.756Z",
                "updated_at": "2024-12-22T10:30:55.756Z"
            }
        ]
    }
}

```




