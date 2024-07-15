# Chatty

Chatty is a simple chat application developed as a learning project, featuring real-time messaging using socket.io. It utilizes the MERN stack for the backend and React with Tailwind CSS and Daisy UI for the frontend.

## Features

- **Real-time Chat:** Users can send and receive messages instantly.
- **Authentication:** Secure signup and login using JSON Web Tokens (JWT).
- **Design:** Built with Tailwind CSS and Daisy UI for aesthetic UI components.

## Technologies Used

- **Frontend:** React, Tailwind CSS, Daisy UI, JavaScript
- **Backend:** MongoDB, Express.js, Node.js, socket.io
- **Authentication:** JSON Web Tokens (JWT), bcryptjs

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB Atlas account for database setup (or local MongoDB installation)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/touseef0707/Chatty-MERN.git
   ```
2. Install NPM packages for both frontend and backend
   ```sh
   cd chatty
   npm install
   cd frontend
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the `backend` directory with the following content:
     ```
     PORT=8000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     NODE_ENV=development
     ```
4. Minor change in `frontend\src\context\SocketContext.jsx`:
   - Update the socket to the following in **line 20**:
     ```
     const socket = io("http://localhost:8000",{
        query: {
           userId: authUser._id
        }
     })
     ```
5. Run the development servers:
   - Start the backend server (from the `main` directory):
     ```sh
     npm run server
     ```
   - Start the frontend server (from the `frontend` directory):
     ```sh
     npm run dev
     ```

6. Open your browser and navigate to `http://localhost:3000` to see the app running.

## Usage

- Register a new account or login with existing credentials.
- Start chatting with other users in real-time.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.
- You may contribute to responsiveness across all devices.
- Add Contact, Delete Contact, Delete Messages, Send Images or GIFS Functionalities.
- And any other great functionalities you may come up with.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/FeatureName`)
3. Commit your Changes (`git commit -m 'Add some FeatureName'`)
4. Push to the Branch (`git push origin feature/FeatureName`)
5. Open a Pull Request

