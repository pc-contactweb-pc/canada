var wet_boew_geomap = {
	basemap: {
		title: "MapQuest OSM Map",
			title: 'MapQuest OSM Map',
			type: "xyz",
			url: [
				"http://otile1.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
				"http://otile2.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
				"http://otile3.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
				"http://otile4.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png"
			],
			mapOptions: {
				projection: "EPSG:900913",
				center: [-90.7222765, 62.5410882],
				zoomLevel: 3
			}
		}
};
