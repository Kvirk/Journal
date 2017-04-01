curl -H "Content-Type: application/json" -X PT -d '{"name": "John", "entry": "I am happy", "rating": 5}' http://localhost:3000/journals

curl -i -H "Accept: applicatint-Type: application/json" -X GET http://localhost:3000/journals/1