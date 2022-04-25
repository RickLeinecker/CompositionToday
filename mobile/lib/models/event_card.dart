import 'dart:async';
import 'package:composition_today/models/generic_card.dart';
import 'package:composition_today/services/api.dart';
import 'package:composition_today/services/display_map.dart';
import 'package:composition_today/services/time.dart';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

// ignore: must_be_immutable
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

    String eventStatus =
        TimeAgo.eventProgress(widget.item['fromDate'], widget.item['toDate']);

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 8.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          GenericCardHead(
              item: widget.item,
              profilePicIsNull: widget.profilePicIsNull,
              isContentEdited: widget.isContentEdited),
          const Divider(
            thickness: 0.5,
            color: Colors.black,
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Flexible(
                  fit: FlexFit.tight,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ElevatedButton(
                        onPressed: () {},
                        style: ButtonStyle(
                          padding: MaterialStateProperty.all(
                              const EdgeInsets.all(10)),
                          shape:
                              MaterialStateProperty.all<RoundedRectangleBorder>(
                                  RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(18.0),
                          )),
                          backgroundColor: (eventStatus == "Scheduled"
                              ? MaterialStateProperty.all(Colors.green)
                              : eventStatus == "Ongoing"
                                  ? MaterialStateProperty.all(Colors.blue)
                                  : eventStatus == "Completed"
                                      ? MaterialStateProperty.all(Colors.red)
                                      : MaterialStateProperty.all(
                                          Colors.white)),
                        ),
                        child: Text(eventStatus,
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 12.0,
                            )),
                      ),
                      Text(
                        widget.item['contentName'],
                        style: const TextStyle(
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
                      const SizedBox(height: 4.0),
                      Text("From: " +
                          DisplayDate.displayDate(widget.item['fromDate'])),
                      Text("To: " +
                          DisplayDate.displayDate(widget.item['toDate'])),
                      locationExists
                          ? Text(widget.item['location'])
                          : const SizedBox(height: 0.1, width: 0.1),
                      const SizedBox(height: 10.0),
                      imageExists
                          ? Image(
                              image: NetworkImage(widget.item['imageFilepath']),
                              width: 800.0,
                              height: 200.0)
                          : const Text(''),
                      const SizedBox(height: 10.0),
                      locationExists
                          ? DisplayMap(location: widget.item['location'])
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
          GenericCardTail(item: widget.item),
        ],
      ),
    );
  }
}
