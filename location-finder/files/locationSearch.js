var wet_boew_geomap = {
	basemap: {
		title: "OpenStreetMap",
			type: "osm",
			url: [
				"https://a.tile.openstreetmap.org/${z}/${x}/${y}.png",
				"https://b.tile.openstreetmap.org/${z}/${x}/${y}.png",
				"https://c.tile.openstreetmap.org/${z}/${x}/${y}.png"
			],
			mapOptions: {
				projection: "EPSG:3857"
			}
		}
};