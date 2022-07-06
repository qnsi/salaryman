import React from "react"

export default function NewTaskForm(props: {addNewTask: Function, parentId: number, focusedTaskId: number, inputFocused: boolean, setInputFocused: Function}) {
  const [value, setValue] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const firstRender = React.useRef(true)

  React.useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus()
      props.setInputFocused(true)
    }
  }, [])

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
    } else {
      if (props.inputFocused === false) {
        if (inputRef.current !== null) {
          inputRef.current.blur()
        }
      }
    }
  }, [props.inputFocused])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.addNewTask(value, props.parentId)
    props.setInputFocused(false)
    setValue("")
  }

  return (
    <div className="tasks-form">
      <form onSubmit={handleSubmit}>
        <input 
            className="newTaskInput"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)} 
            onFocus={(e) => props.setInputFocused(true)}
            onBlur={(e) => props.setInputFocused(false)}
        />
        <button>
          Add
        </button>
      </form>
    </div>
  )
}