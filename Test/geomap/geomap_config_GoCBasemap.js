var wet_boew_geomap = {
    basemap: {
        title: 'Basic Map',
        type: 'esri',
        url: 'https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/CBMT3978/MapServer',
        // url: 'https://parks.canada.ca/-/media/19334603EFBA4355BD9DFFBED8280838.ashx',
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
    title: "Parks Canada Areas",
    caption: "National Parks, Reserves & Marine Conservation Areas administered by Parks Canada",
    type: "geojson",
    url: "https://opendata.arcgis.com/datasets/0fb235ee5bb34e51a825add061dd1a21_0.geojson",
    visible: true,
    datatable: true,
    attributes: {
      PLACE_TYPE_E: { path: "properties", alias: "Category" },
    //   DESC_EN: { path: "properties", alias: "Park_Name" }
    },
    style: {
      type: "unique",
      field: "PLACE_TYPE_E",
      init: {
        "National Park": { strokeColor: "#008000", fillColor: "#008000", fillOpacity: 0.4 },
        "National Park Reserve": { strokeColor: "#00aa00", fillColor: "#00aa00", fillOpacity: 0.4 },
        "National Marine Conservation Area": { strokeColor: "#00cccc", fillColor: "#00cccc", fillOpacity: 0.4 }
      },
      default: { strokeColor: "#ff0000", fillColor: "#ff0000", fillOpacity: 0.4 },
      select: { strokeColor: "#0000ff", fillColor: "#0000ff", fillOpacity: 0.6 }
    },
    after: function(layer) {
      // Force redraw immediately after features load
      layer.events.register("featuresadded", layer, function() {
        layer.redraw(true);
      });
    }
  }
]





    // style: {
    //     type: 'unique',
    //     field: 'Category',
    //     init: {
    //         'National Park': { fillColor: '#125e25', fillOpacity: 0.8, strokeWidth: 1 },
    //         'National Park Reserve': { fillColor: '#125e25', fillOpacity: 0.8, strokeWidth: 1 },
    //         'National Marine Conservation Area': { fillColor: '#2816ca', fillOpacity: 0.8, strokeWidth: 1 },
    //         'National Marine Conservation Area Reserve': { fillColor: '#2816ca', fillOpacity: 0.8, strokeWidth: 1 }
    //     },
    //     default: { fillColor: '#666666', fillOpacity: 0.5, strokeWidth: 1 },
    //     select: { fillColor: '#990000', fillOpacity: 1, strokeWidth: 2 }
    // }

    // style: {
    //     type: 'unique',
    //     field: 'Category',
    //     init: {
    //         'National Park': {
    //             'strokeColor': '#ff0000',
    //             'fillColor': '#ff0000',
    //             'fillOpacity': '0.4'
    //         },
    //         'National Park Reserve': {
    //             'strokeColor': '#ff0000',
    //             'fillColor': '#ff0000',
    //             'fillOpacity': '0.4'
    //         },
    //         'National Marine Conservation Area': {
    //             'strokeColor': '#ff0000',
    //             'fillColor': '#ff0000',
    //             'fillOpacity': '0.4'
    //         },
    //         'National Marine Conservation Area Reserve': {
    //             'strokeColor': '#ff0000',
    //             'fillColor': '#ff0000',
    //             'fillOpacity': '0.4'
    //         }
    //     },
    //     select: {
    //         'strokeColor': '#ff0000',
    //         'fillColor': '#ff0000',
    //         'fillOpacity': '0.4'
    //     }
    // }
    // This style works:
    // style: {
    //     'strokeColor': '#ff0000',
    //     'fillColor': '#ff0000',
    //     'fillOpacity': '0.4'
    // }
    // Save us chatGPT:
    // style: {
    //     'strokeColor': '#ff0000',
    //     'fillColor': '#ff0000',
    //     'fillOpacity': '0.4',
    //     select: {
    //         'strokeColor': '#1cd353ff',
    //         'fillColor': '#b628c9ff',
    //         'fillOpacity': '0.6'
    //     }
    // }



};
