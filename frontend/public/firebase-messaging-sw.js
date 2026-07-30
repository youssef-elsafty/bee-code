// Firebase Messaging Service Worker stub architecture
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Initialize Firebase App in SW with config if environment variables present or default fallback
const firebaseConfig = {
  apiKey: "AIzaSy_BEE_CODE_PLACEHOLDER_KEY",
  authDomain: "bee-code.firebaseapp.com",
  projectId: "bee-code",
  storageBucket: "bee-code.appspot.com",
  messagingSenderId: "123456789000",
  appId: "1:123456789000:web:beecode123456"
};

try {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
      console.log('🐝 [firebase-messaging-sw.js] Received background message: ', payload);

      const notificationTitle = payload.notification?.title || 'Bee Code 🐝';
      const notificationOptions = {
        body: payload.notification?.body || 'لديك إشعار جديد من Bee Code',
        icon: payload.notification?.icon || '/icon-192.png',
        badge: '/icon-192.png',
        data: payload.data || { url: '/' }
      };

      self.registration.showNotification(notificationTitle, notificationOptions);
    });
  }
} catch (error) {
  console.log('🐝 Firebase Web Push SW initialized in standby mode:', error);
}
