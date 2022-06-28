import { convertTypeAcquisitionFromJson } from "typescript"
import { TaskType } from "../../../../types/TaskType"
import { getSubTreeIds } from "../../helpers/getSubTreeIds"
import { moveTaskDown } from "../../helpers/moveTasks"

export function updateTaskIsDone(id: number, setTasks: Function, isDone: boolean) {
  setTasks((state: TaskType[]) => {
    const doneTask = state.find(task => task.id == id) as TaskType
    const doneTaskSubtreeStack = getSubTreeIds(doneTask.id, state)
    const parent = state.find(stateTask => stateTask.id == doneTask.parentId)
    var parentId = 0
    if (parent) {
      parentId = parent.id
    }
    var initTasks: TaskType[] = []
    return state.reduce((result, task) => {
      console.log(task)
      console.log(doneTaskSubtreeStack)
      if (task.id === parentId) {
        result.push({...task, doneChildren: task.doneChildren + 1})
      } else if (task.id === doneTaskSubtreeStack[doneTaskSubtreeStack.length - 1]) {
        doneTaskSubtreeStack.pop()
        if (task.parentId === null) {
          result.push({...task, isDone: true})
        }
      } else {
        result.push(task)
      }
      return result
    }, initTasks)
  })
}

export function toggleCollapseInState(task: TaskType, tasks: TaskType[], setTasks: Function) {
  if (task.collapsed) {
    uncollapseInState(task, tasks, setTasks)
  } else {
    collapseInState(task, tasks, setTasks)
  }
}

function uncollapseInState(task: TaskType, tasks: TaskType[], setTasks: Function) {
  setTasks((state: TaskType[]) => {
    const subtreeIdsStack = getSubTreeIds(task.id, tasks)
    var deepCollapsedStack: number[] = []

    return state.map(stateTask => {
      if (stateTask.id == task.id) {
        subtreeIdsStack.pop()
        return {...stateTask, collapsed: false}
      // using includes() would make whole function 0(n^2) thats why we use stack. We know order
      } else if (stateTask.id === subtreeIdsStack[subtreeIdsStack.length - 1]) {
        subtreeIdsStack.pop()
        if (stateTask.collapsed && deepCollapsedStack.length === 0) {
          deepCollapsedStack = getSubTreeIds(stateTask.id, tasks)
          deepCollapsedStack.pop()
          return {...stateTask, hidden: false}
        } else if (stateTask.id === deepCollapsedStack[deepCollapsedStack.length - 1]) {
          deepCollapsedStack.pop()
          return {...stateTask, hidden: true}
        } else {
          return {...stateTask, hidden: false}
        }
      } else {
        return stateTask
      }
    })
  })
}

function collapseInState(task: TaskType, tasks: TaskType[], setTasks: Function) {
  // map O(n)
  setTasks((state: TaskType[]) => {
    // O(n)
    const subtreeIdsStack = getSubTreeIds(task.id, tasks)

    return state.map(stateTask => {
      if (stateTask.id == task.id) {
        subtreeIdsStack.pop()
        return {...stateTask, collapsed: true}
      // using includes() would make whole function 0(n^2) thats why we use stack. We know order
      } else if (stateTask.id === subtreeIdsStack[subtreeIdsStack.length - 1]) {
        subtreeIdsStack.pop()
        return {...stateTask, hidden: true}
      } else {
        return stateTask
      }
    })
  })
}
