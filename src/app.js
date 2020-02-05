import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Notification from 'react-notify-toast'
import './styles/main.scss'
import 'bulma'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import ProfilePage from './components/common/ProfilePage'

import SecureRoute from './components/lib/SecureRoute'
import Auth from './components/lib/Auth'

import FilmIndex from './components/films/FilmIndex'
import FilmShow from './components/films/FilmShow'
import FilmNew from './components/films/FilmNew'
import FilmEdit from './components/films/FilmEdit'

import Register from './components/auth/Register'
import Login from './components/auth/Login'

import SeriesIndex from './components/series/SeriesIndex'
import SeriesShow from './components/series/SeriesShow'
import SeriesEdit from './components/series/SeriesEdit'
import SeriesNew from './components/series/SeriesNew'


class App extends React.Component {
  componentDidMount() {
    if (!Auth.isAuthenticated) Auth.logout()
  }

  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar />
          <Notification />
          <Switch>
            <Route exact path='/' component={Home} />
            <SecureRoute path='/films/:id/edit' component={FilmEdit} />
            <SecureRoute path='/films/new' component={FilmNew} />
            <Route path='/films/:id' component={FilmShow} />
            <Route path='/films' component={FilmIndex} />

            <Route exact path='/series/:id/edit' component={SeriesEdit} />
            <Route exact path='/series/new' component={SeriesNew} />
            <Route exact path='/series/:id' component={SeriesShow} />
            <Route exact path='/series' component={SeriesIndex} />

            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/profile' component={ProfilePage} />
            <Route />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)