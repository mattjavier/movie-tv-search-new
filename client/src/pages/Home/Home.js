import React, { useState } from 'react'
import API from '../../utils/API'

const Home = () => {

  // create State variables
  const [mediaState, setMediaState] = useState({
    search: '',
    media: []
  })

  // handle input, sets 'search' to search field
  mediaState.handleInputChange = event => {
    setMediaState({ ...mediaState, [event.target.name]: event.target.value })
  }

  // handle search button
  mediaState.handleSearchOMDB = event => {
    event.preventDefault()

    // makes a call to omdb API, search for movies
    API.getMedia(mediaState.search)
      .then(({ data }) => {
        // set our states
        setMediaState({ ...mediaState, media: data, search: '' })
      })
      .catch(err => console.error(err))
  }

  // handle save button
  mediaState.handleSaveMedia = imdbID => {

    // get the media object from the media array, x is the saved media 
    const saveMedia = mediaState.media.filter(x => x.imdbID === imdbID)[0]

    // post media to db
    API.saveMedia(saveMedia)
      .then(() => {

        // remove saved media from screen
        const media = mediaState.media.filter(x => x.imdbID !== imdbID)
        setMediaState({ ...mediaState, media })
      })
  }

  return (
    <>
      <h1>Search for Movies & TV Shows</h1>
      <form>
        <p>
          <label htmlFor="search">Search</label>
          <input 
            type="text" 
            name="search" 
            value={mediaState.search}
            onChange={mediaState.handleInputChange} />
        </p>
        <p>
          <button onClick={mediaState.handleSearchOMDB}>Search OMDB</button>
        </p>
      </form>
      {
        mediaState.media.length > 0 ? (
          mediaState.media.map(media => (
            <div key={media.imdbID}>
              <img src={media.poster} alt={media.title} />
              <h3>{media.title}</h3>
              <h4>Type: {media.type}</h4>
              <h4>Year: {media.year}</h4>
              <h5>imdbID: {media.imdbID}</h5>
              <button onClick={() => mediaState.handleSaveMedia(media.imdbID)}>Save</button>
            </div>
          ))
        ) : null
      }
    </>
  )
}

export default Home