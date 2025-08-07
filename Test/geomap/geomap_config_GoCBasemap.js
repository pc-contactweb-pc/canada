var wet_boew_geomap = {
    basemap: {
        title: "Basic Map",
        type: "esri",
        url: "https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/CBMT3978/MapServer",
        options: { singleTile: false, ratio: 1.0, projection: "EPSG:3978", fractionalZoom: true },
        mapOptions: {
            maxExtent: "-3000000.0, -800000.0, 4000000.0, 3900000.0",
            maxResolution: "auto",
            projection: "EPSG:3978",
            restrictedExtent: "-3000000.0, -800000.0, 4000000.0, 3900000.0",
            units: "m",
            displayProjection: "EPSG:4269",
            numZoomLevels: 2
        }
    },
    overlays: [
        {
            title: "WMS Demo",
            caption: "This is a sample WMS service loaded by Geomap.",
            type: "wms",
            url: "https://geo.weather.gc.ca/geomet/?Lang=E",
            visible: false,
            version: "1.1.1",
            format: "image/png",
            layers: "GDPS.ETA_PR",
            transparent: true,
            options: {
                opacity: 0.5
            }
        }

    ]
};