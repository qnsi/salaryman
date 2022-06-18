import express, { Express, Request, Response } from "express"
import cors from "cors"
import { PrismaClient } from '@prisma/client'
import { saveTask } from "./controllers/tasks/saveTaskController"
import { getTasks } from "./controllers/tasks/getTasksController"
import deleteTask from "./controllers/tasks/deleteTasksController"
import { updateTask } from "./controllers/tasks/updateTaskController"
import { saveCategory } from "./controllers/saveCategoryController"
import { getCategories } from "./controllers/getCategories"

const prisma = new PrismaClient()

const PORT = 3001
const app = express()
app.use(cors())
app.use(express.json())

app.get("/tasks", (req: Request, res: Response) => {
  getTasks(req, res, prisma)
})

app.post("/tasks/new", (req: Request, res: Response) => {
  saveTask(req, res, prisma)
})

app.post("/tasks/delete", (req: Request, res: Response) => {
  deleteTask(req, res, prisma)
})

app.put("/tasks", (req: Request, res: Response) => {
  updateTask(req, res, prisma)
})

app.post("/category/new", (req: Request, res: Response) => {
  saveCategory(req, res, prisma)
})

app.get("/categories", (req: Request, res: Response) => {
  getCategories(req, res, prisma)
})

// hacky way to clear test_db between tests. Probably would need docker to run tests in real isolation
app.get("/dangerous/only_in_dev/clear_database", async (req: Request, res: Response) => {
  console.log("Clearing the db")
  await prisma.task.deleteMany({})
  await prisma.category.deleteMany({})
  // const user = await createSeedUser("qnsi")
  // await createSeedDocumentWithBullet("main", user.id)
  res.json({status: "ok"})
})

app.listen(PORT, async () => {
  // const user = await createSeedUser("qnsi")
  // await createSeedDocumentWithBullet("main", user.id)
  console.log(`Server listening on ${PORT}`)
})