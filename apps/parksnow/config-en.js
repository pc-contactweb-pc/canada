var wet_boew_geomap = {
    overlays: [
        { title: "Parks Now", caption: "This is a sample dataset loaded from a remote JSON resource, in this case the USGS Earthquakes API.", type: "json", url: "https://pc-contactweb-pc.github.io/canada/apps/parksnow/parksNowResponse.json", visible: !0, popups: !0, datatable: !0, zoom: !0, root: "features", attributes: {
             LocationName: { path: "properties", alias: "Title"},
             StatusIconFileName: { path: "properties", alias: "Status"}, 
              ModifiedTimestampUtc: { path: "properties", alias: "Time"}, 
              Remarks: { path: "properties", alias: "Remarks"}
            },
             style:  { type: "rule", rule: [
                // 3 = green, 4 = yellow, 5 = red, 6 = black

                { field: "StatusID", value: "greenspot.png",  init: { strokeColor: "#333333", fillColor: "#056C07", pointRadius: 2.5, fillOpacity: .8, strokeWidth: 1}},
                { field: "StatusID", value: "yellowspot.png",  init: { strokeColor: "#333333", fillColor: "#FFF702", pointRadius: 2.5, fillOpacity: .8, strokeWidth: 1}},
                { field: "StatusID", value: "redspot.png",  init: { strokeColor: "#333333", fillColor: "#EB1E25", pointRadius: 2.5, fillOpacity: .8, strokeWidth: 1}},
                { field: "StatusID", value: "blackspot.png",  init: { strokeColor: "#333333", fillColor: "#000000", pointRadius: 2.5, fillOpacity: .8, strokeWidth: 1}}
                
            ]
        }

        }
    ]
};