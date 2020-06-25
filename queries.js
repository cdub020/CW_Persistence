const Pool = require('pg').Pool
const pool = new Pool({
  user: 'chris',
  host: 'localhost',
  database: 'students',
  port: 5432,
})

//Table Fields:
//     id : Auto int
//     name : student name
//     grade : grade for student
//     studentid : Student's ID

//Get student by "search=(name)" or display all records
const getStudents = (req, res) => {
    let search = req.query.search
    if (search !== undefined){
        pool.query('SELECT * FROM students WHERE name = $1', [search], (error, results) => {
            if (error) {
                throw error
              }
              res.status(200).json(results.rows)
            })
    }
    else{
        pool.query('SELECT * FROM students ORDER BY name ASC', (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })
    } 
}

//Get student data by studentid
const getStudent = (req,res) => {
    const studentId = req.params.studentId;

    pool.query('SELECT * FROM students WHERE studentid = $1', [studentId], (error, results) => {
        if (error) {
            throw error
          }
          res.status(200).json(results.rows)
    })
}

//Get all grades for student based on studentid
const getGrades = (req,res) => {
    const studentid = req.params.studentId;

    pool.query('SELECT grade FROM students WHERE studentid = $1', [studentid], (error, results) => {
        if (error) {
            throw error
          }
          res.status(200).json(results.rows)
    })
}

//Post a new grade for student based on student id
const postGrades = (req,res) => {
    const grade = req.body.grade;
    const studentid = req.body.studentid;

    pool.query('INSERT INTO students (name, grade, studentid) VALUES ((SELECT name FROM students WHERE studentid = $2 LIMIT 1), $1, $2)', [grade, studentid], (error, results) => {
        if (error) {
            throw error
          }
          res.send("Success!");
          res.status(200);
    })
}

//Add a new student into the database
const postRegister = (req,res) => {
    const newuser = req.body

    pool.query('INSERT INTO students (name, grade, studentid) VALUES ($1, $2, $3)', [newuser.name, newuser.grade, newuser.studentid], (error, results) => {
        if (error) {
            throw error
          }
          res.send("Success!");
          res.status(200);
    })
}

  module.exports = {
    getStudents,
    getStudent,
    getGrades,
    postGrades,
    postRegister,
  }