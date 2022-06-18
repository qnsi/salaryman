import React from "react"
import { getCategoriesFromBackend } from "../../api/getCategories"
import { saveCategory } from "../../api/saveCategory"
import { handleNewCategoryResponse } from "./helpers/handleSaveCategory"
import { useGetCategoriesFromBackendAndSet } from "./hooks/getCategories"

export function ThingView() {
  const [categoryName, setCategoryName] = React.useState("")
  const [categories, setCategories] = useGetCategoriesFromBackendAndSet()

  async function createNewCategory(e: React.FormEvent) {
    e.preventDefault()
    const resp = await saveCategory(categoryName)
    handleNewCategoryResponse(resp.data, setCategories)
  }
  return (
    <div className="thingview">
      <p>ThingView</p>
      <div className="createNewCategory">
        <form onSubmit={createNewCategory}>
          <label htmlFor="categoryName">Category Name</label>
          <input id="categoryName" value={categoryName} onChange={(e)=>setCategoryName(e.currentTarget.value)}/>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="Categories">
        {categories.map(category => {
          return <div>{category.name}</div>
        })}
      </div>
    </div>
  )
}