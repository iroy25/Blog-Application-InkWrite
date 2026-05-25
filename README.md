# ✍️ InkWrite — Full Stack Blog Platform

A multi-role blogging platform built with Spring Boot, React.js, MySQL, and JWT authentication. Users can create, manage, and comment on posts; admins have full control over users, posts, and categories.

![Java](https://img.shields.io/badge/Java_17+-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)
![React](https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Lombok](https://img.shields.io/badge/Lombok-BC4521?style=for-the-badge&logoColor=white)

---

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [API Documentation](#api-documentation)
- [Role System](#role-system)
- [Diagrams](#diagrams)

---

## ✅ Features

### 👤 User
- Register and login with JWT-based authentication
- Create, update, and delete own posts
- Upload images with posts (max 10MB)
- Read posts by other users
- Comment on any post including reply to other comments
- Read all comments on a post

### 🛡️ Admin
- Full CRUD over all posts and users
- Create and manage post categories
- Registers as normal user → role manually assigned in DB → redirected to Admin Dashboard on login

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Spring Boot, Spring Security, Spring Data JPA |
| Frontend | React.js |
| Database | MySQL |
| Auth | JWT (Bearer Token, localStorage) |
| API Docs | Swagger / OpenAPI |
| Utilities | Lombok, Maven |

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8
- Maven

---

## ⚙️ Environment Configuration

`backend/src/main/resources/application.properties`:

```properties
# Server
server.port=9095

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/inkwrite_db
spring.datasource.username=DB_USERNAME
spring.datasource.password=DB_PASSWORD

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# File Upload
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# Image Storage
project.image=images/

# Security Logging (change to INFO before production)
logging.level.org.springframework.security=DEBUG
```


## 📖 API Documentation

Swagger UI is available once the backend is running: `http://localhost:9095/swagger-ui/index.html`

Base URL for all endpoints: `http://localhost:9095/api/v1/`



### Key Endpoints

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/v1/auth/register` | Public |
| POST | `/api/v1/auth/login` | Public |
| GET | `/api/v1/posts` | Public |
| POST | `/api/v1/posts` | User / Admin |
| PUT | `/api/v1/posts/{id}` | Author / Admin |
| DELETE | `/api/v1/posts/{id}` | Author / Admin |
| POST | `/api/v1/comments` | User / Admin |
| GET | `/api/v1/admin/users` | Admin only |
| POST | `/api/v1/admin/categories` | Admin only |

---

## 🔐 Role System

| Role ID | Role Name | Assigned By |
|---|---|---|
| `501` | ROLE_ADMIN | Manually in DB |
| `502` | ROLE_USER | Auto on registration |

> ⚠️ **Admin Setup:** Run this SQL after registering:
> ```sql
> UPDATE user_roles SET role_id = 501 WHERE user_id = {your_user_id};
> ```
> On next login the user will be redirected to Admin Dashboard automatically.

---

## 📸 Diagrams
### Screenshots — UI walkthrough
<img width="1920" height="1080" alt="Screenshot 2026-05-25 124052" src="https://github.com/user-attachments/assets/facc05d3-9f43-43ed-bf28-b6260a6e8ded" />
<img width="1920" height="1080" alt="Screenshot 2026-05-25 124104" src="https://github.com/user-attachments/assets/9800f86e-394d-4d61-a5d4-09a96330d574" />
<img width="1920" height="1080" alt="Screenshot 2026-05-25 124115" src="https://github.com/user-attachments/assets/c05ae41e-413e-4d0e-b42d-ab8800dc1e6c" />
<img width="1920" height="1080" alt="Screenshot 2026-05-25 124241" src="https://github.com/user-attachments/assets/61bff1ce-1791-453b-be48-25571f34b61b" />
<img width="1920" height="1080" alt="Screenshot 2026-05-25 130223" src="https://github.com/user-attachments/assets/75650b49-3546-4ae1-be4b-93140682b1a4" />
<img width="1920" height="1080" alt="Screenshot 2026-05-25 130309" src="https://github.com/user-attachments/assets/ad0818d4-23fb-4cdc-8838-adee6af966c9" />
<img width="1920" height="1080" alt="Screenshot 2026-05-25 130437" src="https://github.com/user-attachments/assets/62bf02fe-1311-4dfe-bcba-6039a9c5c122" />
<img width="1920" height="1080" alt="Screenshot 2026-05-25 130501" src="https://github.com/user-attachments/assets/6da18795-0a78-4751-ab53-a9707a3947ff" />
<img width="1920" height="1080" alt="Screenshot 2026-05-25 131539" src="https://github.com/user-attachments/assets/2207b244-1f50-4d68-bc5e-7eb7fe7ec22a" />










---


