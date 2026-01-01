from django.db import models
from django.contrib.auth.models import User
from pydantic import BaseModel
from typing import Optional
from datetime import date


class ProfessionalDetailsSchema(BaseModel):
    company_name: str
    job_title: str
    location: str
    start_date: str
    end_date: str
    description: str


class ProfessionalDetail(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=255)
    job_title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    start_date = models.CharField(max_length=255)
    end_date = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.company_name

    @classmethod
    def create_record(cls, user: User, professional_details: ProfessionalDetailsSchema):
        return cls.objects.create(
            user=user,
            company_name=professional_details.company_name,
            job_title=professional_details.job_title,
            location=professional_details.location,
            start_date=professional_details.start_date,
            end_date=professional_details.end_date,
            description=professional_details.description,
        )

    def serialize(self) -> ProfessionalDetailsSchema:
        return ProfessionalDetailsSchema(
            company_name=self.company_name,
            job_title=self.job_title,
            location=self.location,
            start_date=self.start_date,
            end_date=self.end_date,
            description=self.description,
        )

    @classmethod
    def fetch_records_for_user(cls, user: User) -> list[ProfessionalDetailsSchema]:
        records = []
        professional_details = cls.objects.filter(user=user)
        for detail in professional_details:
            records.append(detail.serialize())
        return records

    def update_record(self, professional_details: ProfessionalDetailsSchema):
        self.company_name = professional_details.company_name
        self.job_title = professional_details.job_title
        self.location = professional_details.location
        self.start_date = professional_details.start_date
        self.end_date = professional_details.end_date
        self.description = professional_details.description
        self.save()
