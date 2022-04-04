import 'package:intl/intl.dart';

class TimeAgo {
  static String timeAgoSinceDate(String dateString,
      {bool numericDates = true}) {
    DateTime notificationDate =
        DateFormat("yyyy-MM-ddThh:mm:ssZ").parse(dateString);
    final date2 = DateTime.now();
    final difference = date2.difference(notificationDate);

    if (difference.inDays > 7) {
      return "${notificationDate.month.toString().padLeft(2, '0')}/${notificationDate.day.toString().padLeft(2, '0')}/${notificationDate.year.toString()}";
    }
    if (difference.inDays > 0) {
      return "${difference.inDays} ${difference.inDays == 1 ? "day" : "days"} ago";
    }
    if (difference.inHours > 0) {
      return "${difference.inHours} ${difference.inHours == 1 ? "hour" : "hours"} ago";
    }
    if (difference.inMinutes > 0) {
      return "${difference.inMinutes} ${difference.inMinutes == 1 ? "minute" : "minutes"} ago";
    }
    if (difference.inSeconds > 0) {
      return "${difference.inSeconds} ${difference.inSeconds == 1 ? "second" : "seconds"} ago";
    }
    return "just now";
  }
}

class DisplayDate {
  static String displayDate(String dateString, {bool numericDates = true}) {
    DateTime date = DateFormat("yyyy-MM-ddThh:mm:ssZ").parse(dateString);

    String convertedDisplayDate =
        "${date.month.toString().padLeft(2, '0')}/${date.day.toString().padLeft(2, '0')}/${date.year.toString()}, ${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}";
    return convertedDisplayDate;
  }
}
