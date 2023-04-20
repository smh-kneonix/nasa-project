FROM node:lts-alpine
WORKDIR /app

COPY package*.json ./
COPY . ./

COPY client/package*.json client/
RUN npm run install-client --only=production

COPY server/package*.json server/
RUN npm run install-server --only=production


COPY client/ client/
RUN npm run build --prefix client


USER node

COPY server/ server/
CMD [ "npm", "start", "--prefix", "server"]
# CMD [ "npm", "run", "server"]

EXPOSE 8000