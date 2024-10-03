FROM node:20.16.0-alpine AS base
WORKDIR /usr/src/backend

# Delete node_modules and package-lock.json for a clean install
RUN rm -rf node_modules
RUN rm -rf package-lock.json

COPY prisma ./
COPY package*.json ./

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.11.0/wait /wait
RUN chmod +x /wait

FROM base AS dev
RUN npm install
COPY . .
EXPOSE 3001
CMD /wait && npm start

# COPY ./docker-entrypoint.sh /docker-entrypoint.sh
# ENTRYPOINT ["docker-entrypoint.sh"]