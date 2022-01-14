import 'package:firebase_messaging/firebase_messaging.dart';

class PushNotificationService {
  FirebaseMessaging messaging = FirebaseMessaging.instance;
  Future initialise() async {
    NotificationSettings settings = await messaging.requestPermission(
      alert: true,
      announcement: false,
      badge: true,
      carPlay: false,
      criticalAlert: false,
      provisional: false,
      sound: true,
    );
    // ignore: avoid_print
    print('User granted permission: ${settings.authorizationStatus}');
  }
}
