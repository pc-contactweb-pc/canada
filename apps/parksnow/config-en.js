var wet_boew_geomap = {
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
            popupsInfo: {
                close: true,
                content: "<div>_Location<br>_Remarks<br><br>_Updated</div>"
            }
        },
    ],
};