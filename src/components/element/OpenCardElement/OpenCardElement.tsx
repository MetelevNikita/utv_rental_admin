import { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// css

import './OpenCardElement.css';

// bootstrap

import { Row, Col } from 'react-bootstrap';

// components

import MyButton from '../../UI/MyButton/MyButton'
import MyInput from '../../UI/MyInput/MyInput';
import MyTextArea from '../../UI/MyTextArea/MyTextArea';
import MyFile from '../../UI/MyFile/MyFile';
import MySelect from '../../UI/MySelect/MySelect';

// 

import { imageToBuffer } from '../../../util/imageToBuffer';

// functions

import { getAllCard } from '../../../functions/getAllCard';
import { patchCard } from '../../../functions/patchCard';



interface OpenCardElementProps {}



const OpenCardElement: FC<OpenCardElementProps> = (props) => {

  const navigate = useNavigate()

  const params = useParams()
  const {endpoint, id} = params



  const categoryArr = [
      {label: 'Камеры', value: 'camera'},
      {label: 'Свет', value: 'light'},
      {label: 'Звук', value: 'sound'},
      {label: 'Операторское оборудование', value: 'operator_equipment'},
  ]


  const [card, setCard] = useState<any>(null) 
  const [newCard, setNewCard] = useState<any>({})




  useEffect(() => {
    const getCard = async () => {
      const data = await getAllCard(`/api/v1/${endpoint}`)
      const singleCard = data.find((item: any) => item.id === Number(id)) ?? {}

      if (!singleCard) return

      setCard(singleCard)

    }
    getCard()
  }, [endpoint, id])


  async function patchCardHandler (endpoint: string, id: string, card: unknown) {
    try {

      if (!card) return

      const entries = await Promise.all(Object.entries(card).map(async ([key, value]) => {

        if (value instanceof File) {
          return [key, await imageToBuffer(value)]
        } else {
          return [key, value]
        }

      }))



      if (entries.length < 1) {
        alert('Вы должны внести хотя бы одно изменение')
      }

      const objCard = Object.fromEntries(entries)
      const res = await patchCard(endpoint, id, objCard)
      alert(`Карточка товара успешно обновлена`)
      return res

      
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.error(`ОШИБКА ${error.message}`)
      } else {
        console.error(error)
        return error
      }
    }
  }




  if (!card) {
    return (
      <Row className='d-flex flex-column justify-content-center align-items-center admin_container'>
        <Col md={6} className='d-flex flex-column justify-content-center align-items-center admin_container'>

          <div className='endpoint_loading'>Загрузка...</div>
        
        </Col>
      </Row>
    )
  }
  

  return (

      <Row className='d-flex flex-column justify-content-center align-items-center admin_container'>
        <Col md={6} className='d-flex flex-column justify-content-center align-items-center'>
        
            <div className='endpoint_text'>Страница с товаром: {card.title}</div>


            <Col md={12} className='d-flex flex-column justify-content-around'>

              {
                Object.entries(card).map(([key, value]) => {

                  if (key == 'id' || key == 'createAt' || key == 'updateAt') {
                    return
                  }

                  if (key == 'imageOne' || key == 'imageTwo' || key == 'imageThree') {
                    return (
                      <div>
                        <div className='open_card_file'>{value as string}</div>
                        <MyFile name={key} onChange={(e) => {setNewCard({...newCard, [key as any]: e.target.files[0]})}} file={newCard[key as File | any]} />
                      </div>
                    )
             
                  }

                  if (key === 'category') {
                    return (
                      <MySelect title={key} options={categoryArr} value={newCard[key as string] || value} onChange={(e: any) => {setNewCard({...newCard, [key]: e.target.value || value})}} />
                    )
                  }

                  if (key === 'description' || key === 'set') {
                    return (
                      <MyTextArea title={key} value={newCard[key as string] || value} onChange={(e) => {setNewCard({...newCard, [key]: e.target.value})}} />
                    )
                  }

                  return (                     
                    <MyInput key={key} title={key} type={'text'} placeholder={''} value={newCard[key as string] || value} onChange={(e) => {setNewCard({...newCard, [key as string]: e.target.value})}}/>
    
                  )
        
                })
              }


              <Col md={12}>

                <MyButton
                  style={{width: '100%'}}
                  text={'Изменить'}
                  onClick={() => {
                    patchCardHandler(endpoint as string, id as string, newCard)
                    navigate(`/admin/${endpoint}`)
                  }}
                />

                <MyButton
                  style={{width: '100%'}}
                  text={'Назад'}
                  onClick={() => {
                    const back = window.confirm('Все данные не сохранятся')
                    if (back) {
                      navigate(`/admin/${endpoint}`)
                    } else {
                      return
                    }
                  }}
                />
              
              </Col>

            </Col>
        
        </Col>
      </Row>
  )
}

export default OpenCardElement
