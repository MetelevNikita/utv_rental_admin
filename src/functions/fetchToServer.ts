export async function fetchToServer (url: string, method: string, body: any) {
  try {

    const responce = await fetch(url, {
      method: method,
      headers: {
        'Content-type': 'application/json'
      },

      body: JSON.stringify(body)
      
    })

    if (!responce.ok) {
      console.error(`Ошибка отправки данных на сервер ${responce.status} - ${responce.statusText}`)
      return {
        message: `Ошибка отправки данных на сервер ${responce.status} - ${responce.statusText}`,
        success: false
      }
    }


    const data = await responce.json()
    return {
      message: data,
      success: true
    }

    
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error(`Ошибка запроса на сервер ${error.message}`)
      return {
        message: `Ошибка запроса на сервер ${error.message}`,
        success: false
      }
    }

    console.error(`Ошибка запроса на сервер ${error}`)
      return {
        message: `Ошибка запроса на сервер ${error}`,
        success: false
      }

    
  }
}