import React, { useState } from 'react';
import { DismissibleAlert } from '../components/DismissibleAlert';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { actions } from '../store/slices/app';
import { NavLink } from 'react-router-dom';

export default function Login () {
  const [err, setErr] = useState('');
  const n = useNavigate();
  const dispatch = useDispatch();

  return (
    <form onSubmit={e => {
      e.preventDefault();
      const values = Object.fromEntries(new FormData(e.target).entries());
      axios.post('/admin/auth/login', values)
        .then((res) => {
          dispatch(actions.setAdmin({
            token: res.data.token,
            email: values.email,
          }));
          n('/admin');
        })
        .catch(err => {
          setErr(err.response?.data?.error ?? 'Unknown error!');
        });
    }}>
      <h1 className={'text-danger'}>Login Admin</h1>
      <hr/>

      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input name={'email'} type="email" className="form-control" required/>
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input name={'password'} type="password" className="form-control" required/>
      </div>
      <DismissibleAlert text={err} onClose={setErr}/>
      <br/>
      <button type="submit" className="btn btn-warning btn-lg">Login</button>
      <NavLink to={'/'} className={'btn btn-link btn-lg'}>Back</NavLink>
    </form>
  );
}
