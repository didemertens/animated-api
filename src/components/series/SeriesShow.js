import React from 'react'
import axios from 'axios'
import { notify } from 'react-notify-toast'

import Auth from '../lib/Auth'
import ItemShow from '../common/ItemShow'

class SeriesShow extends React.Component {
  state = {
    serie: {},
    userId: '',
    comment: ''
  }

  async componentDidMount() {
    try {
      const res = await axios.get(`/api/series/${this.props.match.params.id}`)
      this.setState({ serie: res.data, userId: Auth.getUserId('userId') })
    } catch (err) {
      console.log(err)
    }
  }


  handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      comment: this.state.comment
    }
    try {
      await axios.post(`/api/series/${this.props.match.params.id}/comments`, data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ comment: '' })
      this.getComments()
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = (e) => {
    this.setState({ comment: e.target.value })
  }

  getComments = async () => {
    try {
      const res = await axios.get(`/api/series/${this.props.match.params.id}`)
      this.setState({ serie: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleClickComment = async (el) => {
    try {
      await axios.delete(`/api/series/${this.props.match.params.id}/comments/${el._id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      notify.show('Comment deleted', 'error')
      this.getComments()
    } catch (err) {
      console.log(err)
    }
  }

  handleDeleteSerie = async () => {
    try {
      await axios.delete(`/api/series/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      notify.show('Series deleted', 'error')
      this.props.history.push('/series')
    } catch (err) {
      console.log(err)
    }
  }

  handleEditSerie = () => {
    this.props.history.push(`/series/${this.props.match.params.id}/edit`)
  }

  render() {
    const { serie, userId, comment } = this.state
    return (
      <section className="section section-show">
        <div className="container">
          <ItemShow
            item={serie}
            userId={userId}
            handleEditItem={this.handleEditSerie}
            handleDeleteItem={this.handleDeleteSerie}
            handleClickComment={this.handleClickComment}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            comment={comment}
          />
        </div>
      </section>
    )
  }
}

export default SeriesShow