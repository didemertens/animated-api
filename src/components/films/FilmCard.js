import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegArrowAltCircleRight } from 'react-icons/fa'

const FilmCard = (film) => {
  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile" >
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="card">
            <div className="flip-card-front">
              <img className="card-image" src={film.image} />
            </div>
            <div className="flip-card-back">
              <h2 className="big-title title-flip">{film.title}</h2>
              <h2 className="director-flip">Directed by {film.director}</h2>
              <h2 className="text-flip content has-text-left">{film.description}</h2>
              <Link to={`/films/${film._id}`} id="btn-more"><FaRegArrowAltCircleRight /></Link>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default FilmCard