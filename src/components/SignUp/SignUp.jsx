import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auchSignUp } from '../../redux/auch';
import css from './SignUp.module.css';



import validator from 'validator';

export default function SignUp() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});


  const handleSubmit = e => {
    e.preventDefault();

    const validationErrors = {};

    if (!validator.isLength(name, { min: 1 })) {
      validationErrors.name = 'Name is required';
    }

    if (!validator.isEmail(email)) {
      validationErrors.email = 'Invalid email address';
    }

    if (!validator.isLength(password, { min: 8 })) {
      validationErrors.password = 'Password must be at least 8 characters long';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      dispatch(auchSignUp({ name, email, password }));
    }
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <span>or use your email for registration</span>
        {errors.name && <div className="error">{errors.name}</div>}
        <input
          type="text"
          placeholder="Name"
          onChange={e => setName(e.currentTarget.value)}
          autoComplete="Name"
          className={errors.name ? 'error-input' : ''}
        />
        {errors.email && <div className="error">{errors.email}</div>}
        <input
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.currentTarget.value)}
          autoComplete="email"
          className={errors.email ? 'error-input' : ''}
        />
        {errors.password && <div className="error">{errors.password}</div>}
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.currentTarget.value)}
          className={errors.password ? `${css.error_input}` : ''}
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}
