import { FC } from 'react'

// css

import './MyTextArea.css';

// 

interface MyTextAreaProps {
  title?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => any;
}

const MyTextArea: FC<MyTextAreaProps> = ({ title, placeholder, value, onChange }) => {
  return (
    <div className='my_text_area_container'>

      <span className='my_text_area_title'>{title}</span>
      <textarea rows={8} className='my_text_area_field' placeholder={placeholder} value={value} onChange={onChange}></textarea>
      
    </div>
  )
}

export default MyTextArea
