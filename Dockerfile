FROM node:10.15-alpine
RUN apk add --no-cache alpine-sdk python openssh
RUN mkdir app
COPY . ./app
WORKDIR ./app
RUN npm install
ENTRYPOINT ["npm", "run", "prod"]
EXPOSE 3000