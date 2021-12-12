from bs4 import BeautifulSoup
from datetime import datetime
import requests
import re

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
    alpha_response = requests.get(f'http://www.compositiontoday.com/composers/{path}')
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

    composer_dict = {
        "firstName": full_name[1],
        "lastName": full_name[0],
        "isPublisher": 0
    }
    print(composer_dict)

    find_composer(composer_link["href"])

def find_composer(path):
    composer_response = requests.get(f'http://www.compositiontoday.com/composers/{path}')
    composer_page = composer_response.text

    soup_composer = BeautifulSoup(composer_page, 'lxml')
    # print(soup_composer)

    get_user_profile(soup_composer)
    get_content(soup_composer)

def get_user_profile(html):
    composer_profile = html.find('div', {'style': "font-size: 100%;"})
    no_bio_text = "We currently have no biographical information on this artist."
    # print(no_bio_text in composer_profile.text)

    user_profile_dict = {
        "bio": "",
        "website": ""
    }

    if no_bio_text not in composer_profile.text:
        user_profile_dict.update({"bio": composer_profile.text})
    
    print(user_profile_dict)
    return

def get_content(html):
    composer_content = html.find('td', {'width': "100%"})
    # print(composer_content)
    # print(composer_content.find('a', string = re.compile("Showcase")))
    past_performances = composer_content.find_all('div', {'style' : "width:250px;height:80"})
    # print(past_performances)
    # Do a split on date
    # if 'pm' in 
    datetime_object = datetime.strptime('04 October 2014 at 9:30AM', '%d %B %Y at %I:%M%p')
    print(datetime_object)

start_scraping()