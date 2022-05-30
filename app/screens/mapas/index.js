import React, { useState, useEffect } from 'react';
import { Alert, Image, ScrollView, TextInput, View, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Header, SearchInvoice, SubmissionItem, ErrorInvoice } from '../../components';
import styles from './styles';
import MapView, {Marker, Polyline, PROVIDER_DEFAULT} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_KEY} from '@env'
import RNLocation from 'react-native-location';

const street = require('../../assets/street.png')
const fin = require('../../assets/fin.png')


function MapsScreen() {
    const profile = useSelector(store => store.user.profile);

const [origin, setOrigin] = React.useState({
    latitude: -34.610559,
    longitude: -58.4452937
})

const [destination, setDestination] = React.useState({
    latitude: -34.6010569,
    longitude: -58.4307454
})

//const carImage = require('../../assets/people.png')

React.useEffect(()=>{
getLocationPermission();
}, [])


  RNLocation.configure({
    distanceFilter: 100, // Meters
    desiredAccuracy: {
      ios: "best",
      android: "balancedPowerAccuracy"
    },
    // Android only
    androidProvider: "auto",
    interval: 5000, // Milliseconds
    fastestInterval: 10000, // Milliseconds
    maxWaitTime: 5000, // Milliseconds
    // iOS Only
    activityType: "other",
    allowsBackgroundLocationUpdates: false,
    headingFilter: 1, // Degrees
    headingOrientation: "portrait",
    pausesLocationUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: false,
})


async function getLocationPermission(){

const permission = await RNLocation.requestPermission({
    ios: "whenInUse",
    android: {
      detail: "coarse",
      rationale: {
        title: "We need to access your location",
        message: "We use your location to show where you are on the map",
        buttonPositive: "OK",
        buttonNegative: "Cancel"
      }
    }
  })
    if(!permission) {
        console.log(permission)
        const location = ""
        
    }else{
        console.log("Todo Ok")
        const location = await RNLocation.getLatestLocation({timeout: 100})
        console.log(location, location.longitude, location.latitude,   
                    location.timestamp)
    }

const location = {
    latitude: location.latitude,
    longitude: location.longitude

 }
 setOrigin(location);
 console.log(location)
}


         return (
        <>
            <ScrollView style={styles.container}>
           
                <Header
                    title={"¿Cómo llegar?"}
                    //description={'Listado de facturas de tus actividades'}
                />
                <View style={{alignItems:'center'}}>
                <MapView style={{width:'100%', height:'300%', justifyContent:'center', alignItems:'center'}}
                    zoomEnabled={true}
                    provider={PROVIDER_DEFAULT}
                    initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                    <Marker 
                    coordinate={origin}
                    draggable
                    image={street}
                    key={origin}
                    onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
                    />
                    <Marker 
                    coordinate={destination}
                    draggable
                    image={fin}
                    onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
                    />

                    <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={'AIzaSyA1PAMaduvc4CHUz8IwM8ZkJ9Z2ynuOL64'} //hay que ajustar la api 
                    strokeColor="blue"
                    strokeWidth={4}
                    />


                    <Polyline
                    coordinates={[origin, destination]}
                    strokeColor="blue"
                    strokeWidth={4}
                    />
                </MapView>
                </View>
                
                
                
                
            </ScrollView>
        
        </>
        
    );
    
}
export default MapsScreen;
