FROM node:6-slim
COPY . /app
WORKDIR /app
RUN npm install -g @angular/cli
RUN npm install