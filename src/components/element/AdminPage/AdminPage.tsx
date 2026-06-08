import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom';

// css

import './AdminPage.css';

// 

import { Col, Row } from 'react-bootstrap';

// components

import MyInput from '../../UI/MyInput/MyInput';
import MyFile from '../../UI/MyFile/MyFile';
import MyButton from '../../UI/MyButton/MyButton';
import MySelect from '../../UI/MySelect/MySelect';
import MyTextArea from '../../UI/MyTextArea/MyTextArea';

// functions

import { imageToBuffer } from '../../../util/imageToBuffer';
import { fetchToServer } from '../../../functions/fetchToServer';


// asset

import logo from '@/../../public/asset/Isolation_Mode.png'


const menuArr = [
  {
    id: 1,
    title: 'Команда',
    value: 'team'
  },
  {
    id: 2,
    title: 'Продукт',
    value: 'product'
  },
  {
    id: 3,
    title: 'Комплект',
    value: 'complect'
  },
  {
    id: 4,
    title: 'Работы',
    value: 'portfolio'
  }
]


const teamField = [
  {
    id: 1,
    label: 'Имя',
    title: 'name',
    type: 'string',
  },

  {
    id: 2,
    label: 'Профессия',
    title: 'profession',
    type: 'string'
  },

  {
    id: 3,
    label: `Изображение`,
    title: 'image',
    type: 'file'
  }
]


const productField = [
  {
    id: 1,
    label: 'Название',
    title: 'title',
    type: 'string',
  },

  {
    id: 2,
    label: 'Категория',
    title: 'category',
    type: 'select',
    options: [
      {label: 'Камеры', value: 'camera'},
      {label: 'Свет', value: 'light'},
      {label: 'Оптика', value: 'lens'},
      {label: 'Операторское оборудование', value: 'operator_equipment'},
    ]
  },

  {
    id: 3,
    label: 'Описание',
    title: 'description',
    type: 'textarea'
  },

  {
    id: 4,
    label: 'Цена', 
    title: 'price',
    type: 'string'
  },

  {
    id: 5,
    label: 'Количество',
    title: 'quantity',
    type: 'string'
  },

  {
    id: 6,
    label: 'Комплектация',
    title: 'set',
    type: 'textarea'
  },

  {
    id: 7,
    label: 'Изображение 1',
    title: 'imageOne_product',
    type: 'file'
  },

  {
    id: 8,
    label: 'Изображение 2',
    title: 'imageTwo_product',
    type: 'file'
  },

  {
    id: 9,
    label: 'Изображение 3',
    title: 'imageThree_product',
    type: 'file'
  }
]


const complectField = [
  {
    id: 1,
    label: 'Название',
    title: 'title',
    type: 'string',
  },

  {
    id: 2,
    label: 'Описание',
    title: 'description',
    type: 'textarea',
  },

  {
    id: 3,
    label: 'Цена',
    title: 'price',
    type: 'string',
  },

  {
    id: 4,
    label: 'Количество',
    title: 'quantity',
    type: 'string',
  },

  {
    id: 5,
    label: 'Комплект',
    title: 'set',
    type: 'textarea',
  },


  {
    id: 5,
    label: 'Изображение_1',
    title: 'imageOne_complect',
    type: 'file',
  },

  {
    id: 6,
    label: 'Изображение_2',
    title: 'imageTwo_complect',
    type: 'file',
  },

  {
    id: 7,
    label: 'Изображение_3',
    title: 'imageThree_complect',
    type: 'file',
  },


]


const serviseField = [
    {
    id: 1,
    label: 'Название',
    title: 'title',
    type: 'string',
  },

  {
    id: 2,
    label: 'Описание',
    title: 'description',
    type: 'textarea',
  },
  {
    id: 3,
    label: 'Что использовали',
    title: 'set',
    type: 'textarea',
  },
  {
    id: 3,
    label: 'Ссылка на ролик',
    title: 'link',
    type: 'string',
  },

  {
    id: 2,
    label: 'Категория',
    title: 'category',
    type: 'select',
    options: [
      {label: 'Постановочные ролики', value: 'advertising_video'},
      {label: 'Корпоративные фильмы', value: 'corporate_films'},
      {label: 'Музыкальные клипы', value: 'music_video'},
      {label: 'Документальные фильмы', value: 'doc_films'},
    ]
  },
  {
    id: 4,
    label: 'Изображение_1',
    title: 'imageOne_portfolio',
    type: 'file',
  },
  {
    id: 5,
    label: 'Изображение_2',
    title: 'imageTwo_portfolio',
    type: 'file',
  },
  {
    id: 6,
    label: 'Изображение_3',
    title: 'imageThree_portfolio',
    type: 'file',
  },
]












// 

