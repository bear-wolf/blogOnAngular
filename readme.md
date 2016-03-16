#Запуск проекта
1) -й крок
npm install

2) с дебагером
  node --debug app/index.js
  cd node-modules\.bin\
  node-inspector.cmd

  Локальный адрес дебагера  
  http://127.0.0.1:8080/debug?port=5858
  
3) Запуск сервера даних (окремо)
   json-server server/db.json
 
  Будуть доступні наступні url
  http://localhost:3000/albums
  http://localhost:3000/comments
  http://localhost:3000/photos
  http://localhost:3000/posts
  http://localhost:3000/todos
  http://localhost:3000/users

