export async function getAllCard(url: string): Promise<any> {
  try {

    const responce = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!responce.ok) {
      throw new Error(`Ошибка ${responce.status}: ${responce.statusText}`)
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