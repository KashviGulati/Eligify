from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import StudentProfile
from .serializers import StudentProfileSerializer


class StudentProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = StudentProfile.objects.get(user=request.user)
            serializer = StudentProfileSerializer(profile)
            return Response(serializer.data)
        except StudentProfile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=404)

    def post(self, request):
        if StudentProfile.objects.filter(user=request.user).exists():
            return Response({"error": "Profile already exists"}, status=400)

        serializer = StudentProfileSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
    
        print("USER:", request.user)
        print("AUTH:", request.user.is_authenticated)