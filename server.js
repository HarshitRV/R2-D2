import express from "express"

const server = express()

const PORT = process.env.PORT || 3000

server.all("/", (req, res) => {
  res.send({
    status: 200,
    message: "Hello from R2-D2. I am online"
  })
})

export const keepAlive = () => {
  server.listen(PORT, () => {
    console.log("R2-D2 is online")
  })
}