import { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// css

import './CardsPage.css';

// 

import { Row, Col } from 'react-bootstrap';

// functions

import { getAllCard } from '../../../functions/getAllCard';
import { deleteSingleCard } from '../../../functions/deleteSingleCard';

// 

import CardElement from '../../UI/CardElement/CardElement';
import MyButton from '../../UI/MyButton/MyButton';


const CardsPage: FC = () => {


  const params = useParams()
  const endpoint = params.endpoint

  // 


  const navigate = useNavigate();



  const [cards, setCards] = useState<any>(null)
  const [isChange, setIsChange] = useState(false)

  useEffect(() => {

    const getCards = async () => {
      const data = await getAllCard(`/api/v1/${endpoint}`)
      setCards(data)
    }

     getCards()


  }, [isChange])





  async function deleteHandler (endpoint: string, id: string, title: string) {
    try {


      const isDelete = window.confirm(`Вы действительно хотеите удалить картчоку ${title}`)

      if (isDelete) {
        await deleteSingleCard(endpoint, id)
        navigate(0)
      } else {
        return
      }

      
      
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.error(`ОШИБКА ${error.message}`)
      } else {
        console.error(error)
        return error
      }
    }

  }


  if (!cards || !endpoint) {
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
        <Col md={6} className='d-flex flex-column justify-content-center align-items-center admin_container'>

          <div className='endpoint_text'>Страница с товарами - {endpoint}</div>


            <Col className='d-flex'>
                {
                  (cards.length > 0) && cards.map((card: any) => {
                    return (
                      <CardElement
                        title={card.title}
                        image={card.imageOne}
                        key={card.id}
                        onClickDelete={() => {deleteHandler(endpoint, card.id, card.title)}}
                        onClickEdit={() => {navigate(`/admin/${endpoint}/${card.id}`)}}
                        />
                    )
                  })
                }
            </Col>

            <Col md={8}>
                <MyButton style={{width: '100%'}} text={'Назад'} onClick={() => {
                  navigate('/admin')
                }} />
            </Col>

      </Col>
    </Row>

  )
}

export default CardsPage
