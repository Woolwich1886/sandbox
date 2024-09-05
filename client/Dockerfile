### базовый образ ноды
FROM node:alpine3.20 as nodestage
### метаданные
LABEL info="client"
### назначаем рабочую директорию
WORKDIR /usr/src/client
### копируем все внутрь
COPY . .
### устанавливам ангуляр
RUN npm install -g @angular/cli
### устанавливаем зависимости
RUN npm install
### собираем
RUN npm run build
### базовый образ нжинкса
FROM nginx:stable-alpine3.20
### копируем конфиг
COPY ./nginx.conf /etc/nginx/nginx.conf
### копируем билда клиента
COPY --from=nodestage /usr/src/client/dist/browser /usr/share/nginx/html
### запускаем
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]