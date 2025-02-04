import './App.css';
import { useState, useEffect } from 'react';
import Form from './components/Form';
import Input from './components/Input';
const url = 'http://localhost:4000';

export default function App() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [registerResponse, setRegisterResponse] = useState('');
  const [loginResponse, setLoginResponse] = useState('');

  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  };


  const register = async (e) => {

    e.preventDefault();
  
    try {
      const response = await fetch(`${url}/register`, options);
      if (response) {
        const data = await response.json();
        setRegisterResponse(data.user.username);
      } else {
        setRegisterResponse('Registration failed');
      }
    } catch (err) {
      //console.log('Error during registration', err);
      return err
      setRegisterResponse('An error occurred during registration');
    }
  };
  

  
  const login = async (e) => {
    e.preventDefault();
    // Write your login code here
    try{
      const verifyLogin = await fetch(`${url}/login`, options);
        const loginToken = await verifyLogin.json()

        setLoginResponse(loginToken)
        localStorage.setItem("token", JSON.stringify(loginResponse))
      
    }catch(err){
      console.log('This is the error', err)
    }


  };

  // You can safely ignore everything below this line, it's just boilerplate
  // so you can focus on the exercise requirements

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser({
      ...user,
      [name]: value
    });
  }

  return (
    <div className="App">

      <h1>Register</h1>

      <Form
        handleSubmit={register}
        inputs={[
          <Input
            key={1}
            type='text'
            name='username'
            placeholder='Username'
            value={user.username}
            handleChange={handleChange}
          />,
          <Input
            key={2}
            type='password'
            name='password'
            placeholder='Password'
            value={user.password}
            handleChange={handleChange}
          />
        ]}
      />

      {registerResponse && <p>{registerResponse}</p>}

      <h1>Login</h1>

      <Form
        handleSubmit={login}
        inputs={[
          <Input
            key={1}
            type='text'
            name='username'
            placeholder='Username'
            value={user.username}
            handleChange={handleChange}
          />,
          <Input
            key={2}
            type='password'
            name='password'
            placeholder='Password'
            value={user.password}
            handleChange={handleChange}
          />
        ]}
      />


      {loginResponse && <p>{loginResponse}</p>}

    </div>
  );
}
