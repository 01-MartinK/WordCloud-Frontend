FROM node:20
WORKDIR /app
COPY . .
RUN yarn install
CMD ["npm", "start"]
EXPOSE 3000