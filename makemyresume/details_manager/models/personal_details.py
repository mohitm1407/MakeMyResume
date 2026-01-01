from django.db import models
from typing import Optional
from django.contrib.auth.models import User
from pydantic import BaseModel


class PersonalDetailsSchema(BaseModel):
    full_name: str
    email: str
    phone: str
    location: str
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    website_url: Optional[str] = None


class PersonalDetail(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
    )
    full_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    github_url = models.URLField(max_length=255, null=True)
    linkedin_url = models.URLField(max_length=255, null=True)
    website_url = models.URLField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name

    @classmethod
    def create_record(cls, user: User, personal_details: PersonalDetailsSchema):
        return cls.objects.update_or_create(
            user=user,
            defaults={
                "full_name": personal_details.full_name,
                "email": personal_details.email,
                "phone": personal_details.phone,
                "location": personal_details.location,
                "github_url": personal_details.github_url,
                "linkedin_url": personal_details.linkedin_url,
                "website_url": personal_details.website_url,
            },
        )

    @classmethod
    def fetch_record_for_user(cls, user: User) -> Optional[PersonalDetailsSchema]:
        try:
            record = cls.objects.get(user=user)
            return record.serialize()
        except cls.DoesNotExist:
            return None

    def serialize(self) -> PersonalDetailsSchema:
        return PersonalDetailsSchema(
            full_name=self.full_name,
            email=self.email,
            phone=self.phone,
            location=self.location,
            github_url=self.github_url,
            linkedin_url=self.linkedin_url,
            website_url=self.website_url,
        )
