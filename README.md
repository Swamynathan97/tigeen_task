
postman documentation:
---------------------
https://documenter.getpostman.com/view/20254275/2sA35MzKXw

--------------------------------------------------------------------------------------------------------------------------------
install needed dependencies using npm i , change the mongouri as per the db credencials and then run the project using npm start.
---------------
Design Choices:
--------------
Technologies Used:
------------------
Node.js:
-------
Chosen for its event-driven, non-blocking I/O model, making it efficient for handling concurrent requests.
Express.js: Used as the web application framework to build the API endpoints quickly and efficiently.
MongoDB:
Selected as the database to store user information, blog posts, and comments due to its flexibility and scalability.
JSON Web Tokens (JWT): Utilized for user authentication, allowing for stateless authentication and improved security.
Jest and Supertest: Employed for unit testing and integration testing to ensure the correctness and reliability of the application.
Project Structure:
Server.js:
Entry point of the application, sets up the Express server and connects to the MongoDB database.
Routes: Contains route definitions for various API endpoints, such as authentication routes and post routes.
Controllers: Implements the logic for handling requests and responses for each route.
Models: 
Defines MongoDB schemas for user, post, and comment objects.
Middleware:
Includes middleware functions for authentication and error handling.
Tests: 
Contains unit tests and integration tests for the application.
API Documentation
Authentication:
POST /api/register: Allows users to register by providing a username and password.
POST /api/login: Allows registered users to log in and obtain a token for authentication.
Blog Posts:
GET /api/posts: Fetches a list of all blog posts with pagination support.
GET /api/posts/:id: Retrieves a specific blog post by ID.
POST /api/posts: Allows authenticated users to create a new blog post with optional tags/categories.
PUT /api/posts/:id: Allows authenticated users to update their own blog post.
DELETE /api/posts/:id: Allows authenticated users to delete their own blog post.
Comments:
POST /api/posts/comment/:id  : Allows authenticated users to add comments to a blog post.



