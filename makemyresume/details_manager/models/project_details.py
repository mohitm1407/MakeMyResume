from django.db import models
from django.contrib.auth.models import User
from pydantic import BaseModel
from typing import Optional
from datetime import date


class ProjectDetailsSchema(BaseModel):
    project_name: str
    project_description: str
    project_url: str
    project_start_date: date
    project_end_date: date
    project_technologies: list[str]


class ProjectDetail(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project_name = models.CharField(max_length=255)
    project_description = models.TextField()
    project_url = models.URLField(max_length=255)
    project_start_date = models.CharField(max_length=255)
    project_end_date = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.project_name

    @classmethod
    def create_record(cls, user: User, project_details: ProjectDetailsSchema):
        return cls.objects.create(
            user=user,
            project_name=project_details.project_name,
            project_description=project_details.project_description,
            project_url=project_details.project_url,
            project_start_date=project_details.project_start_date,
            project_end_date=project_details.project_end_date,
        )

    def serialize(self) -> ProjectDetailsSchema:
        return ProjectDetailsSchema(
            project_name=self.project_name,
            project_description=self.project_description,
            project_url=self.project_url,
            project_start_date=self.project_start_date,
            project_end_date=self.project_end_date,
        )

    @classmethod
    def fetch_records_for_user(cls, user: User) -> list[ProjectDetailsSchema]:
        records = []
        project_details = cls.objects.filter(user=user)
        for detail in project_details:
            records.append(detail.serialize())
        return records

    def update_record(self, project_details: ProjectDetailsSchema):
        self.project_name = project_details.project_name
        self.project_description = project_details.project_description
        self.project_url = project_details.project_url
        self.project_start_date = project_details.project_start_date
        self.project_end_date = project_details.project_end_date
        self.save()
