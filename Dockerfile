# Use the official Node.js 16 image as a parent image
FROM node:16

# Set the working directory
WORKDIR /todo-app

# Copy package.json and package-lock.json
COPY todo-app/package*.json ./

# Install node modules
RUN npm install

# Bundle app source
COPY todo-app/ .

# Your application binds to port 3000, so use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Command to run the app
CMD [ "node", "server.js" ]
