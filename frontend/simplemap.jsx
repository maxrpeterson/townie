import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const K_WIDTH = 40;
const K_HEIGHT = 40;

//give the style for the markers
const greatPlaceStyle = {  
  position: 'absolute',
  textAlign: 'center',
  border: '5px solid #f44336',
  borderRadius: K_HEIGHT,
  backgroundColor: 'white',  
  color: '#3f51b5',
  fontSize: 11,  
  fontWeight: 'bold',
  padding: 4
};

const Marker = ({ text }) => <button style={greatPlaceStyle}>{text}</button>;

const AddTripButton = props => {
  return <button onClick={props.addTrip}>Show Cullen's House</button>
}

class SimpleMap extends Component {
    constructor(props){
        super(props); 
        this.state = {
          markerObjects: [],
          voting: [],
          testing: [],
        };        
        this.updateVotingMarkers=this.updateVotingMarkers.bind(this);
        this.updateTestingMarkers=this.updateTestingMarkers.bind(this);
        // this.state = { isEmptyState: true, isAddTripState: false  }
        // this.triggerAddTripState = this.triggerAddTripState.bind(this);
    }

    updateVotingMarkers(data){
      var voting_sites = data;
            
            var metadata = voting_sites.meta.view.columns.filter(item => item.position > 0);

            //create positions, and map over the metadata to create fieldnames and positions
            var positions = [];
            Object.keys(metadata).map(key => positions[[metadata[key].fieldName]] = metadata[key].position + 7)
            // console.log(positions)
            const borough_pos = positions[Object.keys(positions).filter(key => key == "borough")];
            const latitude_pos = positions[Object.keys(positions).filter(key => key == "latitude")];
            const longitude_pos = positions[Object.keys(positions).filter(key => key == "longitude")];
            const site_name_pos = positions[Object.keys(positions).filter(key => key == "site_name")];
            var brooklyn_voting_sites = voting_sites.data.filter(item => item[borough_pos] == "BROOKLYN");

            //BELOW IS WHAT TO SEND TO THE FETCH
            var voting_markers = "[";
            brooklyn_voting_sites.map(item => voting_markers+='\n'+ JSON.stringify({text: item[site_name_pos],lat: item[latitude_pos], lng: item[longitude_pos] }) +"," )
            voting_markers += "{}]"
            
            //updateVotingMarkers(voting_markers);
             this.setState({ voting: JSON.parse(voting_markers) });
    }

    updateTestingMarkers(data){      
      //updateVotingMarkers(voting_markers);
      console.log("data",data)
      this.setState({ testing: data });
    }

    createMapOptions(maps) {
        return {
          panControl: false,
          mapTypeControl: false,
          scrollwheel: false,
          styles: [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dadada"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "road.local",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#c9c9c9"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            }
          ]
        }
      }

      triggerAddTripState(){
        this.setState({isEmptyState: true, isAddTripState: !this.state.isAddTripState })
      }

      // componentDidMount() {
      //   fetch(`http://localhost:5000/voting-stations`)
      //     .then(response => response.json())
      //     .then(data => this.setState({ voting: data }))
      //     .catch(err => {
      //       // Do something for an error here
      //       console.log("Error Reading data " + err);
      //     });;
      // }
      componentDidMount() {

        Promise.all([
          //voting sites
          fetch(`https://data.cityofnewyork.us/api/views/mifw-tguq/rows.json?accessType=DOWNLOAD`),
          //voting sites from the local host from express just to check
          fetch(`http://localhost:5000/voting-stations`),
          //google civic info API
          fetch('https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBe7_ta_1zNod6CsCJI6ssWk64kyO14HZo&address=104-40%20Queens%20Blvd'),
          //open states API
          fetch("https://openstates.org/graphql?apikey=ac3a7185-acfe-4687-8a02-80c339e04fbc&query={people(first:3){edges{node{name}}}}"),
          //state senate mapping data
          fetch("https://data.cityofnewyork.us/api/views/afns-vxeu/rows.json?accessType=DOWNLOAD"),
          //city council mapping data
          fetch("https://data.cityofnewyork.us/api/views/ve3w-z72j/rows.json?accessType=DOWNLOAD"),
          //covid testing sites
          fetch(`http://localhost:5000/testing-sites`),          

        ]) 
          .then(([res1,res2,res3,res4,res5,res6,res7]) => { 
              return Promise.all([res1.json(),res2.json(),res3.json(),res4.json(),res5.json(),res6.json(),res7.json()]) 
          })
          .then(([res1,res2,res3,res4,res5,res6,res7]) => {
            this.updateTestingMarkers(res7);
            console.log(res2);
            console.log(res3);
            console.log(res4);
            console.log(res5);
            console.log(res6);
            console.log(res1);
          });
        
        // fetch(`https://data.cityofnewyork.us/api/views/mifw-tguq/rows.json?accessType=DOWNLOAD`)
        //   .then(response => response.json())
        //   .then(data => { this.updateVotingMarkers(data)})
      }
    
 
  render() {
    return (
      // Important! Always set the container height explicitly
      
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBe7_ta_1zNod6CsCJI6ssWk64kyO14HZo" }}
          defaultCenter={{lat: 40.635,lng: -73.94}}
          defaultZoom={13}
          options = {this.createMapOptions}        
        >
         {this.state.testing.map((item,idx) => (
            <Marker
              key={idx}
              text={item.site_name}
              lat={ item.coordinates.lat}
              lng={ item.coordinates.lng}
            />
          ))}
          {/* {this.state.isEmptyState && <AddTripButton addTrip={this.triggerAddTripState} lat={40.627670} lng={-74.01} />}
          {this.state.isAddTripState && <Marker lat={40.627670} lng={-74.021710} text="Cullens house"/>}
          <Marker lat={40.608260} lng={-73.944680} text="Aunt Shari's House"/>
          <Marker lat={40.634580} lng={-73.966580} text="Uncle Jonny's House"/> */}
        </GoogleMapReact>        
      </div>
    );
  }
}
 
export default SimpleMap;