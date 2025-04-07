# Blog Post API

The **BlogPost API** is a backend application built with **NestJS** to manage blog posts, comments, likes, and user authentication. This project is designed to be scalable, efficient, and easy to use.

---

## **Features**

- **Posts**: Create, update, list, and delete blog posts.
- **Comments**: Create, update and delete comments to posts.
- **Likes**: Like or unlike posts and listings.
- **Authentication**: Manages authentication.
- **User**: Sign up new user.
- **Health Check**: Monitor the health of the API.

---

## **Prerequisites**

Before starting, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

---

## **How to Clone the Project**

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/blogpost-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd blogpost-api
   ```

---

## **Install Dependencies**

1. Install the project dependencies using `npm`:

   ```bash
   npm install
   ```

---

## **Environment Configuration**

1. Create a `.env` file in the root directory based on the `.env.example` file:

   ```bash
   cp .env.example .env
   ```

2. Configure the environment variables in the `.env` file. Example:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/blogpost
   JWT_SECRET=your-jwt-secret
   PORT=3000
   ```

---

## **Run the Database Container**

1. Ensure Docker is installed and running.
2. Start the PostgreSQL database container using Docker Compose:

   ```bash
   docker-compose up -d
   ```

3. Verify the container is running:

   ```bash
   docker ps
   ```

---

## **Run Migrations**

1. Generate the database tables using Prisma:

   ```bash
   npx prisma migrate dev
   ```

2. Optionally, visualize the database with Prisma Studio:

   ```bash
   npx prisma studio
   ```

---

## **Start the API**

1. Start the server in development mode:

   ```bash
   npm run start:dev
   ```

2. The API will be available at: [http://localhost:3000](http://localhost:3000)

---

## **How to Make Requests**

### **Authentication**

1. Register a new user:

   **POST** `/user`

   ```json
   {
     "name": "John Doe",
     "email": "johndoe@example.com",
     "password": "securepassword"
   }
   ```

2. Log in to obtain the JWT token:

   **POST** `/auth/login`

   ```json
   {
     "email": "johndoe@example.com",
     "password": "securepassword"
   }
   ```

   **Response**:

   ```json
   {
     "operation": "success",
     "message": "Request successful",
     "timestamp": "2025-04-07T00:24:55.174Z",
     "token": "your-jwt-token"
   }
   ```

3. Use the JWT token in the `Authorization` header to authenticate requests:

   ```http
   Authorization: Bearer your-jwt-token
   ```

---

### **Example Endpoints**

#### **Create a Post**

**POST** `/post`

```json
{
  "title": "My First Post",
  "content": "This is the content of my post.",
  "published": true
}
```

#### **List Posts**

**GET** `/post`

---

#### **Add a Comment**

**POST** `/comment`

```json
{
  "postId": "123e4567-e89b-12d3-a456-426614174000",
  "content": "This is a comment."
}
```

---

#### **Like a Post**

**POST** `/like/:postId`

---

## **Run Tests**

1. Run unit tests:

   ```bash
   npm run test
   ```

---

## **Project Structure**

```plaintext
src/
├── common/             # Shared code (guards, helpers, utils, etc.)
├── infrastructure/     # Infrastructure-related files (e.g., database connection)
├── modules/            # API modules, separated by entities
│   ├── auth/           # Authentication module
│   ├── blogpost/       # Blog post module
│   ├── comment/        # Comment module
│   ├── health/         # Health check module
│   ├── like/           # Like module
│   └── user/           # User module
├── main.ts             # Application entry point
```

---

## **Resources**

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma ORM Documentation](https://www.prisma.io/docs)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

---

## **Architecture and Design Choices**

This project follows a clean and modular architecture, leveraging several best practices and design patterns to ensure scalability, maintainability, and testability.

### **Key Practices and Patterns**

1. **Modularization**:

   - Each feature is encapsulated in its own module (e.g., `auth`, `blogpost`, `comment`, etc.).
   - Promotes separation of concerns and makes the codebase easier to scale and maintain.

2. **Infrastructure Layer**:

   - Centralized in the `infrastructure` folder for managing critical configurations like database connections.
   - Simplifies swapping or updating infrastructure components.

3. **DTOs (Data Transfer Objects)**:

   - Used to define the structure of data entering and leaving the API.
   - Ensures data consistency and prevents sensitive information from being exposed.

4. **Use Cases**:

   - Encapsulates business logic in dedicated classes (e.g., `ToggleLikeUseCase`, `GetUserBlogPostsUseCase`).
   - Keeps controllers lightweight and focused on handling HTTP requests.

5. **Repository Pattern**:

   - Abstracts database interactions into repositories (e.g., `BlogPostRepository`, `LikeRepository`).
   - Decouples business logic from persistence logic, improving flexibility and testability.

6. **Guards and Middleware**:

   - Guards like `AuthGuard` ensure secure access to protected routes.
   - Middleware like `helmet` and `cors` enhance security and control over API access.

7. **Global Interceptors and Filters**:

   - Interceptors standardize API responses.
   - Filters handle errors consistently across the application.

8. **Prisma ORM**:

   - Simplifies database interactions with a declarative schema and migration system.
   - Ensures the database schema stays synchronized with the application.

9. **Environment Variables**:

   - Sensitive configurations (e.g., `DATABASE_URL`, `JWT_SECRET`) are managed via `.env` files.
   - Enhances security and simplifies environment-specific setups.

10. **Testing**:
    - Includes unit and end-to-end (e2e) tests to ensure code quality and reliability.
    - Facilitates safe refactoring and regression testing.

---

### **Benefits**

- **Scalability**: Modular design allows for easy addition of new features.
- **Maintainability**: Clear separation of concerns simplifies debugging and updates.
- **Security**: Guards, middleware, and environment variables protect sensitive data and endpoints.
- **Testability**: Use cases and repositories are isolated, making them easy to test.
- **Consistency**: DTOs and interceptors ensure uniform data handling and responses.

This architecture ensures the API is robust, secure, and ready for future growth.

## **Developer**

Created and maintained by:

[**João Otávio Carvalho Castejon**](https://www.linkedin.com/in/jo%C3%A3o-ot%C3%A1vio-carvalho-castejon-164023151/)
