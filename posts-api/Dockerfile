FROM node:alpine

# Set the working directory to /api
WORKDIR /app/api

# copy package.json into the container at /api
COPY package*.json ./

# install dependencies
RUN npm install

# Copy the current directory contents into the container at /api
COPY . .


# this doesn't expose to the system
# EXPOSE 5500

# Run the app when the container launches
CMD ["npm", "start"]