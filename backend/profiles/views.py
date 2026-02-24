from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import StudentProfile
from .serializers import StudentProfileSerializer


class StudentProfileView(APIView):

    def get(self, request):
        profile = StudentProfile.objects.first()

        if not profile:
            return Response({"message": "Profile not found"}, status=404)

        serializer = StudentProfileSerializer(profile)
        return Response(serializer.data)

    def post(self, request):
        profile = StudentProfile.objects.first()

        if profile:
            # update existing instead of blocking
            serializer = StudentProfileSerializer(profile, data=request.data)
        else:
            serializer = StudentProfileSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)

    def put(self, request):
        profile = StudentProfile.objects.first()

        if not profile:
            return Response({"error": "Profile not found"}, status=404)

        serializer = StudentProfileSerializer(profile, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)