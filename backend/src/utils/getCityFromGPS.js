export async function getCityFromGPS(lat, lon) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'kidslove-app/1.0 (contact: support@kidslove.app)',
        },
      },
    );

    // Якщо Nominatim повернув HTML/XML → не парсимо JSON
    if (!res.ok) {
      const text = await res.text();
      console.log('Nominatim error:', text);
      return null;
    }

    const data = await res.json();
    const addr = data.address || {};

    return {
      country: addr.country || null,
      city: addr.city || addr.town || addr.village || addr.municipality || null,
      district: addr.suburb || addr.neighbourhood || addr.city_district || null,
      street: addr.road || addr.pedestrian || addr.cycleway || null,
    };
  } catch (err) {
    console.log('GPS reverse geocoding error:', err);
    return null;
  }
}
