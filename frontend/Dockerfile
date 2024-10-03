FROM node:20.16.0-alpine AS base
WORKDIR /usr/src

# Delete node_modules and package-lock.json for a clean install
RUN rm -rf node_modules
RUN rm -rf package-lock.json

COPY package*.json ./

FROM base AS dev
RUN npm install
COPY . .
EXPOSE 3002
CMD npm run dev