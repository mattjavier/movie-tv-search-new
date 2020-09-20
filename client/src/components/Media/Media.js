import React from 'react'
import { makeStyles } from '@material-ui/core/styles' 
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})

const Media = props => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.media.poster}
        title={props.media.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.media.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          Year: {props.media.year}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          Type: {props.media.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => props.handleSaveMedia(props.media.imdbID)}>
            Save
          </Button>
      </CardActions>
    </Card>
  )
}

export default Media