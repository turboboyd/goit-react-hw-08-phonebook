import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../redux/auch';

export default function PrivateRoute({ element, redirectTo }) {

  console.log('Component: ', element);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return <>{isLoggedIn ? element : <Navigate to={redirectTo} />}</>;
}
