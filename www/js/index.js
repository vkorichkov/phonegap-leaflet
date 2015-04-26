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

var trackForPlay = [
  {
    lng:23.32173228263855,
    lat:42.70188171657805
  },
  {
    lng:23.321603536605835,
    lat:42.70143229621425
  },
  {
    lng:23.32193613052368,
    lat:42.70140075782095
  },
  {
    lng:23.32270860671997,
    lat:42.70127460408752
  },
  {
    lng:23.322365283966064,
    lat:42.700210171756446
  },
  {
    lng:23.32170009613037,
    lat:42.697892011536766,
    poi:[{
        desc: "Света София",
        images: ['http://monuments.bg/img/photos/1x700_94943__6017977.jpg'],
        lng:23.322020,
        lat:42.697651
      },
    ]
  },
  {
    lng:23.32170009613037,
    lat:42.697892011536766,
    poi:[{
        desc: "Метро станция Сердика",
        images: ['http://www.sofia-guide.com/assets/metro_serdika_tzum.jpg'],
        lng:23.321140,
        lat:42.698005
      },
    ]
  },
  {
    lng:23.334660530090332,
    lat:42.69245109152106
  },
  {
    lng:23.332428932189938,
    lat:42.68614218171535
  },
  {
    lng:23.331377506256104,
    lat:42.686063316287765
  },
  {
    lng:23.330562114715576,
    lat:42.68544816251638
  },
  {
    lng:23.331034183502194,
    lat:42.68338183217684
  },
  {
    lng:23.332021236419674,
    lat:42.678838818493894
  },
  {
    lng:23.333373069763184,
    lat:42.6768669209854
  },
  {
    lng:23.33320140838623,
    lat:42.676677615532626
  },
  {
    lng:23.333566188812256,
    lat:42.676251676155346
  },
  {
    lng:23.33000421524048,
    lat:42.67500539232029
  },
  {
    lng:23.330454826354977,
    lat:42.674484785342756
  }
];

var mytracks = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            23.321839570999146,
            42.67846021902611
          ],
          [
            23.32269787788391,
            42.678318243630976
          ],
          [
            23.32275152206421,
            42.67852331909763
          ],
          [
            23.322783708572388,
            42.67864163155894
          ],
          [
            23.322612047195435,
            42.6788309310285
          ],
          [
            23.3225154876709,
            42.679036004803095
          ],
          [
            23.322730064392086,
            42.67917797855822
          ],
          [
            23.32348108291626,
            42.6794303755442
          ],
          [
            23.323169946670532,
            42.679564461025976
          ],
          [
            23.323963880538937,
            42.68049516404254
          ],
          [
            23.32419991493225,
            42.68070811955256
          ],
          [
            23.32398533821106,
            42.68083431506593
          ],
          [
            23.32369565963745,
            42.681883305350254
          ],
          [
            23.323856592178345,
            42.682183013607094
          ],
          [
            23.323577642440796,
            42.68262468629776
          ],
          [
            23.32348108291626,
            42.68282974755112
          ],
          [
            23.32395315170288,
            42.683618438371724
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            23.32173228263855,
            42.70188171657805
          ],
          [
            23.321603536605835,
            42.70143229621425
          ],
          [
            23.32193613052368,
            42.70140075782095
          ],
          [
            23.32270860671997,
            42.70127460408752
          ],
          [
            23.322365283966064,
            42.700210171756446
          ],
          [
            23.32170009613037,
            42.697892011536766
          ],
          [
            23.334660530090332,
            42.69245109152106
          ],
          [
            23.332428932189938,
            42.68614218171535
          ],
          [
            23.331377506256104,
            42.686063316287765
          ],
          [
            23.330562114715576,
            42.68544816251638
          ],
          [
            23.331034183502194,
            42.68338183217684
          ],
          [
            23.332021236419674,
            42.678838818493894
          ],
          [
            23.333373069763184,
            42.6768669209854
          ],
          [
            23.33320140838623,
            42.676677615532626
          ],
          [
            23.333566188812256,
            42.676251676155346
          ],
          [
            23.33000421524048,
            42.67500539232029
          ],
          [
            23.330454826354977,
            42.674484785342756
          ]
        ]
      }
    }
  ]
};

