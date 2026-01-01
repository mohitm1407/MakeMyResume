from django.urls import path
from details_manager.views import PersonalDetailsView, EducationalDetailsView, LoginView, SignupView

details_urls = [
    path("personal-details/", PersonalDetailsView.as_view(), name="personal-details"),
    path("educational-details/", EducationalDetailsView.as_view(), name="educational-details"),
]

auth_urls = [
    path("login/", LoginView.as_view(), name="login"),
    path("signup/", SignupView.as_view(), name="signup"),
]

__all__ = ["details_urls", "auth_urls"]
