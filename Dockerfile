FROM node:14.16.0
WORKDIR /usr/src/youfaceit
COPY package*.json ./

RUN npm install
COPY . .

CMD [ "npm", "start" ]