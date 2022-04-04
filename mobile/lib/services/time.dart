import 'package:intl/intl.dart';

class TimeAgo {
  static String timeAgoSinceDate(String dateString,
      {bool numericDates = true}) {
    DateTime notificationDate =
        DateFormat("yyyy-MM-ddThh:mm:ssZ").parseUtc(dateString);
    final notifDate = notificationDate.toLocal();
    final date2 = DateTime.now();
    final difference = date2.difference(notifDate);

    if (difference.inDays > 7) {
      return "${notifDate.month.toString().padLeft(2, '0')}/${notifDate.day.toString().padLeft(2, '0')}/${notifDate.year.toString()}";
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
    DateTime date =
        DateFormat("yyyy-MM-ddThh:mm:ssZ").parseUtc(dateString).toUtc();
    date = date.toLocal();
    bool isPM = false;
    int calcHour = date.hour;
    if (date.hour > 12) {
      isPM = true;
      calcHour = date.hour % 12;
    }

    String displayMonth = "${date.month.toString().padLeft(2, '0')}";
    String displayDay = "${date.day.toString().padLeft(2, '0')}";
    String displayYear = "${date.year.toString()}";
    if (calcHour == 0) {
      calcHour = 12;
    }
    String displayHour = "${calcHour.toString().padLeft(2, '0')}";
    String displayMinute = "${date.minute.toString().padLeft(2, '0')}";
    String timeOfDay = isPM ? "PM" : "AM";
    String convertedDisplayDate =
        "$displayMonth/$displayDay/$displayYear, $displayHour:$displayMinute $timeOfDay";
    return convertedDisplayDate;
  }
}
