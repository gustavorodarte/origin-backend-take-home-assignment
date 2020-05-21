FROM node:latest

# Maintainer Information
LABEL author="Gustavo Rodarte"
LABEL license="GPLv3"
WORKDIR /home/node/app


# Copy project production folders
COPY ./config ./config
COPY ./src ./src

# Copy config files
COPY ./index.js ./index.js
COPY ./package.json ./package.json

# install dependencies
RUN npm install --production

# Configure container network
EXPOSE 3000
