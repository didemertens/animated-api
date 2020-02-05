import React from 'react'

const SeriesForm = ({ handleSubmit, data, handleChange }) => (
  <form className="seriesForm" onSubmit={handleSubmit}>
    <div className="field">
      <label className="label">Title</label>
      <div className="control">
        <input
          className="input"
          placeholder="Title"
          name="title"
          value={data.title}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <div className="field">
      <label className="checkbox label">Still Running?
        <input
          className="checkbox"
          name="stillRunning"
          type="checkbox"
          onChange={handleChange}
          checked={data.stillRunning}
        />
      </label>
    </div>
    <div className="field">
      <label className="label">Release Year</label>
      <div className="control">
        <input
          className="input"
          placeholder="Release Year"
          name="releaseYear"
          value={data.releaseYear}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <div className="field">
      <label className="label">Image</label>
      <div className="control">
        <input
          className="input"
          placeholder="Image"
          name="image"
          value={data.image}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <div className="field">
      <label className="label">Long Description</label>
      <div className="control">
        <textarea
          className="input"
          placeholder="Long Description (max. 850 characters)"
          name="longDescription"
          value={data.longDescription}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <div className="field">
      <label className="label">Short description</label>
      <div className="control">
        <textarea
          className="input"
          placeholder="Short description (max. 200 characters)"
          name="description"
          value={data.description}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <div className="has-text-centered">
      <button className="button" id="btn-green">Submit</button>
    </div>
  </form>
)

export default SeriesForm