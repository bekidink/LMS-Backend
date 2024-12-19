# Use an official Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package.json package-lock.json ./

# Install dependencies, including dev dependencies for TypeScript types
RUN npm install --include=dev

# Copy the source code into the container
COPY . .

# Compile TypeScript into the build directory
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Command to start the app (ensure that the server.js is inside the build directory)
CMD ["node", "build/server.js"]
