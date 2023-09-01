import css from './SignUp.module.css';

export default function SignUp() {
  return (
    <>
      <form action="#">
        <h1>Create Account</h1>
        <span>or use your email for registration</span>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign Up</button>
      </form>
    </>
  );
}
