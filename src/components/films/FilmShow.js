import React from 'react'
import axios from 'axios'
import { notify } from 'react-notify-toast'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'

import Auth from '../lib/Auth'
import FilmComment from './FilmComment'

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
          <div className="columns">
            <div className="column is-3">
              <figure className="show-image has-text-centered">
                <img src={film.image} />
              </figure>
            </div>
            <div className="column is-5">
              <div className="title-edit-delete">
                <h2 className="big-title">{film.title}</h2>
                {userId === film.user && Auth.isAuthenticated() &&
                  <div className="change-film">
                    <div>
                      <a onClick={this.handleEditFilm} className="edit-btn"><FaRegEdit /></a>
                      <p>Edit</p>
                    </div>
                    <div>
                      <a onClick={this.handleDeleteFilm} className="delete-btn"><FaRegTrashAlt /></a>
                      <p>Delete</p>
                    </div>
                  </div>
                }
              </div>
              <div className="film-details">
                <div className="film-details-text">
                  <h2>Directed by {film.director}</h2>
                  <br />
                  <h2>Released in {film.releaseYear}</h2>
                  <br />
                  <h2>{film.longDescription}</h2>
                </div>
              </div>
            </div>
            <div className="column is-4">
              <div className="container comments-container">
                <h2 className="big-title big-title-comments">Comments</h2>
                <div className="comments-section">
                  {film.comments && film.comments.map(el => (
                    <FilmComment
                      key={el._id}
                      el={el}
                      userId={userId}
                      handleClickComment={this.handleClickComment}
                      trashIcon={FaRegTrashAlt}
                    />
                  ))}
                </div>
                {film.comments && film.comments.length === 0 &&
                  <div className="box" id="box">
                    <article className="media">
                      {Auth.isAuthenticated() ?
                        <h2>Be the first to write a comment!</h2>
                        :
                        <h2>No comments yet</h2>
                      }
                    </article>
                  </div>
                }
                {Auth.isAuthenticated()
                  ? <form onSubmit={this.handleSubmit}>
                    <div className="field field-new-comment">
                      <label className="label">
                        <div className="control input-new-comment">
                          <input
                            className="input"
                            placeholder="Comment"
                            name="comment"
                            value={comment}
                            onChange={this.handleChange}
                          />
                        </div>
                      </label>
                    </div>
                    <button className="button">Submit</button>
                  </form>
                  :
                  <h2 className="login-msg-comments">Log in to write a comment!</h2>}
              </div>
            </div>
          </div>
        </div>
      </section >
    )
  }
}

export default FilmShow