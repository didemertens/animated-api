import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { notify } from 'react-notify-toast'
import { FaHome, FaUserAlt } from 'react-icons/fa'

import Auth from '../lib/Auth'

class Navbar extends React.Component {
  state = {
    navbarOpen: false
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navbarOpen: false })
    }
  }

  handleLogout = () => {
    Auth.logout()
    notify.show('Come back soon!', 'success')
    this.props.history.push('/')
  }

  toggleNav = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  render() {
    const { navbarOpen } = this.state
    return (
      <nav className="navbar is-fixed-top" id="nav">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item"><FaHome /></Link>
            <Link to="/films" className="navbar-item">Films</Link>
            <Link to="/series" className="navbar-item">Series</Link>

            <a onClick={this.toggleNav} role="button" id='navbar-burger' className={`navbar-burger ${navbarOpen ? 'is-active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`} id='navbar-menu'>
            <div className="navbar-end">
              {Auth.isAuthenticated() && <Link to="/films/new" className="navbar-item">Add Film</Link>}
              {Auth.isAuthenticated() && <Link to="/series/new" className="navbar-item">Add Series</Link>}
              {Auth.isAuthenticated() && <a onClick={this.handleLogout} className="navbar-item">Logout</a>}

              {/* {Auth.isAuthenticated() && <Link to='/profile' className="navbar-item"><FaUserAlt /></Link>} */}

              {!Auth.isAuthenticated() && <Link to="/register" className="navbar-item">Register</Link>}
              {!Auth.isAuthenticated() && <Link to="/login" className="navbar-item">Login</Link>}
            </div>
          </div>
        </div>
      </nav >
    )
  }
}

export default withRouter(Navbar)