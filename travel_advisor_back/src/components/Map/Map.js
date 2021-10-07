import React, {useState} from 'react'
import GoogleMapReact from 'google-map-react'

import {Paper, Typography, useMediaQuery} from "@material-ui/core";
import {LocationOnOutlined} from "@material-ui/icons";
import {Rating} from '@material-ui/lab'
import useStyles from './styles'
import mapStyles from './mapStyles'

const Map = ({setBounds, setCoords, coords, places, setChildClicked,weatherData}) => {
  const classes = useStyles()
  const isDesktop = useMediaQuery('(min-width:600px)')
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact bootstrapURLKeys={{key: 'AIzaSyCs5HohErrjGJIkWZgvc-cX-1L8ZEM2z1k'}} defaultCenter={coords}
                      center={coords}
                      defaultZoom={14}
                      margin={[50, 50, 50, 50]}
                      options={{disableDefaultUI:true, zoomControl:true, styles:mapStyles}}
                      onChange={(e) => {
                        setCoords({lat: e.center.lat, lng: e.center.lng})
                        setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                      }}
                      onChildClick={(child) => {
                        setChildClicked(child)
                      }}
      >
        {places?.map((place, i) => (
          <div className={classes.markerContainer} lat={Number(place.latitude)} lng={Number(place.longitude)} key={i}>
            {!isDesktop ? (
              <LocationOnOutlined color={'primary'} fontSize={'large'}/>
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography className={classes.typography} variant={'subtitle2'}>
                  {place.name}
                </Typography>
                <img
                  src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                  } alt={place.name} className={classes.pointer}/>
                <Rating size={'small'} value={Number(place.rating)} readOnly/>
              </Paper>
            )}
          </div>
        ))}
        {weatherData?.list?.map((data,i)=> (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt=""/>
          </div>
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default Map
