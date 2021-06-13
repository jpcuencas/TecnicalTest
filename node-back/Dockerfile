FROM node:12.18.3

LABEL version="1.0"
LABEL description="This is backend nodets."
LABEL maintainer = ["juan.pedro.cuenca.sevilla@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install
COPY . .

EXPOSE 8081

CMD ["npm", "start"]