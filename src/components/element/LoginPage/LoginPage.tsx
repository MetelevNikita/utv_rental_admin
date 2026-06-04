import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// css

import './LoginPage.css';

// bootstrap

import { Row, Col } from 'react-bootstrap';

// components

import MyInput from '../../UI/MyInput/MyInput';
import MyButton from '../../UI/MyButton/MyButton';


// function

import { authUser } from '../../../functions/authUser';

// asset

import logo from '@/../../public/asset/Isolation_Mode.png'



const LoginPage: FC = () => {


  const navigate = useNavigate();
  const [authData, setAuthData] = useState<{success: boolean | null, message?: string}>({success: null, message: ''});




  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);



  const handleAuthClick = async () => {
    const email = loginRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    const result = await authUser(email, password);

    if (result.success) {
      alert('Вы успешно авторизовались')
      navigate('/admin');
    } else {
      setAuthData(result);
    }
  }


  console.log(authData.success)




  return (
    
    <Row className='d-flex flex-column justify-content-center align-items-center'>


      <Col md={4} style={{height: '100vh'}} className='d-flex flex-column justify-content-center align-items-center login_container'>



      <div className='logo_container'>
        <img className='logo_img' src={logo} alt='logo'/>
      </div>
      

      <Col md={12} className='mt-2'>
        <MyInput
          style={((authData.success === false) ? {border: '2px solid red'} : {})}
          type='email'
          placeholder='Enter your email...'
          ref={loginRef}
          onFocus={() => {
            if (loginRef.current) {
              loginRef.current.value = '';
            }
            setAuthData({success: null, message: ''})
          }}/>
          
      </Col>



      <Col md={12} className='mt-2'>
        <MyInput
          style={((authData.success === false) ? {border: '2px solid red'} : {})} type='password'
          placeholder='Enter your password...'
          ref={passwordRef}
          onFocus={(e) => {

            if (passwordRef.current) {
              passwordRef.current.value = '';
            }
            setAuthData({success: null, message: ''})
          }}/>
      </Col>

      <Col md={12} className='mt-2'><MyButton style={{width: '100%'}} text='Войти' onClick={() => {handleAuthClick()}} /></Col>

      {
        authData.message && <Col md={12} className='mt-2'>
          <div className='auth_message_text' style={(authData.success === true) ? {color: 'green'} : {color: 'red'}}>{authData.message}</div>
        </Col>
      }


      </Col>
    </Row>

  )
}

export default LoginPage
