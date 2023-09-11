import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn, selectIsRefreshing } from '../redux/auch';

export default function RestrictedRoute({ element, redirectTo }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
    return <>{isLoggedIn && !isRefreshing ? <Navigate to={redirectTo} /> : element}</>;
}
