from node:16-alpine

WORKDIR /app

COPY . .

EXPOSE 3000

RUN npm update && npm install

CMD ["npm","start"]