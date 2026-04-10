from video.views import (
    UploadVideoAPIView,
    CategoryListCreateAPIView,
    VideoListAPIView,
    VideoStreamAPIView,
    SingleVideoAPIView,
    VideoByCategoryAPIView
)
from django.urls import path

urlpatterns = [
    path("upload/", UploadVideoAPIView.as_view()),
    path("categories/", CategoryListCreateAPIView.as_view()),
    path("video/<int:pk>/", SingleVideoAPIView.as_view()),
    path("videos/", VideoListAPIView.as_view()),
    path("stream/<int:pk>/", VideoStreamAPIView.as_view()),
    path("category/<int:category_id>/videos/", VideoByCategoryAPIView.as_view()),
]
