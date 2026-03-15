# 🏋️ Evolve - Fitness & Wellness Tracking Platform

**Evolve** is a comprehensive full-stack fitness and wellness tracking application designed to help users manage their health journey through workout planning, meal tracking, progress monitoring, and grocery management. Built with modern technologies and best practices, Evolve provides an intuitive interface for users to achieve their fitness goals.

<evolveapp.vercel.app>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Development Process](#development-process)

---

## 🎯 Overview

Evolve is a modern fitness tracking platform that combines workout management, nutrition tracking, and progress analytics into a single, cohesive application. The platform offers personalized fitness planning with AI-powered assistance, comprehensive progress tracking, and intelligent grocery list management.

### Key Highlights:
- 📊 **Real-time Progress Dashboard** with interactive charts
- 🍽️ **Meal Planning & Logging** with nutritional tracking
- 💪 **Workout Management** with exercise library
- 🛒 **Smart Grocery List** management
- 🔐 **Secure Authentication** with JWT & OAuth2
- 📱 **Fully Responsive Design** for all devices
- 🤖 **AI Integration** for personalized recommendations (Groq AI)

---

## ✨ Features

### 🔐 Authentication & Authorization
- **User Registration & Login** - Secure email/password authentication
- **Email Verification** - OTP-based account verification system
- **Google OAuth2** - Social login integration
- **JWT Token Management** - Stateless authentication with refresh tokens
- **Protected Routes** - Role-based access control

### 📊 Dashboard
- **Daily Overview** - Quick glance at today's progress
- **Interactive Charts** - Visual representation of workout and meal data using Material-UI Charts
- **Statistics Cards** - Key metrics (calories, workouts, water intake)
- **Recent Activity** - Timeline of recent meals and workouts
- **Goal Tracking** - Monitor progress towards fitness goals

### 💪 Workout Management
- **Exercise Library** - Pre-defined workout templates
- **Workout Logging** - Track sets, reps, weight, and duration
- **Custom Workouts** - Create personalized workout routines
- **Workout History** - View past workout sessions
- **Progress Analytics** - Track strength gains over time

### 🍽️ Meal Tracking
- **Meal Logging** - Record breakfast, lunch, dinner, and snacks
- **Nutritional Information** - Track calories, protein, carbs, and fats
- **Meal History** - Browse past meal logs
- **Custom Meals** - Add custom food items
- **Daily Calorie Goals** - Set and monitor caloric intake

### 📈 Progress Tracking
- **Daily Progress Logs** - Track weight, body measurements, and mood
- **Visual Analytics** - Charts showing weight trends and body composition
- **Progress Photos** - Upload and compare transformation photos
- **Milestone Tracking** - Celebrate fitness achievements
- **Historical Data** - View long-term progress trends

### 🛒 Grocery Management
- **Smart Shopping List** - Create and manage grocery lists
- **Item Categorization** - Organize items by category
- **Quick Add/Remove** - Streamlined list management
- **Persistent Storage** - Lists saved across sessions
- **Share Lists** - Export lists for shopping

### 👤 Profile Management
- **User Profile** - Manage personal information
- **Goal Setting** - Define fitness goals and preferences
- **Statistics Overview** - Lifetime stats and achievements
- **Account Settings** - Update password and preferences
- **Data Export** - Download personal fitness data

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18 with custom animations
- **UI Components**: 
  - Material-UI (MUI) 7.3.6 for charts and core components
  - Radix UI for accessible primitives
  - Lucide React for icons
  - Custom shadcn/ui components
- **State Management**: TanStack Query (React Query) 5.90.12
- **Routing**: React Router DOM 7.10.1
- **HTTP Client**: Axios 1.13.2
- **Form Validation**: React Hook Form with validation
- **Animations**: Motion 12.23.26 (Framer Motion successor)
- **Notifications**: React Toastify 11.0.5
- **Date Handling**: date-fns 4.1.0

### Backend
- **Framework**: Spring Boot 3.5.8
- **Language**: Java 17
- **Build Tool**: Maven
- **Database**: PostgreSQL (JPA/Hibernate)
- **Caching**: Redis with Spring Data Redis
- **Security**: Spring Security 6 with JWT
- **Authentication**: 
  - JWT (JSON Web Tokens) using JJWT 0.11.5
  - OAuth2 (Google Login)
- **Email Service**: Spring Mail with SMTP
- **Validation**: Jakarta Validation API 3.0.2
- **Data Processing**: Jackson Databind 2.15.2
- **Development Tools**: 
  - Lombok for boilerplate reduction
  - Spring Boot DevTools

### Infrastructure & Tools
- **Database**: PostgreSQL
- **Cache Layer**: Redis
- **AI Integration**: Groq API for intelligent recommendations
- **Email Service**: Gmail SMTP
- **Authentication Provider**: Google OAuth2
- **Version Control**: Git

---

## 🏗️ Architecture

### Backend Architecture (Spring Boot)

```
backend/
├── configs/           # Security, CORS, Redis, JWT configurations
├── controllers/       # REST API endpoints
│   ├── AuthenticationController
│   ├── UserController
│   ├── DailyProgressController
│   ├── MealController
│   ├── WorkoutController
│   └── ShoppingItemController
├── models/           # JPA Entity classes
│   ├── User
│   ├── DailyProgress
│   ├── Meal
│   ├── MealLog
│   ├── Workout
│   ├── WorkoutLog
│   └── ShoppingItem
├── repositories/     # Spring Data JPA repositories
├── services/         # Business logic layer
├── dtos/            # Data Transfer Objects
├── responses/       # Custom response objects
├── handlers/        # Exception handlers and global error handling
└── enums/           # Enumeration types
```

**Key Design Patterns:**
- **MVC Pattern** - Model-View-Controller separation
- **Repository Pattern** - Data access abstraction
- **Service Layer Pattern** - Business logic encapsulation
- **DTO Pattern** - Data transfer optimization
- **Dependency Injection** - Spring IoC container
- **Builder Pattern** - Object construction (Lombok)

### Frontend Architecture (React)

```
frontend/src/
├── components/
│   ├── pages/        # Main application pages
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Verify.tsx
│   │   ├── Planner.tsx
│   │   ├── Progress.tsx
│   │   ├── Grocery.tsx
│   │   └── Profile.tsx
│   ├── layouts/      # Layout components (Header, Sidebar, Footer)
│   ├── elements/     # Reusable UI components
│   ├── middlewares/  # Auth guards and protected routes
│   └── ui/          # Base UI components (buttons, inputs, cards)
├── api/             # API service layer (Axios instances)
├── hooks/           # Custom React hooks
├── lib/             # Utilities, types, and context providers
├── App.tsx          # Root component with routing
└── main.tsx         # Application entry point
```

**Key Patterns:**
- **Component-Based Architecture** - Modular, reusable components
- **Custom Hooks** - Logic abstraction and reusability
- **Context API** - Global state management (User, Theme)
- **Protected Routes** - Authentication middleware
- **Lazy Loading** - Code splitting for performance
- **Service Layer** - API abstraction

---

## 🚀 Getting Started

### Prerequisites
- **Java 17** or higher
- **Node.js 18+** and npm/yarn
- **PostgreSQL 14+**
- **Redis** (optional, for caching)
- **Maven 3.8+**

### Backend Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd evolve/backend
```

2. **Configure environment variables**
Create a `.env` file in the backend root:
```properties
DATABASE_URL=jdbc:postgresql://localhost:5432/evolve_db
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret_key
SUPPORT_EMAIL=your_email@gmail.com
APP_PASSWORD=your_gmail_app_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GROQ_API_KEY=your_groq_api_key
SPRING_DATA_REDIS_HOST=localhost
SPRING_DATA_REDIS_PORT=6379
SPRING_DATA_REDIS_PASSWORD=
```

3. **Create PostgreSQL database**
```sql
CREATE DATABASE evolve_db;
```

4. **Build and run the application**
```bash
mvn clean install
mvn spring-boot:run
```

Backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd evolve/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file:
```env
VITE_API_URL=http://localhost:8080
```

4. **Start development server**
```bash
npm run dev
```

Frontend will start on `http://localhost:5173`

### Building for Production

**Backend:**
```bash
mvn clean package
java -jar target/evolve-0.0.1-SNAPSHOT.jar
```

**Frontend:**
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

### Backend Modules

#### Controllers Layer
- **AuthenticationController**: Registration, login, logout, token refresh, email verification
- **UserController**: User profile management, settings
- **DailyProgressController**: Daily logs, weight tracking, progress analytics
- **MealController**: Meal library, meal logging
- **WorkoutController**: Exercise library, workout logging
- **ShoppingItemController**: Grocery list CRUD operations

#### Models (Entities)
- **User**: User account information, credentials, profile
- **DailyProgress**: Daily weight, body metrics, mood tracking
- **Meal**: Meal templates with nutritional information
- **MealLog**: User's meal consumption records
- **Workout**: Exercise templates and descriptions
- **WorkoutLog**: User's workout session records
- **ShoppingItem**: Grocery list items

#### Security Configuration
- JWT token generation and validation
- Spring Security filter chains
- OAuth2 integration with Google
- CORS configuration for cross-origin requests
- Password encryption with BCrypt
- Redis session management

---

## 🔌 API Documentation

### Authentication Endpoints

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123",
  "fullName": "John Doe"
}
```

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

```http
POST /api/auth/verify
Content-Type: application/json

