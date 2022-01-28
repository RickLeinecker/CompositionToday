// ignore_for_file: use_key_in_widget_constructors, must_be_immutable

import 'package:composition_today/screens/authenticate/confirm_email.dart';
import 'package:composition_today/shared/appbar.dart';
import 'package:composition_today/shared/constants.dart';
import 'package:composition_today/services/auth.dart';
import 'package:flutter/material.dart';

class ForgotPassword extends StatefulWidget {
  static String id = 'forgot-password';
  final String message =
      "An email has been sent to you, click the provided link to complete your password reset, then press the back arrow twice to return to the login screen.";
  @override
  _ForgotPasswordState createState() => _ForgotPasswordState();
}

class _ForgotPasswordState extends State<ForgotPassword> {
  final AuthService _auth = AuthService();

  final _formKey = GlobalKey<FormState>();
  late String _email;

  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: MyAppBar(
        title: const Text('Forgot Password'),
      ),
      body: Form(
        key: _formKey,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 30.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'Enter Your Email',
                style: TextStyle(
                  fontSize: 30,
                  color: Colors.black,
                ),
              ),
              const SizedBox(height: 20),
              TextFormField(
                onSaved: (newEmail) {
                  _email = newEmail!;
                },
                decoration: textInputDecoration.copyWith(
                  hintText: 'Email',
                  labelText: 'Email',
                  prefixIcon: const Icon(
                    Icons.mail,
                  ),
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () async {
                  try {
                    _formKey.currentState!.save();
                    await _auth.resetPassword(_email);

                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) {
                        return ConfirmEmail(
                          message: widget.message,
                        );
                      }),
                    );
                  } catch (e) {
                    print(e);
                  }
                  print(_email);
                },
                child: const Text('Send Email'),
                style: ElevatedButton.styleFrom(
                  primary: blueColor,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
