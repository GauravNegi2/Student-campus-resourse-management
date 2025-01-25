# Smart Campus Resource Management System

## Purpose
The Smart Campus Resource Management System is designed to help colleges efficiently allocate and manage limited resources. This application provides a user-friendly interface for students and faculty to book rooms, track inventory, and report maintenance issues.

## Features
- **Room Booking System**: 
  - Allows students and faculty to book classrooms, labs, or seminar halls.
  
- **Inventory Tracker**: 
  - Tracks and manages items like projectors, chairs, and lab equipment.
  - Users can request items as needed.
  
- **Maintenance Requests**: 
  - Enables users to report issues such as broken equipment or AC problems.
  - Users can track the status of their requests.

## Project Structure
```
smart-campus-resource-management-system
├── backend
|   ├──  package.jason
|   └──  server.js
├── public
│   ├── index.html
│   └── favicon.ico
├── src
│   ├── components
│   │   ├── RoomBooking
│   │   │   ├──  RoomBooking.js
|   |   |   └──  RoomBooking.css
│   │   ├── InventoryTracker
│   │   │   ├──  InventoryTracker.js
|   |   |   └──  InventoryTracker.css 
│   │   ├──  MaintenanceRequests
│   │   |   ├──  MaintenanceRequests.js
|   |   |   └──  MaintenanceRequests.css
|   |   ├──  Register
|   |   |   ├──  Register.js
|   |   |   └──  Register.css
|   |   └── Login
|   |       ├──  Login.js
|   |       └──  Login.css
|   | 
│   ├── App.js
│   ├── index.js
│   └── styles
│       └── App.css
├── package.json
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/smart-campus-resource-management-system.git
   ```
2. Navigate to the project directory:
   ```
   cd smart-campus-resource-management-system
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application
To start the development server, run:
```
npm start
```
The application will be available at `http://localhost:3000`.

### Usage
- Navigate through the application to access the Room Booking, Inventory Tracker, and Maintenance Requests features.
- Follow the prompts to book rooms, manage inventory, and submit maintenance requests.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.
