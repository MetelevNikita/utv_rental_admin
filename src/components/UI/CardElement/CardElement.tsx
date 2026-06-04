import { FC, useEffect, useState } from 'react'

// css

import './CardElement.css';

// components

import MyButton from '../MyButton/MyButton'

// 

interface CardElementProps {
  title: string
  image: string
  onClickDelete: () => any
  onClickEdit: () => any
}

const CardElement: FC<CardElementProps> = ({ title, image, onClickDelete, onClickEdit }) => {
  return (
    <div className='card_element_container' onClick={() => {}}>

      <img className='card_element_image' src={image} alt="image" />

      <div className='card_element_title'>{title}</div>
      <MyButton style={{width: '200px'}} text={'Удалить'} onClick={onClickDelete} />
      <MyButton style={{width: '200px'}} text={'Редактировать'} onClick={onClickEdit} />
      
    </div>
  )
}

export default CardElement
