# 🗳️ Poll Voting API

A RESTful API built with **Node.js**, **Express.js**, and **MongoDB** that allows users to create polls, vote on options, and retrieve poll results.

## 🚀 Features

- Create new polls
- Get all polls
- Get a poll by ID
- Vote on poll options
- View poll results
- RESTful API architecture
- MongoDB database integration
- Error handling and validation

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- Postman (API Testing)

---

## 📂 Project Structure

```
poll-voting-api/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── node_modules/
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

---

## 📦 Installation

### Clone the repository

```bash
git clone https://github.com/harshvardhanghadge07/Decodelabs_project_2.git
```

### Navigate into the project

```bash
cd Decodelabs_project_2
```

### Install dependencies

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

---

## ▶️ Run the Project

Development mode

```bash
npm run dev
```

or

```bash
node server.js
```

---

## 📌 API Endpoints

### Create Poll

```
POST /api/polls
```

### Get All Polls

```
GET /api/polls
```

### Get Poll by ID

```
GET /api/polls/:id
```

### Vote

```
POST /api/polls/:id/vote
```

### Get Poll Results

```
GET /api/polls/:id/results
```

---

## 📸 Sample Request

```json
{
  "question": "Which programming language do you like the most?",
  "options": [
    "JavaScript",
    "Python",
    "Java",
    "C++"
  ]
}
```

---

## 📤 Sample Response

```json
{
  "success": true,
  "message": "Poll created successfully",
  "data": {
    "_id": "...",
    "question": "Which programming language do you like the most?",
    "options": [
      {
        "text": "JavaScript",
        "votes": 0
      },
      {
        "text": "Python",
        "votes": 0
      }
    ]
  }
}
```

---

## 🧪 Testing

Use **Postman** or any REST client to test the API.

---

## 📖 Future Improvements

- User Authentication
- JWT Authorization
- Poll Expiry
- Prevent Duplicate Votes
- Admin Dashboard
- Swagger API Documentation
- Docker Support

---

## 👨‍💻 Author

**Harshvardhan Ghadge**

GitHub: https://github.com/harshvardhanghadge07

LinkedIn: *(Add your LinkedIn profile here)*

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.
