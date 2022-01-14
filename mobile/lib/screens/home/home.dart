// ignore_for_file: use_key_in_widget_constructors, avoid_unnecessary_containers

import 'package:composition_today/screens/home/related_projects.dart';
import 'package:composition_today/screens/home/settings.dart';
import 'package:composition_today/services/auth.dart';
import 'package:composition_today/shared/appbar.dart';
import 'package:composition_today/shared/constants.dart';
import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  final AuthService _auth = AuthService();

  void initState() {}
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: MyAppBar(
        title: const Text('Composition Today'),
      ),
      body: Center(
        child: Container(
          child: const Text('this is the main screen.'),
        ),
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            const DrawerHeader(
              margin: EdgeInsets.only(bottom: 8.0),
              decoration: BoxDecoration(
                color: yellowColor,
              ),
              child: Text(
                'Navigation Menu',
                style: TextStyle(
                  fontSize: 18,
                  color: Colors.white,
                ),
              ),
            ),
            ListTile(
              leading: const Icon(Icons.info),
              title: const Text('Related Projects'),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => RelatedProjects()));
              },
            ),
            ListTile(
              leading: const Icon(Icons.settings),
              title: const Text('Settings'),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => Settings()));
              },
            ),
            ListTile(
              leading: const Icon(Icons.person_remove),
              title: const Text('Logout'),
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
