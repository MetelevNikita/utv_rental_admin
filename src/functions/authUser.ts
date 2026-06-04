

export async function authUser (email: string, password: string): Promise<{message: string, success: boolean}> {

  try {

    const responce = await fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    if (!responce.ok) {
      console.error(`Ошибка ответа от сервера ${responce.status}, ${responce.statusText}`)
      return {
        message: `Ошибка ответа от сервера ${responce.status}, ${responce.statusText}`,
        success: false
      }
    }

    const data = await responce.json()
    return data

  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message)
      return {
        message: 'Ошибка сервера ' + error.message,
        success: false
      }
    }

    return {
      message: 'Ошибка сервера ' + error,
      success: false
    }
    
  }
  

}