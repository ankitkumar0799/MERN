const connectToMongo = require('./db');



connectToMongo();


const express = require('express')
const app = express()
const port = 5000



//avalable routes


app.use(express.json())


app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello ankit!')
})



app.listen(port, () => {
  console.log(`Inotebook listening on port http://localhost:${port}`)
})
