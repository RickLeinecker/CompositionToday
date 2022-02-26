import 'dart:convert';

import 'package:composition_today/models/content.dart';
import 'package:composition_today/services/api.dart';
import 'package:flutter/material.dart';

ListView _contentListView(data) {
  return ListView.builder(
      itemCount: data.length,
      itemBuilder: (context, index) {
        return _tile(data[index].contentName, data[index].contentText);
      });
}

ListTile _tile(String contentName, String contentText) => ListTile(
      title: Text(contentName,
          style: const TextStyle(
            fontWeight: FontWeight.w500,
            fontSize: 20,
          )),
      subtitle: Text(contentText),
    );

class ContentCard extends StatelessWidget {
  const ContentCard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<ContentType>>(
        future: getHomefeedContentInBatches(
            ['music', 'event', 'article'], "newest", 0, 50),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            List<ContentType> data = snapshot.data!;
            return _contentListView(data);
          } else if (snapshot.hasError) {
            return Text("${snapshot.error}");
          }
          return const CircularProgressIndicator();
        });
  }
}
