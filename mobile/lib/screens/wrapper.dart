import 'package:composition_today/models/user.dart';
import 'package:composition_today/screens/authenticate/authenticate.dart';
import 'package:composition_today/screens/home/home.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// TODO: Implement saved logins on device here.
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
