import React, { useState } from 'react'
import MediaContext from '../../utils/MediaContext'
import Typography from '@material-ui/core/Typography'
import Form from '../../components/Form'
import Media from '../../components/Media'
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
      <hr />
      <Typography variant="h6">
        Search for Movies and TV Shows
      </Typography>
      <MediaContext.Provider value={mediaState}>
        <Form />
        {
          mediaState.media.length > 0 ? (
            mediaState.media.map(media => (
              <Media 
                key={media.imdbID}
                media={media}
                handleSaveMedia={mediaState.handleSaveMedia}
              />
            ))
          ) : null
        }
      </MediaContext.Provider>
    </>
  )
}

export default Home