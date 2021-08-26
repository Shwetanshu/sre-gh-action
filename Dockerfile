FROM node:10

WORKDIR /usr/src/app

RUN apt-get update \
 && apt-get dist-upgrade -y \
 && apt-get clean \
 && npm install -g node-gyp \
 && npm install appmetrics-prometheus \
 && echo 'Finished installing dependencies'

COPY package.json ./

RUN npm install 
RUN npm audit fix --force

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
