# ✍️ InkWrite — Full Stack Blog Platform

A secure, role-based blogging platform built with Spring Boot, React, JWT Authentication, and PostgreSQL, featuring separate user and admin dashboards.

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
- Search post using keywords

### 🛡️ Admin
- Full CRUD over all posts and users
- Create and manage post categories
- Registers as normal user → role manually assigned in DB → redirected to Admin Dashboard on login

---

## 🛠️ Tech Stack

| Layer             | Technology                                    |
| ----------------- | --------------------------------------------- |
| Backend           | Spring Boot, Spring Security, Spring Data JPA |
| Frontend          | React.js, Tailwind CSS                        |
| Database          | PostgreSQL (Neon)                             |
| Authentication    | JWT (Bearer Token, localStorage)              |
| API Documentation | Swagger / OpenAPI                             |
| Build Tool        | Maven                                         |
| Deployment        | Render (Backend), Neon (Managed PostgreSQL)   |
| Utilities         | Lombok                                        |


## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8 / PostgreSQL
- Maven

---


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


---

## 📸 ER Diagrams
<img width="1052" height="822" alt="ER diagram-Page-1 drawio" src="https://github.com/user-attachments/assets/462b8af3-27a1-4cff-aff7-1e9c699ac2db" />


### Screenshots — UI walkthrough
<img width="1920" height="1080" alt="1" src="https://github.com/user-attachments/assets/098e8cad-1c01-4903-81f9-ca0cd5c60d0a" />
<img width="1920" height="1080" alt="2" src="https://github.com/user-attachments/assets/81c55964-db5d-4ca1-a61d-8a9291fb9304" />
<img width="1920" height="1080" alt="3" src="https://github.com/user-attachments/assets/59117e0e-8343-40c9-b652-efad605cd335" />
<img width="1920" height="1080" alt="4" src="https://github.com/user-attachments/assets/f5f65fcb-9207-4166-8328-80095de55d00" />
<img width="1920" height="1080" alt="5" src="https://github.com/user-attachments/assets/173b362b-bdf5-460b-a815-9c42f3b8a345" />

<img width="1920" height="1080" alt="6" src="https://github.com/user-attachments/assets/42bbc4b7-1e57-4904-8bac-a276f4572ed1" />
<img width="1920" height="1080" alt="7" src="https://github.com/user-attachments/assets/3fb67ccf-3ba8-48b3-8032-1f7ba229a717" />
<img width="1920" height="1080" alt="8" src="https://github.com/user-attachments/assets/2cf77b0b-9621-449d-b8e7-a67e22fe38f8" />

<img width="1920" height="1080" alt="9" src="https://github.com/user-attachments/assets/6b814cbd-fc7f-46cc-b1ae-bf5e9a1e98a5" />




---

## 🔐 Live Demo

🌐 Live Demo

The application is deployed and publicly accessible.

Frontend: https://inkwritefront.onrender.com/

Backend API: https://blog-application-inkwrite.onrender.com

The project is deployed using Render for the backend and configured with a managed PostgreSQL database hosted on Neon.



---



## 🔑 Demo Credentials

### User Account

Visitors can create their own account by following the normal authentication flow:

```text
Sign Up → Login → Browse Posts → Create Posts → Comment
```

### Admin Account

For security reasons, administrator accounts cannot be created through the registration page.

A demo administrator account has already been configured for testing:

```text
Email: markzen@dev.in
Password: Admin123@
```

Note: All newly registered users are automatically assigned the ROLE_USER role. For local development or testing, a user's role can be manually updated to ROLE_ADMIN in the database.


---

## 🚀 Future Enhancements
- Store uploaded images using cloud object storage (AWS S3 or Cloudinary) instead of local/server storage.
- Add password reset functionality using email tokens.
- Introduce rich text editing for blog creation.
- Enable post likes, bookmarks, and user profiles.
- Add Docker support and CI/CD pipeline for automated deployment.


---


