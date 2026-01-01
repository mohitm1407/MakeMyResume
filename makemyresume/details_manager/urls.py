from django.urls import path
from details_manager.views import PersonalDetailsView, EducationalDetailsView

urlpatterns = [
    path("personal-details/", PersonalDetailsView.as_view(), name="personal-details"),
    path("educational-details/", EducationalDetailsView.as_view(), name="educational-details"),
]

__all__ = ["urlpatterns"]
