import React from "react"
import { getCategoriesFromBackend } from "../../../api/getCategories"
import { CategoryType } from "../../../types/CategoryType"

const initCategories: CategoryType[] = []

export function useGetCategoriesFromBackendAndSet(): [CategoryType[], Function] {
  const [categories, setCategories] = React.useState(initCategories)

  React.useEffect(() => {
    getCategoriesFromBackend().then((response) => {
      handleGetCategoriesResponse(response.data, setCategories)
    })
  }, [])
  return [categories, setCategories]
}

type getCategoriesResponse = { status: string, categories: CategoryType[] }

async function handleGetCategoriesResponse(response: getCategoriesResponse, setCategories: Function) {
  if (response.status === "ok") {
    setCategories(response.categories)
  } else {
    displayGetErrorIfResponseError(response)
  }
}

function displayGetErrorIfResponseError(response: getCategoriesResponse) {
  console.log("Not implemented")
}