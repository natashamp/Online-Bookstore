# Use Node.js image
FROM node:14

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port the backend will run on
EXPOSE 5001

# Run the backend server
CMD ["node", "server.js"]
