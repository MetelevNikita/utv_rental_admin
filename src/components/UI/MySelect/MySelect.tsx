import { FC } from 'react'

// css

import './MySelect.css';

// 

interface MySelectProps {
  title?: string;
  options: {label: string, value: string}[];
  value: string
  onChange: any;
  valueChecked? :string
}



const MySelect: FC<MySelectProps> = ({ title, options, value, onChange, valueChecked }) => {



  return (
    <div className='select_container'>

      {
        (title) && <span className='select_container_title '>{title}</span>
      }
      <select className='select_field' onChange={onChange} value={value} defaultValue={valueChecked}>
        <option className='select_field_option' value="Выберите значение"  defaultChecked>Выберите значение</option>

        {options.map((option) => (
          <option className='select_field_option' key={option.value} value={option.value}>{option.label}</option>
        ))}

      </select>
      
    </div>
  )
}

export default MySelect
