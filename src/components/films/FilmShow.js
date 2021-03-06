import React from 'react'
import axios from 'axios'
import { notify } from 'react-notify-toast'


import Auth from '../lib/Auth'
import Itemshow from '../common/ItemShow'

class FilmShow extends React.Component {
  state = {
    film: {},
    comment: '',
    userId: ''
  }

  async componentDidMount() {
    try {
      const res = await axios.get(`/api/films/${this.props.match.params.id}`)
      const userId = Auth.getUserId('userId')
      this.setState({ film: res.data, userId })
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
      await axios.post(`/api/films/${this.props.match.params.id}/comments`, data, {
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
      const res = await axios.get(`/api/films/${this.props.match.params.id}`)
      this.setState({ film: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleClickComment = async (el) => {
    try {
      await axios.delete(`/api/films/${this.props.match.params.id}/comments/${el._id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      notify.show('Comment deleted', 'error')
      this.getComments()
    } catch (err) {
      console.log(err)
    }
  }

  handleDeleteFilm = async () => {
    try {
      await axios.delete(`/api/films/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      notify.show('Film deleted', 'error')
      this.props.history.push('/films')
    } catch (err) {
      console.log(err)
    }
  }

  handleEditFilm = () => {
    this.props.history.push(`/films/${this.props.match.params.id}/edit`)
  }

  render() {
    const { film, comment, userId } = this.state
    return (
      <section className="section section-show">
        <div className="container">
          <Itemshow
            item={film}
            userId={userId}
            handleEditItem={this.handleEditFilm}
            handleDeleteItem={this.handleDeleteFilm}
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

export default FilmShow