//////////////////////////////////////////////////////////////////

var app = {
    // Application Constructor
    initialize: function() {

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
        L.tileLayer('http://192.168.25.88:3333/osm_tiles/{z}/{x}/{y}.png', {
            maxZoom: 19
        }).addTo(map);

        this.initTrackingButtons(map);
        
        //TODO build something to fall back to web if not found.
        //L.tileLayer('img/mapTiles/{z}/{x}/{y}.png', {
        //  maxZoom: 17
        //}).addTo(map);


        L.marker([42.674484785342756, 23.330583572387695]).addTo(map)
            .bindPopup("<b>FMI</b><br />Hello world!").openPopup();

        var popup = L.popup();

        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(map);
        }

        map.on('click', onMapClick);

        this.showTrackgeoJson(map, mytracks);

        this.map = map;
    },

    locateUser: function (map) {
      var that = this;
      console.log('locateUser');
      // !!! AFTER the deviceready event:
      // this.geolocation - native HTML5 geolocation; navigator.geolocation - cordova geolocation plugin
      var locationService = this.geolocation || navigator.geolocation;
      //locationService.getCurrentPosition(
      //    function(position){
      //      that.onGpsSuccess(position);
      //    },
      //    function(error){
      //      that.onGpsError(error);
      //    }, 
      //    {enableHighAccuracy: true, timeout: 30000}  
      //);
      locationService.watchPosition(
        function(position){
          that.onGpsSuccess(position);
        },
        function(error){
          that.onGpsError(error);
        }, 
        { enableHighAccuracy: true, timeout: 35000 }
      );
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
      var popupContent = '<img height="100px" width="100px" src="' + document.getElementById('myImage').src + '">'+
        "<br>You are within " + radius + " meters from this point";

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
        // TODO
        that.locateUser(map);
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

      function toggleRecording() {
        console.log("toggleRecording");
        // TODO
        that.dumpLocalStorage();
      }
      var recordingOptions = {
        'text': 'Record',
        'iconUrl': 'img/icon-recording.png',
        'onClick': toggleRecording,
        'hideText': false,
        'maxWidth': 30,  // number
        'doToggle': false,  // bool
        'toggleStatus': false  // bool
      };
      this.recordingButton = new L.Control.Button(recordingOptions).addTo(map);

      function addNotes() {
        console.log("addNotes");
        that.addNotesAndFiles();
      }

      var notesOptions = {
        'text': 'Notes',
        'iconUrl': 'img/icon-notes.png',
        'onClick': addNotes,
        'hideText': false,
        'maxWidth': 30,  // number
        'doToggle': false,  // bool
        'toggleStatus': false  // bool
      };
      this.recordingButton = new L.Control.Button(notesOptions).addTo(map);

      var copytrack = trackForPlay.slice();
      function demo() {
        console.log("demo");
        if(copytrack.length === 0){
          copytrack = trackForPlay.slice();
          that.poiToRemove = that.poiToRemove || [];
          for(var key in that.poiToRemove){
            that.map.removeLayer(that.poiToRemove[key]);
          }
          return;
        }
        window.setTimeout(demo, 1800);
        that.dummyCurrentPosition(that, that.map, copytrack.pop());
      }

      var demoOptions = {
        'text': 'Demo',
        'iconUrl': 'img/icon-play.png',
        'onClick': demo,
        'hideText': false,
        'maxWidth': 30,  // number
        'doToggle': false,  // bool
        'toggleStatus': false  // bool
      };
      this.demoButton = new L.Control.ButtonTopLeft(demoOptions).addTo(map);
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
