import 'package:composition_today/screens/authenticate/forgot_password.dart';
import 'package:composition_today/services/auth.dart';
import 'package:composition_today/shared/appbar.dart';
import 'package:composition_today/shared/constants.dart';
import 'package:composition_today/shared/loading.dart';
import 'package:flutter/material.dart';

import 'forgot_email.dart';

class SignIn extends StatefulWidget {
  final Function toggleView;
  // ignore: prefer_const_constructors_in_immutables, use_key_in_widget_constructors
  SignIn({required this.toggleView});
  @override
  _SignInState createState() => _SignInState();
}

class _SignInState extends State<SignIn> {
  final AuthService _auth = AuthService();
  final _formKey = GlobalKey<FormState>();
  bool loading = false;
  // text field state
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
              title: const Text('Member Login'),
              actions: <Widget>[
                TextButton.icon(
                  icon: const Icon(Icons.person_add),
                  label: const Text('Register here'),
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
                    const SizedBox(height: 20.0),
                    TextFormField(
                        decoration: textInputDecoration.copyWith(
                          hintText: 'Email',
                          labelText: 'Email',
                          prefixIcon: const Icon(
                            Icons.mail,
                          ),
                        ),
                        validator: (val) =>
                            val!.isEmpty ? 'Enter an email' : null,
                        onChanged: (val) {
                          setState(() => email = val);
                        }),
                    TextButton(
                      onPressed: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => ForgotEmail()));
                      },
                      child: const Text(
                        'Forgot Email?',
                        textAlign: TextAlign.justify,
                        style: TextStyle(
                          color: blueColor,
                        ),
                      ),
                    ),
                    const SizedBox(height: 10.0),
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
                    TextButton(
                      onPressed: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => ForgotPassword()));
                      },
                      child: const Text(
                        'Forgot Password?',
                        textAlign: TextAlign.justify,
                        style: TextStyle(
                          color: blueColor,
                        ),
                      ),
                    ),
                    const SizedBox(height: 10.0),
                    ElevatedButton(
                      child: const Text(
                        'Sign in',
                        style: TextStyle(color: Colors.white),
                      ),
                      onPressed: () async {
                        if (_formKey.currentState!.validate()) {
                          setState(() {
                            loading = true;
                          });
                          dynamic result = await _auth.signIn(email, password);
                          if (result == null) {
                            setState(() {
                              error =
                                  'could not sign in with those credentials';
                              loading = false;
                            });
                          }
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        primary: blueColor,
                      ),
                    ),
                    const SizedBox(height: 12.0),
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
