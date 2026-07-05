# Poll / Voting API

A simple backend API for creating polls, casting votes, and viewing results — built with Node.js and Express.

Project 2 — DecodeLabs Full Stack Training (Backend API Development)

## Features

- Create polls with a question and multiple options
- List all polls / fetch a single poll
- Vote on a poll option
- View tallied results with percentages
- Delete a poll
- Input validation on every write endpoint
- Proper HTTP status codes (200, 201, 204, 400, 404, 500)

## Setup

```bash
npm install
npm start
```

The server runs on `http://localhost:3000` by default (set the `PORT` env var to change it).

For auto-restart on file changes during development:

```bash
npm run dev
```

## Data model

Data is stored in memory (a JS array), so it resets whenever the server restarts. This keeps the project focused on API design rather than database setup — a natural next step would be swapping `models/pollStore.js` for a real database.

```
Poll
├── id           (string, UUID)
├── question     (string)
├── options[]
│   ├── id       (string, UUID)
│   ├── text     (string)
│   └── votes    (number)
└── createdAt    (ISO timestamp)
```

## Endpoints

| Method | Route                | Description                          |
|--------|----------------------|--------------------------------------|
| POST   | `/polls`             | Create a new poll                    |
| GET    | `/polls`             | List all polls                       |
| GET    | `/polls/:id`         | Get a single poll                    |
| DELETE | `/polls/:id`         | Delete a poll                        |
| POST   | `/polls/:id/vote`    | Cast a vote for an option            |
| GET    | `/polls/:id/results` | Get vote counts + percentages        |

## Example requests

**Create a poll**

```bash
curl -X POST http://localhost:3000/polls \
  -H "Content-Type: application/json" \
  -d '{"question":"Best pizza topping?","options":["Pepperoni","Mushroom","Pineapple"]}'
```

Response — `201 Created`:

```json
{
  "id": "3f2786f1-8e74-4c53-916f-c197f49aaffe",
  "question": "Best pizza topping?",
  "options": [
    { "id": "639f002b-...", "text": "Pepperoni", "votes": 0 },
    { "id": "26910853-...", "text": "Mushroom", "votes": 0 },
    { "id": "6ba94ad7-...", "text": "Pineapple", "votes": 0 }
  ],
  "createdAt": "2026-07-04T13:57:18.861Z"
}
```

**Vote on an option**

```bash
curl -X POST http://localhost:3000/polls/{pollId}/vote \
  -H "Content-Type: application/json" \
  -d '{"optionId":"639f002b-6f5d-439c-8443-de369f8e6463"}'
```

**Get results**

```bash
curl http://localhost:3000/polls/{pollId}/results
```

```json
{
  "id": "3f2786f1-8e74-4c53-916f-c197f49aaffe",
  "question": "Best pizza topping?",
  "totalVotes": 2,
  "options": [
    { "id": "639f002b-...", "text": "Pepperoni", "votes": 2, "percentage": 100 },
    { "id": "26910853-...", "text": "Mushroom", "votes": 0, "percentage": 0 },
    { "id": "6ba94ad7-...", "text": "Pineapple", "votes": 0, "percentage": 0 }
  ]
}
```

## Validation rules

| Case                                   | Response                     |
|-----------------------------------------|-------------------------------|
| Empty/missing `question`                | `400 Bad Request`             |
| Fewer than 2 `options`, or blank options | `400 Bad Request`             |
| Missing/invalid `optionId` on vote       | `400 Bad Request`             |
| `optionId` doesn't belong to the poll    | `400 Bad Request`             |
| Poll `id` not found                      | `404 Not Found`               |
| Malformed JSON body                      | `400 Bad Request`             |
| Unhandled route                          | `404 Not Found`               |
| Uncaught server error                     | `500 Internal Server Error`   |

## Project structure

```
poll-voting-api/
├── server.js                    # App entry point
├── routes/polls.js              # Route definitions
├── controllers/pollController.js # Request handling + validation
├── models/pollStore.js          # In-memory data + business logic
├── middleware/errorHandler.js   # 404 + centralized error handling
└── package.json
```

## Ideas to extend it (for portfolio credit)

- Add a `PATCH /polls/:id` to edit a poll's question
- Prevent duplicate votes per user (e.g., via an `X-User-Id` header or IP tracking)
- Add poll expiry (`closesAt` field, reject votes after that time with `403`)
- Swap the in-memory store for SQLite/MongoDB
- Add pagination to `GET /polls`
