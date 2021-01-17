import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    float: 'left',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function SongCardContent(props) {
  const classes = useStyles();
  const theme = useTheme();
  let track = props.track;
  console.log(new Date(track.date));
  return (
        <Card style = {{"max-width": "400px"}} className={classes.root}>
        <div className={classes.details}>
            <CardContent className={classes.content}>
            <Typography component="h5" variant="h5"  style={{ color: '#009400' }}>
                {track.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                {track.artist}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" fontSize = "1vw">
                {"Released: " + new Date(track.releaseDate).toDateString()}
            </Typography>
            </CardContent>
        </div>
        <CardMedia
            className={classes.cover}
            image = {track.albumCoverUrl}
            title="Live from space album cover"
        />
        </Card>
  );
}