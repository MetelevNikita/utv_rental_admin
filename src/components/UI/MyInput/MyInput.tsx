import { CSSProperties, FC } from 'react'

// css

import './MyInput.css';

// 

interface MyInputProps {
  title?: string
  type: string;
  style?: CSSProperties
  placeholder: string;
  ref?: any;
  value? : string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const MyInput: FC<MyInputProps> = ({ title, type, placeholder, ref, value, onChange, style, onFocus }) => {
  return (
    <div className='input_container'>

      {
        (title) && <span className='input_title'>{title}</span>
      }
      <input style={style} className='input_field' ref={ref} type={type} placeholder={placeholder} value={value} onChange={onChange} onFocus={onFocus}/>

    </div>
  )
}

export default MyInput
