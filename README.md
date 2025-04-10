# NaturaLink – Telehealth Prototype

## 🌿 Vision  
To create a telehealth prototype that makes accessing care simple and trustworthy for older adults (55+) and less tech-savvy individuals in Canada. We aim to bridge the gap between technology and older users by creating an intuitive, secure, and human-centered experience.

---

## ❗ The Core Problem  
Many older Canadians (55+) hesitate to use telehealth services due to:
- Confusing interfaces  
- Privacy and security concerns  
- Lack of trust in online providers  
They need a solution that is **easy-to-use**, **secure**, and feels **personal and reassuring**.

---

## 👤 Target User
- Age: 55+  
- Digital Literacy: Low to moderate  
- Values: Simplicity, trust, clarity, and optionally holistic care

---


## ✅ Solution Core Features & User Flows

### Key Features
- **Authentication**: Basic login and signup interface  
- **Dashboard**: Overview of upcoming appointments, seeing "recent" doctor feedback  and advice
- **Appointment Booking**:
  - Doctor selection
  - Date/time selection (calendar)
  - Confirmation
- **Support and Troubleshooting sysstem**: pop-up confirmations for changing appointments and setting appointments, user chatbot user interface ( ai chatbot will be implemnted in the future), Frequently asked questions page for user support and useability


## Main User journey (User experience/user interface, usability, design and architecture process)
```
User Lands
   └─> Login / Sign Up  
        └─> Dashboard (View Appointments, Book Now)  
            └─> Choose Doctor  
                └─> Select Date/Time (Calendar View)  
                    └─> Confirm Appointment  
                        └─> Back to Dashboard (Appointment Updated)  
                            
```



## Features

| Feature | Description |
|--------|-------------|
| **Login/Signup** | Simple form-based authentication for patients |
| **Dashboard** | Overview of upcoming appointments and feedback system for patient with doctor's advice and task lists to complete |
| **Doctor Selection** | Browse and select a doctor from a list (fetched from backend) |
| **Date/Time Selection** | Interactive calendar UI to select availability |
| **Appointment Confirmation** | Confirm selection, send booking information to server |


### Booking Flow 
- **Choose Doctor**: Display static placeholder doctors with selection styling  
- **Select Date/Time**: 
  - Integrate **FullCalendar.js** (https://fullcalendar.io/)  
  - Placeholder doctor availability  
  - Time selection feature  
- **Confirmation Screen**:
  - Dynamically displays doctor, date, and time selections
  - Booking confirmation action updates dashboard


## ⚙️ Tech Stack

### 🌐 Frontend
- **Vue.js 3** – Component-based architecture, reactivity, routing
- **HTML5** – Structure of login system, dashboard and booking pages
- **CSS3** – Styling with the use of colourful emojis
- **JavaScript** - handles main functionality as well as front-end and back-end communication
- **FullCalendar.io** – built-in calendar api for vue/javascript  (https://fullcalendar.io/docs)

### 🖥️ Backend
- **Node.js** – 
- **Express.js** – RESTful API routes (GET / POST endpoints)
- **AJAX / Fetch API** – communicates between backend dashboard "getting doctor's recent message and fetching upcoming appointments and displaying them to user



  ### Calendar Integration
- Calendar powered by **FullCalendar.js**
- Interactive monthly, weekly, daily views
- Selectable appointment slots with pop-up confirmation interface



## 🛠️ Installation

To run the NaturaLink project locally, follow these steps:

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/naturalink.git
cd naturalink-main
```

---

### 2. Start the Backend (Node.js Server)
This powers the API endpoints for fetching doctors and submitting bookings.

```bash
cd scripts
npm install
node server.js
```
> The server will start at: `http://localhost:3000`
---

### 3. Start the Frontend (HTML Interface)
To view the actual application in the browser, you **must start an HTML server** — simply opening `index.html` by double-clicking won't work properly.

You can use the **Live Server** extension in VS Code:

- Right-click on `index.html`
- Click **"Open with Live Server"**  Or go to the url "https://localhost:3000" on your browser

### ⚠️ Important Note:
> Just clicking the link from the Node.js terminal **will not display the full app**. You **must run the HTML frontend via a local server** like Live Server or going to the url "https://localhost:3000" on your browser


## Group Members 
- Suthashan Tharmarajah < 100-748-346  > **role**: Ux/Ui designer, project concept, project lead coordinator, booking system implementaion both front-end and backend [booking_flow, calendar integration, select_datetime], readme file
{ github: suthashan-001} 
- Myron Lobo < 100-874-243 > 
- Luke Pereira < 100-826- 957 > **role** - front end and back end implementation for users and login, synced appointments to users and to the html pages, made most of server.js excluding convertTo24Hour and  GET appointments api  
- Ryan Hastings < 100-894-215 > **role**
- Andrei Chinchisan < 100-8290 530 > 0% - family emergency and pc catching on fire


---
