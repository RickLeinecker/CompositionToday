import 'dart:convert';
import 'dart:typed_data';

import 'package:composition_today/services/time.dart';
import 'package:flutter/material.dart';
import 'package:like_button/like_button.dart';

class EventCard extends StatefulWidget {
  Map<String, dynamic> item = {};
  bool profilePicIsNull = false;
  bool isContentEdited = false;
  EventCard({
    Key? key,
    required this.item,
    required this.profilePicIsNull,
    required this.isContentEdited,
  }) : super(key: key);

  @override
  State<EventCard> createState() => _EventCardState();
}

class _EventCardState extends State<EventCard> {
  @override
  Widget build(BuildContext context) {
    bool imageExists = false;
    bool locationExists = false;

    if (widget.item['imageFilepath'] != "" &&
        widget.item['imageFilepath'] != null) {
      imageExists = true;
    } else {
      imageExists = false;
    }

    if (widget.item['location'] != "") {
      locationExists = true;
    } else {
      locationExists = false;
    }

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Flexible(
                flex: 2,
                fit: FlexFit.tight,
                child: Padding(
                  padding: const EdgeInsets.all(4.0),
                  child: CircleAvatar(
                    radius: 30.0,
                    backgroundImage: widget.profilePicIsNull
                        ? const AssetImage('assets/img_avatar.png')
                        : NetworkImage(widget.item['profilePicPath'])
                            as ImageProvider,
                  ),
                ),
              ),
              const SizedBox(width: 5.0),
              Flexible(
                flex: 5,
                fit: FlexFit.tight,
                child: Padding(
                  padding: const EdgeInsets.all(4.0),
                  child: Text(
                    widget.item['displayName'],
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 18.0,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 5.0),
              Flexible(
                flex: 2,
                fit: FlexFit.tight,
                child: Padding(
                  padding: const EdgeInsets.all(4.0),
                  child: widget.isContentEdited
                      ? const Text("(edited)")
                      : const Text(""),
                ),
              ),
              Flexible(
                flex: 3,
                fit: FlexFit.tight,
                child: Padding(
                  padding: const EdgeInsets.all(4.0),
                  child: Text(
                      TimeAgo.timeAgoSinceDate(widget.item['timestamp']),
                      textAlign: TextAlign.right),
                ),
              ),
            ],
          ),
          const Divider(
            thickness: 0.5,
            color: Colors.black,
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Flexible(
                  fit: FlexFit.tight,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.item['contentName'],
                        style: TextStyle(
                          fontSize: 16.0,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        widget.item['description'],
                        style: TextStyle(
                          color: Colors.grey[500],
                        ),
                      ),
                      SizedBox(height: 4.0),
                      Text("From: " +
                          DisplayDate.displayDate(widget.item['fromDate'])),
                      Text("To: " +
                          DisplayDate.displayDate(widget.item['toDate'])),
                      locationExists
                          ? Text(widget.item['location'])
                          : const SizedBox(height: 0.1, width: 0.1),
                      SizedBox(height: 10.0),
                      imageExists
                          ? Image(
                              image: NetworkImage(widget.item['imageFilepath']),
                              width: 800.0,
                              height: 200.0)
                          : const Text(''),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const Divider(
            thickness: 0.5,
            color: Colors.black,
          ),
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Flexible(
                fit: FlexFit.tight,
                child: LikeButton(
                  padding: EdgeInsets.all(5.0),
                  mainAxisAlignment: MainAxisAlignment.end,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  isLiked:
                      widget.item['isLikedByLoggedInUser'] == 0 ? false : true,
                  size: 20.0,
                  likeCount: widget.item['likeCount'],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
