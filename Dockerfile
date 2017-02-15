FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/smtp-server
WORKDIR /usr/src/smtp-server

ENV NODE_ENV production

# Install app dependencies
COPY package.json /usr/src/smtp-server/
RUN npm install

# Bundle app source
COPY . /usr/src/smtp-server

EXPOSE 8080

CMD [ "npm", "start" ]
