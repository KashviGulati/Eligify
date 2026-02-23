import requests
from bs4 import BeautifulSoup

from .models import Scholarship


def scrape_scholarships():
    url = "http://books.toscrape.com/"

    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    scholarships = []

    books = soup.find_all("article", class_="product_pod")

    for book in books[:5]:  # limit for demo
        name = book.h3.a["title"]
        price = book.find("p", class_="price_color").text

        scholarships.append({
            "name": name,
            "ministry": "Demo Source",
            "amount": price.replace("£", ""),
        })

    return scholarships


def save_scholarships():
    data = scrape_scholarships()

    for item in data:
        Scholarship.objects.update_or_create(
            name=item["name"],
            defaults={
                "ministry": item["ministry"],
                "amount": item["amount"],
            }
        )

    print("✅ Scholarships saved!")