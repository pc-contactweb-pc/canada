var wet_boew_geomap = {
    overlays: [
        {
            title: "Parks Now", caption: "The latest information on visiting Parks Canada", type: "json", url: "https://pc-contactweb-pc.github.io/canada/apps/parksnow/parksNowResponse.json?3", visible: !0, popups: !0, datatable: !0, zoom: !0, root: "features", attributes: {
                LocationName: { path: "properties", alias: "Location" },
                StatusIconFileName: { path: "properties", alias: "Status" },
                ModifiedTimestampUtc: { path: "properties", alias: "Updated" },
                Remarks: { path: "properties", alias: "Remarks" }
            },

            style: {
                init: {
                    'strokeColor': '#ff0000',
                    'fillColor': '#ff0000',
                    'fillOpacity': '0.4'
                },
                // type: "unique", field: "Status", init: {
                //     greenspot: { name: "Available", externalGraphic: "https://user-images.githubusercontent.com/45856706/186975873-c7b4ee62-8ba2-418a-8aaf-a89f6c4c3d14.png", fillOpacity: "1", graphicWidth: "25"},
                //     yellowspot: { name: "Limited", externalGraphic: "https://user-images.githubusercontent.com/45856706/186975885-9b2ac8b6-f934-441f-b5d1-b2e4f73fc2d2.png", fillOpacity: "1", graphicWidth: "25"},
                //     redspot: { name: "Full", externalGraphic: "https://user-images.githubusercontent.com/45856706/186975884-76d0ce34-0f31-4ba6-9979-9ef6fa07be94.png", fillOpacity: "1", graphicWidth: "25"},
                //     blackspot: { name: "Closed", externalGraphic: "https://user-images.githubusercontent.com/45856706/186975883-0fcbbc67-3f4e-42f6-9714-eafa6cbf5e3c.png", fillOpacity: "1", graphicWidth: "25" }
                // }, 
                select: {
                    'strokeColor': '#3AFF00', 'fillColor': '#3AFF00', 'pointRadius': 4.5, 'fillOpacity': .8, 'strokeWidth': 1
                }
            }

            // SVG version
            // style: {
            //     type: "unique", field: "Status", init: {
            //         "greenspot": { name: "Available", externalGraphic: "https://user-images.githubusercontent.com/45856706/186971109-202d4320-59cb-4f95-9ca8-bfc769ef7a91.svg", fillOpacity: "1", graphicWidth: "25"},
            //         "yellowspot": { name: "Limited", externalGraphic: "https://user-images.githubusercontent.com/45856706/186971106-8e809376-e908-4906-8310-5f2a4bf007e2.svg", fillOpacity: "1", graphicWidth: "25"},
            //         "redspot": { name: "Full", externalGraphic: "https://user-images.githubusercontent.com/45856706/186971105-f6e8e99d-0584-40c6-9b76-e56d34c040d1.svg", fillOpacity: "1", graphicWidth: "25"},
            //         "blackspot": { name: "Closed", externalGraphic: "https://user-images.githubusercontent.com/45856706/186971096-b0b1cbf5-8f5b-459e-a562-49b5856fa92f.svg", fillOpacity: "1", graphicWidth: "25" }
            //     }
            // }
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