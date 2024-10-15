# Node.js CRUD API Documentation

## Overview

This API provides CRUD operations for managing user data, with a MySQL backend. The API has four main endpoints to create, read, update, and delete users.

## Base URL

http://localhost:3000


## Endpoints

### 1. Get User by ID

- **URL**: `/user/:id`
- **Method**: `GET`
- **Description**: Retrieves a user by their ID.
- **URL Params**:
  - `id` (required): The ID of the user.
- **Response**:
  - **Success**:
    - **Code**: `200 OK`
    - **Content**:
      ```json
      {
        "source": "database",
        "data": {
          "id": 1,
          "name": "John Doe",
          "email": "johndoe@example.com"
        }
      }
      ```
  - **Error**:
    - **Code**: `404 Not Found`
    - **Content**: `"User not found"`

---

### 2. Add New User

- **URL**: `/user`
- **Method**: `POST`
- **Description**: Adds a new user to the database.
- **Request Body**:
  - **Required**:
    - `name` (string): Name of the user.
    - `email` (string): Email of the user.
  - **Example**:
    ```json
    {
      "name": "Jane Doe",
      "email": "janedoe@example.com"
    }
    ```
- **Response**:
  - **Success**:
    - **Code**: `201 Created`
    - **Content**:
      ```json
      {
        "id": 2,
        "name": "Jane Doe",
        "email": "janedoe@example.com"
      }
      ```

---

### 3. Update User

- **URL**: `/user/:id`
- **Method**: `PUT`
- **Description**: Updates an existing user’s name and/or email.
- **URL Params**:
  - `id` (required): The ID of the user.
- **Request Body**:
  - **Required**:
    - `name` (string): New name of the user.
    - `email` (string): New email of the user.
  - **Example**:
    ```json
    {
      "name": "Updated Name",
      "email": "updatedemail@example.com"
    }
    ```
- **Response**:
  - **Success**:
    - **Code**: `200 OK`
    - **Content**:
      ```json
      {
        "message": "User updated"
      }
      ```

---

### 4. Delete User

- **URL**: `/user/:id`
- **Method**: `DELETE`
- **Description**: Deletes a user from the database by their ID.
- **URL Params**:
  - `id` (required): The ID of the user.
- **Response**:
  - **Success**:
    - **Code**: `200 OK`
    - **Content**:
      ```json
      {
        "message": "User deleted"
      }
      ```
---

## Error Handling

Each endpoint may return errors in the following format:

```json
{
  "error": "Description of the error"
}
