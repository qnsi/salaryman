import React from "react"
import { getCrushEditorStateFromBackend } from "../../../../api/crushEntropy/getCrushEditorState"

export default function useGetCrushEditorValueFromBackend(day: string): [string, Function] {
  const [value, setValue] = React.useState("")

  React.useEffect(() => {
    getCrushEditorStateFromBackend(day).then((response) => {
      setValue(response.data.crushEditor.value)
    }).catch((err) => {
      window.alert("We couldn't connect to the server! Try again.\n\n" + err)
    })
  }, [day])

  return [value, setValue]
}