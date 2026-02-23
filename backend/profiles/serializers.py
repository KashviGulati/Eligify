from rest_framework import serializers
from .models import StudentProfile


class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        exclude = ['user', 'created_at', 'updated_at']

    def validate(self, data):
        required_fields = [
            'age',
            'annual_income',
            'category',
            'gender',
            'education_level',
            'state',
            'preferred_language'
        ]

        missing = []

        for field in required_fields:
            if data.get(field) in [None, '']:
                missing.append(field)

        if missing:
            raise serializers.ValidationError({
                "error": f"Missing required fields: {', '.join(missing)}"
            })

        return data