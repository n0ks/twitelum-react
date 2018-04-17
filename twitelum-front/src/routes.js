import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';


function estaAutenticado() {
  if (localStorage.getItem('token')) 
    return true

  return false
}

class PrivateRoute extends Component {
  render() {
    /* console.log("Route Props",this.props); */
    /*     const path = this.props.path;
    const component = this.props.component; */
    
    if (estaAutenticado()) 
      return (<Route {...this.props}/>)

    return (<Redirect to="/login"/>)
  }
}
const Routes = () => {
  return (

    <Switch>
      <PrivateRoute path="/" exact component={Home}/>
      <Route path="/login" component={LoginPage}/>
    </Switch>
  )

}

export default Routes;