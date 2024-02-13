# Use the official Node.js 16 image as a parent image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY todo-app/package*.json ./

# Install node modules
RUN npm install

# Bundle app source
COPY . .

# Command to run the app
CMD [ "node", "todo-app/server.js" ]
