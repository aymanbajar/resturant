FROM node:18

# set working directory
WORKDIR /app

# copy package files
COPY package*.json ./

# install dependencies
RUN npm install

# copy project files
COPY . .

# build typescript
RUN npm run build

# expose port
EXPOSE 5000

# start the app (compiled JS)
CMD ["npm", "start"]
