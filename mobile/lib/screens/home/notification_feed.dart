import 'package:composition_today/models/article_card.dart';
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
        ['music', 'event', 'article'], selectedTags, "popular", 0, 100);
  }

  Future<void> _pullRefresh() async {
    Future<List<Map<String, dynamic>>> newContent = getHomefeedContentInBatches(
        ['music', 'event', 'article'], selectedTags, "popular", 0, 100);

    setState(() {
      contentCard = newContent;
    });
  }

  @override
  Widget build(BuildContext context) {
    bool profilePicIsNull = false;
    bool isContentEdited = false;
    bool isMusic = false;
    bool isEvent = false;
    bool isArticle = false;
    return Scaffold(
        backgroundColor: Colors.grey[100],
        appBar: MyAppBar(
          title: const Text('Notification Feed'),
          actions: const <Widget>[],
        ),
        body: Center(
          child: RefreshIndicator(
            onRefresh: _pullRefresh,
            child: FutureBuilder<List<Map<String, dynamic>>>(
                future: contentCard,
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    List<Map<String, dynamic>> content = snapshot.data!;
                    return Scrollbar(
                      thickness: 10.0,
                      isAlwaysShown: true,
                      controller: _scrollController,
                      child: ListView.builder(
                        controller: _scrollController,
                        itemCount: content.length,
                        itemBuilder: (BuildContext context, int index) {
                          var item = snapshot.data![index];

                          if (item['profilePicPath'] == null) {
                            profilePicIsNull = true;
                          } else {
                            profilePicIsNull = false;
                          }

                          if (item['isEdited'] == 1) {
                            isContentEdited = true;
                          } else {
                            isContentEdited = false;
                          }

                          if (item['contentType'] == 'article') {
                            return ArticleCard(
                                item: item,
                                profilePicIsNull: profilePicIsNull,
                                isContentEdited: isContentEdited);
                          } else if (item['contentType'] == 'event') {
                            return EventCard(
                                item: item,
                                profilePicIsNull: profilePicIsNull,
                                isContentEdited: isContentEdited);
                          } else if (item['contentType'] == 'music') {
                            return MusicCard(
                                item: item,
                                profilePicIsNull: profilePicIsNull,
                                isContentEdited: isContentEdited);
                          } else {
                            return Loading();
                          }
                        },
                      ),
                    );
                  } else {
                    return Loading();
                  }
                }),
          ),
        ));
  }
}
