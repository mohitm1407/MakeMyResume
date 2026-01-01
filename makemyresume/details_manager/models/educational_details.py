from django.db import models
from django.contrib.auth.models import User
from pydantic import BaseModel
from typing import Optional
from datetime import date


class EducationalDetailsSchema(BaseModel):
    school_name: str
    degree: str
    location: str
    field_of_study: str
    start_date: str
    end_date: str
    grade: Optional[str] = None


class EducationalDetail(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    school_name = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    field_of_study = models.CharField(max_length=255)
    start_date = models.CharField(max_length=255)
    end_date = models.CharField(max_length=255)
    grade = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.school_name

    @classmethod
    def create_record(cls, user: User, educational_details: EducationalDetailsSchema):
        return cls.objects.create(
            user=user,
            school_name=educational_details.school_name,
            degree=educational_details.degree,
            location=educational_details.location,
            field_of_study=educational_details.field_of_study,
            start_date=educational_details.start_date,
            end_date=educational_details.end_date,
            grade=educational_details.grade,
        )

    def serialize(self) -> EducationalDetailsSchema:
        return EducationalDetailsSchema(
            school_name=self.school_name,
            degree=self.degree,
            location=self.location,
            field_of_study=self.field_of_study,
            start_date=self.start_date,
            end_date=self.end_date,
            grade=self.grade,
        )

    @classmethod
    def fetch_records_for_user(cls, user: User) -> list[EducationalDetailsSchema]:
        records = []
        educational_details = cls.objects.filter(user=user)
        for detail in educational_details:
            records.append(detail.serialize())
        return records

    def update_record(self, educational_details: EducationalDetailsSchema):
        self.school_name = educational_details.school_name
        self.degree = educational_details.degree
        self.location = educational_details.location
        self.field_of_study = educational_details.field_of_study
        self.start_date = educational_details.start_date
        self.end_date = educational_details.end_date
        self.grade = educational_details.grade
        self.save()
