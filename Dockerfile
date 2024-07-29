# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install serve - a static file serving module for Node.js
RUN npm install -g serve

# Make port 80 available to the world outside this container
EXPOSE 80

# Run serve when the container launches
CMD ["serve", "-s", ".", "-l", "80"]
