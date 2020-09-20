import React, { createContext } from 'react'

const MediaContext = createContext({
  search: '',
  media: [],
  handleInputChange: () => { },
  handleSearchOMDB: () => { },
  handleSaveMedia: () => { },
  saved: [],
  handleDeleteSaved: () => { }
})

export default MediaContext