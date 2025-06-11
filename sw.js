// sw.js (改造版)

console.log('サービスワーカーが起動しました');

// 'push'イベント：通知が届いた時の処理
self.addEventListener('push', event => {
  console.log('[Service Worker] Push Received.');

  const data = event.data.json();
  const title = data.title;
  const options = {
    body: data.body,
    icon: '/icon.png',
    // ★ 通知に「URL」という名前のデータを持たせる
    data: {
      url: data.url 
    }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// ★★★★★★★★★★★★★★★★★★★★★★★★★
// ★ 新しく追加：通知がクリックされた時の処理 ★
// ★★★★★★★★★★★★★★★★★★★★★★★
self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification click Received.');

  // 通知を閉じる
  event.notification.close();

  // 通知に設定されたURLを新しいタブで開く
  if (event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});