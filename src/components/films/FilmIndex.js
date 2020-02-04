import React from 'react'
import axios from 'axios'

import FilmCard from './FilmCard'

class FilmIndex extends React.Component {
  state = {
    films: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/films')
      this.setState({ films: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { films } = this.state
    return (
      <section className="section">
        <div className="container">
          {/* <header className="index-header">
            <h2 className="big-title has-text-centered">Animation Films</h2>
            <p className="has-text-right">Sort on: Title, Year, Rating</p>
          </header> */}
          <div className="columns is-mobile is-multiline">
            {films.map(film => (
              <FilmCard key={film._id} {...film} />
            )
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default FilmIndex