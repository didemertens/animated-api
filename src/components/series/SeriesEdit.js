import React from 'react'
import axios from 'axios'

import Auth from '../lib/Auth'
import ErrorPage from '../common/ErrorPage'
import SeriesForm from './SeriesForm'

class SeriesEdit extends React.Component {
  state = {
    data: {
      title: '',
      stillRunning: '',
      releaseYear: '',
      image: '',
      longDescription: '',
      description: ''
    },
    user: ''
  }

  async componentDidMount() {
    try {
      const res = await axios.get(`/api/series/${this.props.match.params.id}`)
      this.setState({ data: res.data, user: res.data.user })
    } catch (err) {
      console.log(err)
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/api/series/${this.props.match.params.id}`, this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/series/${this.props.match.params.id}`)
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = (e) => {
    let data = {}
    if (e.target.name === 'stillRunning') {
      if (e.target.value === 'true') {
        data = { ...this.state.data, [e.target.name]: true }
      } else {
        data = { ...this.state.data, [e.target.name]: false }
      }
    } else {
      data = { ...this.state.data, [e.target.name]: e.target.value }
    }
    this.setState({ data })
  }

  render() {
    console.log(this.state.data)
    const { data, user } = this.state
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              <h2 className="title">Edit {data.title}</h2>
              {user === Auth.getUserId()
                ?
                <SeriesForm
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

export default SeriesEdit