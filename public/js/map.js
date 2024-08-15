mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: 'mapbox://styles/mapbox/streets-v9', // style URL
  center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 10, // starting zoom
});

const marker1 = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h5>${listing.location}</h5><p>Exact location will be provided after booking!</p>`
    )
  )
  .addTo(map);

// map.on("load", () => {
//   // Load an image from an external URL.
//   map.loadImage(
//     "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rawpixel.com%2Fsearch%2Fcat%2520transparent&psig=AOvVaw1gIYV7CgwACZVZ_376A4Ex&ust=1723802766561000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOiB1e7f9ocDFQAAAAAdAAAAABAE",
//     (error, image) => {
//       if (error) throw error;

//       // Add the image to the map style.
//       map.addImage("cat", image);

//       // Add a data source containing one point feature.
//       map.addSource("point", {
//         type: "geojson",
//         data: {
//           type: "FeatureCollection",
//           features: [
//             {
//               type: "Feature",
//               geometry: {
//                 type: "Point",
//                 coordinates: listing.geometry.coordinates,
//               },
//             },
//           ],
//         },
//       });
//     }
//   );
// });
