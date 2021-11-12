import 'package:composition_today/screens/home/settings.dart';
import 'package:composition_today/services/auth.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Home extends StatelessWidget {
  final AuthService _auth = AuthService();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: Text('Composition Today'),
        backgroundColor: Color(0xffF7B41F),
        elevation: 0.0,
        actions: <Widget>[
          TextButton.icon(
            onPressed: () async {
              await _auth.signOut();
            },
            label: Text('logout'),
            icon: Icon(Icons.person),
            style: TextButton.styleFrom(
              primary: Colors.white,
            ),
          ),
          TextButton.icon(
            icon: Icon(Icons.settings),
            label: Text('settings'),
            onPressed: () {
              Navigator.push(
                  context, MaterialPageRoute(builder: (context) => Settings()));
            },
            style: TextButton.styleFrom(
              primary: Colors.white,
            ),
          ),
        ],
      ),
      body: Center(
        child: Container(
          child: const Text('this is the main screen.'),
        ),
      ),
    );
  }
}
