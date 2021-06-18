const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./schema/schema')
require('dotenv').config()

const app = express()


app.use(cors())

mongoose.connect(process.env.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

mongoose.connection.once('open', () => console.log('Connected to database'))


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

if (process.env.NODE_ENV === "production"{
    app.use(express.static("build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname,  "build", "index.html"));
    });
  }

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is up at port ${port}`))