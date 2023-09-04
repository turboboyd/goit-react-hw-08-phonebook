import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn, selectStatus } from '../redux/auch';

export default function RestrictedRoute({ element, ...routeProps }) {

  const isLoggedIn = useSelector(selectIsLoggedIn);
   const status = useSelector(selectStatus);

  return <>{isLoggedIn ? <Navigate to={routeProps.redirectTo} /> : element}</>;
}
