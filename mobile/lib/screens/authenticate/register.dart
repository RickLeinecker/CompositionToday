// ignore_for_file: prefer_const_constructors_in_immutables, use_key_in_widget_constructors

import 'package:composition_today/shared/appbar.dart';
import 'package:composition_today/shared/constants.dart';
import 'package:composition_today/shared/loading.dart';
import 'package:flutter/material.dart';
import 'package:composition_today/services/auth.dart';
import 'package:email_validator/email_validator.dart';

class Register extends StatefulWidget {
  final Function toggleView;
  Register({required this.toggleView});
  @override
  _RegisterState createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  final AuthService _auth = AuthService();
  final _formKey = GlobalKey<FormState>();
  final List<String> roles = ['Select a role', 'Composer', 'Publisher'];
  bool loading = false;
  // text field state
  String firstName = '';
  String lastName = '';
  String username = '';
  String email = '';
  String password = '';
  String error = '';
  String role = '';

  @override
  Widget build(BuildContext context) {
    return loading
        ? Loading()
        : Scaffold(
            backgroundColor: Colors.grey[100],
            appBar: MyAppBar(
              title: const Text('Member Registration'),
              actions: <Widget>[
                TextButton.icon(
                  icon: const Icon(Icons.person),
                  label: const Text('Login here'),
                  onPressed: () {
                    widget.toggleView();
                  },
                  style: TextButton.styleFrom(
                    primary: Colors.white,
                  ),
                ),
              ],
            ),
            body: Container(
              padding:
                  const EdgeInsets.symmetric(vertical: 20.0, horizontal: 50.0),
              child: Form(
                key: _formKey,
                child: Column(
                  children: <Widget>[
                    const SizedBox(height: 10.0),
                    TextFormField(
                      decoration: textInputDecoration.copyWith(
                        hintText: 'First Name',
                        labelText: 'First Name',
                        prefixIcon: const Icon(
                          Icons.person,
                        ),
                      ),
                      validator: (val) =>
                          val!.isEmpty ? 'Enter your first name' : null,
                      onChanged: (val) {
                        setState(() => firstName = val);
                      },
                    ),
                    const SizedBox(height: 15.0),
                    TextFormField(
                      decoration: textInputDecoration.copyWith(
                        hintText: 'Last Name',
                        labelText: 'Last Name',
                        prefixIcon: const Icon(
                          Icons.person,
                        ),
                      ),
                      validator: (val) =>
                          val!.isEmpty ? 'Enter your last name' : null,
                      onChanged: (val) {
                        setState(() => lastName = val);
                      },
                    ),
                    const SizedBox(height: 15.0),
                    TextFormField(
                      decoration: textInputDecoration.copyWith(
                        hintText: 'Username',
                        labelText: 'Username',
                        prefixIcon: const Icon(
                          Icons.account_circle,
                        ),
                      ),
                      validator: (val) => val!.isEmpty ? 'Enter a name' : null,
                      onChanged: (val) {
                        setState(() => username = val);
                      },
                    ),
                    const SizedBox(height: 15.0),
                    TextFormField(
                      decoration: textInputDecoration.copyWith(
                        hintText: 'Email',
                        labelText: 'Email',
                        prefixIcon: const Icon(
                          Icons.mail,
                        ),
                      ),
                      validator: (val) =>
                          EmailValidator.validate(email) == false
                              ? 'Enter an email'
                              : null,
                      onChanged: (val) {
                        setState(() => email = val);
                      },
                    ),
                    const SizedBox(height: 15.0),
                    TextFormField(
                        decoration: textInputDecoration.copyWith(
                          hintText: 'Password',
                          labelText: 'Password',
                          prefixIcon: const Icon(Icons.lock),
                        ),
                        validator: (val) => val!.length < 6
                            ? 'Enter a password 6+ chars long'
                            : null,
                        obscureText: true,
                        onChanged: (val) {
                          setState(() => password = val);
                        }),
                    const SizedBox(height: 15.0),
                    DropdownButtonFormField(
                      decoration: textInputDecoration.copyWith(
                        hintText: 'Role',
                        labelText: 'Role',
                        prefixIcon: const Icon(Icons.info),
                      ),
                      value: roles[0],
                      validator: (val) =>
                          val == roles[0] ? 'Enter a valid role' : null,
                      onChanged: (val) {
                        setState(() => role = val.toString());
                      },
                      items: roles.map((role) {
                        return DropdownMenuItem(
                          child: Text(role),
                          value: role,
                        );
                      }).toList(),
                    ),
                    const SizedBox(height: 10.0),
                    ElevatedButton(
                      child: const Text(
                        'Register',
                        style: TextStyle(color: Colors.white),
                      ),
                      onPressed: () async {
                        if (_formKey.currentState!.validate()) {
                          setState(() {
                            loading = true;
                          });
                          dynamic result = await _auth
                              .registerWithEmailAndPassword(email, password);
                          if (result == null) {
                            setState(() {
                              error = 'please supply a valid email';
                              loading = false;
                            });
                          }
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        primary: blueColor,
                      ),
                    ),
                    const SizedBox(height: 10.0),
                    Text(
                      error,
                      style: const TextStyle(color: Colors.red, fontSize: 14.0),
                    )
                  ],
                ),
              ),
            ),
          );
  }
}
