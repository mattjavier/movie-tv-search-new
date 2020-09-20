import React, { useState, useEffect } from 'react'
import MediaContext from '../../utils/MediaContext'
import Typography from '@material-ui/core/Typography'
import SavedMedia from '../../components/SavedMedia'
import API from '../../utils/API'

const Saved = () => {
  
  const [savedState, setSavedState] = useState({
    saved: []
  })

  savedState.handleDeleteSaved = id => {
    API.deleteMedia(id)
      .then(() => {
        let saved = savedState.saved.filter(media => media._id !== id)
        setSavedState({ ...savedState, saved })
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    API.getSavedMedia()
      .then(({ data }) => {
        setSavedState({ ...savedState, saved: data })
      })
  }, [])

  return (
    <> 
      <hr />
      <Typography variant="h6">
        Search for Movies and TV Shows
      </Typography>
      <MediaContext.Provider value={savedState}>
        {
          savedState.saved.length > 0 ? (
            savedState.saved.map(media => (
              <SavedMedia 
                key={media.imdbID}
                media={media}
                handleDeleteSaved={savedState.handleDeleteSaved}
              />
            ))
          ) : null
        }
      </MediaContext.Provider>
    </>
  )
}

export default Saved