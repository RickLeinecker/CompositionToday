// ignore_for_file: use_key_in_widget_constructors

import 'package:composition_today/shared/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

class Loading extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: const Center(
        child: SpinKitChasingDots(
          color: yellowColor,
          size: 50.0,
        ),
      ),
    );
  }
}
