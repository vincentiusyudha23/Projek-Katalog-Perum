import React from 'react';
import proj4 from 'proj4';
import { useEffect } from 'react';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'


const utm48 = "+proj=utm +zone=48 +datum=WGS84 +units=m +south";

const convertEastingNorthingToLatLng = (easting, northing) => {
    proj4.defs('EPSG:32648', utm48); // Mendefinisikan projeksi UTM 48
    const utmPoint = proj4('EPSG:32648', 'EPSG:4326', [easting, northing]); // Konversi koordinat Easting dan Northing ke latitude dan longitude
    return utmPoint;
};

const MapsAddView = (easting, northing, label) => {

    const latLng = convertEastingNorthingToLatLng(easting, northing);

    return <MapContainer center={[latLng[1], latLng[0]]} zoom={15} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latLng[1], latLng[0]]}>
            <Popup >
                {label}
            </Popup>
            <Tooltip>{label}</Tooltip>
        </Marker>
    </MapContainer>
}

const NoMapsView = () => {
    return <MapContainer center={[-5.398301, 105.1942905]} zoom={10}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    </MapContainer>
}

const MapsView = ({ easting, northing, label }) => {
    return !easting && !northing ? NoMapsView() : MapsAddView(easting, northing, label)
}

export default MapsView