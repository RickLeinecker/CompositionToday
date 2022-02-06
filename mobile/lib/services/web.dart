import 'package:url_launcher/url_launcher.dart';

launchJohnCage() async {
  const url = 'https://johncagetribute.org';
  if (await canLaunch(url)) {
    await launch(url, forceWebView: false, forceSafariVC: false);
  } else {
    throw 'Could not launch $url';
  }
}

launchMicrotonality() async {
  const url = 'http://microtonality.net/';
  if (await canLaunch(url)) {
    await launch(url, forceWebView: false, forceSafariVC: false);
  } else {
    throw 'Could not launch $url';
  }
}

launchSchillinger() async {
  const url = 'https://learnschillinger.com/';
  if (await canLaunch(url)) {
    await launch(url, forceWebView: false, forceSafariVC: false);
  } else {
    throw 'Could not launch $url';
  }
}
