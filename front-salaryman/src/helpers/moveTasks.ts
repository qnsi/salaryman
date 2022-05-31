import { TaskType } from "../components/TaskView"

  export function moveTaskDown(taskId: number, tasks: TaskType[], setTasks: Function) {
    const focusedTask = tasks.find(task => task.id === taskId) as TaskType
    const taskSiblings = tasks.filter(task => task.parentId == focusedTask.parentId)
    const indexOfTaskInSiblings = taskSiblings.indexOf(focusedTask)
    if (indexOfTaskInSiblings == taskSiblings.length - 1) {
      return
    } else {
      const nextTask = taskSiblings[indexOfTaskInSiblings + 1]
      snipMovedTasksFromState(focusedTask, nextTask, setTasks)
    }
  }

  function snipMovedTasksFromState(focusedTask: TaskType, nextTask: TaskType, setTasks: Function) {
    setTasks((state: TaskType[]) => {
      var snippedTasks: TaskType[] = []
      var startedSnipping = false
      var foundNext = false
      var foundNexter = false
      const initialReduceState: TaskType[] = []
      var newState = state.reduce((result, task) => {
        if (task.id === focusedTask.id) {
          task.order = task.order + 1
          startedSnipping = true
        }
        if (foundNext && !foundNexter) {
          if (task.intendation <= focusedTask.intendation) {
            foundNexter = true
            result = result.concat(snippedTasks)
          }
        }
        if (startedSnipping) {
          if (task.id === nextTask.id) {
            startedSnipping = false
            foundNext = true
            task.order = task.order - 1
            result.push(task)
          } else {
            snippedTasks.push(task)
          }
        } else {
          result.push(task)
        }
        return result
      }, initialReduceState)
      if (!foundNexter) {
        newState = newState.concat(snippedTasks)
      }
      return newState
    })
  }

  export function moveTaskUp(taskId: number, tasks: TaskType[], setTasks: Function) {
    const focusedTask = tasks.find(task => task.id === taskId) as TaskType
    const taskSiblings = tasks.filter(task => task.parentId == focusedTask.parentId)
    const indexOfTaskInSiblings = taskSiblings.indexOf(focusedTask)
    if (indexOfTaskInSiblings == 0) {
      return
    } else {
      const prevTask = taskSiblings[indexOfTaskInSiblings - 1]
      moveTasksUpInState(focusedTask, prevTask, setTasks)
    }
  }

  function moveTasksUpInState(focusedTask: TaskType, prevTask: TaskType, setTasks: Function) {
    setTasks((state: TaskType[]) => {
      var snippedTasks: TaskType[] = []
      var startedSnipping = false
      var foundNext = false

      var prevIndex = state.indexOf(prevTask)

      const initialReduceState: TaskType[] = []
      var newState = state.reduce((result, task) => {
        if (task.id === prevTask.id) {
          task.order = task.order + 1
        }
        if (startedSnipping) {
          if (task.intendation <= focusedTask.intendation) {
            startedSnipping = false
            foundNext = true
            result.splice(prevIndex, 0, ...snippedTasks)
          }
        }
        if (task.id === focusedTask.id) {
          task.order = task.order - 1
          startedSnipping = true
        }
        if (startedSnipping) {
          snippedTasks.push(task)
        } else {
          result.push(task)
        }
        return result
      }, initialReduceState)
      if (startedSnipping) {
        newState.splice(prevIndex, 0, ...snippedTasks)
      }
      return newState
    })
  }
