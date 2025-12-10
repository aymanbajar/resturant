# 🍽️ Restaurant Recipe Management System

A full-stack MERN application for managing and sharing recipes with user authentication, image uploads, and a modern UI.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)

## ✨ Features

### User Management
- 🔐 User registration and login with JWT authentication
- 🔒 Password hashing with bcrypt
- 👤 User profile management

### Recipe Management
- ➕ Create new recipes with title, ingredients, and instructions
- 📸 Upload recipe cover images
- ✏️ Edit your own recipes
- 🗑️ Delete your own recipes
- 👁️ View all recipes
- 📱 Filter recipes by creator (My Recipes page)

### UI/UX
- 🎨 Modern, responsive design with Tailwind CSS
- 🌈 Beautiful gradient backgrounds and animations
- 📱 Mobile-friendly interface
- 🖼️ Image preview before upload
- ⚡ Smooth transitions and hover effects
- 📧 Contact page with form

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **jwt-decode** - JWT token decoding

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📁 Project Structure

```
resturant/
├── backend/
│   ├── src/
│   │   ├── index.ts                 # Main server file
│   │   ├── routes/
│   │   │   ├── recipeRoute.ts       # Recipe CRUD endpoints
│   │   │   └── userRoute.ts         # User auth endpoints
│   │   ├── models/
│   │   │   ├── RecipeModel.ts       # Recipe schema
│   │   │   └── UserModel.ts         # User schema
│   │   ├── services/
│   │   │   └── userService.ts       # User business logic
│   │   ├── middlewares/
│   │   │   ├── validateJWT.ts       # JWT validation
│   │   │   └── multer.ts            # File upload config
│   │   └── types/
│   │       └── ExtendRequest.ts     # Custom request types
│   ├── public/                      # Uploaded images
│   ├── package.json
│   ├── tsconfig.json
│   └── nodemon.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx             # Landing page
│   │   │   ├── LoginPage.tsx        # Login form
│   │   │   ├── RegisterPage.tsx     # Registration form
│   │   │   ├── AddRecipe.tsx        # Create recipe
│   │   │   ├── MyRecipes.tsx        # User's recipes
│   │   │   ├── ContactPage.tsx      # Contact form
│   │   │   └── AllRecipes.tsx       # All recipes view
│   │   ├── components/
│   │   │   └── Navbar.tsx           # Navigation bar
│   │   ├── context/
│   │   │   └── Auth/
│   │   │       ├── AuthContext.tsx  # Auth state management
│   │   │       └── AuthProvider.tsx # Auth provider wrapper
│   │   ├── Constants/
│   │   │   └── BASE_URL.ts          # API base URL
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/aymanbajar/resturant.git
cd resturant
```

### Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

## 🔧 Environment Variables

### Backend (.env)
Create a `.env` file in the `backend` directory:

```env
DATABASE_URL=mongodb://localhost:27017/restaurant
# or for MongoDB Atlas:
# DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/restaurant

JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

### Frontend
The frontend uses a constant file for the API URL. Update `frontend/src/Constants/BASE_URL.ts`:

```typescript
export const BASE_URL = "http://localhost:5000";
```

## 🏃 Running the Application

### Development Mode

#### Backend
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

#### Frontend
```bash
cd frontend
npm run dev
# Client runs on http://localhost:5173
```

### Production Build

#### Frontend
```bash
cd frontend
npm run build
npm run preview
```

### Using Docker Compose
```bash
docker-compose up --build
```

## 📡 API Endpoints

### Authentication Routes (`/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/register` | Register new user | ❌ |
| POST | `/user/login` | Login user | ❌ |

**Register Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Recipe Routes (`/recipe`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/recipe` | Get all recipes | ❌ |
| GET | `/recipe/my-recipes` | Get user's recipes | ✅ |
| GET | `/recipe/:id` | Get single recipe | ❌ |
| POST | `/recipe` | Create new recipe | ✅ |
| PUT | `/recipe/:id` | Update recipe | ✅ |
| DELETE | `/recipe/:id` | Delete recipe | ✅ |

**Create Recipe (multipart/form-data):**
```
title: "Pasta Carbonara"
ingredients: "pasta,eggs,bacon,cheese"
instructions: "Boil pasta, cook bacon..."
coverImage: [file]
```

**Headers for Protected Routes:**
```
Authorization: Bearer <jwt_token>
```

## 📸 Screenshots

### Home Page
Beautiful landing page with animated gradients and call-to-action buttons.

### Recipe Management
- **All Recipes**: Browse all available recipes
- **My Recipes**: Manage your own recipes with edit/delete options
- **Add Recipe**: Create new recipes with image upload

### Authentication
- Modern login and registration forms
- JWT-based authentication
- Protected routes

## 🎨 Key Features Details

### Image Upload
- Uses Multer for handling multipart/form-data
- Images stored in `backend/public/` directory
- Supports PNG, JPG, JPEG formats
- Image preview before upload

### Authentication Flow
1. User registers → Password hashed with bcrypt
2. User logs in → JWT token generated
3. Token stored in localStorage
4. Token sent in Authorization header for protected routes
5. Middleware validates token and attaches user info to request

### Recipe Ownership
- Each recipe has a `createdBy` field referencing the user
- Users can only edit/delete their own recipes
- Server-side validation ensures security

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token authentication
- Protected API routes with middleware
- Input validation
- CORS configuration
- Type safety with TypeScript

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Make sure MongoDB is running locally
mongod

# Or use MongoDB Atlas connection string
```

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change PORT in .env file
```

### CORS Errors
Make sure the backend CORS configuration allows your frontend origin:
```typescript
app.use(cors({
  origin: 'http://localhost:5173'
}));
```

## 📝 Future Enhancements

- [ ] Recipe categories and tags
- [ ] Search and filter functionality
- [ ] Recipe ratings and reviews
- [ ] Favorite recipes
- [ ] Social sharing
- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profile pictures
- [ ] Recipe nutrition information
- [ ] Print recipe feature

## 👨‍💻 Author

**Ayman Bajar**
- GitHub: [@aymanbajar](https://github.com/aymanbajar)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

Made with ❤️ using MERN Stack
