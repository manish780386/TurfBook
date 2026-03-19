# 🏏 TurfBook — Cricket Turf Booking Website

A full-stack cricket turf booking web application built with **React** (Frontend) and **Django + Django REST Framework** (Backend). Users can browse turfs, book time slots, and manage their bookings easily.

---

## 🌟 Live Demo

> Coming Soon...

---

## 📸 Screenshots

> Add your screenshots here after deployment

---

## 🚀 Features

- ✅ User Registration & Login (Session-based Authentication)
- ✅ Browse All Cricket Turfs
- ✅ Search Turfs by Name & Location
- ✅ View Turf Details with Images
- ✅ Visual Time Slot Picker
- ✅ Double Booking Prevention
- ✅ My Bookings Page (Upcoming & Past)
- ✅ Contact Form
- ✅ Admin Panel for Turf Management
- ✅ Fully Responsive Design (Mobile Friendly)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios |
| Bundler | Vite |
| Styling | Plain CSS with CSS Variables |
| Backend | Django 4.2, Django REST Framework |
| Authentication | Django Session Authentication |
| Database | SQLite |
| Media Storage | Django Media Files (Pillow) |
| CORS | django-cors-headers |

---

## 📁 Project Structure

```
turf-cricket-booking/
├── backend/
│   ├── turf_project/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── turf_app/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── admin.py
│   ├── media/
│   │   └── turf_images/
│   ├── manage.py
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── TurfCard.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── TurfsPage.jsx
    │   │   ├── TurfDetailPage.jsx
    │   │   ├── BookingPage.jsx
    │   │   ├── MyBookingsPage.jsx
    │   │   ├── ContactPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   └── RegisterPage.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm

---

### 🔧 Backend Setup

```bash
# Step 1 - Go to backend folder
cd turf-cricket-booking/backend

# Step 2 - Create virtual environment
python -m venv venv

# Step 3 - Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Step 4 - Install dependencies
pip install -r requirements.txt

# Step 5 - Run migrations
python manage.py makemigrations
python manage.py migrate

# Step 6 - Create superuser (Admin)
python manage.py createsuperuser

# Step 7 - Start server
python manage.py runserver
```

Backend runs at: **http://localhost:8000**

---

### 🎨 Frontend Setup

```bash
# Step 1 - Go to frontend folder
cd turf-cricket-booking/frontend

# Step 2 - Install dependencies
npm install

# Step 3 - Start development server
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 🔑 Admin Panel

Access Django Admin at: **http://localhost:8000/admin/**

Login with superuser credentials to:
- ➕ Add / Edit / Delete Turfs
- 📋 View all Bookings
- 📬 View Contact Queries

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/csrf/` | Get CSRF Cookie | Public |
| POST | `/api/register/` | Register User | Public |
| POST | `/api/login/` | Login User | Public |
| POST | `/api/logout/` | Logout User | Required |
| GET | `/api/me/` | Get Current User | Required |
| GET | `/api/turfs/` | List All Turfs | Public |
| POST | `/api/turfs/` | Add Turf | Admin Only |
| GET | `/api/turfs/<id>/` | Turf Detail | Public |
| PUT | `/api/turfs/<id>/` | Edit Turf | Admin Only |
| DELETE | `/api/turfs/<id>/` | Delete Turf | Admin Only |
| GET | `/api/turfs/<id>/available-slots/?date=` | Get Booked Slots | Public |
| GET | `/api/bookings/` | My Bookings | Required |
| POST | `/api/bookings/` | Create Booking | Required |
| POST | `/api/contact/` | Submit Contact Form | Public |

---

## 🗃️ Database Models

### Turf
| Field | Type |
|-------|------|
| id | Auto Primary Key |
| name | CharField |
| location | CharField |
| price_per_hour | DecimalField |
| description | TextField |
| image | ImageField |
| created_at | DateTimeField |

### Booking
| Field | Type |
|-------|------|
| id | Auto Primary Key |
| user | FK → User |
| turf | FK → Turf |
| date | DateField |
| time_slot | CharField |
| created_at | DateTimeField |

> Double booking is prevented using `unique_together = ('turf', 'date', 'time_slot')`

### ContactQuery
| Field | Type |
|-------|------|
| id | Auto Primary Key |
| name | CharField |
| email | EmailField |
| message | TextField |
| created_at | DateTimeField |

---

## 🔒 Authentication

This project uses **Django Session-based Authentication** (No JWT).

- After login, Django sets a `sessionid` cookie in the browser
- All protected API calls send this cookie automatically via `withCredentials: true` in Axios
- CSRF token is fetched once via `GET /api/csrf/` on app load and attached to all POST/PUT/DELETE requests as `X-CSRFToken` header

---

## 📋 Requirements

### Backend (`requirements.txt`)
```
Django==4.2.7
djangorestframework==3.14.0
django-cors-headers==4.3.1
Pillow==10.1.0
```

### Frontend (`package.json`)
```json
{
  "dependencies": {
    "axios": "^1.6.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.1"
  }
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

Made with ❤️ for cricket lovers!

> If you found this project helpful, please give it a ⭐ on GitHub!