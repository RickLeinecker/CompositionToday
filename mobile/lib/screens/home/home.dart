// ignore_for_file: use_key_in_widget_constructors, avoid_unnecessary_containers

import 'package:composition_today/models/user.dart';
import 'package:composition_today/screens/home/related_projects.dart';
import 'package:composition_today/screens/home/settings.dart';
import 'package:composition_today/services/api.dart';
import 'package:composition_today/services/auth.dart';
import 'package:composition_today/shared/appbar.dart';
import 'package:composition_today/shared/constants.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  _HomeState createState() {
    return _HomeState();
  }
}

class _HomeState extends State<Home> {
  final AuthService _auth = AuthService();
  final TextEditingController _controller = TextEditingController();
  Future<UserData>? _futureUser;

  void initState() {}
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: MyAppBar(
        title: const Text('Composition Today'),
        actions: <Widget>[],
      ),
      body: Center(
        child: Container(
          child: Text(
              getLoggedInUser(Provider.of<UserData?>(context)!.toString())
                  .toString()),
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
                  fontSize: 30,
                  color: Colors.white,
                ),
              ),
            ),
            ListTile(
              leading: const Icon(Icons.info),
              title: const Text('Related Projects'),
              tileColor: yellowColorSemi,
              onTap: () {
                Navigator.pop(context);
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => RelatedProjects()));
              },
            ),
            const SizedBox(height: 10.0),
            ListTile(
              leading: const Icon(Icons.settings),
              title: const Text('Settings'),
              tileColor: yellowColorSemi,
              onTap: () {
                Navigator.pop(context);
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => Settings()));
              },
            ),
            const SizedBox(height: 10.0),
            ListTile(
              leading: const Icon(Icons.person_remove),
              title: const Text('Logout'),
              tileColor: yellowColorSemi,
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
