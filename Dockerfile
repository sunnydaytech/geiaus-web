FROM node:argon
RUN mkdir -p /user/src/app
WORKDIR /user/src/app
COPY package.json /user/src/app/
RUN npm install

COPY . /user/src/app

EXPOSE 8080
CMD ["npm", "start"]