function createField(field: any, state: any, setState: any) {

  switch (field.type) {
    case 'string':
      return <MyInput title={field.label} type={field.type} key={field.title} placeholder={'введите значение...'} value={state?.[field.title] || ''} onChange={(e) => setState({...state, [field.title]: e.target.value})} />
    case 'file':
      return <MyFile title={field.label} name={field.title} key={field.title} onChange={ (e) => setState({ ...state, [field.title]: e.target.files[0] })} file={state?.[field.title] || null} />
    case 'select':
      return <MySelect title={field.label} key={field.title} options={field.options} value={state?.[field.title] || ''} onChange={(e: any) => setState({...state, [field.title]: e.target.value})} />
    case 'textarea':
      return <MyTextArea title={field.label} key={field.title} placeholder={'введите значение...'} value={state?.[field.title] || ''} onChange={(e) => setState({...state, [field.title]: e.target.value})} />
    default:
      return null;
  }
}









const AdminPage: FC = () => {

  console.log('RENDER ADMIN PAGE')

  const navigate = useNavigate();


  async function submitHandler(dataField: any, endpoint: string) {

    try {

      const entries = Object.entries(dataField).map(async ([key, value]) => {
        if (value instanceof File) {
          const res = await imageToBuffer(value)
          const splitKey = key.split('_')
          return [splitKey[0], res]
        } else {
          return [key, value]
        }    
      })

      console.log(entries)

      const resultDataField = await Promise.all(entries)
      const resultDataFieldObj = Object.fromEntries(resultDataField)

      console.log(resultDataFieldObj)


      const data = await fetchToServer(`/api/v1/${endpoint}`, 'POST', resultDataFieldObj)
      console.log(data)

      console.log(`Карточка ${data.success ? 'успешно создана' : `не создана ${data.message ?? ''}`}`)

      alert(`Карточка ${data.success ? 'успешно создана' : 'не создана'}`)
      navigate(0)
      

    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.error(`ОШИБКА ${error.message}`)
      } else {
        console.error(error)
        return error
      }
    }

  }


  // state

  const [teamCard, setTeamCard] = useState<any | null>(null)
  const [productCard, setProductCard] = useState<any | null>(null)
  const [complectCard, setComplectCard] = useState<any | null>(null)
  const [serviceCard, setServiceCard] = useState<any | null>(null)

  console.log(productCard)


  // 

  const [menu, setMenu] = useState<{title: string, value: string} | null>(null)


  function checkFormMenu (key: string) {
    switch (key) {
      case 'Команда':
        return teamField.map((filed: {title: string, type: string}) => {
            return createField(filed, teamCard, setTeamCard)
          })
      case 'Продукт':
        return productField.map((filed: {title: string, type: string}) => {
            return createField(filed, productCard, setProductCard)
          })
      case 'Комплект':
        return complectField.map((filed: {title: string, type: string}) => {
            return createField(filed, complectCard, setComplectCard)
          })
      case 'Работы':
        return serviseField.map((filed: {title: string, type: string}) => {
            return createField(filed, serviceCard, setServiceCard)
          })
      default: <div></div>
    }
  }


console.log("Menu ", menu)


  // 

  return (

    <Row className='d-flex flex-column justify-content-center align-items-center admin_container'>
      <Col md={6} className='d-flex flex-column justify-content-center align-items-center admin_container'>

        <div className='logo_container'>
          <img className='logo_img' src={logo} alt='logo'/>
        </div>
      
      
        <div className='admin_title'>Админ панель</div>


        <Row>

          {
            menuArr.map((item: {id: number, title: string, value: string}) => {
              return (
                <Col md={3} sm={12} xs={12} key={item.id}><MyButton style={{width: 100}} text={item.title} onClick={() => {
                  setMenu({title: item.title, value: item.value})
                }} /></Col>
              )
            })
          }

        </Row>


        {/*  */}

        <div className='admin_title'>{(!menu) ? 'Не выбран раздел' : menu.title}</div>




        {
          (!menu) ? <div></div> : checkFormMenu(menu.title)
        }


       {
       
       (menu) && <Row style={{width: '100%'}} md={10} className='d-flex flex-row align-items-center justify-content-around'>

                        <MyButton text={'Создать'} onClick={() => {
                          if (!menu) return

                          if (menu.value === 'product') {
                            submitHandler(productCard, 'product')
                          } else if (menu.value === 'team') {
                            submitHandler(teamCard, 'team')
                          } else if (menu.value === 'complect') {
                            submitHandler(complectCard, 'complect')
                          } else if (menu.value === 'portfolio') {
                            submitHandler(serviceCard, 'portfolio')
                          } else {
                            console.error('Не распознан тип формы')
                            return 'Не распознан тип формы'
                          }
                          
                        }} />
                        <MyButton text={'Посмотреть карточки'} onClick={() => {
                          if (!menu) return
                          navigate(`/admin/${menu.value}`)
                        }} />
        
        </Row>
        
        }
        

      </Col>
    </Row>
  )
}

export default AdminPage
