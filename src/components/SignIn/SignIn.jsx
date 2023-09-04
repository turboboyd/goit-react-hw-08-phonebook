import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auchSignIn } from '../../redux/auch';
import css from './SignIn.module.css';
import { Link } from 'react-router-dom';

import validator from 'validator';

export default function SignIn() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();

    const validationErrors = {};

    if (!validator.isEmail(email)) {
      validationErrors.email = 'Invalid email address';
    }

    if (!validator.isLength(password, { min: 8 })) {
      validationErrors.password = 'Password must be at least 8 characters long';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      dispatch(auchSignIn({ email, password }));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <span>or use your account</span>
        {errors.email && <div className="error">{errors.email}</div>}
        <input
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.currentTarget.value)}
          autoComplete="email"
          className={errors.email ? `${css.error_input}` : ''}
        />
        {errors.password && <div className="error">{errors.password}</div>}
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.currentTarget.value)}
          autoComplete="password"
          className={errors.password ? `${css.error_input}` : ''}
        />
        <button type="submit">Sign In</button>
        <Link to="/contacts">gsagsag</Link>
      </form>
    </>
  );
}
