var wet_boew_geomap = {
    basemap: {
        title: 'Basic Map',
        type: 'esri',
        url: 'https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/CBMT3978/MapServer',
        options: { singleTile: false, ratio: 1.0, projection: 'EPSG:3978', fractionalZoom: true },
        mapOptions: {
            maxExtent: '-3000000.0, -800000.0, 4000000.0, 3900000.0',
            maxResolution: 'auto',
            projection: 'EPSG:3978',
            restrictedExtent: '-3000000.0, -800000.0, 4000000.0, 3900000.0',
            units: 'm',
            displayProjection: 'EPSG:4269',
            numZoomLevels: 2
        }
    },
    overlays: [

        {
            title: 'Parks Canada Areas',
            caption: 'National Parks, Reserves & Marine Conservation Areas administered by Parks Canada',
            type: 'geojson',
            url: 'https://opendata.arcgis.com/datasets/0fb235ee5bb34e51a825add061dd1a21_0.geojson',
            visible: true,
            attributes: {
                PLACE_TYPE_E: { path: 'properties', alias: 'Category' }
            },
            style: {
                type: 'unique',
                field: 'PLACE_TYPE_E',
                init: {
                    'National Park': {
                        'fillColor': '#125e25ff', 'fillOpacity': 0.8,
                        'strokeWidth': 1,
                    },
                    'National Park Reserve': {
                        'fillColor': '#125e25ff', 'fillOpacity': 0.8,
                        'strokeWidth': 1,
                    },
                    'National Marine Conservation Area': {
                        'fillColor': '#2816caff', 'fillOpacity': 0.8,
                        'strokeWidth': 1,
                    },
                    'National Marine Conservation Area Reserve': {
                        'fillColor': '#2816caff', 'fillOpacity': 0.8,
                        'strokeWidth': 1,
                    },
                   

                },
                default:{ 'fillColor': '#990085ff', 'label': '${ Category }' }, 
                select: { 'fillColor': '#990000', 'label': '${ Category }' }
            }
        }

    ]
};

/* {
            title: 'WMS Demo',
            caption: 'This is a sample WMS service loaded by Geomap.',
            type: 'wms',
            url: 'https://geo.weather.gc.ca/geomet/?Lang=E',
            visible: false,
            version: '1.1.1',
            format: 'image/png',
            layers: 'GDPS.ETA_PR',
            transparent: true,
            options: {
                opacity: 0.5
            }
        },
        {
            title: 'Esri REST Tile Layer',
            caption:
                'This is a sample dataset loaded from a remote Esri REST tile service.',
            type: 'esritile',
            url: '//maps-cartes.services.geo.ca/server_serveur/rest/services/NRCan/Carte_climatique_HOT2000_Climate_Map_EN/MapServer/',
            params: { LAYERS: 'show:0' },
            visible: !1,
            datatable: !1,
            options: {
                legendHTML:
                    "<ul class='list-unstyled'><li><small>Weather Station</small><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAFZJREFUOI3t0TEKwDAMQ1F9yIFzlN5YHUqgpOA2TZaANdnLQ9hFi1MSTPCKbbcZYAq0bWq3B2gI9pgkUWN086cAPG54xI95bdjQ+/674VdkGBxJgvM5AZAOH6jK5pnSAAAAAElFTkSuQmCC'></li></ul>",
            }
        },
        */
//{'id' : 'points-table-blank-example','zoom' : true,'tooltips' : true,'tooltipText' : 'Name','popups' : true,'popupsInfo' : { 'content' : '<h4>_Name</h4><p>_Description</p>' },'style' : { 'type' : 'rule', 'rule' : [{ 'field': 'Category', 'value': ['Location 1'], 'filter': 'EQUAL_TO', 'init': { 'externalGraphic': 'https://parks.canada.ca/-/media/WET4/iconographie-icons/carte-map/geomatic/geomap_square-1.png', 'graphicWidth': 35, 'graphicHeight': 35, 'fillOpacity': 1 } },]}}


/*
{
      title: 'JSON (Earthquakes)',
      caption:
        'This is a sample dataset loaded from a remote JSON resource, in this case the USGS Earthquakes API.',
      type: 'json',
      url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
      visible: !1,
      popups: !0,
      datatable: !0,
      zoom: !0,
      root: 'features',
      attributes: {
        title: { path: 'properties', alias: 'Title' },
        mag: { path: 'properties', alias: 'Magnitude' },
        time: { path: 'properties', alias: 'Time' },
      },
      style: {
        type: 'rule',
        rule: [
          {
            field: 'Magnitude',
            value: [2],
            filter: 'LESS_THAN',
            name: 'M < 2',
            init: {
              strokeColor: '#333333',
              fillColor: '#000066',
              pointRadius: 2.5,
              fillOpacity: 0.8,
              strokeWidth: 1,
            },
          },
          {
            field: 'Magnitude',
            value: [2, 2.9],
            filter: 'BETWEEN',
            name: 'M-2',
            init: {
              strokeColor: '#333333',
              fillColor: '#6600cc',
              pointRadius: 4.5,
              fillOpacity: 0.8,
              strokeWidth: 1,
            },
          },
          {
            field: 'Magnitude',
            value: [3, 3.9],
            filter: 'BETWEEN',
            name: 'M-3',
            init: {
              strokeColor: '#333333',
              fillColor: '#990099',
              pointRadius: 6.5,
              fillOpacity: 0.8,
              strokeWidth: 1,
            },
          },
          {
            field: 'Magnitude',
            value: [4, 4.9],
            filter: 'BETWEEN',
            name: 'M-4',
            init: {
              strokeColor: '#333333',
              fillColor: '#ff0000',
              pointRadius: 8,
              fillOpacity: 0.8,
              strokeWidth: 1,
            },
          },
          {
            field: 'Magnitude',
            value: [5, 5.9],
            filter: 'BETWEEN',
            name: 'M-5',
            init: {
              graphicName: 'star',
              strokeColor: '#333333',
              fillColor: '#ff6600',
              pointRadius: 14,
              fillOpacity: 0.8,
              strokeWidth: 1,
            },
          },
          {
            field: 'Magnitude',
            value: [5.9],
            filter: 'GREATER_THAN',
            name: 'M-6+',
            init: {
              graphicName: 'star',
              strokeColor: '#333333',
              fillColor: '#ff9933',
              pointRadius: 18,
              fillOpacity: 0.8,
              strokeWidth: 1,
            },
          },
        ],
      },
    },
    */