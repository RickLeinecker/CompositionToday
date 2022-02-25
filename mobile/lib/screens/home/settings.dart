// ignore_for_file: use_key_in_widget_constructors, avoid_unnecessary_containers

import 'package:composition_today/shared/appbar.dart';
import 'package:composition_today/shared/constants.dart';
import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';
// ignore: unused_import
import 'package:composition_today/services/auth.dart';
import 'package:provider/provider.dart';

import '../../models/user.dart';

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
  bool _specificNotifs = false;
  bool loading = false;
  final AuthService _auth = AuthService();
  final _emailKey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    UserData _currentUserID = Provider.of<UserData?>(context)!;
    String email = '';
    String error = '';
    return Container(
      child: Column(
        children: <Widget>[
          const SizedBox(height: 20.0),
          SwitchListTile(
            title: const Text('Only show notifications about your interests'),
            value: _specificNotifs,
            tileColor: primaryColor,
            activeColor: primaryColor,
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
              'Change Email',
              style: TextStyle(color: Colors.white),
            ),
            onPressed: () {
              showDialog<String>(
                context: context,
                builder: (BuildContext context) => AlertDialog(
                  title: const Text('Update Email'),
                  content: SizedBox(
                    width: 100,
                    height: 100,
                    child: SingleChildScrollView(
                      child: Form(
                        key: _emailKey,
                        child: ListView(
                          shrinkWrap: true,
                          children: [
                            TextFormField(
                                decoration: textInputDecoration.copyWith(
                                  hintText: 'Email',
                                  labelText: 'Email',
                                  prefixIcon: const Icon(
                                    Icons.mail,
                                  ),
                                ),
                                validator: (val) =>
                                    EmailValidator.validate(val!) == false
                                        ? 'Enter a valid email'
                                        : null,
                                onChanged: (val) {
                                  setState(() => email = val);
                                }),
                          ],
                        ),
                      ),
                    ),
                  ),
                  actions: <Widget>[
                    TextButton(
                      onPressed: () => Navigator.pop(context, 'Cancel'),
                      child: const Text('Cancel'),
                    ),
                    TextButton(
                      onPressed: () {
                        if (_emailKey.currentState!.validate()) {
                          setState(() {
                            loading = true;
                          });
                          // ignore: avoid_init_to_null
                          dynamic result =
                              null; // make API call to update email for UID;
                          if (result == null) {
                            setState(() {
                              error =
                                  'could not sign in with those credentials';
                              loading = false;
                            });
                          }
                          Navigator.pop(context, 'Update');
                        }
                      },
                      child: const Text('Update'),
                    ),
                  ],
                ),
              );
            },
            style: ElevatedButton.styleFrom(
              primary: primaryColor,
            ),
          ),
          const SizedBox(height: 20.0),
          ElevatedButton(
            child: const Text(
              'Reset Password',
              style: TextStyle(color: Colors.white),
            ),
            onPressed: () {
              // _auth.resetPassword();
            },
            style: ElevatedButton.styleFrom(
              primary: primaryColor,
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
