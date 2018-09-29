import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj.js';

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
	})
});