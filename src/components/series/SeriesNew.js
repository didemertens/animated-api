import React from 'react'
import axios from 'axios'

import Auth from '../lib/Auth'
import SeriesForm from './SeriesForm'

class SeriesNew extends React.Component {
  state = {
    data: {
      title: '',
      stillRunning: true,
      releaseYear: '',
      image: '',
      longDescription: '',
      description: ''
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/series', this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/series/${res.data._id}`)
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
    const { data } = this.state
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              <h2 className="big-title title-new has-text-centered">Add a new Series</h2>
              <SeriesForm
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

export default SeriesNew