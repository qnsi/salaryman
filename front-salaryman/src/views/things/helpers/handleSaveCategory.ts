import { CategoryType } from "../../../types/CategoryType"

export function handleNewCategoryResponse(response: {status: string, category: CategoryType}, setCategories: Function) {
  if (response.status === "ok") {
    setCategories((categories: CategoryType[]) => {
      return categories.concat([response.category])
    })
  } else {
    displayErrorIfResponseError(response)
  }
}

function displayErrorIfResponseError(response: {status: string, category: CategoryType}) {
  console.log("NOT IMPLEMENTED! Error when communicating with the server")
}