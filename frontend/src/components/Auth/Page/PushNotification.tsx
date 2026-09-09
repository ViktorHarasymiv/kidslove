export const PushNotification = async () => {
  if (!("Notification" in window)) return;
  if (!("serviceWorker" in navigator)) return;

  // Якщо користувач вручну заблокував — ми не можемо просити знову
  if (Notification.permission === "denied") {
    alert(
      "Ти вимкнув сповіщення для сайту. Щоб увімкнути їх знову:\n" +
        "1. Натисни на значок 🔒 біля адреси сайту\n" +
        "2. Знайди 'Сповіщення'\n" +
        "3. Увімкни 'Дозволити'",
    );
    return;
  }

  // Якщо вже дозволено — нічого не робимо
  if (Notification.permission === "granted") return;

  // Якщо permission = default → показуємо confirm
  const allow = window.confirm(
    "Хочеш отримувати сповіщення, коли бейдж твоєї дитини буде скановано?",
  );

  if (!allow) return;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  const registration = await navigator.serviceWorker.register("/sw.js");

  const res = await fetch("/api/vapid-public-key");
  const { publicKey } = await res.json();

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicKey,
  });

  await fetch("/api/save-subscription", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subscription),
  });
};
