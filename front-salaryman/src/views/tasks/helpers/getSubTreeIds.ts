import { TaskType } from "../../../types/TaskType";

export function getSubTreeIds(rootId: number, tasks: TaskType[]) {
  var parentIdsStack: number[] = []
  var subtreeIds: number[] = []
  for (const task of tasks) {
    if (task.id === rootId) {
      parentIdsStack.push(task.id)
      subtreeIds.push(task.id)
    } else {
      parentIdsStack = checkIfParentIdInStack(parentIdsStack, task)
      if (parentIdsStack.length > 0) {
        subtreeIds.push(task.id)
      }
    }
  }
  return subtreeIds.reverse()
}

// worst time complexity if stack is the longest, but to have longest stack we neen
// n operations that just add child to previous node. 
// so average worst of whole algorithms (^) would be
// 3n?? I am bad at time complexity
function checkIfParentIdInStack(parentIdsStack: number[], task: TaskType): number[] {
  if (parentIdsStack.length === 0) {
    return []
  }
  if (parentIdsStack[parentIdsStack.length -1] === task.parentId) {
    return parentIdsStack.concat(task.id)
  } else {
    parentIdsStack.pop()
    return checkIfParentIdInStack(parentIdsStack, task)
  }
}