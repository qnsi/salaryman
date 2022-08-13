import { TaskType } from "../../../../../../types/TaskType";
import { _setInitialTasks } from "../useGetTasks";

it("prepares tasks in correct order and hides done subtask", () => {
  const tasks = [
    prepareRespTask(3, null, 2, 0, 0),
    prepareRespTask(2, 1, 1, 0, 0),
    prepareRespTask(1, null, 1, 0, 0),
    prepareRespTask(4, 1, 2, 0, 0, true),
  ]

  const expectedTasks = [
    prepareParsedTask(1, null, 1, 0, 1, false, false, false, 2),
    prepareParsedTask(2, 1, 1, 1, 0),
    prepareParsedTask(3, null, 2, 0, 0),
  ]

  const mockSetTasks = jest.fn(x => x);
  _setInitialTasks(tasks, mockSetTasks)
  
  expect(mockSetTasks.mock.calls[0][0]).toStrictEqual(expectedTasks);
})

it("hides subtasks of collapsed task", () => {
  const tasks = [
    prepareRespTask(1, null, 1, 0, 0, false, true),
    prepareRespTask(2, 1, 1, 0, 0),
    prepareRespTask(4, 1, 2, 0, 0),
    prepareRespTask(3, null, 2, 0, 0),
  ]

  const expectedTasks = [
    prepareParsedTask(1, null, 1, 0, 0, false, true, false, 2),
    prepareParsedTask(2, 1, 1, 1, 0, false, false, true),
    prepareParsedTask(4, 1, 2, 1, 0, false, false, true),
    prepareParsedTask(3, null, 2, 0, 0),
  ]

  const mockSetTasks = jest.fn(x => x);
  _setInitialTasks(tasks, mockSetTasks)
  
  expect(mockSetTasks.mock.calls[0][0]).toStrictEqual(expectedTasks);
})

it("adds subtaskCount to all tasks", () => {
  const tasks = [
    prepareRespTask(1, null, 1, 0, 0, false, true),
    prepareRespTask(2, 1, 1, 0, 0),
    prepareRespTask(4, 1, 2, 0, 0),
    prepareRespTask(3, null, 2, 0, 0),
  ]

  const expectedTasks = [
    prepareParsedTask(1, null, 1, 0, 0, false, true, false, 2),
    prepareParsedTask(2, 1, 1, 1, 0, false, false, true, 0),
    prepareParsedTask(4, 1, 2, 1, 0, false, false, true, 0),
    prepareParsedTask(3, null, 2, 0, 0, false, false, false, 0),
  ]

  const mockSetTasks = jest.fn(x => x);
  _setInitialTasks(tasks, mockSetTasks)
  
  expect(mockSetTasks.mock.calls[0][0]).toStrictEqual(expectedTasks);
})

function prepareRespTask(
  id: number,
  parentId: number | null,
  order: number,
  intendation: number,
  doneChildren: number,
  isDone = false,
  collapsed = false,
  hidden = false
) {
  return {
    collapsed,
    createdAt: "2022-07-18T10:49:51.053Z",
    doneDate: "",
    id,
    isDone,
    order,
    parentId,
    text: "dont make me think",
    updatedAt: "2022-07-26T07:34:59.209Z",
    userId: 1,
    intendation,
    doneChildren,
    hidden
  }
}


function prepareParsedTask(
  id: number,
  parentId: number | null,
  order: number,
  intendation: number,
  doneChildren: number,
  isDone = false,
  collapsed = false,
  hidden = false,
  subtaskCount = 0
) {
  return {
    collapsed,
    createdAt: "2022-07-18T10:49:51.053Z",
    doneDate: "",
    id,
    isDone,
    order,
    parentId,
    text: "dont make me think",
    updatedAt: "2022-07-26T07:34:59.209Z",
    userId: 1,
    intendation,
    doneChildren,
    subtaskCount,
    hidden
  }
}