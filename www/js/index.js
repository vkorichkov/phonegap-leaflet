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

var mytrack = {
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
    }
  ]
};


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();  
            
        app.resizeMap();
        
        var northWest = L.latLng(42.833259, 23.136350),
        southEast = L.latLng(42.592098, 23.503705);
        //bounds = L.latLngBounds(southWest, northEast);

        var map = L.map('map-canvas').setView([42.678098, 23.327055], 13);
        
        //this works, but is online:
        L.tileLayer('http://192.168.25.88:3333/osm_tiles/{z}/{x}/{y}.png', {
            maxZoom: 18
        }).addTo(map);
        
        //TODO build something to fall back to web if not found.
        //L.tileLayer('img/mapTiles/{z}/{x}/{y}.png', {
        //  maxZoom: 17
        //}).addTo(map);


        L.marker([42.678098, 23.327055]).addTo(map)
            .bindPopup("<b>Hello world!</b><br />Chicho e bot.").openPopup();

        var popup = L.popup();

        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(map);
        }

        map.on('click', onMapClick);

        L.geoJson(mytrack, {
          style: {
            color: '#ff0000',
            weight: 1,
            opacity: 1
          }
        }).addTo(map);
        
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
         $("#map-canvas").height(Math.max(100,$(window).height()));// TODO set 
    }
    
    
};

    

    $(window).resize(function() {
        app.resizeMap();
    });
