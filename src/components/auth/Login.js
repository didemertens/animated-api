import React from 'react'
import axios from 'axios'
import { notify } from 'react-notify-toast'

import Auth from '../lib/Auth'

class Login extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/login', this.state.data)
      Auth.setToken(res.data.token)
      Auth.setUserId(res.data.user._id)
      notify.show('You\'re logged in!', 'success')
      this.props.history.push('/films')
    } catch (err) {
      notify.show('Something went wrong. Please try again.', 'error')
      console.log(err)
    }
  }

  render() {
    return (
      <section className="section section-auth">
        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column is-4 is-offset-4 has-text-centered">
              {/* <img src='https://em.wattpad.com/fe850f73553d84b1e74d205f76c62cc2f6aa391d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f49456843324d533654746b7676413d3d2d3730333639333232382e313538393761666231383864666162383335383034383131363639372e676966?s=fit&w=720&h=720' alt='Chibi watching tv' /> */}
              <h2 className="bigger-title">Welcome back</h2>
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="div-btn-auth">
                <button className="button" id="btn-auth-page">Log in</button>
              </div>
            </form>
          </div>
        </div>
      </section >

    )
  }
}

export default Login