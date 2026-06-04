

export async function deleteSingleCard (endpoint: string, id: string) {
  try {

    const url = `/api/v1/${endpoint}/${id}`

    const responce = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })


    if (!responce.ok) {
      console.error('Ошибка удаления карточки')
      return 'error'
    }

    const data = await responce.json()
    return data
    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error(`ОШИБКА УДАЛЕНИЯ ${error.message}`)
    } else {
      console.error(error)
      return error
    }
    
  }
} 