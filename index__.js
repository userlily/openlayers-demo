import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat, toLonLat} from 'ol/proj.js';
// import {defaults as defaultControls, Control} from 'ol/control.js'
// import {ZoomSlider} from 'ol/control.js';
import {defaults as defaultControls, Attribution, ZoomSlider, ScaleLine} from 'ol/control.js';
import Overlay from 'ol/Overlay.js'
import {toStringHDMS} from 'ol/coordinate.js'

const map = new Map({
	target: 'map',
	layers: [
		new TileLayer({
			source: new OSM()
		})
	],
	view: new View({
		center: fromLonLat([120.182488,35.947269]),
		zoom: 14
	}),
	controls: defaultControls({
		// attributionOptions: {
		// 	// collapsible: false,
		// 	// className: 'test-logo'
		// }
		attribution: false
	}).extend([
		// new Attribution({
		// 	label: '以萨技术'
		// }),
		new ZoomSlider(),
		new ScaleLine()
	])
});
// map.addControl(new ZoomSlider());
const pos = fromLonLat([120.172488,35.947269])
// marker
const marker = new Overlay({
	position: pos,
	positioning: 'center-center',
	element: document.getElementById('marker'),
	stopEvent: false
})
map.addOverlay(marker)
// label
const label = new Overlay({
	position: pos,
	element: document.getElementById('label')
})
map.addOverlay(label)
// popup
const popup = new Overlay({
	element: document.getElementById('popup')
})
map.addOverlay(popup)

map.on('click', function (evt) {
	const element = popup.getElement()
	const coordinate = evt.coordinate
	const hdms = toStringHDMS(toLonLat(coordinate))

	$(element).popover('destroy')
	popup.setPosition(coordinate)
	$(element).popover({
		placement: 'top',
		animation: false,
		html: true,
		content: `<p>The location you clicked was::</p><code>${hdms}</code>`
	})
	$(element).popover('show')
})