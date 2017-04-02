# Journal app - Webpage for creating journals

### UP & RUNNING
* `npm install`
* `npm start`
* visit `http://localhost:3000/`

### Example Curl for API calls to create and get journal entrys

* `curl -H "Content-Type: application/json" -X PT -d '{"name": "John", "entry": "I am happy", "rating": 5}' http://localhost:3000/journals`

* `curl -i -H "Accept: applicatint-Type: application/json" -X GET http://localhost:3000/journals/${x}`

Where ${x} is the id of the post you want to see. Ids start from 1 and increment for every post by 1.

### .env
`MONGODB_URI=...`
`PORT=...`

ex:
`PORT=3000`
`MONGODB_URI=mongodb://localhost:27017/journal`

`Default webport is 3000 and default MONGODB_URL is 'mongodb://localhost:27017/journal' if not given`
