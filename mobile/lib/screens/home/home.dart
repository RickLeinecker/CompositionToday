// ignore_for_file: use_key_in_widget_constructors, avoid_unnecessary_containers

import 'package:composition_today/models/content.dart';
import 'package:composition_today/models/user.dart';
import 'package:composition_today/screens/home/related_projects.dart';
import 'package:composition_today/screens/home/settings.dart';
import 'package:composition_today/services/api.dart';
import 'package:composition_today/services/auth.dart';
import 'package:composition_today/shared/appbar.dart';
import 'package:composition_today/shared/constants.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../shared/loading.dart';

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
  late Future<List<Map<String, dynamic>>> contentCard;
  Future<UserData>? _futureUser;

  void initState() {
    super.initState();
    contentCard = getHomefeedContentInBatches(
        ['music', 'event', 'article'], [], "newest", 0, 50);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: MyAppBar(
        title: const Text('Composition Today'),
        actions: const <Widget>[],
      ),
      body: Center(
        child: FutureBuilder<List<Map<String, dynamic>>>(
            future: contentCard,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                List<Map<String, dynamic>> content = snapshot.data!;
                return ListView.builder(
                  itemCount: content.length,
                  itemBuilder: (BuildContext context, int index) {
                    final item = snapshot.data![index];
                    return Card(
                      child: ListTile(
                        leading: CircleAvatar(
                          backgroundImage: NetworkImage(item['profilePicPath']),
                        ),
                        title: Text(item['displayName']),
                        subtitle: Text(item['contentName']),
                        isThreeLine: true,
                      ),
                    );
                  },
                );
              } else {
                return Loading();
              }
            }),
      ),
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
