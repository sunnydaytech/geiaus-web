FROM node:argon
RUN mkdir -p /user/src/app
WORKDIR /user/src/app
COPY package.json /user/src/app
RUN npm install
RUN ls
COPY . /user/src/app
RUN ls


EXPOSE 8080
CMD ["npm", "start"]
