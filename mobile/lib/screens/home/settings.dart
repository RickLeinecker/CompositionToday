// ignore_for_file: use_key_in_widget_constructors, avoid_unnecessary_containers

import 'package:composition_today/shared/appbar.dart';
import 'package:composition_today/shared/constants.dart';
import 'package:flutter/material.dart';
// ignore: unused_import
import 'package:composition_today/services/auth.dart';

class Settings extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: MyAppBar(
        title: const Text('Settings'),
      ),
      body: const Center(
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
  bool _enableNotifs = false;
  bool _specificNotifs = false;
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: <Widget>[
          const SizedBox(height: 20.0),
          SwitchListTile(
            title: const Text('Enable Push Notifications'),
            value: _enableNotifs,
            tileColor: yellowColor,
            activeColor: blueColor,
            onChanged: (bool value) {
              setState(() {
                _enableNotifs = value;
              });
            },
            secondary: const Icon(Icons.notifications),
          ),
          const SizedBox(height: 20.0),
          SwitchListTile(
            title: const Text('Only show notifications about your interests'),
            value: _specificNotifs,
            tileColor: yellowColor,
            activeColor: blueColor,
            onChanged: (bool value) {
              setState(() {
                _specificNotifs = value;
              });
            },
            secondary: const Icon(Icons.notifications),
          ),
          const SizedBox(height: 20.0),
          ElevatedButton(
            child: const Text(
              'Update Name',
              style: TextStyle(color: Colors.white),
            ),
            onPressed: () {
              // implement ability to change name
            },
            style: ElevatedButton.styleFrom(
              primary: blueColor,
            ),
          ),
          const SizedBox(height: 20.0),
          ElevatedButton(
            child: const Text(
              'Change Email',
              style: TextStyle(color: Colors.white),
            ),
            onPressed: () {
              // implement ability to change email
            },
            style: ElevatedButton.styleFrom(
              primary: blueColor,
            ),
          ),
          const SizedBox(height: 20.0),
          ElevatedButton(
            child: const Text(
              'Reset Password',
              style: TextStyle(color: Colors.white),
            ),
            onPressed: () {
              // implement ability to reset password
            },
            style: ElevatedButton.styleFrom(
              primary: blueColor,
            ),
          ),
          const SizedBox(height: 20.0),
          ElevatedButton(
            child: const Text(
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
