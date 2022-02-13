from django.db import models

# Create your models here.

class Task(models.Model):
    title = models.CharField(max_length=200,  null=False)
    completed = models.BooleanField(default= False, blank=True, null=True)
    status = models.CharField(max_length=100, null=False)

def __str__(self):
    return self.title
