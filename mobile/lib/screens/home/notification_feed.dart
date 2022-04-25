import 'package:composition_today/models/content_feed.dart';
import 'package:composition_today/services/api.dart';
import 'package:composition_today/shared/appbar.dart';
import 'package:composition_today/shared/constants.dart';
import 'package:flutter/material.dart';

class NotificationFeed extends StatefulWidget {
  const NotificationFeed({Key? key}) : super(key: key);

  @override
  State<NotificationFeed> createState() => _NotificationFeedState();
}

class _NotificationFeedState extends State<NotificationFeed> {
  final ScrollController _scrollController = ScrollController();
  late Future<List<Map<String, dynamic>>> contentCard;

  @override
  void initState() {
    super.initState();
    contentCard = getHomefeedContentInBatches(
        ['music', 'event', 'article', 'contest'],
        selectedTags,
        "popular",
        0,
        100);
  }

  Future<void> _pullRefresh() async {
    Future<List<Map<String, dynamic>>> newContent = getHomefeedContentInBatches(
        ['music', 'event', 'article', 'contest'],
        selectedTags,
        "popular",
        0,
        100);

    setState(() {
      contentCard = newContent;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: MyAppBar(
        title: const Text('Notification Feed'),
        actions: const <Widget>[],
      ),
      body: ContentFeed(sortBy: "relevant"),
    );
  }
}
