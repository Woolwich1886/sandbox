### базовый образ
FROM openjdk:17-alpine
### метаданные
LABEL info="server"
### назначаем рабочую директорию
WORKDIR /usr/src/server
### копируем все внутрь
COPY . .
### билдим
RUN ./gradlew build
### запускаем
ENTRYPOINT ["java","-jar","./build/libs/server-0.0.1-SNAPSHOT.jar"]