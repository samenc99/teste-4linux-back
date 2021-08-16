FROM node:14

WORKDIR /project

COPY /project/package.json .

RUN npm install

COPY /project ./project

EXPOSE 3003

CMD [ "npm", "run", "dev" ]