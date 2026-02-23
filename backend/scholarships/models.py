from django.db import models


class Scholarship(models.Model):
    name = models.CharField(max_length=255)
    ministry = models.CharField(max_length=255)

    min_income = models.FloatField(null=True, blank=True)
    max_income = models.FloatField(null=True, blank=True)

    min_age = models.IntegerField()
    max_age = models.IntegerField(null=True, blank=True)

    CATEGORY_CHOICES = [
        ('GEN', 'General'),
        ('OBC', 'OBC'),
        ('SC', 'SC'),
        ('ST', 'ST'),
        ('EWS', 'EWS'),
        ('ALL', 'All'),
    ]
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)

    education_level = models.CharField(max_length=100)

    amount = models.CharField(max_length=100)
    deadline = models.DateField()

    def __str__(self):
        return self.name