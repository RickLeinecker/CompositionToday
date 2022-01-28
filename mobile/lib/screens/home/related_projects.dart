// ignore_for_file: use_key_in_widget_constructors

import 'package:composition_today/shared/appbar.dart';
import 'package:composition_today/shared/constants.dart';
import 'package:flutter/material.dart';

class RelatedProjects extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final List<String> entries = <String>[
      'Microtonal Music',
      'John Cage Tribute',
      'Brain Beats'
    ];
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: MyAppBar(
        title: const Text('Related Projects'),
      ),
      body: Center(
        child: Column(
          children: [
            const SizedBox(height: 20.0),
            ListView.separated(
              itemCount: entries.length,
              itemBuilder: (BuildContext context, int index) {
                return ListTile(
                  title: Center(child: Text(entries[index])),
                  tileColor: blueColorSemi,
                );
              },
              separatorBuilder: (BuildContext context, int index) =>
                  const Divider(),
              shrinkWrap: true,
            ),
          ],
        ),
      ),
    );
  }
}
