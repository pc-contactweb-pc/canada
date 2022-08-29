var wet_boew_geomap = {
    basemap: {
        title: "MapQuest OSM Map",
        type: "xyz",
        url: [
            "http://otile1.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
            "http://otile2.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
            "http://otile3.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
            "http://otile4.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png"
        ],
        mapOptions: {
            projection: "EPSG:900913",
            // center: [-123, 49],
            zoomLevel: 5
        }
    },
    overlays: [
        {
            title: "Parks Now",
            caption: "The latest information on visiting Parks Canada",
            type: "json",
            url: "https://pc-contactweb-pc.github.io/canada/apps/parksnow/parksNowResponse.json?3",
            visible: !0,
            popups: !0,
            datatable: !0,
            zoom: !0,
            root: "features",
            attributes: {
                StatusIconFileName: { path: "properties", alias: "Type" },
                LocationName: { path: "properties", alias: "Location" },
                ModifiedTimestampUtc: { path: "properties", alias: "Updated" },
                Remarks: { path: "properties", alias: "Remarks" }
            },
            style: {
                type: "unique",
                field: "Type",
                init: {
                    greenspot: {
                        externalGraphic: "https://user-images.githubusercontent.com/45856706/186992816-29e52dd6-82e6-400e-96ec-b33c19f94db1.png",
                        fillOpacity: "1",
                        graphicWidth: "25",
                        name: "Parking available",
                    },
                    yellowspot: {
                        externalGraphic: "https://user-images.githubusercontent.com/45856706/186992814-f200d633-6ee5-4a87-9814-5ccdf4857817.png",
                        fillOpacity: "1",
                        graphicWidth: "25",
                        name: "Limited availability",
                    },
                    redspot: {
                        externalGraphic: "https://user-images.githubusercontent.com/45856706/186992811-1a98cb21-b546-48b7-98dd-cd7036e00107.png",
                        fillOpacity: "1",
                        graphicWidth: "25",
                        name: "Parking full",
                    },
                    blackspot: {
                        externalGraphic: "https://user-images.githubusercontent.com/45856706/186992817-b3ede806-f39a-4c71-9089-a7e72d973e5c.png",
                        fillOpacity: "1",
                        graphicWidth: "25",
                        name: "Parking closed",
                    }
                },
                select: {
                    externalGraphic: "https://user-images.githubusercontent.com/45856706/186975883-0fcbbc67-3f4e-42f6-9714-eafa6cbf5e3c.png", graphicOpacity: "1",
                },
            },
        },
    ],
};