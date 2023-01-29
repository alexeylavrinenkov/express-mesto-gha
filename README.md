# 🗄 Серверная часть сервиса Mesto
**«Mesto»** — это веб-сервис, с помощью которого пользователи могут обмениваться фотографиями своих любимых мест (и не только) и оценивать чужие фотографии. Проект был выполнен в рамках серии проектных работ в Яндекс Практикуме по профессии «Веб-разработчик».

## Функционал
* Проверка токенов
* Регистрация и авторизация пользователей
* Cохранение и выдача карточек
* Cохранение и удаление лайков

## Архитектура
<img alt="app-architecture" src="https://user-images.githubusercontent.com/100028583/215335139-42a77150-697a-4d59-98e4-bbd1da0d3126.png">

## Технологии
* Node.js
* Express.js
* Mongoose
* MongoDB
* Bcrypt
* Celebrate
* Helmet
* ESLint
* Git

## Как посмотреть проект?
Выполните последовательность команд:
```
git clone https://github.com/alexeylavrinenkov/express-mesto-gha.git
cd express-mesto-gha
npm i
npm start
```

## Что можно доработать?
* Очистка пользовательского ввода с помощью пакета ```XSS-Clean```
* Удаление запрещенных символов ```$``` и ```.``` из ```req.body```, ```req.query``` и ```req.params``` с помощью пакета ```Express Mongo Sanitize```
* Защита от обхода проверок ввода и DoS-атак с помощью ошибки ```Uncaught TypeError``` в асинхронном коде, приводящей к сбою сервера. Воспользоваться пакетом ```HPP```  

## Другие учебные проекты из Яндекс Практикума
1. [Научиться учиться](https://github.com/alexeylavrinenkov/how-to-learn)
2. [Путешествие по России](https://github.com/alexeylavrinenkov/russian-travel)
3. [Mesto (чистый JavaScript)](https://github.com/alexeylavrinenkov/mesto-react)
4. [Mesto (React)](https://github.com/alexeylavrinenkov/mesto-react)
5. [Mesto (React, авторизация)](https://github.com/alexeylavrinenkov/react-mesto-auth)
6. Mesto (серверная часть) ⬅ текущий репозиторий
