'use strict'
const crypto = require('node:crypto')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const HOST = 'localhost'
const PORT = 3000
const SERVICE_NAME = 'adagio-2'
const SERVICE_VERSION = '2.0.0'

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({
    message: "Hello from Adagio-2 ;-)",
    internalInfo: {
      serviceName: SERVICE_NAME,
      version: SERVICE_VERSION,
      hostname: process.env.HOSTNAME
    }
  })
})

const items = []

/*
POST /items
{
  "data": "This is the 1st item ;-)"
}
201 Created
{
  "id": "40184b1f-1610-45d5-854f-ee628d89d2ab",
  "data": "This is the 1st item ;-)"
}
*/
app.post('/items', (req, res) => {
  const id = crypto.randomUUID()
  const data = req.body.data
  const item ={
    id: id,
    data: data
  }
  items.push(item)
  res.status(201).json(item)
})

app.listen(PORT, HOST, () => {
  console.log(`Server is listening on <http://${HOST}:${PORT}>...`)
})
