import React from 'react';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import {  Grid, FormControl, Input, FormHelperText, OutlinedInput ,Select } from '@material-ui/core';
import {  Typography, IconButton ,Divider,Box } from "@material-ui/core";

 export default class GeoLocation extends React.Component{
    constructor(props){
        super(props)
        this.state={
          
            latitude:false,
            longitude:false,
            
open:true,

updatelongitude:localStorage.getItem ('longitude'),
updatelatitude:localStorage.getItem ('latitude'),

latitudee:localStorage.getItem('latitude'),
longitudee:localStorage.getItem('longitude'),
        };
    
        this.getLocation=this.getLocation.bind(this);
        this.getCoordinates=this.getCoordinates.bind(this);
        this.reverseGeocodeCoordinates=this.reverseGeocodeCoordinates.bind(this);
        
        }


    


  editlatitude=()=>{
    this.setState({
      latitude:true,
     
    })
}

onChangeUpdatelatitude=(e)=>{
    this.setState({
      updatelatitude:e.target.value,
      latitude:e.target.value,
    
      

    })
}

editlatitudeCancel=()=>{
    this.setState({
        updatelatitude:localStorage.getItem('latitude'),
        latitude:localStorage.getItem('latitude'),
      
    })
}

editlatitudeUpdate=()=>{
    this.setState({
      latitudee:this.state.updatelatitude,

     
    })
    localStorage.setItem('latitude', this.state.updatelatitude)
}

editlongitude=()=>{
  this.setState({
    longitude:true
      
    
  })
}

onChangeUpdatelongitude=(e)=>{
  this.setState({
    updatelongitude:e.target.value,
    longitude:e.target.value
  })
}

editlongitudeCancel=()=>{
  this.setState({
      updatelongitude:localStorage.getItem('longitude'),
      longitude:localStorage.getItem('longitude'),
     
  })
}

editlongitudeUpdate=()=>{
  this.setState({
    longitudee:this.state.updatelongitude,

   
  })
  localStorage.setItem('longitude', this.state.updatelongitude)
}













     handleClose = () => {
          this.setState({open:false});
        };
         getLocation() {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(this.getCoordinates ,this.handleLocationError);
            } else {
              alert("Geolocation is not supported by this browser.");
            }
          }
          getCoordinates(position){
              this.setState({
              latitude:position.coords.latitude,
              longitude:position.coords.longitude,
             open:false
              })
              this.reverseGeocodeCoordinates();
          }
handleLocationError(error){
           switch(error.code) {
              case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break;
              case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
              case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break;
              case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
                default:
                alert("An unknown error occurred.")
               
           }
          }
          reverseGeocodeCoordinates(){
            fetch(`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=400x300&sensor=false${this.state.latitude},${this.state.longitude}&key=AIzaSyDC0fWxrkuZTEywEYuxMXmf5YXcURA9XTE`)
            .then(res => res.text())
          .then(data=>console.log(data))
          .catch(error=>alert(error))
          }



        render(){
         
                
            return(
                <div>
                  {/* <Button onClick={this.getLocation}>hii</Button>
                   

                <p>A:{this.state.latitude}</p>
                <p>B:{this.state.longitude}</p>
                <p>C:{this.state.userAddress}</p> */}


{
  this.state.latitude && this.state.longitude?
  <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=400x300&sensor=false${this.state.latitude},${this.state.longitude}&key="AIzaSyDC0fWxrkuZTEywEYuxMXmf5YXcURA9XTE"`} alt=''/>

  :
  null
 
}


<div  style={{display:"flex"}}>

                             
                              <FormControl variant="outlined" >
                                  <InputLabel htmlFor="Price">latitude</InputLabel>
                                  <OutlinedInput
                                  endAdornment={
                                    <InputAdornment position="end">
                                @
                                    </InputAdornment>}
                                    type="number"
                                      id="Price"
                                      
                                      value={this.state.latitude}
                                      onChange={this.onChangeUpdatelatitude}
                                      label="Price"
                                  />




                                 {/* <Button onClick={this.editlatitudeCancel } color="primary">
                              Cancel
                            </Button> */}
                                   {/* <Button onClick={this.getLocation }  color="primary" >
            Reset
          </Button>  */}

{this.state.latitude &&(
                            <Button  onClick={this.editlatitudeUpdate} color="primary" >
                              Update
                            </Button>
            )}
                              </FormControl>

                          
                        
                 
                     
               
                   
                    
                                             <FormControl variant="outlined" style={{marginLeft:"10%"}}>
                                                 <InputLabel htmlFor="longitudee">longitude</InputLabel>
                                                 <OutlinedInput
                                                 endAdornment={
                                                   <InputAdornment position="end">
                                               @
                                                   </InputAdornment>}
                                                   type="number"
                                                     id="longitude"
                                                     value={this.state.longitude}
                                                     onChange={this.onChangeUpdatelongitude}
                                                     label="longitude"
                                                     
                                                 />
              
          {/* <Button onClick={this.editlongitudeCancel } color="primary">
                                             Cancel
                                           </Button> */}
                                            {this.state.longitude &&(
                                           <Button  onClick={this.editlongitudeUpdate} color="primary" >
                                             Update
                                           </Button>
  )}
                                             </FormControl>
                                            
                      
                                 <Button onClick={this.getLocation }  color="primary" >
            Reset
          </Button>  

          </div>

          
       
      <Dialog
        open={this.state.open}
      
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location.please agree this message
          </DialogContentText>
        </DialogContent>
        <DialogActions>
      
          <Button onClick={this.getLocation }  color="primary" autoFocus>
            Agree
          </Button>
         
        </DialogActions>
      </Dialog>



                
                </div>
            )
        }
    }



