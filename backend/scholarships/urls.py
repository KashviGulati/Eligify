from django.urls import path
from .views import EligibilityView, ai_reasoning_agent

urlpatterns = [
    path('eligibility/', EligibilityView.as_view(), name='eligibility'),
    path("ai-agent/", ai_reasoning_agent),
    
]