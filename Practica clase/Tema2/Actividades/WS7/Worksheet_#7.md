The **geolocation API** allows the user to provide their location to web applications if they so desire. For privacy reasons, the user is asked for permission to report location information.

The geolocation API is published through the `navigator.geolocation` object. If the object exists, geolocation services are available.

1. Develop a web app in which:
   1. Test if geolocation is available.
   2. If it's available, show the current position (latitude and longitude)
   3. If it isn't available, show a message for each and everyone of the possible errors.
   4. Improve your code so you show the position continuously (although the user could be moving, so it could change)
   5. Find the way to meassure the distance traveled.
2. Let's try to use the geolocation information with the API of Here Maps.
   1. Use a map to show your location
   2. Draw a marker in your location
   3. Design a way to calculate and draw the route from my current location to a given place.
   4. Find a way to know the address of your location (reverse geocoding).
3. Repeat exercise 2 using another maps library, like Google Maps, Leaflet,....
4. Try to complete exercise 2 with these new features:
   1. Look for the way to animate your marker
   2. Draw the position of the user correctly although it could be moving.
   3. Draw the route of the user over the map.
