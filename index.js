const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Sorob Organization!')
})

app.listen(port, () => {
  console.log(`Sorob Organization on port is running ${port}`)
})