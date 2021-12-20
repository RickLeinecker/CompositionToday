from bs4 import BeautifulSoup
from datetime import datetime
import requests
import re
import json

# To use this scraper you need to:
# pip install lxml
# pip install beautifulsoup4
# pip install requests

# There are three main pages that the scraper will use:
# top_page      : http://www.compositiontoday.com/composers/default.asp
# alpha_page    : ex. http://www.compositiontoday.com/composers/a.asp
# composer_page : ex. http://www.compositiontoday.com/composers/1355.asp

def start_scraping():
    top_response = requests.get('http://www.compositiontoday.com/composers/default.asp')
    top_page = top_response.text

    soup_top = BeautifulSoup(top_page, 'lxml')

    # alphabet_pages = soup.find_all('a', class_ = 'alphabet')
    # print(alphabet_pages)

    alphabet_link = soup_top.find('a', class_ = 'alphabet')
    # print(alphabet_page)
    find_alphabet(alphabet_link["href"])

def find_alphabet(path):
    alpha_response = requests.get(f'http://www.compositiontoday.com/composers/s.asp')
    alpha_page = alpha_response.text

    soup_alpha = BeautifulSoup(alpha_page, 'lxml')

    # The 2nd parameter's True allows the bgcolor
    # attribute to have any value
    composer_list = soup_alpha.find('tr', {'bgcolor' : True})
    # print(composer_list)

    composer = composer_list

    composer_link = composer.a
    # print(composer_link)

    composer_name = composer_link.text
    full_name = composer_name.split(",")

    # Strip any lead/trailing whitespace
    full_name[:] = [name.strip() for name in full_name]
    # print(full_name)

    interface_dict = {
        "composer": {},
        "userProfile": {},
        "content": {},
    }

    composer_dict = {
        "firstName": full_name[1],
        "lastName": full_name[0],
        "isPublisher": 0
    }
    # print(composer_dict)

    user_profile, content = find_composer(composer_link["href"])

    interface_dict.update({"composer": composer_dict})
    interface_dict.update({"userProfile": user_profile})
    interface_dict.update({"content": content})
    # print(interface_dict)

def find_composer(path):
    composer_response = requests.get(f'http://www.compositiontoday.com/composers/1899.asp')
    composer_page = composer_response.text

    soup_composer = BeautifulSoup(composer_page, 'lxml')
    # print(soup_composer)

    # temp_dict = {
    #     "userProfile": {},
    #     "content": []
    # }

    user_profile = get_user_profile(soup_composer)
    # temp_dict.update({"userProfile": user_profile})

    content = get_content(soup_composer)
    # print(temp_dict)

    return (user_profile, content)

def get_user_profile(html):
    composer_profile = html.find('div', {'style': "font-size: 100%;"})
    no_bio_text = "We currently have no biographical information on this artist."
    # print(no_bio_text in composer_profile.text)

    # Unfortunately, no designated place on site for
    # composer's website, so leaving it empty
    user_profile_dict = {
        "bio": "",
        "website": ""
    }

    if no_bio_text not in composer_profile.text:
        user_profile_dict.update({"bio": composer_profile.text})
    
    # print(user_profile_dict)
    return user_profile_dict

def get_content(html):
    composer_content = html.find('td', {'width': "100%"})
    # print(composer_content)
    # print(composer_content.find('a', string = re.compile("Showcase")))

    content_list = []

    # content_list = get_past_performances(composer_content)
    get_music(composer_content)
    # get_sheets()

    # print(content_list)

    # Ignore external music sheets for now
    content_dict = {
        "contentName": "",
        "contentText": "",
        "contentType": "",
        # "location": "",
        # "timestamp": "",
        # "tag": ""
    }

    return content_list

def get_past_performances(html):
    past_performances = html.find_all('div', {'style' : "width:250px;height:80"})
    # print(past_performances)

    performance_list = []

    for performance in past_performances:
        concert = get_concert(performance.find('a'))
        if None not in concert.values():
            # print("====================================")
            performance_list.append(concert)
            # print(concert)
    
    return performance_list

def get_concert(html):
    # print(html)
    concert_response = requests.get(f'http://www.compositiontoday.com/{html["href"]}')
    concert_page = concert_response.text

    concert_soup = BeautifulSoup(concert_page, "lxml")

    concert_dict = {
        "contentName": "",
        "contentText": "",
        "contentType": "experience",
        "location": "",
        "timestamp": "",
        "tag": "pastPerformance"
    }

    contentName, location, contentText = get_concert_info(concert_soup)
    # print(location)
    # print(contentText)

    timestamp = get_timestamp(concert_soup)
    # print(timestamp)

    concert_dict.update({"contentName": contentName})
    concert_dict.update({"location": location})
    concert_dict.update({"contentText": contentText})
    concert_dict.update({"timestamp": timestamp})
    # print(concert_dict)

    return concert_dict

