var React = require('react-native');
var {
  StyleSheet,
  PropTypes,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} = React;

var MapView = require('react-native-maps');
var PriceMarker = require('./PriceMarker');

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

var markerIDs = ['Marker1', 'Marker2', 'Marker3', 'Marker4', 'Marker5'];
var timeout = 4000;

var FocusOnMarkers = React.createClass({
  getInitialState() {
    return {
      a: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      },
      b: {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
      c: {
        latitude: LATITUDE - (SPACE * 2),
        longitude: LONGITUDE - (SPACE * 2),
      },
      d: {
        latitude: LATITUDE - (SPACE * 3),
        longitude: LONGITUDE - (SPACE * 3),
      },
      e: {
        latitude: LATITUDE - (SPACE * 4),
        longitude: LONGITUDE - (SPACE * 4),
      },
    }
  },
  focusMap(markers, animated) {
    console.log("Markers received to populate map: " + markers);
    this.refs.map.fitToSuppliedMarkers(markers, animated);
  },
  focus1() {
    setTimeout(() => {
      this.focusMap([
        markerIDs[1],
        markerIDs[4]
      ], true);
    }, timeout);

    setTimeout(this.focus2, timeout);
  },
  focus2() {
    setTimeout(() => {
      this.focusMap([
        markerIDs[2],
        markerIDs[3]
      ], false);
    }, timeout);
    setTimeout(this.focus3, timeout);
  },
  focus3() {
    setTimeout(() => {
      this.focusMap([
        markerIDs[1],
        markerIDs[2]
      ], false);
    }, timeout);
    setTimeout(this.focus1, timeout);
  },
  componentDidMount() {
    setTimeout(() => {
      this.focusMap([
        markerIDs[0],
        markerIDs[3]
      ], true);
    }, timeout)
    setTimeout(this.focus1, timeout);
  },
  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref="map"
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <MapView.Marker
            identifier={'Marker1'}
            coordinate={this.state.a}
          />
          <MapView.Marker
            identifier={'Marker2'}
            coordinate={this.state.b}
          />
          <MapView.Marker
            identifier={'Marker3'}
            coordinate={this.state.c}
          />
          <MapView.Marker
            identifier={'Marker4'}
            coordinate={this.state.d}
          />
          <MapView.Marker
            identifier={'Marker5'}
            coordinate={this.state.e}
          />
        </MapView>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

module.exports = FocusOnMarkers;
