FROM node:latest

# Maintainer Information
LABEL author="Gustavo Rodarte"
LABEL license="GPLv3"
WORKDIR /home/node/app


# Configure container network
EXPOSE 3000
EXPOSE 9229
