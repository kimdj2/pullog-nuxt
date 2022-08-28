FROM node:16

ENV APP_HOME /app
ENV NUXT_HOST 0.0.0.0
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY package*.json ./
RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "run", "start"]

