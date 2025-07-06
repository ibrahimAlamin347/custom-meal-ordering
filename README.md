# 🍽️ Glass Food Website - Custom Meal Ordering System

<div align="center">

![Glass Food Logo](images/food.png)

**A modern, interactive food ordering platform with Firebase backend and admin management system**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

**University of Ibadan | CSC 335 | Group 8 Project**

</div>

---

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [👥 Team Members](#-team-members)
- [✨ Features](#-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [🚀 Live Demo](#-live-demo)
- [📦 Installation](#-installation)
- [⚙️ Setup Instructions](#️-setup-instructions)
- [📁 Project Structure](#-project-structure)
- [🎨 UI/UX Features](#-uiux-features)
- [🔧 Customization Guide](#-customization-guide)
- [📊 Database Schema](#-database-schema)
- [🔐 Security Features](#-security-features)
- [📱 Responsive Design](#-responsive-design)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Project Overview

**Glass Food Website** is a comprehensive food ordering system developed as part of CSC 335 (Web Technologies) at the University of Ibadan. This project demonstrates modern web development practices, real-time database integration, and user experience design principles.

### 🎓 Academic Context
- **Course**: CSC 335 - Software Engineering
- **Institution**: University of Ibadan, Nigeria
- **Semester**: 2023/2024 Academic Session
- **Project Type**: Group Project

### 🌟 Key Highlights
- **Interactive Meal Builder** - Customize meals with real-time pricing
- **Firebase Backend** - Scalable cloud database and authentication
- **Admin Dashboard** - Complete order management system
- **Responsive Design** - Works seamlessly on all devices
- **Real-time Updates** - Live order status tracking

---

## 👥 Team Members

| **Name** | **Matric Number** | **Role** |
|----------|-------------------|----------|
| **Ibrahim Al-amin Akanji** | E051690 | Project Lead & Backend Developer |
| **Ummusulaym Aishah Ibrahim Olokodana** | E048772 | Frontend Developer & UI/UX Designer |
| **Obademi Kayode David** | E051146 | JavaScript Developer & Firebase Integration |
| **Alawiye Awau** | E049272 | CSS Styling & Responsive Design |
| **Angela Isaac Oghenerukeme** | E048974 | Content Management & Documentation |
| **Olanrewaju Olayinka Gideon** | E049806 | Testing & Quality Assurance |
| **Dickson Saviour** | E049689 | Database Design & Admin Features |

---

## ✨ Features

### 🍽️ Customer Features
- **Interactive Meal Builder**
  - Customize meals with ingredients and spices
  - Real-time pricing calculations
  - Visual ingredient selection interface
  - Dynamic price updates

- **Comprehensive Menu System**
  - 12+ traditional and international dishes
  - Detailed meal descriptions
  - High-quality food images
  - Nutritional information

- **Order Management**
  - Complete customer information collection
  - Unique order ID generation
  - Order confirmation system
  - Delivery instructions

- **User Experience**
  - Responsive design for all devices
  - Smooth animations and transitions
  - Intuitive navigation
  - Loading states and feedback

### 🔧 Admin Features
- **Secure Authentication**
  - Firebase Authentication
  - Protected admin routes
  - Session management
  - Secure logout

- **Order Management Dashboard**
  - View all customer orders
  - Real-time order status updates
  - Filter orders by status
  - Sort orders by date/price

- **Status Management**
  - Pending → Preparing → Ready → Delivered
  - One-click status updates
  - Order history tracking
  - Customer notification system

---

## 🛠️ Technologies Used

### Frontend Technologies
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Interactive functionality
- **Boxicons** - Icon library for UI elements

### Backend & Database
- **Firebase Authentication** - User authentication system
- **Firestore Database** - NoSQL cloud database

### Development Tools
- **Git & GitHub** - Version control and collaboration
- **VS Code** - Code editor and development environment
- **Chrome DevTools** - Debugging and testing

---

## 🚀 Live Demo

**🌐 Website**: [Glass Food Website](https://)

**🔐 Admin Access**:
- **URL**: `/admin-login.html`
- **Email**: `admin@glassfood.com`
- **Password**: `admin123456`

---

## 📦 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for development)
- Git (for version control)

### Quick Start
```bash
# Clone the repository
git clone https://github.com/ibrahimAlamin347/custom-meal-ordering.git

# Navigate to project directory
cd custom-meal-ordering

Open in browser

```

---

## ⚙️ Setup Instructions

### 1. Firebase Project Setup

1. **Create Firebase Project**
   - Visit [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Project name: `glass-food-website`
   - Follow setup wizard

2. **Enable Authentication**
   ```
   Firebase Console → Authentication → Get Started
   → Enable Email/Password → Add User
   Email: admin@glassfood.com
   Password: admin123456
   ```

3. **Enable Firestore Database**
   ```
   Firebase Console → Firestore Database → Create Database
   → Start in test mode → Choose location
   ```

4. **Get Configuration**
   ```
   Project Settings → Your Apps → Add Web App
   → Register app → Copy config
   ```

### 2. Update Firebase Configuration

Replace the placeholder in `js/firebase-config.js`:

```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

### 3. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 📁 Project Structure

```
custom-meal-ordering/
├── 📄 index.html                 # Home page
├── 📄 build-meal.html           # Interactive meal builder
├── 📄 menu.html                 # Menu display page
├── 📄 about.html                # About us page
├── 📄 contact.html              # Contact information
├── 📄 admin-login.html          # Admin authentication
├── 📄 admin-dashboard.html      # Order management dashboard
├── 📄 README.md                 # Project documentation
├── 📁 css/
│   ├── 🎨 style.css            # Main stylesheet
│   ├── 🎨 build-meal.css       # Meal builder styles
│   ├── 🎨 menu.css             # Menu page styles
│   ├── 🎨 about.css            # About page styles
│   ├── 🎨 contact.css          # Contact page styles
│   └── 🎨 admin.css            # Admin interface styles
├── 📁 js/
│   ├── ⚙️ nav.js               # Navigation functionality
│   ├── ⚙️ firebase-config.js   # Firebase configuration
│   ├── ⚙️ build-meal.js        # Meal builder logic
│   ├── ⚙️ contact.js           # Contact form handling
│   ├── ⚙️ admin-login.js       # Admin authentication
│   └── ⚙️ admin-dashboard.js   # Order management logic
└── 📁 images/                  # Image assets
    └── 🖼️ food.png            # Logo and food images
```

---

## 🎨 UI/UX Features

### Design Principles
- **Glass Morphism** - Modern glass-like interface design
- **Responsive Layout** - Mobile-first approach
- **Intuitive Navigation** - Hamburger menu for mobile
- **Visual Feedback** - Loading states and animations
- **Accessibility** - Semantic HTML and ARIA labels

### Color Scheme
- **Primary**: #ff6b35 (Orange)
- **Secondary**: #f7931e (Light Orange)
- **Accent**: #2c3e50 (Dark Blue)
- **Background**: #ecf0f1 (Light Gray)
- **Text**: #2c3e50 (Dark Gray)

### Typography
- **Headings**: Modern sans-serif fonts
- **Body Text**: Readable font family
- **Icons**: Boxicons for consistency

---

## 🔧 Customization Guide

### Adding New Meals
1. Update `meals` object in `js/build-meal.js`
2. Add meal option to HTML select
3. Update pricing in `mealPrices` object
4. Add meal image to `images/` directory

### Modifying Styles
1. Edit CSS files in `css/` directory
2. Update color variables in `style.css`
3. Modify responsive breakpoints
4. Customize animations and transitions

### Database Schema Changes
1. Update Firestore security rules
2. Modify order structure in JavaScript
3. Update admin dashboard display
4. Test data validation

---

## 📊 Database Schema

### Orders Collection
```javascript
{
  orderId: "ORD_20241201_001",
  meal: "Jollof Rice",
  ingredients: ["chicken", "plantain", "vegetables"],
  spices: ["curry", "thyme"],
  customerInfo: {
    name: "John Doe",
    phone: "+2348012345678",
    address: "123 Main St, Ibadan",
    deliveryInstructions: "Call before delivery"
  },
  pricing: {
    basePrice: 25000,
    ingredientCost: 3000,
    spiceCost: 5000,
    totalPrice: 33000
  },
  status: "pending", // pending, preparing, ready, delivered, cancelled
  orderDate: Timestamp,
  deliveryDate: Timestamp
}
```

---

## 🔐 Security Features

### Authentication
- **Firebase Auth** - Secure user authentication
- **Protected Routes** - Admin-only access
- **Session Management** - Automatic logout
- **Password Security** - Encrypted storage

### Data Protection
- **Firestore Rules** - Database access control
- **Input Validation** - Client-side validation
- **XSS Prevention** - Sanitized inputs
- **HTTPS Only** - Secure connections

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Features
- **Mobile-First** - Optimized for mobile devices
- **Flexible Grid** - CSS Grid and Flexbox
- **Touch-Friendly** - Large touch targets
- **Fast Loading** - Optimized images and code

---

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

### Code Standards
- **HTML**: Semantic markup
- **CSS**: BEM methodology
- **JavaScript**: ES6+ standards
- **Comments**: Clear documentation

---

## 📄 License

This project is developed for educational purposes as part of CSC 335 at the University of Ibadan.

**© 2024 Group 8 - CSC 335 | University of Ibadan**

---

## 🙏 Acknowledgments

- **Course Instructor** - For guidance and support
- **University of Ibadan** - For providing the learning environment
- **Firebase Team** - For excellent documentation and tools
- **Open Source Community** - For inspiration and resources

---

<div align="center">

**🍽️ Enjoy your meal! 🍽️**

*Built with ❤️ by Group 8 - CSC 335*

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ibrahimAlamin347/custom-meal-ordering)

</div> 