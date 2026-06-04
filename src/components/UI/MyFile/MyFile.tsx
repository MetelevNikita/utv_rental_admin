import { CSSProperties, FC } from 'react'

// css

import './MyFile.css';

// 

interface MyInputProps {
  title?: string
  name: string
  style?: CSSProperties
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | any>) => any;
  file: HTMLInputElement | any
}

const MyFile: FC<MyInputProps> = ({ title, onChange, style, name, file, value }) => {


  const shortFileName = file ? (file.name.length > 20 ? file.name.slice(0, 17) + '...' : file.name) : '';

  return (
    <div className='input_file_container'>

      {
        (title) && <span className='input_file_title'>{title}</span>
      }


      <label style={style} htmlFor={name} className='input_file_field'>

        {
            (file && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') ?

            (<span className='input_file_error'>Неподдерживаемый тип файла</span>)

            :

            (<div className='input_file_content'>
              <div className='input_file_content_chose_file'>выберите файл</div>
              <div className='input_file_content_chose_value'>{shortFileName}</div>
            </div>)
        }

      </label>



      {
        (file) ?
        (<div className='input_file_preview_container'>
          <img src={URL.createObjectURL(file)} alt="preview" className='input_file_preview' />
          </div>) : <div></div>
      }


      <input id={name} type='file' style={{display: 'none'}} className='input_file_field' value={value} onChange={onChange}/>


    </div>
  )
}

export default MyFile
