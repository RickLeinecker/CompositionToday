import 'package:composition_today/models/article_card.dart';
import 'package:composition_today/models/content_feed.dart';
import 'package:composition_today/models/event_card.dart';
import 'package:composition_today/models/music_card.dart';
import 'package:composition_today/services/api.dart';
import 'package:composition_today/services/time.dart';
import 'package:composition_today/shared/appbar.dart';
import 'package:composition_today/shared/constants.dart';
import 'package:composition_today/shared/loading.dart';
import 'package:flutter/material.dart';
import 'package:like_button/like_button.dart';

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
    bool profilePicIsNull = false;
    bool isContentEdited = false;
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
