import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // descrever a função que transforma em hash
  const [errorMessage, setErrorMessage] = useState('');

  const setDisabled = () => {
    const SIX = 6;
    if (
      email.includes('@')
      && email.includes('.com')
      && password.length > SIX
    ) {
      return false;
    }
    return true;
  };

  const handleAPI = axios.create({
    baseURL: 'http://localhost:3001',
  });

  const setLocalStorageApiData = async () => {
    const result = await handleAPI.post('/login', {
      email,
      password,
    }).then((response) => response.data)
      .then((data) => localStorage.setItem('user', JSON.stringify(data)))
      .catch((error) => console.log(error));
    return result;
  };

  const getLocalStorageData = () => JSON.parse(localStorage.getItem('user'));

  const redirectUser = () => {
    const response = getLocalStorageData();
    console.log(response.user.role);
    if (response.user.role === 'administrator') {
      history.push('/admin/manage');
    } else if (user.role === 'seller') {
      history.push('/seller/orders');
    }
    history.push('/customers/products');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = getLocalStorageData();
    const user2 = response.user;
    setLocalStorageApiData();
    if (Object.keys(user2).includes('message')) {
      return setErrorMessage('Esse usuário não existe');
    }
    redirectUser();
  };

  return (
    <form>
      <label htmlFor="email">
        Login
        <input
          type="text"
          data-testid="common_login__input-email"
          name="email"
          id="email"
          placeholder="Digite seu Email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          data-testid="common_login__input-password"
          id="password"
          name="password"
          type="password"
          placeholder="Digite sua senha"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        type="submit"
        data-testid="common_login__button-login"
        onClick={ handleSubmit }
        disabled={ setDisabled() }
      >
        Login
      </button>
      <Link
        data-testid="common_login__button-register"
        to="/register"
      >
        Ainda não tenho conta
      </Link>
      <span
        className="login__error"
        data-testid="common_login__element-invalid-email"
        hidden={ !errorMessage }
      >
        {errorMessage}
      </span>
    </form>
  );
}

export default Login;
