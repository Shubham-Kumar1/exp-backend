FROM node:18-alpine

# Install dependencies needed for native modules (including Python and build tools)
RUN apk add --no-cache python3 make g++ \
  && ln -sf python3 /usr/bin/python

# Set working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json (if available)
COPY package*.json /usr/app/

# Install dependencies
RUN npm install
# Copy the rest of the application files to the working directory
COPY . .

RUN npx prisma generate

# Expose the port your app will run on
EXPOSE 3000

# Run the application
CMD [ "npm", "run", "dev" ]

