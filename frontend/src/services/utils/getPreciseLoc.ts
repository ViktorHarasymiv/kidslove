export default async function getPreciseLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve(null);

    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => {
        // 🔥 Якщо юзер заблокував — повертаємо null
        if (result.state === "denied") return resolve(null);

        // 🔥 Якщо юзер ще не давав дозвіл → просимо
        if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              resolve({
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
                accuracy: pos.coords.accuracy,
              });
            },
            () => resolve(null),
            { enableHighAccuracy: true, timeout: 5000 },
          );
          return;
        }

        // 🔥 Якщо дозволено — тихо читаємо
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve({
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
              accuracy: pos.coords.accuracy,
            });
          },
          () => resolve(null),
          { enableHighAccuracy: true, timeout: 5000 },
        );
      })
      .catch(() => resolve(null));
  });
}
