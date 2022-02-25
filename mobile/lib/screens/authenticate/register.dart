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
  bool loading = false;
  // text field state
  String username = '';
  String email = '';
  String password = '';
  String error = '';

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
                child: Center(
                  child: Column(
                    children: <Widget>[
                      const SizedBox(height: 10.0),
                      TextFormField(
                        decoration: textInputDecoration.copyWith(
                          hintText: 'Username',
                          labelText: 'Username',
                          prefixIcon: const Icon(
                            Icons.account_circle,
                          ),
                        ),
                        validator: (val) =>
                            val!.isEmpty ? 'Enter a username' : null,
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
                            dynamic result =
                                await _auth.registerWithEmailAndPassword(
                                    username, email, password);
                            if (result == null) {
                              setState(() {
                                error = 'please supply a valid email';
                                loading = false;
                              });
                            }
                          }
                        },
                        style: ElevatedButton.styleFrom(
                          primary: primaryColor,
                        ),
                      ),
                      const SizedBox(height: 10.0),
                      Text(
                        error,
                        style:
                            const TextStyle(color: Colors.red, fontSize: 14.0),
                      )
                    ],
                  ),
                ),
              ),
            ),
          );
  }
}
