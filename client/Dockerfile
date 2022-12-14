FROM node:16

WORKDIR /client

COPY ./package*.json /client/

COPY . /client/

RUN yarn install

EXPOSE 3000 

CMD ["yarn","start"]