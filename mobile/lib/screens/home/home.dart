// ignore_for_file: use_key_in_widget_constructors, avoid_unnecessary_containers

import 'package:composition_today/models/article.dart';
import 'package:composition_today/models/article_card.dart';
import 'package:composition_today/models/content.dart';
import 'package:composition_today/models/content_feed.dart';
import 'package:composition_today/models/event.dart';
import 'package:composition_today/models/event_card.dart';
import 'package:composition_today/models/music.dart';
import 'package:composition_today/models/music_card.dart';
import 'package:composition_today/models/user.dart';
import 'package:composition_today/screens/home/related_projects.dart';
import 'package:composition_today/screens/home/settings.dart';
import 'package:composition_today/services/api.dart';
import 'package:composition_today/services/auth.dart';
import 'package:composition_today/shared/appbar.dart';
import 'package:composition_today/shared/constants.dart';
import 'package:flutter/material.dart';
import 'package:like_button/like_button.dart';
import 'package:provider/provider.dart';
import 'package:composition_today/services/time.dart';

import '../../shared/loading.dart';
import 'notification_feed.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  _HomeState createState() {
    return _HomeState();
  }
}

class _HomeState extends State<Home> {
  final AuthService _auth = AuthService();
  Future<UserData>? _futureUser;

  @override
  Widget build(BuildContext context) {
    bool profilePicIsNull = false;
    bool isContentEdited = false;
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: MyAppBar(
        title: const Text('Composition Today'),
        actions: const <Widget>[],
      ),
      body: ContentFeed(sortBy: "newest"),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            const DrawerHeader(
              margin: EdgeInsets.only(bottom: 8.0),
              decoration: BoxDecoration(
                color: primaryColor,
              ),
              child: Text(
                'Navigation Menu',
                style: TextStyle(
                  fontSize: 30,
                  color: Colors.black,
                ),
              ),
            ),
            ListTile(
              leading: const Icon(Icons.info, color: Colors.white),
              title: const Text('Related Projects'),
              tileColor: primaryColorSemi,
              textColor: Colors.white,
              onTap: () {
                Navigator.pop(context);
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => RelatedProjects()));
              },
            ),
            const SizedBox(height: 10.0),
            ListTile(
              leading: const Icon(Icons.settings, color: Colors.white),
              title: const Text('Settings'),
              tileColor: primaryColorSemi,
              textColor: Colors.white,
              onTap: () {
                Navigator.pop(context);
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => Settings()));
              },
            ),
            const SizedBox(height: 10.0),
            ListTile(
              leading: const Icon(Icons.notifications, color: Colors.white),
              title: const Text('Notification Feed'),
              tileColor: primaryColorSemi,
              textColor: Colors.white,
              onTap: () {
                Navigator.pop(context);
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const NotificationFeed()));
              },
            ),
            const SizedBox(height: 10.0),
            ListTile(
              leading: const Icon(Icons.person_remove, color: Colors.white),
              title: const Text('Logout'),
              tileColor: primaryColorSemi,
              textColor: Colors.white,
              onTap: () async {
                await _auth.signOut();
              },
            ),
          ],
        ),
      ),
    );
  }
}
