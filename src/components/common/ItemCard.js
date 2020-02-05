import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegArrowAltCircleRight } from 'react-icons/fa'

const FilmCard = ({ item, path }) => {
  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile" >
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="card">
            <div className="flip-card-front">
              <img className="card-image" src={item.image} />
            </div>
            <div className="flip-card-back">
              <h2 className="big-title title-flip">{item.title}</h2>
              {item.director && <h2 className="director-flip">Directed by {item.director}</h2>}
              {!item.director && item.stillRunning && <h2 className="director-flip">Still running</h2>}
              {!item.director && !item.stillRunning && <h2 className="director-flip">Done</h2>}
              <h2 className="text-flip content has-text-left">{item.description}</h2>
              <Link to={`/${path}/${item._id}`} id="btn-more"><FaRegArrowAltCircleRight /></Link>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default FilmCard