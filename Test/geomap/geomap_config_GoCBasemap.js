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
        },
        {
      title: "Esri REST Tile Layer",
      caption:
        "This is a sample dataset loaded from a remote Esri REST tile service.",
      type: "esritile",
      url: "//maps-cartes.services.geo.ca/server_serveur/rest/services/NRCan/Carte_climatique_HOT2000_Climate_Map_EN/MapServer/",
      params: { LAYERS: "show:0" },
      visible: !1,
      datatable: !1,
      options: {
        legendHTML:
          "<ul class='list-unstyled'><li><small>Weather Station</small><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAFZJREFUOI3t0TEKwDAMQ1F9yIFzlN5YHUqgpOA2TZaANdnLQ9hFi1MSTPCKbbcZYAq0bWq3B2gI9pgkUWN086cAPG54xI95bdjQ+/674VdkGBxJgvM5AZAOH6jK5pnSAAAAAElFTkSuQmCC'></li></ul>",
      },
    },
    {
      title: "Test PCA",
      caption:
        "This is a test.",
      type: "esritile",
      url: "//services2.arcgis.com/wCOMu5IS7YdSyPNx/arcgis/rest/services/vw_Places_Public_lieux_public_APCA/FeatureServer/0",
      params: { LAYERS: "show:0" },
      visible: 1,
      datatable: 1,
      options: {
        legendHTML:
          "<p>PCA</p>",
      },
    },

    ]
};