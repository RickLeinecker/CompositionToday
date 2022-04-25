import 'package:composition_today/models/user.dart';
import 'package:composition_today/services/api.dart';
import 'package:composition_today/services/time.dart';
import 'package:flutter/material.dart';
import 'package:like_button/like_button.dart';
import 'package:provider/provider.dart';

// ignore: must_be_immutable
class GenericCardHead extends StatefulWidget {
  Map<String, dynamic> item = {};
  bool profilePicIsNull = false;
  bool isContentEdited = false;
  GenericCardHead({
    Key? key,
    required this.item,
    required this.profilePicIsNull,
    required this.isContentEdited,
  }) : super(key: key);

  @override
  State<GenericCardHead> createState() => _GenericCardHeadState();
}

class _GenericCardHeadState extends State<GenericCardHead> {
  @override
  Widget build(BuildContext context) {
    return Row(
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
            child: Text(TimeAgo.timeAgoSinceDate(widget.item['timestamp']),
                textAlign: TextAlign.right),
          ),
        ),
      ],
    );
  }
}

// ignore: must_be_immutable
class GenericCardTail extends StatefulWidget {
  Map<String, dynamic> item = {};
  GenericCardTail({
    Key? key,
    required this.item,
  }) : super(key: key);

  @override
  State<GenericCardTail> createState() => _GenericCardTailState();
}

class _GenericCardTailState extends State<GenericCardTail> {
  @override
  Widget build(BuildContext context) {
    UserData _currentUserID = Provider.of<UserData?>(context)!;
    bool isLiked = widget.item['isLikedByLoggedInUser'] == 0 ? false : true;
    int likeCount = widget.item['likeCount'];

    return Row(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        Flexible(
          fit: FlexFit.tight,
          child: LikeButton(
            padding: const EdgeInsets.all(5.0),
            mainAxisAlignment: MainAxisAlignment.end,
            crossAxisAlignment: CrossAxisAlignment.center,
            isLiked: widget.item['isLikedByLoggedInUser'] == 0 ? false : true,
            size: 20.0,
            likeCount: widget.item['likeCount'],
          ),
        ),
      ],
    );
  }
}