def get_concert_info(concert_soup):
    contentName = concert_soup.find("h1", {'style' : "font-size:16px"})

    if contentName is None:
        # print('contentName error')
        return (None, None, None)

    # print(repr(contentName.text))

    # print("====================================")
    concert_content = contentName.find_next_sibling("table").find("div", class_ = "boxes")
    # print(concert_content)

    location, contentText = str(concert_content).split("<br/><br/>", 1)
    # print(location)
    # print(contentText)

    location = location.replace("<br/>", "\n")
    location = BeautifulSoup(location, 'lxml')
    location = location.text.strip()
    # print(location)

    contentText = contentText.replace("<br/>", "\n")
    contentText = BeautifulSoup(contentText, 'lxml')
    contentText = contentText.text.strip()
    # print(contentText)

    return (contentName, location, contentText)

def get_timestamp(concert_soup):
    date = concert_soup.find("span", {'style' : "background-color:AD3442;color:black"})

    if date is None:
        # print('date error')
        return None

    format_date = date.text.strip().lower()
    # print(format_date)

    # format_date = '4 October 2014 at 9.30am'
    format_date = to_24_hour(format_date)

    datetime_object = datetime.strptime(format_date, '%Y-%m-%d %H:%M')
    # print(datetime_object)

    return datetime_object

def to_24_hour(format_date):
    # if the date contains am or pm
    if any(x in format_date for x in ['am', 'a.m', 'pm', 'p.m']):
        format_date = strip_am_pm(format_date)
        # print(format_date, "a")
    else:
        format_date = format_date.replace('.', ':', 1)
        # print(format_date, 'b')

    return to_datetime(format_date)

def strip_am_pm(format_date):
    split_date = format_date.split()
    # print(split_date)

    time = split_date[4]
    # print(time)

    if 'am' in time:
        time = time[:time.index("am")]
    elif 'a.m' in time:
        time = time[:time.index("a.m")]
    elif ('pm' in format_date) or ('p.m' in format_date):
        if 'pm' in time:
            time = time[:time.index("pm")]
        elif 'p.m' in time:
            time = time[:time.index("p.m")]

        # print(time)

        hours = ""
        for num in split_date[4]:
            if num.isnumeric():
                hours = hours + num
            else:
                break
        
        if hours != 12:
            hours = (int(hours) + 12) % 24

        hourText = str(hours)
        # print(type(hourText), hourText)

        for index, h in enumerate(time):
            if not h.isalnum():
                time = hourText + time[index:]
                break
        
    split_date[4] = time.replace('.', ':', 1)
    # print(split_date[4])

    return ' '.join(split_date)

def to_datetime(date):
    parsed_date = date.replace('at', '', 1).split()
    # print(parsed_date)

    day = "01"
    month = "12"
    year = "2010"
    hours = "00"
    min = "00"

    try:
        day = parsed_date[0]
        day = day if len(day) == 2 else '0' + day
        # print(day)

        month = month_to_date(parsed_date[1])
        # print(month)

        year = parsed_date[2]
        # print(year)

        time = parsed_date[3].split(':')

        if not re.search('[a-z]', time[0]):
            hours = time[0] if len(time[0]) == 2 else '0' + time[0]
        if not re.search('[a-z]', time[1]):
            min = time[1] if len(time[1]) == 2 else '0' + time[1]
        # print(day, month, year, hours, min)

    except (IndexError, ValueError) as error:
        pass

    formatted_date = f'{year}-{month}-{day} {hours}:{min}'
    # print(formatted_date)

    return formatted_date


def month_to_date(month):
    if month == 'january':
        return "01"
    if month == 'february':
        return "02"
    if month == 'march':
        return "03"
    if month == 'april':
        return "04"
    if month == 'may':
        return "05"
    if month == 'june':
        return "06"
    if month == 'july':
        return "07"
    if month == 'august':
        return "08"
    if month == 'september':
        return "09"
    if month == 'october':
        return "10"
    if month == 'november':
        return "11"
    return "12" # defaults to 12

# For audio, get it from side site
# For list of works, get it from main page
def get_music(html):
    music_content_list = get_audio(html)
    music_content_list = [*music_content_list, *get_works(html)] # * will work like spread operator in js 
    print(music_content_list)

def get_audio(html):
    # print(html.find_all('div', class_ = "boxes")[0].find_next_sibling("div"))
    # print(html.find('b', string = "Audio").parent.parent.text)
    audio = html.find('b', string = "Audio").parent.next_sibling
    no_audio_text = 'No audio samples by this composer currently available.'
    audio_list = []

    if no_audio_text not in audio:
        for br in html.find_all('br'):
            br.decompose()

        # audio = html.find('b', string = "Audio").parent.parent.get_text()
        audio = html.find('b', string = "Audio").parent.parent
        
        audio.find('div').decompose()
        # audio = audio.text
        # print(audio)

        # for loop using audio.find('audio')
        for audio in html.find_all('audio'):

            if audio is None:
                break

            audio_dict = {
                "contentName": "",
                "contentText": "",
                "contentType": "music",
                # "location": "",
                # "timestamp": "",
                # "tag": ""
            }

            audio = audio.parent.find('b')
            # print(repr(audio.text.strip()))
            next_audio = audio.next_sibling
            # audio.decompose()
            # print(repr(next_audio.strip()))
            audio_dict.update({
                "contentName": audio.text.strip(),
                "contentText": next_audio.strip()
            })
            audio_list.append(audio_dict)
            # print("==============")

    # print(audio_list)
    return audio_list

def get_works(html):
    # if has showcase, use that page for list of works
    # else use the composer page and loop through each subpage
    return [{"test": "works"}]

start_scraping()