# Journal app - Webpage for creating journals

### UP & RUNNING
* `npm install`
* `npm start`
* visit `http://localhost:3000/`

### Example Curl for API calls to create and get journal entrys

* `curl -H "Content-Type: application/json" -X PT -d '{"name": "John", "entry": "I am happy", "rating": 5}' http://localhost:3000/journals`

* `curl -i -H "Accept: applicatint-Type: application/json" -X GET http://localhost:3000/journals/${x}`

Where ${x} is the id of the post you want to see

### .env
MONGODB_URI=..

ex:
MONGODB_URI=mongodb://localhost:27017/journal
