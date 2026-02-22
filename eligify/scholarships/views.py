from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from profiles.models import StudentProfile
from .eligibility_engine import get_eligible_scholarships


class EligibilityView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = StudentProfile.objects.get(user=request.user)
        except StudentProfile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=404)

        results = get_eligible_scholarships(profile)

        return Response(results)