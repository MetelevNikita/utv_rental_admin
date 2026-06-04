import { FC, CSSProperties } from 'react'

// css

import './MyButton.css';

// motion

import { motion } from 'motion/react';

// 

interface MyButtonProps {
  text: string;
  style?: CSSProperties
  onClick: () => void;
}


const MyButton: FC<MyButtonProps> = ({ text, style, onClick }) => {
  return (
    <motion.button className='button' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClick} style={style}>{text}</motion.button>
  )
}

export default MyButton
