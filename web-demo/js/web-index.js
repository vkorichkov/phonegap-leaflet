/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

//////////////////////////////////////////////////////////////////

var myDevice = 'http://www.korichkov.com/vvk/gps/cdf216ebb48f96ff';
var deviceId = 'cdf216ebb48f96ff';

//////////////////////////////////////////////////////////////////

var app = {
    // Application Constructor
    initialize: function() {

        var that = this;

        // TODO Hack http://stackoverflow.com/questions/19491875/phonegap-cordova-geolocation-not-working-on-android
        this.geolocation = false;
        if(navigator.geolocation) {
          this.geolocation = navigator.geolocation;
        }
        // end hack

        this.bindEvents();  
            
        app.resizeMap();
        
        //var northWest = L.latLng(42.833259, 23.136350),
        //southEast = L.latLng(42.592098, 23.503705);
        //bounds = L.latLngBounds(southWest, northEast);

        var map = L.map('map-canvas').setView([42.674484785342756, 23.330583572387695], 13);
        
        //this works, but is online:
        L.tileLayer('http://www.korichkov.com/osm_tiles/{z}/{x}/{y}.png', {
            maxZoom: 18
        }).addTo(map);

        this.initTrackingButtons(map);
        
        // TODO build something to fall back to web if not found.
        //L.tileLayer('img/mapTiles/{z}/{x}/{y}.png', {
        //  maxZoom: 18
        //}).addTo(map);


        //L.marker([42.674484785342756, 23.330583572387695]).addTo(map)
        //    .bindPopup("<b>FMI</b><br />Hello world!").openPopup();

        var popup = L.popup();

        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(map);
        }

        map.on('click', onMapClick);

        this.map = map;
    },

    clearNegativeCoords: function(dataArray){
      var newArr = [];
      for(var key in dataArray){
        var arr = dataArray[key];
        if(arr[0] === -1 && arr[1] === -1){
          // skip
        } else {
          newArr.push(arr);
        }
      }
      return newArr;
    },

    locateUser: function (map) {
      var that = this;
      $.getJSON(myDevice, function(data) {
          var track = data['geojson']['features'][0]['geometry']['coordinates'];
          track = that.clearNegativeCoords(track);
          data['geojson']['features'][0]['geometry']['coordinates'] = track;
          that.showTrackgeoJson(map, data['geojson']);


          var latlng = [data['current_pos']['lat'], data['current_pos']['lng']];
          var popupContent = "Device Id " + deviceId;
          var radius = 5;

          if(!this.currentPosMarker){
            this.currentPosMarker = L.marker(latlng).addTo(map)
              .bindPopup(popupContent).openPopup();
          }
          
          this.currentPosMarker.bindPopup(popupContent).setLatLng(latlng).update().openPopup();
          if(!this.currentPosCircle){
            this.currentPosCircle = L.circle(latlng, radius).addTo(map);
          } else {
            map.removeLayer(this.currentPosCircle);
            this.currentPosCircle = L.circle(latlng, radius).addTo(map);
          }

          map.setZoom(19).panTo(latlng);

        });
    },

    onGpsSuccess: function (position) {
      console.log('onGpsSuccess');
      console.log(position.coords.latitude);

      this.showCurrentPosition(this.map, position);
      // Latitude, Longitude, Altitude, Accuracy, Heading, Timestamp
      //  $('#geolocation').html('Latitude: '        + position.coords.latitude              + '<br />' + 
      //                      'Longitude: '          + position.coords.longitude             + '<br />' +
      //                      'Altitude: '           + position.coords.altitude              + '<br />' +
      //                      'Accuracy: '           + position.coords.accuracy              + '<br />' +
      //                      'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
      //                      'Heading: '            + position.coords.heading               + '<br />' +
      //                      'Speed: '              + position.coords.speed                 + '<br />' +
      //                      'Timestamp: '          + new Date(position.timestamp)          + '<br />');
    },

    showCurrentPosition: function(map, position){
      console.log(position.coords.longitude);
      var radius = position.coords.accuracy / 2;
      var latlng = [position.coords.latitude, position.coords.longitude];
      var popupContent = "You are within " + radius + " meters from this point";

      if(!this.currentPosMarker){
        this.currentPosMarker = L.marker(latlng).addTo(map)
          .bindPopup(popupContent).openPopup();
      }
      
      this.currentPosMarker.bindPopup(popupContent).setLatLng(latlng).update().openPopup();
      if(!this.currentPosCircle){
        this.currentPosCircle = L.circle(latlng, radius).addTo(map);
      } else {
        map.removeLayer(this.currentPosCircle);
        this.currentPosCircle = L.circle(latlng, radius).addTo(map);
      }
    },

    dummyCurrentPosition: function(that, map, position){
      console.log('dummyCurrentPosition');
      var latlng = [position['lat'], position['lng']];
      var radius = 40;
      var popupContent = '';

      if(position.hasOwnProperty('poi')){
        var poiList = position['poi'];
        console.log('poi' + poiList);
        var desc = poiList[0].desc;
        var href = poiList[0].images[0];
        var poiLatLng = [poiList[0].lat, poiList[0].lng];
        var popupContent = '<img height="100px" width="100px" src="' + href + '">'+ "<br>" + desc;

        if(popupContent !== ''){
          that.poiToRemove = that.poiToRemove || [];
          that.poiToRemove.push(L.marker(poiLatLng).addTo(map).bindPopup(popupContent).openPopup());
        }
      }
      
      if(!that.currentPosCircle){
        that.currentPosCircle = L.circle(latlng, radius).addTo(map);
      } else {
        map.removeLayer(that.currentPosCircle);
        that.currentPosCircle = L.circle(latlng, radius).addTo(map);
      }
      map.setZoom(16).panTo(latlng);
    },

    // onError Callback receives a PositionError object
    onGpsError: function (error) {
      console.log('onGpsError');
      console.log('' + error.code + ' ' + error.message);
      navigator.notification.alert(error.message, function(){},'GPS Location','Done');
    },

    showTrackgeoJson: function(map, track){
      L.geoJson(track, {
        style: {
          color: '#ff0000',
          weight: 3,
          opacity: 1
        }
      }).addTo(map);
    },

    initTrackingButtons: function(map){
      var that = this;

      function toggleOptionButtons() {
        console.log("toggleOptionButtons");
        that.locateUser(map);
        setTimeout(function(){
          toggleOptionButtons()
        }, 3000);
      }
      var trackingOptions = {
        'text': 'Tracking',
        'iconUrl': 'img/icon-tracking.png',
        'onClick': toggleOptionButtons,
        'hideText': false,
        'maxWidth': 30,  // number
        'doToggle': false,  // bool
        'toggleStatus': false  // bool
      };
      this.trackingButton = new L.Control.Button(trackingOptions).addTo(map);
    },

    addNotesAndFiles: function(){
      var that = this;
      this.trackName = this.trackName || "Test Track Name"; // todo
      // TODO check if trackName is set "notification.prompt"

      // this.takePictureTest();
      var mediaOptions = ["Audio", 'Image', 'Video'];
      navigator.notification.confirm("Select an audio, image, or video capture capability.", 
        function(buttonIndex){
          that.callCaptureMedia(mediaOptions[buttonIndex - 1]);
        }, this.trackName, mediaOptions);
    },

    callCaptureMedia: function(mediaType){
      var that = this;
      var capture = navigator.device.capture;
      var dataType = mediaType;
      var trackName = (this.trackName || "Test Track Name").replace(/\s/g, ''); // todo

      if(mediaType === "Audio"){
        capture = capture.captureAudio;
      } else if(mediaType === "Image"){
        capture = capture.captureImage;
      } else if(mediaType === "Video"){
        capture = capture.captureVideo;
      }

      var captureSuccess = function(mediaFiles) {
          var i, path, len;
          for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            that.persistMedia(trackName, dataType, mediaFiles[i].name, mediaFiles[i].fullPath);
          }
      };

      // capture error callback
      var captureError = function(error) {
          navigator.notification.alert('Error code: ' + error.code + ' ' + error.message, null, 'Capture Error');
      };

      capture(captureSuccess, captureError, {limit:1});
    },

    takePictureTest: function(){
      var that = this;

      var onSuccess = function (imageData) {
          var image = document.getElementById('myImage');
          image.src = "data:image/jpeg;base64," + imageData;
      }

      var onFail = function (message) {
        navigator.notification.alert('Failed because: ' + message, function(){},'Camera','Done');
      }

      navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
          destinationType: Camera.DestinationType.DATA_URL
      });
    },

    persistMedia: function(trackId, dataType, fileName, fullPath){
      window.localStorage.setItem(trackId + '.' + dataType + '.' + fileName, fullPath);
    },

    persistTrack: function(trackId, dataType, trackName, trackPoints){
      window.localStorage.setItem(trackId + '.' + dataType + '.' + trackName, JSON.stringify(trackPoints));
    },

    getPersistTrack: function(trackId, dataType, trackName){
      return JSON.parse(window.localStorage.getItem(trackId + '.' + dataType + '.' + trackName));
    },

    dumpLocalStorage: function(){
      console.log(window.device.uuid);

      var storage = window.localStorage;
      var filesToSync = '';
      for(var key in storage){
        console.log('Key:' + key + ' || File:' + storage[key]);
        filesToSync += 'Key:' + key + '\nFile:' + storage[key] + '\n';
      }

      var trackName = this.trackName || "Test Track Name"; // todo
      navigator.notification.alert(filesToSync, null, 'Files For Sync('+ trackName +')');
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    resizeMap: function() {
      $("#map-canvas").height(Math.max(100,$(window).height())); // TODO set 
    }
    
    
};
$(window).resize(function() {
  app.resizeMap();
});
