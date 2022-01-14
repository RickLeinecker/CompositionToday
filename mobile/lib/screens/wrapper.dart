// ignore_for_file: use_key_in_widget_constructors

import 'package:composition_today/models/user.dart';
import 'package:composition_today/screens/authenticate/authenticate.dart';
import 'package:composition_today/screens/home/home.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// saved login implementation here.
class Wrapper extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final user = Provider.of<MyUser?>(context);

    // return either Home or Authenticate widget
    if (user == null) {
      return Authenticate();
    } else {
      return Home();
    }
  }
}
