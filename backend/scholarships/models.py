from django.db import models


class Scholarship(models.Model):
    name = models.CharField(max_length=255)
    ministry = models.CharField(max_length=255)

    min_income = models.FloatField(null=True, blank=True)
    max_income = models.FloatField(null=True, blank=True)

    min_age = models.IntegerField(null=True, blank=True)
    max_age = models.IntegerField(null=True, blank=True)

    CATEGORY_CHOICES = [
        ('GEN', 'General'),
        ('OBC', 'OBC'),
        ('SC', 'SC'),
        ('ST', 'ST'),
        ('EWS', 'EWS'),
        ('ALL', 'All'),
    ]
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES, null=True, blank=True)

    education_level = models.CharField(max_length=100, null=True, blank=True)

    amount = models.CharField(max_length=100, null=True, blank=True)
    deadline = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name