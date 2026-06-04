export async function patchCard (endpoint: string, id: string, card: unknown) {
  try {

    const url = `/api/v1/${endpoint}/${id}`

    const responce = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },

      body: JSON.stringify(card)
    })

    if (!responce.ok) {
      console.error('Ошибка изменения карточки')
      return 'error'
    }

    const data = await responce.json()
    return data

  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error(`ОШИБКА ${error.message}`)
    } else {
      console.error(error)
      return error
    }
    
  }
}