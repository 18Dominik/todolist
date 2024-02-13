import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
//import { fileURLToPath } from 'url';
//import path, { dirname } from 'path';

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Middleware

app.use(express.static('./'));
app.use(cors());
app.use(express.json()); // for parsing application/json

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todolist') //change from "localhost" to e.g. mymongo if serve.js is containerized
.then(() => console.log('Successfully connected to MongoDB.'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Define a schema
const TodoSchema = new mongoose.Schema({
  task: String
});
const Todo = mongoose.model('Todo', TodoSchema);

// Routes
app.get('/todolist', async (req, res) => {
  const todos = await Todo.find();
  console.log(todos)
  res.json(todos);
});

// Optionally, explicitly handle the root route
//app.get('/', (req, res) => {
//  res.sendFile(__dirname + '/index.html');
//});

app.post('/todolist', async (req, res) => {
  console.log('Received request:', req.body);
    try {
      const todo = new Todo(req.body);
      await todo.save();
      res.json(todo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding todo" });
    }
  });
  
app.listen(port, () => {
  console.log(`Todo app backend listening at http://localhost:${port}`);
});


/* Test API with cURL: 
curl -X POST http://localhost:3000/todolist \
  -H "Content-Type: application/json" \
  -d '{"task": "Test Todo"}'

curl -H "Accept: application/json" http://localhost:3000/todolist

Run application
-> in working directory ./todo-app: node server.js

Start Mongo DB Instance
1. Pull Docker Image: docker pull mongo
2. Run docker container: docker run --name mymongo -d -p 27017:27017 mongo
3. Connect with VSCode extension: Connection string to mongo db VS Code extension with default docker settings: mongodb://localhost:27017

Containerize Application
1.create network: docker network create mynetwork
2. Run MongoDB in network:  docker run --name mymongo --network mynetwork1 -d -p 27017:27017 mongo
3. Create image: docker build -t todoapp2 .
4. Run application container image: docker run --network mynetwork1 todoapp9


*/

