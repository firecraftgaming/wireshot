FROM node:18

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn install

COPY . /app

ENV PORT=80
EXPOSE 80
CMD ["yarn", "start"]
