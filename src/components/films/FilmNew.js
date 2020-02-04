import React from 'react'
import axios from 'axios'

import Auth from '../lib/Auth'
import FilmForm from './FilmForm'

class FilmNew extends React.Component {
  state = {
    data: {
      title: '',
      director: '',
      releaseYear: '',
      image: '',
      longDescription: '',
      description: ''
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/films', this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/films/${res.data._id}`)
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = (e) => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  render() {
    const { data } = this.state
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              <h2 className="big-title title-new has-text-centered">Add a new film</h2>
              <FilmForm
                data={data}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default FilmNew