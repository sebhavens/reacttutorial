const express = require('express')
const { Pool, Client } = require('pg')
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json()); // support json encoded bodies

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'taskmanager',
  password: 'postgres',
  port: 5432,
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://tasks.sebhavens.com');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    next();
});

app.listen(3000, () => {
    console.log('server is running on port 3000');
    pool.query("DO IF EXISTS tasks"), (err, response) => {
        if(err) {
            return err
        }
        console.log(response);
    }
    // pool.query("CREATE TABLE tasks(id SERIAL PRIMARY KEY, text TEXT, day TEXT, reminder BOOLEAN);"), (err, res) => {
    //     console.log(err, res);
    // }
    //SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tasks');
})

//Get all tasks
app.get('/tasks', (req, res, next) => {
    pool.query('SELECT * FROM tasks', (err, response) => {
        if (err) {
            return next(err)
        }
        var data = response.rows
        res.send(data)
    })
})

//Get specific task
app.get('/tasks/:id', (req, res, next) => {
    pool.query('SELECT * FROM tasks WHERE id = $1', [req.params.id], (err, response) => {
        if(err) {
            return next(err)
        }
        res.send(response.rows[0])
    })
})

//Add Task
app.post('/tasks', (req, res, next) => {
    data = req.body
    text = data.text
    day = data.day
    reminder = data.reminder
    pool.query("INSERT INTO tasks(text,day,reminder)VALUES($1,$2,$3)RETURNING *", [text, day, reminder], (err, response) => {
        if(err) {
            return next(err)
        }
        res.send(response.rows[0])
    })
})

//Delete Task
app.delete('/tasks/:id', (req, res, next) => {
    pool.query("DELETE FROM tasks WHERE id =$1", [req.params.id], (err, response) => {
        if(err) {
            return next(err)
        }
        res.send('success')
    })
})

//Update Task (reminder)
app.put('/tasks/:id', (req, res, next) => {
    reminder = req.body.reminder
    pool.query("UPDATE tasks SET reminder = ($1) WHERE id = ($2) RETURNING *", [reminder, req.params.id], (err, response) => {
        if(err) {
            return next(err)
        }
        res.send(response.rows[0])
    })
})