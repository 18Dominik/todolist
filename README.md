# todolist
Full Stack Project for ToDo list where you can add and remove single tasks
## Covered:
•	Fullstack (node.js. docker, mongodb)

•	Docker file, docker network, docker compose

•	Gitpod (.gipod.yml)

## Setup
- make sure to make ports public
- `.gitpod-yml`starts server.js on localhost
- If you want to containerize the app (`server.js`), run the dockerfile

### Start Mongo DB Instance
1. Pull Docker Image: `docker pull mongo`
2. Run docker container: `docker run --name mymongo -d -p 27017:27017 mongo`
3. Connect with VSCode extension: Connection string to mongo db VS Code extension with default docker settings: `mongodb://localhost:27017`
   
### Containerize Application
Make sure you change localhost to mymongo: `mongoose.connect('mongodb://mymongo:27017/todolist')` instead of `mongoose.connect('mongodb://localhost:27017/todolist')`
1. create network: `docker network create mynetwork`
2. Run MongoDB in network:  `docker run --name mymongo --network mynetwork -d -p 27017:27017 mongo`
3. Create image: `docker build -t todoapp .`
4. Run application container image: `docker run --network mynetwork -p 3000:3000 todoapp`

### Docker Compose
Make sure you change localhost to mymongo: `mongoose.connect('mongodb://mymongo:27017/todolist')` instead of `mongoose.connect('mongodb://localhost:27017/todolist')`
Start: `docker-compose up --build`
Close: `docker-compose down`

