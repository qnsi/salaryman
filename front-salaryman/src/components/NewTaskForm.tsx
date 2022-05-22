import React from "react"

export default function NewTaskForm(props: {addNewTask: Function, parentId: number}) {
  const [value, setValue] = React.useState("")

  function handleSubmit() {
    props.addNewTask(value, props.parentId)
    setValue("")
  }

  return (
    <div className="tasks-form">
      <input value={value} onChange={(e) => setValue(e.currentTarget.value)} />
      <button onClick={handleSubmit}>
        Add
      </button>
    </div>
  )
}