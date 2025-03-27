const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()

const app = express()  
app.use(express.json())  
app.use(cors())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.i1uhr.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });

    const julyVideos = client.db("julyVideosCollection").collection("julyVideos");
    const  martyr = client.db("martyrCollection").collection("martyr");
    const  storiesData = client.db("storiesCollection").collection("stories");

   app.get('/projects/july-uprising/videos', async(req, res) => {
    const cursor = julyVideos.find();
    const result = await cursor.toArray();
    res.send(result)
   })
   app.get('/projects/july-uprising/martyr', async(req, res) => {
    const cursor = martyr.find();
    const result = await cursor.toArray();
    res.send(result)
   })
   app.get('/projects/july-uprising/stories', async(req, res) => {
    const cursor = storiesData.find();
    const result = await cursor.toArray();
    res.send(result)
   })
   app.get('/projects/july-uprising/stories/:id', async(req, res) => {
    const id = req.params.id;
    const query3 = { _id: new ObjectId(id) }
    const stories1 = await storiesData.findOne(query3);
      res.send(stories1)
   })


   app.get('/projects/july-uprising/videos/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const video = await julyVideos.findOne(query);
      res.send(video)
   })
   app.get('/projects/july-uprising/martyr/:id', async (req, res) => {
    const id = req.params.id;
    const query2 = { _id: new ObjectId(id) }
    const martyrs = await martyr.findOne(query2);
      res.send(martyrs)
   })




    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Sorob Organization!')
})

app.listen(port, () => {
  console.log(`Sorob Organization on port is running ${port}`)
})
