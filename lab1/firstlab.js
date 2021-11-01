#THis is the first line.

// Here are five examples of using differnt functions.

//Example 1: Merge the image Collection  ee.ImageCollection.merge()

var tuscaloosa=ee.FeatureCollection("TIGER/2018/Counties").filterMetadata('NAME','equals','Tuscaloosa')
var sentinel1=ee.ImageCollection("COPERNICUS/S2_SR").filterBounds(tuscaloosa).filterDate('2021-01-01','2021-01-10')
var landsat=ee.ImageCollection("LANDSAT/LC08/C01/T2_TOA").filterBounds(tuscaloosa).filterDate('2021-01-01','2021-01-10')
print(sentinel1)
print(landsat)

var merge= sentinel1.merge(landsat)
print(merge)

Map.addLayer(tuscaloosa)

This merges two image collection into one. Here the Image Collection with landsat images are merged with the Sentinel 2 image collection of Tuscaloosa county for the time period of first 10 days of 2021.


Example 2: ee.ImageCollection.toBands
var ndvi=ee.ImageCollection("MODIS/006/MOD13Q1").filterBounds(tuscaloosa).filterDate('2021-01-01','2021-05-30').select('NDVI')
print (ndvi)

var multiband_ndvi=ndvi.toBands()
print(multiband_ndvi)

// Image Collection name ndvi is created containing the ndvi values from first 5 months of 2021 of Tuscaloosa. ImageCollection.toBands() function is used that converts the ndvi image collection to a single multiband image containing bands of every image in the collection.


Example 3: FeatureCollection of power plants.

var collection = ee.FeatureCollection('WRI/GPPD/power_plants');

print('All non-system FeatureCollection properties as an ee.Dictionary',
      collection.toDictionary());
print('Selected properties as an ee.Dictionary',
      collection.toDictionary(['date_range', 'provider', 'title']));

// This function is used to extract properties from a feature as a dictionary.


Example 4: reduceToVectors()

// Load a Poland boundary from the Large Scale International Boundary dataset.
var poland = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
  .filter(ee.Filter.eq('country_na', 'Poland'));

// Load a 2012 nightlights image, clipped to the Japan border.
var nl2012 = ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F182012')
  .select('stable_lights')
  .clipToCollection(poland);

// Define arbitrary thresholds on the 6-bit nightlights image.
var zones = nl2012.gt(30).add(nl2012.gt(55)).add(nl2012.gt(62));
zones = zones.updateMask(zones.neq(0));

// Convert the zones of the thresholded nightlights to vectors.
var vectors = zones.addBands(nl2012).reduceToVectors({
  geometry: poland,
  crs: nl2012.projection(),
  scale: 1000,
  geometryType: 'polygon',
  eightConnected: false,
  labelProperty: 'zone',
  reducer: ee.Reducer.mean()
});

// Display the thresholds.
Map.addLayer(zones, {min: 1, max: 3, palette: ['0000FF', '00FF00', 'FF0000']}, 'raster');

// Make a display image for the vectors, add it to the map.
var display = ee.Image(0).updateMask(0).paint(vectors, '000000', 3);
Map.addLayer(display, {palette: '000000'}, 'vectors');

//The reduceToVectors() method creates polygon edges at the boundary of homogeneous groups of connected pixels.This can thus be used for creating a Vector file from the raster file. Here using the thresholds on the night 
//Zones are combined into single band image and these zones are vectorized.


Example 5. 

// A series of ee.DateRange objects.
var dateRange1 = ee.DateRange('2017-06-24', '2017-07-24');
var dateRange2 = ee.DateRange('2017-06-30', '2018-07-10');
var dateRange3 = ee.DateRange('1970-06-24', '1971-07-24');

// Determine the union of ee.DateRange objects.
print('Union of dateRange1 and dateRange2, which overlap',
      dateRange1.union(dateRange2));
print('Intersection of date range',
      dateRange1.intersection(dateRange2));

//The daterange.union() returns a DateRange that contains all points in the union of this DateRange and another.
//The daterange.intersection() returns a DateRange that contains all points in the intersection of this DateRange and another.

