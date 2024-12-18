# Use an official Node.js image as a base
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if present) and install dependencies
COPY package*.json ./
RUN npm install --unsafe-perm

# Ensure the correct permissions for node modules
RUN chmod -R 755 /app/node_modules/.bin

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Prune unnecessary packages for production
RUN npm prune --production

# Start from a fresh Node.js image for the production environment
FROM node:20

# Set working directory for the app
WORKDIR /app

# Copy the build output and dependencies from the build stage
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package*.json /app/

# Set environment variables
ENV NODE_ENV=production

# Expose the port your app will run on
EXPOSE 3000

# Start the application (use your own entry point if different)
CMD ["node", "dist/index.js"]
