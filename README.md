<div align="center">

# SkillLink

### AI-Powered Interview Preparation Platform

A full-stack web application that helps users prepare for interviews using AI-powered resume analysis, job matching, interview questions, and personalized preparation plans.

<br></br>https://github.com/HiteshXG/SkillLink/

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](https://skill-link-brown.vercel.app/)
[![License](https://img.shields.io/badge/License-Educational-green?style=for-the-badge)](#license)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)]()

</div>

---

# Table of Contents

<details>
<summary>Click to Expand</summary>

- [Live Demo](#live-demo)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Future Improvements](#future-improvements)
- [Author](#author)
- [License](#license)

</details>

---

# Live Demo

🔗 https://skill-link-brown.vercel.app/

---

# Features

| Feature | Description |
|----------|-------------|
| Authentication | Secure JWT Authentication |
| Resume Upload | Upload Resume in PDF |
| AI Resume Analysis | Analyze Resume with Google Gemini |
| Resume Match Score | Compare Resume against Job Description |
| Skill Gap Detection | Identify Missing Skills |
| Technical Questions | AI Generated Technical Interview Questions |
| Behavioral Questions | Personalized HR Questions |
| Learning Roadmap | Step-by-step Preparation Plan |
| AI Resume Generator | Generate ATS Friendly Resume |
| Interview History | Access Previous Reports |


<p align="right">(<a href="#readme-top">⬆ Back to Top</a>)</p>

---

# Screenshots

### Authentication

<div align="center">

### Login

<img src="./README_assets/login.png" width="50%">

<br><br>

### Register

   <img src="./README_assets/Register.png" width="50%">

   </div>


---
### Application

<div align="center">

### Home

<img src="./README_assets/Home.png" width="50%">

<br><br>

### Inteview

<img src="./README_assets/Interview.png" width="50%">

</div>


---
### Navigation


<div align="center">

### Menu

<img src="./README_assets/Menu-bar.png" width="50%">

</div>


<p align="right">(<a href="#readme-top">⬆ Back to Top</a>)</p>

---
# Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![SASS](https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white)

### Backend
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-black?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=47A248)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)


### AI
![Google Gemini API](https://img.shields.io/badge/Google_Gemini_API-4285F4?style=for-the-badge&logo=google&logoColor=white)


<p align="right">(<a href="#readme-top">⬆ Back to Top</a>)</p>

---

# System Architecture

<p align="center">
<img src="./README_assets/SkillLink.drawio.png" width="50%">
</p>

### Workflow

1. User registers or logs in.
2. JWT authenticates every protected request.
3. User uploads Resume, Job Description and Self Description.
4. Backend extracts text from Resume.
5. Google Gemini analyzes all inputs.
6. AI generates:
   - Resume Match Score
   - Skill Gap Analysis
   - Technical Questions
   - Behavioral Questions
   - Learning Roadmap
7. Report is stored in MongoDB.
8. User can revisit reports or generate an AI-powered resume.


<p align="right">(<a href="#readme-top">⬆ Back to Top</a>)</p>

---

# Folder Structure

<details>

<summary>Click to Expand</summary>

```text
HiteshXG/SkillLink/
├── Backend/
│   ├── package.json
│   ├── server.js
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── interview.controller.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── file.middleware.js
│   │   ├── models/
│   │   │   ├── blacklist.model.js
│   │   │   ├── interviewReport.model.js
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── interview.routes.js
│   │   └── services/
│   │       └── ai.service.js
└── Frontend/
    ├── api.config.js
    ├── package.json
    ├── src/
    │   ├── App.jsx
    │   ├── app.routes.jsx
    │   ├── components/
    │   │   ├── Loader/
    │   │   └── Menu/
    │   ├── features/
    │   │   ├── auth/
    │   │   └── interview/
    │   └── main.jsx
    └── vite.config.js
```

</details>


<p align="right">(<a href="#readme-top">⬆ Back to Top</a>)</p>

---

# Installation

## Clone Repository

```bash
git clone https://github.com/HiteshXG/SkillLink.git
```

---

## Backend

```bash
cd Backend

npm install

npm run dev
```

---

## Frontend

```bash
cd Frontend

npm install

npm run dev
```


<p align="right">(<a href="#readme-top">⬆ Back to Top</a>)</p>

---

# Environment Variables

## Backend

Create a `.env` file inside the Backend directory.

```env
PORT=

MONGO_URI=

JWT_SECRET=

GOOGLE_GENAI_API_KEY=

FRONTEND_URL=
```

---

## Frontend

Create a `.env` file inside the Frontend directory.

```env
VITE_API_BASE_URL=
```


<p align="right">(<a href="#readme-top">⬆ Back to Top</a>)</p>

---

# Running the Project

## Backend

```bash
cd Backend

npm run dev
```

Backend runs on

```
http://localhost:3000
```

---

## Frontend

```bash
cd Frontend

npm run dev
```

Frontend runs on

```
http://localhost:5173
```


<p align="right">(<a href="#readme-top">⬆ Back to Top</a>)</p>

---

# API Endpoints

## Authentication

```http
POST /api/auth/register
```

Create a new account.

---

```http
POST /api/auth/login
```

Authenticate a user.

---

```http
GET /api/auth/logout
```

Logout the current user.

---

```http
GET /api/auth/get-me
```

Fetch logged-in user's profile.

---

## Interview

```http
POST /api/interview/
```

Generate Interview Report.

---

```http
GET /api/interview/
```

Fetch all reports.

---

```http
GET /api/interview/report/:id
```

Fetch report by ID.

---

```http
POST /api/interview/resume/pdf/:id
```

Generate AI Resume PDF.



<p align="right">(<a href="#readme-top">⬆ Back to Top</a>)</p>

---

# Future Improvements

- Voice Mock Interviews
- Company Specific Interview Preparation
- ATS Resume Score
- AI Career Assistant
- Dark Mode
- Dashboard Analytics
- Interview Scheduler


<p align="right">(<a href="#readme-top">⬆ Back to Top</a>)</p>

---

# Author

## Hitesh Gavand

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github)](https://github.com/HiteshXG)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/hitesh-gavand)

[![X](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x)](https://x.com/hnxvrtxx)


<p align="right">(<a href="#readme-top">⬆ Back to Top</a>)</p>

---

# License

This project is intended for **educational and portfolio purposes**.

If you found this project helpful, consider giving it a ⭐ on GitHub!


<p align="right">(<a href="#readme-top">⬆ Back to Top</a>)</p>

---
