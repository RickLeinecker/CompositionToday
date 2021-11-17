import 'package:flutter/material.dart';
import 'package:composition_today/services/auth.dart';

class Settings extends StatelessWidget {
  final AuthService _auth = AuthService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: const Text('Settings'),
        backgroundColor: const Color(0xffF7B41F),
        elevation: 0.0,
        actions: <Widget>[
          TextButton.icon(
            onPressed: () async {
              await _auth.signOut();
            },
            label: const Text('logout'),
            icon: const Icon(Icons.person),
            style: TextButton.styleFrom(
              primary: Colors.white,
            ),
          ),
        ],
      ),
      body: Center(
        child: SettingsSwitch(),
      ),
    );
  }
}

class SettingsSwitch extends StatefulWidget {
  const SettingsSwitch({Key? key}) : super(key: key);

  @override
  _SettingsSwitchState createState() => _SettingsSwitchState();
}

class _SettingsSwitchState extends State<SettingsSwitch> {
  @override
  bool _enableNotifs = false;
  bool _specificNotifs = false;
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: <Widget>[
          SizedBox(height: 20.0),
          SwitchListTile(
            title: const Text('Enable Push Notifications'),
            value: _enableNotifs,
            tileColor: const Color(0xffF7B41F),
            activeColor: const Color(0xff3981FF),
            onChanged: (bool value) {
              setState(() {
                _enableNotifs = value;
              });
            },
            secondary: const Icon(Icons.notifications),
          ),
          SizedBox(height: 20.0),
          SwitchListTile(
            title: const Text('Only show notifications about your interests'),
            value: _specificNotifs,
            tileColor: const Color(0xffF7B41F),
            activeColor: const Color(0xff3981FF),
            onChanged: (bool value) {
              setState(() {
                _specificNotifs = value;
              });
            },
            secondary: const Icon(Icons.notifications),
          ),
          SizedBox(height: 20.0),
          ElevatedButton(
            child: Text(
              'Update Name',
              style: TextStyle(color: Colors.white),
            ),
            onPressed: () {
              // implement ability to change name
            },
            style: ElevatedButton.styleFrom(
              primary: Color(0xff3981FF),
            ),
          ),
          SizedBox(height: 20.0),
          ElevatedButton(
            child: Text(
              'Change Email',
              style: TextStyle(color: Colors.white),
            ),
            onPressed: () {
              // implement ability to change email
            },
            style: ElevatedButton.styleFrom(
              primary: Color(0xff3981FF),
            ),
          ),
          SizedBox(height: 20.0),
          ElevatedButton(
            child: Text(
              'Reset Password',
              style: TextStyle(color: Colors.white),
            ),
            onPressed: () {
              // implement ability to reset password
            },
            style: ElevatedButton.styleFrom(
              primary: Color(0xff3981FF),
            ),
          ),
          SizedBox(height: 20.0),
          ElevatedButton(
            child: Text(
              'Delete Account',
              style: TextStyle(color: Colors.white),
            ),
            onPressed: () {
              // implement ability to delete account
            },
            style: ElevatedButton.styleFrom(
              primary: Colors.red,
            ),
          ),
        ],
      ),
    );
  }
}
