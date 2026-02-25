from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response

from profiles.models import StudentProfile
from .eligibility_engine import get_eligible_scholarships
from profiles.serializers import StudentProfileSerializer

class EligibilityView(APIView):
    permission_classes = []

    def get(self, request):
        try:
            profile = StudentProfile.objects.get(user=request.user)

            # 🔥 THIS IS THE IMPORTANT LINE
            result = get_eligible_scholarships(profile)

            return Response(result)

        except StudentProfile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=404)
    

import google.generativeai as genai
import os
from dotenv import load_dotenv

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from profiles.models import StudentProfile
from .eligibility_engine import get_eligible_scholarships

# load env
load_dotenv()

# configure gemini
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


@api_view(['POST'])
def ai_reasoning_agent(request):
    question = request.data.get("question", "")

    try:
        profile = StudentProfile.objects.get(user=request.user)
        result = get_eligible_scholarships(profile)

        # ✅ safer model
        model = genai.GenerativeModel("gemini-1.5-flash")

        prompt = f"""
        You are an intelligent scholarship advisor AI.

        Student Profile:
        Age: {profile.age}
        Income: {profile.annual_income}
        Category: {profile.category}
        Education: {profile.education_level}

        Scholarships:
        {result}

        User Question:
        {question}

        Give:
        - best scholarships
        - reasons
        - improvement suggestions

        Keep it simple.
        """

        response = model.generate_content(prompt)

        return Response({
            "answer": response.text
        })

    except StudentProfile.DoesNotExist:
        return Response({"error": "Profile not found"}, status=404)