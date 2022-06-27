import { TaskType } from "../../../types/TaskType";

export function getSubTreeIds(rootId: number, tasks: TaskType[]) {
  const rootTask = getRootTask(rootId, tasks)
  if (rootTask === undefined) { return [] }

  const [siblings, indexOfRootInSiblings] = prepareSiblingsAndIndexOf(rootId, rootTask, tasks)
  if (siblings.length > indexOfRootInSiblings+1) {
    const nextSiblingId = siblings[indexOfRootInSiblings+1].id
    return snipIdsFromRootToSibling(rootId, nextSiblingId, tasks)
  } else {
    // forEach till unclestors
  }
}

function getRootTask(rootId: number, tasks: TaskType[]) {
  return tasks.find(el => el.id === rootId) // O(n)
}

function prepareSiblingsAndIndexOf(rootId: number, rootTask: TaskType, tasks: TaskType[]): [TaskType[], number] {
  const siblings = tasks.filter(el => el.parentId === rootTask.parentId) // O(n)
  const indexOfRootInSiblings = siblings.indexOf(rootTask) // O(n)
  return [siblings, indexOfRootInSiblings]
}

function snipIdsFromRootToSibling(rootId: number, nextSiblingId: number, tasks: TaskType[]) {
  var startedSnipping = false
  var snippedIds: number[] = []
  for (const task of tasks) {
    if (task.id === rootId) {
      startedSnipping = true
    } else if (task.id === nextSiblingId) {
      startedSnipping = false
    }
    if (startedSnipping) {
      snippedIds.push(task.id)
    }
  }
  return snippedIds
}