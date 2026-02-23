from django.urls import path
from .views import EligibilityView, ScrapeView

urlpatterns = [
    path('eligibility/', EligibilityView.as_view(), name='eligibility'),
    path('scrape/', ScrapeView.as_view()),
]