// ignore_for_file: use_key_in_widget_constructors, must_be_immutable

import 'package:composition_today/shared/appbar.dart';
import 'package:composition_today/shared/constants.dart';
import 'package:flutter/material.dart';

// https://dev.to/dav4thevid/how-to-implement-forgot-password-password-reset-into-your-flutter-apps-with-firebase-auth-3jjd
class ForgotPassword extends StatelessWidget {
  static String id = 'forgot-password';
  String email = '';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: MyAppBar(
        title: const Text('Forgot Password'),
      ),
      body: Form(
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
                onPressed: () {},
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
