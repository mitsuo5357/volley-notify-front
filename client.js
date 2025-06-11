// client.js（修正版）

// VAPIDの公開鍵（これはみっちゃんのキーのままでOK）
const VAPID_PUBLIC_KEY = 'BPyWZ7rIFoN2YjOXtbsditKuWydFJ38tnrK_HjfXNofZicldcOzU7kY34v58lCDvgZGSznXq5YGwlsauikIbVOQ';

const subscribeButton = document.getElementById('subscribe-button');

// ボタンがクリックされた時の処理
subscribeButton.addEventListener('click', async () => {
  try {
    // 1. サービスワーカーを登録
    await navigator.serviceWorker.register('/sw.js');
    console.log('サービスワーカーを登録しました。');

    // 2. サービスワーカーが「アクティブ」になるのを待つ（★ここが重要！★）
    const registration = await navigator.serviceWorker.ready;
    console.log('サービスワーカーが有効になりました:', registration);

    // 3. プッシュ通知の購読を要求
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true, // ユーザーに見える通知である必要がある
      applicationServerKey: VAPID_PUBLIC_KEY
    });
    console.log('プッシュ通知を購読しました:', subscription);

    // 4. 購読情報をサーバーに送信
     await fetch('https://volley-notify-back.onrender.com/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('購読情報をサーバーに送信しました');

    alert('プッシュ通知の購読を開始しました！');
  } catch (error) {
    console.error('プッシュ通知の購読に失敗しました:', error);
    alert('エラーが発生しました。コンソールを確認してください。');
  }
});
