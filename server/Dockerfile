FROM node:16

WORKDIR /server
COPY package*.json /server/
COPY . /server/
RUN npm install
EXPOSE 4000
CMD ["npm", "run", "dev"]