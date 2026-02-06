# ApplyFlow - Internship Application Tracker

A modern, full-stack web application for tracking and managing internship applications with Kanban-style workflow and analytics dashboard.

## 🚀 Features

- **Authentication**: Secure JWT-based auth with email/password
- **Application Management**: Create, edit, delete, and track applications
- **Kanban Board**: Drag-and-drop interface with status columns
- **Analytics Dashboard**: Insights and performance metrics
- **Search & Filters**: Find applications quickly
- **Responsive Design**: Works on desktop and mobile

## 🛠 Tech Stack

**Frontend:**
- React 18 + TypeScript
- React Router v6
- Axios for API calls
- React Beautiful DnD
- Chart.js for analytics
- Tailwind CSS for styling

**Backend:**
- Node.js + Express + TypeScript
- JWT Authentication
- MongoDB + Mongoose
- bcrypt for password hashing
- Input validation

## 📦 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd applyflow
   
   # Run the comprehensive setup and fix script
   ./fix-errors.sh
   ```

2. **Alternative manual setup:**
   ```bash
   ./install-and-test.sh
   ```

3. **Start MongoDB:**
   ```bash
   # macOS
   brew services start mongodb/brew/mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000/health

## 🌐 Environment Variables

**Server (.env):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/applyflow
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

**Client (.env):**
```env
VITE_API_URL=http://localhost:5000/api
```

## 📁 Project Structure

```
applyflow/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   └── types/          # TypeScript types
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── types/          # TypeScript types
├── package.json           # Root package.json
└── README.md
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Applications
- `GET /api/applications` - Get user applications
- `POST /api/applications` - Create application
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application

### Analytics
- `GET /api/analytics/summary` - Get analytics data


## 🔧 Development Scripts

```bash
# Setup project
./install-and-test.sh

# Start development
npm run dev
./dev.sh

# Install all dependencies
npm run install:all

# Build for production
npm run build

# Lint code
cd client && npm run lint
```

## 🐛 Troubleshooting

Common issues and solutions are documented in [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).

### Quick Fixes
- **MongoDB connection**: Ensure MongoDB is running
- **Port conflicts**: Change ports in `.env` files
- **TypeScript errors**: Run `npm install` in respective directories
- **CORS issues**: Check API URL in client `.env`

## 🎨 Design System

- **Colors**: Neutral palette with blue accent (#3b82f6)
- **Typography**: Inter font family
- **Components**: Rounded cards, subtle shadows
- **Animations**: Smooth transitions and micro-interactions

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes
- Input validation
- CORS configuration

## 📱 Responsive Design

- Desktop-first approach
- Mobile-friendly interface
- Adaptive layouts
- Touch-friendly interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ for helping students land their dream internships!**

For support, check the troubleshooting guide or open an issue.
