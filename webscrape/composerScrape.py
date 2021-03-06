from bs4 import BeautifulSoup
from datetime import datetime
import requests
import re
import json

# To use this scraper you need to:
# pip install lxml
# pip install beautifulsoup4
# pip install requests

# To run the program, do:
# python composerScrape.py

# Output will be in scraped_data.json

# There are three main pages that the scraper will use:
# top_page      : http://www.compositiontoday.com/composers/default.asp
# alpha_page    : ex. http://www.compositiontoday.com/composers/a.asp
# composer_page : ex. http://www.compositiontoday.com/composers/1355.asp

# Optionally, if there is a side page, the scraper
# will utilize that to extract more data.

def start_scraping():
    top_response = requests.get('http://www.compositiontoday.com/composers/default.asp')
    top_page = top_response.text

    soup_top = BeautifulSoup(top_page, 'lxml')

    alphabet_pages = soup_top.find_all('a', class_ = 'alphabet')
    # print(alphabet_pages)

    with open(f'./scraped_data.json', 'w') as f:
        f.write("[\n")
        for alphabet_link in alphabet_pages:
            # print(alphabet_link["href"])
            alpha = find_alphabet(alphabet_link["href"])

            for composer in alpha:
                f.write(f"{json.dumps(composer, default=str)}")

                # print(repr(composer))
                if composer["composer"]["lastName"] != 'Zwicki':
                    f.write(",")

            f.write("\n")
        f.write("]")

    # alphabet_link = soup_top.find('a', class_ = 'alphabet')
    # print(alphabet_page)
    # find_alphabet(alphabet_link["href"])

def find_alphabet(path):
    alpha_response = requests.get(f'http://www.compositiontoday.com/composers/{path}')
    alpha_page = alpha_response.text

    soup_alpha = BeautifulSoup(alpha_page, 'lxml')

    # The 2nd parameter's True allows the bgcolor
    # attribute to have any value
    composer_list = soup_alpha.find_all('tr', {'bgcolor' : True})
    # print(composer_list)

    all_composers = []

    for composer in composer_list:
        print(composer.text)
        # composer = composer_list

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
        # print(repr(full_name[1]))
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
        # print(repr(json.dumps(interface_dict, default=str)))

        all_composers.append(interface_dict)

    # print(all_composers)
    return all_composers

def find_composer(path):
    composer_response = requests.get(f'http://www.compositiontoday.com/composers/{path}')

    # composer_response = requests.get(f'http://www.compositiontoday.com/composers/1034.asp')
    # composer_response = requests.get(f'http://www.compositiontoday.com/composers/1899.asp')
    # composer_response = requests.get(f'http://www.compositiontoday.com/composers/172.asp')
    # composer_response = requests.get(f'http://www.compositiontoday.com/composers/635.asp')
    # composer_response = requests.get(f'http://www.compositiontoday.com/composers/258.asp')
    # composer_response = requests.get(f'http://www.compositiontoday.com/composers/924.asp')
    # composer_response = requests.get(f'http://www.compositiontoday.com/composers/2420.asp')
    # composer_response = requests.get(f'http://www.compositiontoday.com/composers/1327.asp')
    # composer_response = requests.get(f'http://www.compositiontoday.com/composers/135.asp')
    # composer_response = requests.get(f'http://www.compositiontoday.com/composers/129.asp')
    # composer_response = requests.get(f'http://www.compositiontoday.com/composers/191.asp')
    # composer_response = requests.get(f'http://www.compositiontoday.com/composers/352.asp')
    # composer_response = requests.get(f'http://www.compositiontoday.com/composers/1530.asp')
    # composer_response = requests.get(f'http://www.compositiontoday.com/composers/1645.asp')
    # composer_response = requests.get(f'http://www.compositiontoday.com/composers/2423.asp')
    # composer_response = requests.get(f'http://www.compositiontoday.com/composers/22.asp')
    # composer_response = requests.get(f'http://www.compositiontoday.com/composers/1531.asp')
    # composer_response = requests.get(f'http://www.compositiontoday.com/composers/2800.asp')

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

    if (composer_profile is not None) and (no_bio_text not in composer_profile.text):
        user_profile_dict.update({"bio": composer_profile.text.strip()})
    
    # print(user_profile_dict)
    return user_profile_dict

def get_content(html):
    composer_content = html.find('td', {'width': "100%"})
    # print(composer_content)
    # print(composer_content.find('a', string = re.compile("Showcase")))

    content_list = []

    content_list = get_past_performances(composer_content)
    content_list = [*content_list, *get_music(composer_content)]
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
            print("====================================")
            performance_list.append(concert)
            print(concert)
    
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

    return (contentName.text.strip(), location, contentText)

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
        # print(format_date)
        # Exception
        if '17 march 2011 at 1930, doors open at 1900' in format_date:
            format_date = '17 march 2011 at 19:30'
        elif '13 november 2015 at 13\x9628 november 2015 7.30' in format_date:
            format_date = '13 november 2015 7:30'
        format_date = format_date.replace('.', ':', 1).replace(',', ':', 1).replace('_', ':', 1).replace(';', ':', 1)
        format_date = format_date.split('-')[0].strip()

        if ':' not in format_date:
            if format_date[-2].isnumeric() and format_date[-3].isnumeric():
                format_date = format_date[:-2] + ':' + format_date[-2:]
            # else:
            #     split_date = format_date.split()
            #     split_date[4] = '00:00'
            #     format_date = ' '.join(split_date)
            # print(format_date)
        # print(format_date, 'b')

    return to_datetime(format_date)

