var wet_boew_geomap = {
    overlays: [
        {
            title: "Parks Now", caption: "The latest information on visiting Parks Canada", type: "json", url: "https://pc-contactweb-pc.github.io/canada/apps/parksnow/parksNowResponse.json", visible: !0, popups: !0, datatable: !0, zoom: !0, root: "features", attributes: {
                LocationName: { path: "properties", alias: "Title" },
                StatusIconFileName: { path: "properties", alias: "Status" },
                ModifiedTimestampUtc: { path: "properties", alias: "Time" },
                Remarks: { path: "properties", alias: "Remarks" }
            },
            style: {
                type: "unique", "field": "Status", init: {
                    "greenspot.png": { name: "Available", 'fillColor': "#056C07"},
                    "yellowspot.png": { name: "Limited", 'fillColor': "#FFF702"},
                    "redspot.png": { name: "Full", 'fillColor': "#EB1E25"},
                    "blackspot.png": { name: "Closed", 'fillColor': "#000000" }
                }
            }
        }
    ]
};