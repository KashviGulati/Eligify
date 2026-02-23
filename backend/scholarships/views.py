from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response


from .scraper import save_scholarships
from profiles.models import StudentProfile
from .eligibility_engine import get_eligible_scholarships


class EligibilityView(APIView):
    permission_classes = []

    def get(self, request):
        try:
        # TEMP: get first profile (for demo)
            profile = StudentProfile.objects.first()

            if not profile:
                return Response({"error": "No profile found"}, status=404)

        except Exception as e:
            return Response({"error": str(e)}, status=500)

        results = get_eligible_scholarships(profile)

        return Response(results)
    
class ScrapeView(APIView):
    def get(self, request):
        try:
            save_scholarships()
            return Response({"message": "Scraping completed"})
        except Exception as e:
            return Response({"error": str(e)}, status=500)