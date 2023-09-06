import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn, selectIsRefreshing } from '../redux/auch';

export default function RestrictedRoute({ element, redirectTo }) {


  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log('isLoggedIn: ', isLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  console.log('isRefreshing: ', isRefreshing);
  // return <>{isLoggedIn ? <Navigate to={redirectTo} /> : element}</>;
    return <>{isLoggedIn && !isRefreshing ? <Navigate to={redirectTo} /> : element}</>;
}
