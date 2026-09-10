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

    const data = await res.json();

    return {
      country: data.address.country || null,
      city:
        data.address.city || data.address.town || data.address.village || null,
      district: data.address.suburb || data.address.neighbourhood || null,
      street: data.address.road || null,
    };
  } catch (err) {
    console.log('GPS reverse geocoding error:', err);
    return null;
  }
}
