export async function imageToBuffer (file: File) {

  try {

    if (!(file instanceof File)) {
      throw new Error(`Переданный тип данных не явзялется файлром`)
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)

    const res = await new Promise((resolve, reject) => {
      reader.onload = function () {
        if (!reader.result) return
        const base64String = (reader.result as string).split(',')[1]
        resolve(base64String) 
      }

      reader.onerror = function () {
        reject(reader.error)
      }
    })
    return res

  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      console.error(`ОШИБКА ${error.message}`)
      return {
        message: 'ERROR',
        success: false
      }
    }
    console.error(error)
    return {
      message: 'ERROR',
      success: false
    }
    
  }

}