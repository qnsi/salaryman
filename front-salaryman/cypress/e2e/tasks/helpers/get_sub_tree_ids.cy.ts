import { TaskType } from "../../../../src/types/TaskType"
import { getSubTreeIds } from "../../../../src/views/tasks/helpers/getSubTreeIds" 

describe("Return correct subtree ids", () => {
  it("works for example tree with next sibling present", () => {
    const tasks = prepareTestTree()
    const subTreeOfTwo = getSubTreeIds(2, tasks)
    expect(subTreeOfTwo).to.deep.eq([2,4,7,8,9,5])
  })

  it("works for example tree with nothing after", () => {
    const tasks = prepareTestTree()
    const subTreeOfTwo = getSubTreeIds(3, tasks)
    expect(subTreeOfTwo).to.deep.eq([3,6])
  })

  it("works for example tree with uncle", () => {
    const tasks = prepareTestTree()
    const subTreeOfTwo = getSubTreeIds(5, tasks)
    expect(subTreeOfTwo).to.deep.eq([5])
  })
})

function prepareTestTree(): TaskType[] {
  var tasks: TaskType[] = []
  tasks.push(createMockTask(1,1,1,null))
    tasks.push(createMockTask(2,1,2,1))
      tasks.push(createMockTask(4,1,3,2))
        tasks.push(createMockTask(7,1,4,4))
        tasks.push(createMockTask(8,2,4,4))
        tasks.push(createMockTask(9,3,4,4))
      tasks.push(createMockTask(5,2,3,2))
    tasks.push(createMockTask(3,2,2,1))
      tasks.push(createMockTask(6,1,3,3))
  return tasks
}

function createMockTask(id: number, order: number, intendation: number, parentId: number) {
 return {
    id,
    isDone: false,
    order,
    intendation,
    parentId,
    doneChildren: 0,
    text: "Task",
    createdAt: "",
    updatedAt: "",
    collapsed: false,
    hidden: false
  }
}