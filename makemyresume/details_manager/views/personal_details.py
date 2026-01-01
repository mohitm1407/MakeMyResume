from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from details_manager.models import PersonalDetail, PersonalDetailsSchema


class PersonalDetailsView(APIView):
    def get(self, request):
        try:
            user = request.user
            if not user.is_authenticated:
                return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
            personal_details: list[PersonalDetailsSchema] = PersonalDetail.fetch_records_for_user(user)
            return Response([detail.model_dump() for detail in personal_details], status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            user = request.user
            if not user.is_authenticated:
                return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
            personal_details: PersonalDetailsSchema = PersonalDetailsSchema.model_validate(request.data)
            PersonalDetail.create_record(user, personal_details)
            return Response(personal_details.model_dump(), status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
