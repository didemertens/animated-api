import React from 'react'
import { FaRegHeart } from 'react-icons/fa'

const Home = () => (
  <>
    <section id="hero-page">
      <div className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <h1 className="hero-title is-uppercase is-size-1-mobile">Animated</h1>
          <div className="home-btns">
            <a href="/films" className="box is-size-7-mobile" id="btn-home-page"><span>Films</span></a>
            <a href="/series" className="box is-size-7-mobile" id="btn-home-page"><span>Series</span></a>
          </div>
        </div>

      </div>

    </section>
    <nav className="navbar is-fixed-bottom" id="footer">
      <div className="content has-text-right">
        <p>Made with <span><FaRegHeart /></span> by Dide</p>
      </div>
    </nav>
  </>
)

export default Home