def strip_am_pm(format_date):
    split_date = format_date.split()
    # print(split_date)

    time = split_date[4]
    # print(time)

    # Exception: Andrew Hall
    if time == 'doors':
        split_date[4] = '19:30'
        return ' '.join(split_date)
    # Exception: Peri Mauer
    if time == 'sept.':
        split_date[4] = '20:00'
        return ' '.join(split_date)
    # Exception: Olivier Messiaen
    if time == 'activities':
        split_date[4] = '16:00'
        return ' '.join(split_date)
    # Exception: Gene Pritsker
    if time == '630pm':
        split_date[4] = '18:30'
        return ' '.join(split_date)
    # A composer can't follow rules
    if len(time) == 2 and int(time) > 24:
        split_date[4] = '19:30'
        return ' '.join(split_date)

    if 'am' in time:
        time = time[:time.index("am")]
        time = time.split('-')[0].strip() # Another edge case
    elif 'a.m' in time:
        time = time[:time.index("a.m")]
        time = time.split('-')[0].strip() # Another edge case
    elif ('pm' in format_date) or ('p.m' in format_date):
        if 'pm' in time:
            time = time[:time.index("pm")]
            time = time.split('-')[0].strip() # Another edge case
        elif 'p.m' in time:
            time = time[:time.index("p.m")]
            time = time.split('-')[0].strip() # Another edge case

        # print(time)

        hours = ""
        for num in split_date[4]:
            if num.isnumeric():
                hours = hours + num
            else:
                break
        # print(hours, "qwert")

        # Another edge case
        if hours == "":
            hours = split_date[5]
        if hours != 12:
            hours = (int(hours) + 12) % 24

        hourText = str(hours)
        # print(type(hourText), hourText)

        for index, h in enumerate(time):
            if not h.isalnum():
                time = hourText + time[index:]
                break
    time = time.split('-')[0] 
    split_date[4] = time.replace('.', ':', 1).replace(',', ':', 1).replace('_', ':', 1).replace(';', ':', 1)
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
    # print(music_content_list)

    return music_content_list

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
    works = html.find('div', {'style' : "height:80px"})
    works_list = []

    if works is not None:
        # print(works)
        side_site_link = works.a
        works_link = get_link_from_side_site(side_site_link["href"])
        if works_link is None:
            works_list = get_from_list(html)
        else:
            # print(works_link["onclick"])
            result = re.search("'(.*)'", works_link["onclick"])
            works_list = get_works_from_side_site(side_site_link["href"], result.group(1))
    else:
        works_list = get_from_list(html)

    return works_list

def get_link_from_side_site(path):
    side_site_response = requests.get(f'http://www.compositiontoday.com{path}')
    side_site = side_site_response.text
    side_soup = BeautifulSoup(side_site, 'lxml')
    # print(side_soup)

    works_link = side_soup.find('td', {"class": "navMainSelected"}, string="List of Works")
    # print(works_link)
    return works_link

def get_works_from_side_site(path, param):
    site_response = requests.get(f'http://www.compositiontoday.com{path}/{param}')
    site = site_response.text
    site_soup = BeautifulSoup(site, 'lxml')
    # print(site_soup)

    works = site_soup.find('table', {'width':"95%"})
    works = works.find('table', {'width': "100%"})

    if works is None:
        return []

    works = works.find_all('table')
    # print(works)

    works_list = []
    # We need to remove the first <br/>. Other br's after
    # will need to be converted to \n
    for work in works:
        # print(repr(work))
        work = str(work).replace('<br/>', '')
        work = BeautifulSoup(work, 'lxml')

        works_dict = {
            "contentName": "",
            "contentText": "",
            "contentType": "music",
            # "location": "",
            # "timestamp": "",
            # "tag": ""
        }
        # print(repr(work.a.text.strip()))
        # print(repr(work.a.next_sibling.strip()))
        # print("============================")
        works_dict.update({
            "contentName": work.a.text.strip(),
            "contentText": work.a.next_sibling.strip()
        })
        works_list.append(works_dict)

    return works_list


def get_from_list(html):
    list_of_works = html.find('div', string="List of Works").parent.ul
    
    if list_of_works.find('li') is None:
        return []
    
    list_of_works = list_of_works.find_all('li')
    works_list = []

    for work in list_of_works:
        if work.a is None:
            continue
        works_list.append(get_list_page(work.a['href']))

    return works_list

def get_list_page(path):
    page_response = requests.get(f'http://www.compositiontoday.com/composers/{path}')
    page = page_response.text

    soup_page = BeautifulSoup(page, 'lxml')
    # print(soup_page)

    works_dict = {
        "contentName": "",
        "contentText": "",
        "contentType": "music",
        # "location": "",
        # "timestamp": "",
        # "tag": ""
    }

    title = soup_page.find('h1', {'style' : "font-size:16px"}).text
    title = title.split('-')[0].strip()
    works_dict.update({"contentName": title})
    # print(title)

    desc = soup_page.find('b', string="Description").parent.parent
    desc.div.decompose()
    # print(repr(desc.text))

    if 'Sorry!' not in desc.text:
        works_dict.update({"contentText": desc.text.strip()})
    
    return works_dict

start_scraping()