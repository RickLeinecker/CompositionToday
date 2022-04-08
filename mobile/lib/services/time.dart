import 'package:intl/intl.dart';

class TimeAgo {
  static String timeAgoSinceDate(String dateString,
      {bool numericDates = true}) {
    DateTime notificationDate =
        DateFormat("yyyy-MM-ddThh:mm:ssZ").parseUtc(dateString);
    final notifDate = notificationDate.toLocal();
    final date2 = DateTime.now();
    final difference = date2.difference(notifDate);

    if (difference.inDays >= 7) {
      return "${notifDate.month.toString().padLeft(2, '0')}/${notifDate.day.toString().padLeft(2, '0')}/${notifDate.year.toString()}";
    } else if (difference.inDays > 0) {
      return "${difference.inDays} ${difference.inDays == 1 ? "day" : "days"} ago";
    } else if (difference.inHours > 0) {
      return "${difference.inHours} ${difference.inHours == 1 ? "hour" : "hours"} ago";
    } else if (difference.inMinutes > 0) {
      return "${difference.inMinutes} ${difference.inMinutes == 1 ? "minute" : "minutes"} ago";
    } else if (difference.inSeconds > 0) {
      return "${difference.inSeconds} ${difference.inSeconds == 1 ? "second" : "seconds"} ago";
    } else {
      return "just now";
    }
  }

  static String eventProgress(String fromDate, String toDate,
      {bool numericDates = true}) {
    DateTime eventStart = DateFormat("yyyy-MM-ddThh:mm:ssZ").parseUtc(fromDate);
    final eventStartLocal = eventStart.toLocal();

    DateTime eventEnd = DateFormat("yyyy-MM-ddThh:mm:ssZ").parseUtc(toDate);
    final eventEndLocal = eventEnd.toLocal();

    final currentTime = DateTime.now();

    if (currentTime.isBefore(eventStartLocal)) {
      return "Scheduled";
    } else if (currentTime.isAfter(eventStartLocal) &&
        currentTime.isBefore(eventEndLocal)) {
      return "Ongoing";
    } else if (currentTime.isAfter(eventEndLocal)) {
      return "Completed";
    } else {
      return "Error getting time";
    }
  }
}

class DisplayDate {
  static String convertDateTimeToString(DateTime date) {
    DateFormat dateFormat = DateFormat("yyyy-MM-ddThh:mm:ssZ");

    return dateFormat.format(date);
  }

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