{
  "email": "user@example.com",
  "code": "123456"
}
```

### Protected Endpoints (Require JWT Token)

```http
GET /api/user/profile
Authorization: Bearer <jwt_token>
```

```http
GET /api/progress/daily?date=2025-12-28
Authorization: Bearer <jwt_token>
```

```http
POST /api/meals/log
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "mealId": 1,
  "portion": 1.5,
  "timestamp": "2025-12-28T12:00:00"
}
```

---

## 🔒 Security

### Implemented Security Features

1. **Authentication & Authorization**
   - JWT-based stateless authentication
   - Secure password hashing with BCrypt
   - Token expiration and refresh mechanism
   - OAuth2 social login (Google)

2. **Email Verification**
   - OTP-based account verification
   - Secure code generation and expiration
   - Prevention of brute-force attempts

3. **API Security**
   - CORS configuration for trusted origins
   - CSRF protection
   - Rate limiting (configurable)
   - Input validation and sanitization

4. **Data Protection**
   - Environment variable management
   - Sensitive data encryption
   - SQL injection prevention (JPA)
   - XSS protection

5. **Session Management**
   - Redis-based session caching
   - Configurable session timeout
   - Secure cookie handling

---

## 🎨 Development Process

### Design Philosophy
The development of Evolve followed modern software engineering principles:

1. **Mobile-First Responsive Design**
   - Started with mobile layout, scaled up to desktop
   - Tailwind CSS breakpoints (sm, md, lg, xl)
   - Touch-friendly interfaces for mobile users
   - Hamburger menu navigation on smaller screens

2. **Component Reusability**
   - Built a library of reusable UI components
   - Consistent design system across the application
   - shadcn/ui integration for accessible components

3. **State Management**
   - React Query for server state caching
   - Context API for global app state
   - Optimistic updates for better UX

4. **Performance Optimization**
   - Code splitting and lazy loading
   - Image optimization
   - Redis caching on backend
   - Database query optimization with JPA

5. **Backend Architecture**
   - RESTful API design principles
   - Separation of concerns (MVC pattern)
   - Repository pattern for data access
   - Service layer for business logic
   - DTO pattern for data transfer

### Development Workflow

1. **Planning Phase**
   - Identified core features (workout, meal, progress tracking)
   - Designed database schema and entity relationships
   - Created API endpoint specifications

2. **Backend Development**
   - Set up Spring Boot project with dependencies
   - Configured PostgreSQL and Redis connections
   - Implemented security with Spring Security & JWT
   - Built RESTful API endpoints
   - Integrated email service for verification
   - Added OAuth2 Google login
   - Implemented caching strategies

3. **Frontend Development**
   - Initialized React + Vite + TypeScript project
   - Set up Tailwind CSS for styling
   - Created reusable component library
   - Implemented routing with protected routes
   - Integrated React Query for data fetching
   - Built responsive layouts for all pages
   - Added form validation and error handling
   - Integrated Material-UI charts for analytics

4. **Integration**
   - Connected frontend to backend API
   - Implemented authentication flow
   - Added loading states and error boundaries
   - Tested cross-origin resource sharing

5. **Testing & Refinement**
   - Manual testing of all features
   - Responsive design testing across devices
   - API endpoint testing
   - Security vulnerability assessment

### Challenges & Solutions

**Challenge 1: JWT Token Management**
- *Solution*: Implemented token refresh mechanism and secure storage

**Challenge 2: Real-time Progress Tracking**
- *Solution*: Used React Query for efficient caching and refetching

**Challenge 3: Responsive Dashboard Charts**
- *Solution*: Leveraged Material-UI responsive chart components

**Challenge 4: Email Verification System**
- *Solution*: Built OTP system with expiration and rate limiting

**Challenge 5: OAuth2 Integration**
- *Solution*: Configured Spring Security OAuth2 with Google provider

---

## 🎯 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Social features (friend connections, workout sharing)
- [ ] AI-powered meal recommendations using Groq
- [ ] Barcode scanning for food logging
- [ ] Wearable device integration
- [ ] Advanced analytics and insights
- [ ] Workout video tutorials
- [ ] Community challenges and leaderboards
- [ ] Nutrition meal planner with recipes
- [ ] Export data to PDF reports

---

## 📝 License

This project is developed as a personal portfolio project.

---

## 👨‍💻 Author

Built with ❤️ by a passionate full-stack developer

---

## 🙏 Acknowledgments

- Spring Boot community for excellent documentation
- React and Vite teams for modern development tools
- Material-UI and Tailwind CSS for UI frameworks
- TanStack Query for powerful data fetching
- Open source community for inspiration

---

**⭐ Star this repository if you find it helpful!**
