import { useContext } from 'react';
import { AuthContext } from './../context/auth.context';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute(props) {
  var {clickToShow}=props
  // Destructure the props
  const { path, exact,  component, ...restProps } = props;
  
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isLoading) return <p>Loading ...</p>;

  // If the user is not logged in ❌
  if (!isLoggedIn) 
  {clickToShow()
  return <Redirect to="/"/>}
  
  // If the user is logged in ✅
	return <Route path={path} exact={exact} component={component} {...restProps} />
}

export default PrivateRoute;