FROM node:14

WORKDIR /project

COPY /project/package.json .

RUN npm install
RUN npm install -g typescript

COPY /project ./project

EXPOSE 3003

CMD [ "npm", "run", "dev" ]