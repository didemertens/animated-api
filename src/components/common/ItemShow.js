import React from 'react'
import Auth from '../lib/Auth'
import FilmComment from '../films/FilmComment'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'

const ItemShow = ({ item, userId, comment, handleEditItem, handleDeleteItem, handleClickComment, handleChange, handleSubmit }) => {
  return (
    <div className="columns">
      <div className="column is-3">
        <figure className="show-image has-text-centered">
          <img src={item.image} />
        </figure>
      </div>
      <div className="column is-5">
        <div className="title-edit-delete">
          <h2 className="big-title">{item.title}</h2>
          {userId === item.user && Auth.isAuthenticated() &&
            <div className="change-film">
              <div>
                <a onClick={handleEditItem} className="edit-btn"><FaRegEdit /></a>
                <p>Edit</p>
              </div>
              <div>
                <a onClick={handleDeleteItem} className="delete-btn"><FaRegTrashAlt /></a>
                <p>Delete</p>
              </div>
            </div>
          }
        </div>
        <div className="film-details">
          <div className="film-details-text">
            <h2>Directed by {item.director}</h2>
            <br />
            <h2>Released in {item.releaseYear}</h2>
            <br />
            <h2>{item.longDescription}</h2>
          </div>
        </div>
      </div>
      <div className="column is-4">
        <div className="container comments-container">
          <h2 className="big-title big-title-comments">Comments</h2>
          <div className="comments-section">
            {item.comments && item.comments.map(el => (
              <FilmComment
                key={el._id}
                el={el}
                userId={userId}
                handleClickComment={handleClickComment}
                trashIcon={FaRegTrashAlt}
              />
            ))}
          </div>
          {item.comments && item.comments.length === 0 &&
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
            ? <form onSubmit={handleSubmit}>
              <div className="field field-new-comment">
                <label className="label">
                  <div className="control input-new-comment">
                    <input
                      className="input"
                      placeholder="Comment"
                      name="comment"
                      value={comment}
                      onChange={handleChange}
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
  )
}

export default ItemShow