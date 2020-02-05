import React from 'react'
import axios from 'axios'
import ItemCard from '../common/ItemCard'

class SeriesIndex extends React.Component {
  state = {
    series: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get('api/series')
      this.setState({ series: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { series } = this.state
    if (!series) return null
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-mobile is-multiline">
            {series.map(serie => (
              <ItemCard key={serie._id} item={serie} path='series' />
            ))}
          </div>
        </div>
      </section >
    )
  }
}

export default SeriesIndex