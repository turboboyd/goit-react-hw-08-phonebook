import css from './SignIn.module.css';

export default function SignIn() {
  return (
    <>
      <form action="#">
        <h1>Sign in</h1>
        <span>or use your account</span>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        {/* <a href="#">Forgot your password?</a> */}
        <button>Sign In</button>
      </form>
    </>
  );
}
