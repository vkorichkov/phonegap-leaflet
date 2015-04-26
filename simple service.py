import os, json, bottle
from bottle import request, response

# Change working directory so relative paths (and template lookup) work again
os.chdir(os.path.dirname(__file__))

# ... build or import your bottle application here ...
# Do NOT use bottle.run() with mod_wsgi
application = bottle.default_app()
app = application

@app.hook('after_request')
def enable_cors():
    print "after_request hook"
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'


@app.route('/files/<uuid>/<coords>', method='post')
def do_upload(uuid, coords):
    save_path = os.path.dirname(__file__) + '/static'
    if not os.path.exists(save_path):
        os.makedirs(save_path)
    file = request.files.get('file')
    name = uuid + '#' + coords + '#' + file.filename
    file_path = "{path}/{file}".format(path=save_path, file=name)
    file.save(file_path, overwrite=True)

    return name

from os import listdir
from os.path import isfile, join

@app.route('/gps/<uuid>', method='get')
def get_files(uuid):
    save_path = os.path.dirname(__file__) + '/static/gps'
    if not os.path.exists(save_path):
        os.makedirs(save_path)

    ff = None
    data = ''
    ffName = save_path + '/' + uuid
    if os.path.isfile(ffName):
        ff = open(ffName, 'r')
        data = ff.read()
        ff.close()

    if data == '':
        data = """{
                    "current_pos": {},
                    "geojson": {
                      "type": "FeatureCollection",
                      "features": [
                        {
                          "type": "Feature",
                          "properties": {},
                          "geometry": {
                            "type": "LineString",
                            "coordinates": [

                            ]
                          }
                        }
                      ]
                    }
                  }
              """
    return data

@app.route('/files', method='get')
def get_files():
    mypath = os.path.dirname(__file__) + '/static'    
    onlyfiles = [ f for f in listdir(mypath) if isfile(join(mypath,f)) ]
    return json.dumps(onlyfiles)

@app.route('/gps/<uuid>/<coords>', method='get')
def do_gps(uuid, coords):
    save_path = os.path.dirname(__file__) + '/static/gps'
    if not os.path.exists(save_path):
        os.makedirs(save_path)

    ff = None
    data = ''
    ffName = save_path + '/' + uuid
    if os.path.isfile(ffName):
        ff = open(ffName, 'r')
        data = ff.read()
        ff.close()

    if data == '':
        data = """{
                    "current_pos": {},
                    "geojson": {
                      "type": "FeatureCollection",
                      "features": [
                        {
                          "type": "Feature",
                          "properties": {},
                          "geometry": {
                            "type": "LineString",
                            "coordinates": [

                            ]
                          }
                        }
                      ]
                    }
                  }
              """
    coords = coords.replace('lat', '"lat"').replace('lng', '"lng"')
    coords_dict = json.loads('{' + coords + '}')
    obj = json.loads(data)
    obj['current_pos'] = coords_dict
    obj['geojson']['features'][0]['geometry']['coordinates'].append([coords_dict['lng'], coords_dict['lat']])

    ff = open(ffName, 'w')
    ff.write(json.dumps(obj, sort_keys=True, indent=4, separators=(',', ': ')))
    ff.close()