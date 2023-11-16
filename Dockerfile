FROM node:20.8
RUN apt-get install npm npx
WORKDIR /app
COPY . .
CMD ["npm", "install", "--force"]
CMD ["npm", "run build"]
CMD ["npm", "start"]
EXPOSE 3000