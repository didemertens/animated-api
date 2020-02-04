import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  state = {
    data: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/register', this.state.data)
      this.props.history.push('/login')
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <section className="section section-auth">
        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column is-4 is-offset-4 has-text-centered">
              <h2 className="bigger-title">Register now</h2>
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                    required
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
                    required
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    placeholder="Password Confirmation"
                    name="passwordConfirmation"
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="div-btn-auth">
                <button className="button" id="btn-auth-page">Register</button>
              </div>
            </form>
          </div>
        </div>
      </section >
    )
  }

}

export default Register