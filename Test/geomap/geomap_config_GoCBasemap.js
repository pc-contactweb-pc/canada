var wet_boew_geomap = {
    basemap: {
        title: 'Basic Map',
        type: 'esri',
        url: 'https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/CBMT3978/MapServer',
        options: { singleTile: false, ratio: '1.0', projection: 'EPSG:3978', fractionalZoom: true },
        mapOptions: {
            maxExtent: '-3000000.0, -800000.0, 4000000.0, 3900000.0',
            maxResolution: 'auto',
            projection: 'EPSG:3978',
            restrictedExtent: '-3000000.0, -800000.0, 4000000.0, 3900000.0',
            units: 'm',
            displayProjection: 'EPSG:4269',
            numZoomLevels: '2'
        }
    },
    overlays: [

        {
            title: 'Parks Canada Areas',
            caption: 'National Parks, Reserves & Marine Conservation Areas administered by Parks Canada',
            type: 'geojson',
            url: 'https://opendata.arcgis.com/datasets/0fb235ee5bb34e51a825add061dd1a21_0.geojson',
            visible: true,
             datatable: !0,
           
            attributes: {
                PLACE_TYPE_E: { path: 'properties', alias: 'Category' }
                // DESC_EN: { path: 'properties', alias: 'Park_Name' }
            },
            style: {
                type: 'unique',
                field: 'PLACE_TYPE_E',
                init: {
                    'National Park': {
                        fillColor: '#125e25', fillOpacity: '0.8', strokeWidth: '1'
                    },
                    'National Park Reserve': {
                        fillColor: '#125e25', fillOpacity: '0.8', strokeWidth: '1'
                    },
                    'National Marine Conservation Area': {
                        fillColor: '#2816ca', fillOpacity: '0.8', strokeWidth: '1'
                    },
                    'National Marine Conservation Area Reserve': {
                        fillColor: '#2816ca', fillOpacity: '0.8', strokeWidth: '1'
                    },
                    'null': {
                        fillColor: '#2816ca', fillOpacity: '0.8', strokeWidth: '1'
                    }
                },
                select: { fillColor: '#000000', fillOpacity: '0.8', strokeWidth: '1' }
            }

        }

    ]
};
