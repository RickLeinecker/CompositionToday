// ignore_for_file: use_key_in_widget_constructors

import 'package:composition_today/shared/constants.dart';
import 'package:flutter/material.dart';

class MyAppBar extends AppBar {
  MyAppBar({required Widget title, List<Widget>? actions})
      : super(
          title: title,
          backgroundColor: yellowColor,
          foregroundColor: background,
          elevation: 0.0,
          actions: actions,
        );
}
