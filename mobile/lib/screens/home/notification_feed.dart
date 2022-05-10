import 'package:composition_today/models/content_feed.dart';
import 'package:composition_today/models/user.dart';
import 'package:composition_today/services/api.dart';
import 'package:composition_today/shared/appbar.dart';
import 'package:composition_today/shared/constants.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class NotificationFeed extends StatefulWidget {
  const NotificationFeed({Key? key}) : super(key: key);

  @override
  State<NotificationFeed> createState() => _NotificationFeedState();
}

class _NotificationFeedState extends State<NotificationFeed> {
  final ScrollController _scrollController = ScrollController();
  late Future<List<Map<String, dynamic>>> contentCard;

  @override
  Widget build(BuildContext context) {
    print("selectedTags value:" +
        Provider.of<UserData?>(context)!.selectedTags.toString());
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: MyAppBar(
        title: const Text('Notification Feed'),
        actions: const <Widget>[],
      ),
      body: ContentFeed(
          selectedTags: Provider.of<UserData?>(context)!.selectedTags,
          sortBy: "popular"),
    );
  }
}
