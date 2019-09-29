// const express = require('express')
// var cors = require('cors')
// const app = express()
// const port = 3001
// const bodyParser = require('body-parser')
// const mongodb = require('mongodb')
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://admin:admin@tvdemo-32tgz.mongodb.net/test?retryWrites=true&w=majority";
// const instance = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });





const express = require('express')
const app  = express()
const port = 3001
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const MongoClient = require('mongodb').MongoClient;
const uri =  "mongodb+srv://admin:7cNWQA0Xpha8wCZI@tvdemo-32tgz.mongodb.net/test?retryWrites=true&w=majority";

const instance = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true});

app.use(bodyParser.json())
app.use((req, res, next) => {
     // Website you wish to allow to connect
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

     // Request methods you wish to allow
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
     // Request headers you wish to allow
     res.setHeader('Access-Control-Allow-Headers', 'application/json, content-type');
 
     // Set to true if you need the website to include cookies in the requests sent
     // to the API (e.g. in case you use sessions)
     res.setHeader('Access-Control-Allow-Credentials', true);
 
     // Pass to next layer of middleware
     next();
})


app.post('/tvDemo', (req, res) => {
  instance.connect((err, client) => {
    if (err) res.send(err)
    const collection = client.db("tvdemo").collection("tvdemo")
    collection.insertOne(req.body).then(r => res.send(r.ops))
  })
})

app.get('/getAllTvShows', (req, res) => {
  instance.connect((err, client) => {
    if (err) res.send(err)
    const collection = client.db("tvdemo").collection("tvdemo")
    collection.find().toArray().then(r => res.send(r))
  })
})

app.get("/findShowWithId/:id", (req, res) => {
  instance.connect((err, client) => {
    if (err) res.send(err)
    const collection = client.db("tvdemo").collection("tvdemo")
    collection.findOne({ "_id": mongodb.ObjectId(req.params.id) }, (error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.send(result);
    })
  })
})

app.delete("/findShowWithId/:id", (req, res) => {
  instance.connect((err, client) => {
    if (err) res.send(err)
    const collection = client.db("tvdemo").collection("tvdemo")
    collection.findOneAndDelete({ "_id": mongodb.ObjectId(req.params.id) }, (error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.send(result);
    })
  })
})

app.put("/updateShow/:id", (req, res) => {
  instance.connect((err, client) => {
    if (err) res.send(err)
    const collection = client.db("tvdemo").collection("tvdemo")
    collection.replaceOne(
      { "_id": mongodb.ObjectId(req.params.id) }, 
      req.body,
      {upsert: true}
    ).then(r => res.send(r.ops))
  })
})

// app.post('/tvDemo', (req, res) => {
//   instance.connect((err, client) => {
//     if(err) res.send(err)
//     const collection = client.db("tvdemo").collection("tvdemo")
//     collection.insertOne(req.body).then(r => res.send(r.ops))
//   })
//   })

app.get('/getAllTvShows', (req,res) => {
  instance.connect((err, client) => {
    if(err) res.send(err)
    const collection=client.db("tvdemo").collection("tvdemo")
    collection.find().toArray().then(r => res.send(r))
  })
}) 

// app.get("/findShowWithId/:id", (req,res) => {
//   instance.connect((err, client) => {
//     if(err) res.send(err)
//     const collection=client.db("tvdemo").collection("tvdemo")
//     collection.findOne({ "_id": mongodb.ObjectId(req.params.id) }, (error, result) => {
//       if(error) {
//           return res.status(500).send(error);
//       }
//       res.send(result);
//   })  
// })
// })



// app.delete("/findShowWithId/:id", (req,res) => {
//   instance.connect((err, client) => {
//     if(err) res.send(err)
//     const collection=client.db("tvdemo").collection("tvdemo")
//     collection.findOneAndDelete({ "_id": mongodb.ObjectId(req.params.id) }, (error, result) => {
//       if(error) {
//           return res.status(500).send(error);
//       }
//       res.send(result);
//   })  
// })
// })
// app.post('/tvDemo', (req, res) => {
//   const collection = client.db("tvdemo").collection("tvdemo")
//   collection.insertOne(req.body).then(r => req.sernd(r.ops)) 
// })
// app.get('/getAllTvShows', (req, res) => {
//   instance.connect((err, client)=> {
//     if(err) res.send(err)
//     const collection = client.db("tvdemo").collection("tvdemo")
//     collection.find().toArray().then(r => res.send(r))
//   })
// }
// )

// app.get('/findShowWithId/:id', (req, res) => {
//   collection.finOne({_id: req.params.id}).then((data) => {
//     res.send(data)
//     db.close()
//   })
// }) 


// let tvShowsArray = []

// app.get('/', (req, res) => res.send(tvShowsArray))

// app.post('/', (req, res) => {
//   tvShowsArray = [...tvShowsArray, req.body]
//   res.send(tvShowsArray)
// })

// app.put('/', (req, res) => {
//   tvShowsArray = [...tvShowsArray, req.body]
//   res.send(tvShowsArray)
// })

// app.delete('/', (req,res) => res.send(`Delete show`))






app.listen(port, () => console.log(`Example app listening on port ${port}!`))


