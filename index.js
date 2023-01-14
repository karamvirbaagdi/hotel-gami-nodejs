const express = require('express')
const app = express();
const router = express.Router();
const port = 3030;
const route  = require("./routes/route");
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
// respond with "hello world" when a GET request is made to the homepage

app.use('/api', route);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })