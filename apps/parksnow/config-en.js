var wet_boew_geomap = {
    overlays: [
        { title: "JSON (Earthquakes)", caption: "This is a sample dataset loaded from a remote JSON resource, in this case the USGS Earthquakes API.", type: "json", url: "https://pc-contactweb-pc.github.io/canada/apps/parksnow/parksNowResponse.json", visible: !1, popups: !0, datatable: !0, zoom: !0, root: "features", attributes: { LocationName: { path: "properties", alias: "Title"
                }, StatusID: { path: "properties", alias: "Status"
                }, ModifiedTimestampUtc: { path: "properties", alias: "Time"
                }, Remarks: { path: "properties", alias: "Remarks"
            }
            }
        }
    ]
};