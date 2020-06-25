const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

app.get('/students', db.getStudents)
app.get('/students/:studentId', db.getStudent)
app.get('/grades/:studentId', db.getGrades)
app.post('/addgrade', db.postGrades)
app.post('/register', db.postRegister)