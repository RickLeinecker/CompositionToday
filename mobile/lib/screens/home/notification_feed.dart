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
        ['music', 'event', 'article'], [], "popular", 0, 50);
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
                        final item = snapshot.data![index];

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

                        switch (item['contentType']) {
                          case 'article':
                            isArticle = true;
                            isEvent = false;
                            isMusic = false;
                            break;
                          case 'event':
                            isEvent = true;
                            isArticle = false;
                            isMusic = false;
                            break;
                          case 'music':
                            isMusic = true;
                            isArticle = false;
                            isEvent = false;
                            break;
                          default:
                        }
                        return Card(
                          margin: const EdgeInsets.symmetric(
                              horizontal: 12.0, vertical: 8.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Expanded(
                                    flex: 2,
                                    child: Padding(
                                      padding: const EdgeInsets.all(4.0),
                                      child: CircleAvatar(
                                        radius: 30.0,
                                        backgroundImage: profilePicIsNull
                                            ? const AssetImage(
                                                'assets/img_avatar.png')
                                            : NetworkImage(
                                                    item['profilePicPath'])
                                                as ImageProvider,
                                      ),
                                    ),
                                  ),
                                  const SizedBox(width: 5.0),
                                  Expanded(
                                    flex: 5,
                                    child: Padding(
                                      padding: const EdgeInsets.all(4.0),
                                      child: Text(
                                        item['displayName'],
                                        style: const TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: 18.0,
                                        ),
                                      ),
                                    ),
                                  ),
                                  const SizedBox(width: 5.0),
                                  Expanded(
                                    flex: 2,
                                    child: Padding(
                                      padding: const EdgeInsets.all(4.0),
                                      child: isContentEdited
                                          ? const Text("(edited)")
                                          : const Text(""),
                                    ),
                                  ),
                                  Expanded(
                                    flex: 3,
                                    child: Padding(
                                      padding: const EdgeInsets.all(4.0),
                                      child: Text(
                                          TimeAgo.timeAgoSinceDate(
                                                  item['timestamp']) ??
                                              "null",
                                          textAlign: TextAlign.right),
                                    ),
                                  ),
                                ],
                              ),
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Expanded(
                                    child: Text(item['contentType']),
                                  ),
                                ],
                              ),
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                  Expanded(
                                    child: LikeButton(
                                      padding: EdgeInsets.all(5.0),
                                      mainAxisAlignment: MainAxisAlignment.end,
                                      crossAxisAlignment:
                                          CrossAxisAlignment.center,
                                      isLiked:
                                          item['isLikedByLoggedInUser'] == 0
                                              ? false
                                              : true,
                                      size: 20.0,
                                      likeCount: item['likeCount'],
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        );
                      },
                    ),
                  );
                } else {
                  return Loading();
                }
              }),
        ));
  }
}
