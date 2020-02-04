import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'

const FilmComment = ({ userId, el, handleClickComment }) => (
  <div className="box" id="box">
    <article className="media">
      <div className="media-left">
        <div className="comment is-size-6">
          <div className="username-change">
            <p className="username-comment">Comment by {el.user.username[0].toUpperCase()}{el.user.username.slice(1)}</p>
            {userId === el.user._id &&
              <div className="delete-comment">
                <a onClick={() => handleClickComment(el)} className="comment-delete-btn"><FaRegTrashAlt /></a>
                <p>Delete</p>
              </div>
            }
          </div>

          <p>{el.comment}</p>
        </div>
      </div>

    </article >
  </div >
)

export default FilmComment