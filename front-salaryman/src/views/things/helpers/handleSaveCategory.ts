import { CategoryType } from "../../../types/CategoryType"

export function handleNewCategoryResponse(response: {status: string, category: CategoryType}) {
  if (response.status === "ok") {
    console.log("OK")
  } else {
    displayErrorIfResponseError(response)
  }
}

function displayErrorIfResponseError(response: {status: string, category: CategoryType}) {
  console.log("NOT IMPLEMENTED! Error when communicating with the server")
}