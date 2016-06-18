FROM node:argon
RUN mkdir -p /user/src/app
WORKDIR /user/src/app
COPY package.json /user/src/app
RUN npm install
RUN ls
COPY server.js /user/src/app
COPY submodules /user/src/app/submodules
COPY views /user/src/app/views
COPY public /user/src/app/public
RUN ls


EXPOSE 8080
CMD ["npm", "start"]
