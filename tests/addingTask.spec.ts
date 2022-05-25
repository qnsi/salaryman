import {test, expect, Page} from "@playwright/test"

test("adding a task works", async ({ page }) => {
  prepareDbAndVisit(page)

  const task_text = "Test task adding"
  await addTask(page, task_text)

  const task = page.locator(".task-text") 
  await expect(task).toHaveText(task_text)
});

test("adding subtasks work correctly", async ({ page }) => {
  prepareDbAndVisit(page)

  const first_task = "First"
  await addTask(page, first_task)

  const second_task = "Second"
  await addTask(page, second_task)
  
  const first_subtask_text = "Subtask"
  await addSubtask(page, first_task, first_subtask_text)

  const subtask = await page.locator(".task-container", {hasText: first_subtask_text})
  const task_container = await subtask.locator(".task-line-container")
  await expect(await task_container.count()).toBe(1)
}) 

async function addTask(page: Page, text: string) {
  await page.fill(".tasks-form > input", text);
  const addTaskButton = page.locator(".tasks-form > button", {hasText: "Add"}).first()
  await addTaskButton.click()
}

async function addSubtask(page: Page, parent_text: string, first_subtask_text: string) {
  const task = page.locator(".task", {hasText: parent_text})
  await task.hover()
  const add_subtask = page.locator(".task-buttons > button", {hasText: "Add Subtask"})
  await add_subtask.click()
  await addTask(page, first_subtask_text)
}

async function prepareDbAndVisit(page: Page) {
  await page.goto("http://localhost:3001/dangerous/only_in_dev/clear_database")
  await page.goto("http://localhost:3000/")
}