import React from 'react'
import axios from 'axios'

import Auth from '../lib/Auth'
import FilmForm from './FilmForm'
import ErrorPage from '../common/ErrorPage'

class FilmEdit extends React.Component {
  state = {
    data: {
      title: '',
      director: '',
      releaseYear: '',
      image: '',
      longDescription: '',
      description: ''
    },
    user: ''
  }

  async componentDidMount() {
    try {
      const res = await axios.get(`/api/films/${this.props.match.params.id}`)
      this.setState({ data: res.data, user: res.data.user })
    } catch (err) {
      console.log(err)
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/api/films/${this.props.match.params.id}`, this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/films/${this.props.match.params.id}`)
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = (e) => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  render() {
    const { data, user } = this.state
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              <h2 className="title">Edit {data.title}</h2>
              {user === Auth.getUserId()
                ?
                <FilmForm
                  data={data}
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                />
                :
                <ErrorPage />
              }
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default FilmEdit