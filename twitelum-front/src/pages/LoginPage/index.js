import React, {Component} from 'react'
import Widget from '../../components/Widget'
/*
  Implementar desafio de implementar
  mensagem de erro de acordo com o retorno do server
*/
import './loginPage.css'

class LoginPage extends Component {

  fazLogin = (e) => {

    e.preventDefault()

    const login = this.login.value;
    const senha = this.senha.value;

    const infoUsuario = {
      login,
      senha
    }

    fetch('http://localhost:3001/login', {
      method: 'POST',
      body: JSON.stringify(infoUsuario)
    }).then((res) => {
      if (!res.ok) 
        throw res
      return res.json()
    }).then((data) => {
      localStorage.setItem('token', data.token);
      this
        .props
        .history
        .push('/')
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <div className="loginPage">
        <div className="container">
          <Widget>
            <h1 className="loginPage__title">Twitelum</h1>
            <form className="loginPage__form" action="/" onSubmit={this.fazLogin}>
              <div className="loginPage__inputWrap">
                <label className="loginPage__label" htmlFor="login">Login</label>
                <input
                  className="loginPage__input"
                  type="text"
                  id="login"
                  name="login"
                  ref={(inputLogin) => this.login = inputLogin}/>
              </div>
              <div className="loginPage__inputWrap">
                <label className="loginPage__label" htmlFor="senha">Senha</label>
                <input
                  className="loginPage__input"
                  type="password"
                  id="senha"
                  name="senha"
                  ref={(inputSenha) => this.senha = inputSenha}/>
              </div>
              {/* <div className="loginPage__errorBox">
                                Mensagem de erro!
                            </div> */}
              <div className="loginPage__inputWrap">
                <button className="loginPage__btnLogin" type="submit">
                  Logar
                </button>
              </div>
            </form>
          </Widget>
        </div>
      </div>
    )
  }
}

export default LoginPage