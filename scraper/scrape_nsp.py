import requests
from bs4 import BeautifulSoup

URL = "https://scholarships.gov.in/All-Scholarships"

headers = {
    "User-Agent": "Mozilla/5.0"
}

response = requests.get(URL, headers=headers)
soup = BeautifulSoup(response.text, "html.parser")

scholarships = []

# find all accordion blocks
items = soup.find_all("div", class_="accordion-body")

for item in items:
    name_tag = item.find("h6")
    if name_tag:
        name = name_tag.text.strip()
    else:
        name = ""

    # get all span text (extra info)
    spans = item.find_all("span")
    details = [s.text.strip() for s in spans]

    scholarships.append({
        "name": name,
        "details": details
    })

# print first few
for s in scholarships[:5]:
    print(s)