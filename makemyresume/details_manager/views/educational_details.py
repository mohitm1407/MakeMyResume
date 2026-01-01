from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from details_manager.models import EducationalDetail, EducationalDetailsSchema


class EducationalDetailsView(APIView):
    def get(self, request):
        try:
            user = request.user
            if not user.is_authenticated:
                return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
            educational_details: list[EducationalDetailsSchema] = EducationalDetail.fetch_records_for_user(user)
            return Response([detail.model_dump() for detail in educational_details], status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            user = request.user
            if not user.is_authenticated:
                return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
            educational_details: EducationalDetailsSchema = EducationalDetailsSchema.model_validate(request.data)
            EducationalDetail.create_record(user, educational_details)
            return Response(educational_details.model_dump(), status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
