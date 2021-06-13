FROM node:12.18.3

LABEL version="1.0"
LABEL description="This is a react front."
LABEL maintainer = ["juan.pedro.cuenca.sevilla@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
