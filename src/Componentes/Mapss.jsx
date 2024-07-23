import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./Mapss.css";
import MapboxGeoCoder from "@mapbox/mapbox-gl-geocoder";

// Obtén el token de entorno
const tokenml = process.env.REACT_APP_MAPBOX;

if (typeof tokenml === "undefined") {
  throw new Error("You need token...");
}

// Asigna el token de acceso de Mapbox
mapboxgl.accessToken = tokenml;

const Mapss = () => {
  const mapContainer = useRef(null);
  const map = useRef(null); // Inicializa el mapa con useRef
  const geocoder = useRef(null);

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      // Si el mapa aún no se ha inicializado y el contenedor del mapa está disponible
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [-89.6237, 20.9671],
        zoom: 12,
      });

      const { accessToken } = mapboxgl;
      geocoder.current = new MapboxGeoCoder({
        accessToken,
        mapboxgl,
      });

      map.current.addControl(geocoder.current);
      geocoder.current.on('result', (e) => {
        const { center } = e.result;
        console.log("Selected location:", e);
        
        // Imprime las coordenadas en la consola antes de guardarlas en localStorage
        const latitude = center[1];
        const longitude = center[0];
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        if (map.current) {
          map.current.flyTo({
            center,
            zoom: 14,
            essential: true,
          });
        }

        // Guarda las coordenadas en el localStorage
        const coordinates = {
          latitude,
          longitude
        };
        localStorage.setItem('selectedLocation', JSON.stringify(coordinates));
      });
    }
  }, []); 

  return (
    <div
      ref={mapContainer} // Asigna el contenedor del mapa
      style={{
        top: 20,
        bottom: 0,
        left: 0,
        width: "90%",
        height: "95%",
      }}
    />
  );
};

export default Mapss;
