import express, { Express, Request, Response } from "express"
import cors from "cors"
import { PrismaClient } from '@prisma/client'
import { saveTask } from "./controllers/tasks/saveTaskController"
import { getDoneTasks, getTasks, getTask } from "./controllers/tasks/getTasksController"
import deleteTask from "./controllers/tasks/deleteTasksController"
import { updateTask } from "./controllers/tasks/updateTaskController"
import expressBasicAuth from "express-basic-auth"
import * as basicAuth from 'express-basic-auth'
import { saveCrushEditor } from "./controllers/crushEditor/saveCrushEditorController"
import getCrushEditorState from "./controllers/crushEditor/getCrushEditorState"
import { saveCard } from "./controllers/cards/saveCard"
import { getCards } from "./controllers/cards/getCards"
import { updateCard } from "./controllers/cards/updateCard"

const path = require("path");

const prisma = new PrismaClient()

const PORT = process.env.PORT || 3001
const app = express()
app.use(cors())
app.use(express.json())

if (process.env.REACT_APP_APP_ENV === "production") {
  app.use(expressBasicAuth({
    users: {
      "guest": process.env.GUEST_PASSWORD as string,
      "arturkesik": process.env.ADMIN_PASSWORD as string
    },
    challenge: true
  }))
}

function getUserIdFromReq(req: basicAuth.IBasicAuthedRequest) {
  if (process.env.REACT_APP_APP_ENV === "dev") {
    return 1
  }
  if (req.auth.user === "guest") {
    return 1
  } else if (req.auth.user === "arturkesik") {
    return 2
  } else {
    return 0
  }
}

app.use(express.static(path.resolve(__dirname, "./../../front-salaryman/build")));

app.get("/tasks", (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req as basicAuth.IBasicAuthedRequest)
  getTasks(req, res, userId, prisma)
})

app.get("/tasks/done", (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req as basicAuth.IBasicAuthedRequest)
  getDoneTasks(req, res, userId, prisma)
})

app.get("/task/:taskId", (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req as basicAuth.IBasicAuthedRequest)
  getTask(req, res, userId, prisma)
})

app.post("/tasks/new", (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req as basicAuth.IBasicAuthedRequest)
  saveTask(req, res, userId, prisma)
})

app.post("/tasks/delete", (req: Request, res: Response) => {
  deleteTask(req, res, prisma)
})

app.put("/tasks", (req: Request, res: Response) => {
  updateTask(req, res, prisma)
})

app.post("/crush_editor/new", (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req as basicAuth.IBasicAuthedRequest)
  saveCrushEditor(req, res, userId, prisma)
})

app.get("/crush_editor/:crushEditorDay", (req: Request, res: Response) => {
  console.log("Crush Editor GET")
  console.log(req)
  const userId = getUserIdFromReq(req as basicAuth.IBasicAuthedRequest)
  getCrushEditorState(req, res, userId, prisma)
})

app.post("/card/new", (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req as basicAuth.IBasicAuthedRequest)
  saveCard(req, res, userId, prisma)
})

app.get("/cards", (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req as basicAuth.IBasicAuthedRequest)
  getCards(req, res, userId, prisma)
})

app.post("/card/update", (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req as basicAuth.IBasicAuthedRequest)
  updateCard(req, res, userId, prisma)
})
 

// hacky way to clear test_db between tests. Probably would need docker to run tests in real isolation
app.get("/dangerous/only_in_dev/clear_database", async (req: Request, res: Response) => {
  if (process.env.REACT_APP_APP_ENV !== "dev") { return }
  console.log("Clearing the db")
  await prisma.task.deleteMany({})
  await prisma.crushEditorState.deleteMany({})
  await prisma.card.deleteMany({})
  // const user = await createSeedUser("qnsi")
  // await createSeedDocumentWithBullet("main", user.id)
  res.json({status: "ok"})
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'./../../front-salaryman/build/index.html'));
});

app.listen(PORT, async () => {
  // const user = await createSeedUser("qnsi")
  // await createSeedDocumentWithBullet("main", user.id)
  console.log(`Server listening on ${PORT}`)
})