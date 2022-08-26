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
                type: "unique", field: "Status", init: {
                    "greenspot.png": { name: "Available", "externalGraphic": "https://user-images.githubusercontent.com/45856706/186971109-202d4320-59cb-4f95-9ca8-bfc769ef7a91.svg"},
                    "yellowspot.png": { name: "Limited", "externalGraphic": "https://user-images.githubusercontent.com/45856706/186971106-8e809376-e908-4906-8310-5f2a4bf007e2.svg"},
                    "redspot.png": { name: "Full", "externalGraphic": "https://user-images.githubusercontent.com/45856706/186971105-f6e8e99d-0584-40c6-9b76-e56d34c040d1.svg"},
                    "blackspot.png": { name: "Closed", "externalGraphic": "https://user-images.githubusercontent.com/45856706/186971096-b0b1cbf5-8f5b-459e-a562-49b5856fa92f.svg" }
                }
            }
        }
    ]
};



// //  "init": {
//     "Frontcountry - Reservable": {
//         "externalGraphic": "icons/lhnnhs-svg5.svg",
//         "fillOpacity": "1",
//         "graphicWidth": "25",
//         "name": "Frontcountry - Reservable"
//     },
//     "Frontcountry - First-come; first-served": {
//         "externalGraphic": "icons/lhnnhs-svg5.svg",
//         "fillOpacity": "1",
//         "graphicWidth": "25",
//         "name": "Frontcountry - First-come; first-served"
//     },

//     "Backcountry - First-come; first-served": {
//         "externalGraphic": "icons/lhnnhs-svg5.svg",
//         "fillOpacity": "1",
//         "graphicWidth": "25",
//         "name": "Backcountry - First-come; first-served"
//     }