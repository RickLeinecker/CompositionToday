// ignore_for_file: use_key_in_widget_constructors, avoid_unnecessary_containers

import 'package:composition_today/models/tag.dart';
import 'package:composition_today/services/api.dart';
import 'package:composition_today/shared/appbar.dart';
import 'package:composition_today/shared/constants.dart';
import 'package:composition_today/shared/loading.dart';
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
        child: SettingsList(),
      ),
    );
  }
}

class SettingsList extends StatefulWidget {
  const SettingsList({Key? key}) : super(key: key);

  @override
  _SettingsListState createState() => _SettingsListState();
}

class _SettingsListState extends State<SettingsList> {
  bool _isChecked = false;
  bool loading = false;
  late Future<List<Map<String, dynamic>>> tagList;
  final AuthService _auth = AuthService();
  final _emailKey = GlobalKey<FormState>();
  final ScrollController _scrollController = ScrollController();

  void initState() {
    super.initState();
    tagList = getTags();
  }

  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    UserData _currentUserID = Provider.of<UserData?>(context)!;
    String email = '';
    String error = '';
    return Scaffold(
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          const SizedBox(height: 10.0),
          const Text(
            'Select all tags that interest you.',
            style: TextStyle(
              fontSize: 24.0,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 20.0),
          Expanded(
            child: Center(
              child: FutureBuilder<List<Map<String, dynamic>>>(
                  future: tagList,
                  builder: (context, snapshot) {
                    if (snapshot.hasData) {
                      List<Map<String, dynamic>> tags = snapshot.data!;
                      return Scrollbar(
                        thickness: 10.0,
                        isAlwaysShown: true,
                        controller: _scrollController,
                        child: ListView.builder(
                            controller: _scrollController,
                            itemCount: tags.length,
                            itemBuilder: (BuildContext context, int index) {
                              final item =
                                  TagType.fromJson(snapshot.data![index]);

                              return StatefulBuilder(
                                  builder: (context, StateSetter setState) {
                                return Center(
                                  child: CheckboxListTile(
                                      title: Text(item.tagName),
                                      value: item.isChecked == true,
                                      onChanged: (val) {
                                        setState(() {
                                          item.isChecked = val!;
                                          if (item.isChecked == true) {
                                            selectedTags.add(
                                                item.toJson()['id']['tagName']);
                                          } else {
                                            selectedTags.remove(
                                                item.toJson()['id']['tagName']);
                                          }
                                        });
                                      }),
                                );
                              });
                            }),
                      );
                    } else {
                      return Loading();
                    }
                  }),
            ),
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
