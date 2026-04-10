from rest_framework import serializers
from video.models import *
import os

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name")
        read_only_fields = ("id",)

    def validate_name(self, data):
        data = data.strip()

        if not data:
            raise serializers.ValidationError("Category name cannot be empty")


        if Category.objects.filter(name__iexact=data).exists():
            raise serializers.ValidationError("Category must be Unique")

        if len(data) < 2:
            raise serializers.ValidationError(
                "Category minimum length should be 2 character"
            )

        return data


from rest_framework import serializers
from .models import Video, Category
import os


class VideoSerializer(serializers.ModelSerializer):
    video_category = serializers.CharField(source="category.name", read_only=True)
    class Meta:
        model = Video
        fields = (
            "id",
            "title",
            "description",
            "category",
            "video_category",
            "file",
            "thumbnail",
            "duration",
            "uploaded_at",
            "updated_at",
        )
        read_only_fields = ("id", "uploaded_at", "updated_at")

    def validate_title(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError("Title is required")

        if len(value) < 3:
            raise serializers.ValidationError("Title must be at least 3 characters long")

        return value

    def validate_category(self, value):
        # DRF already ensures FK exists, just handle null case
        if value is None:
            return value
        return value
    
    def validate_file(self, value):
        # Required only on create
        if not value and self.instance is None:
            raise serializers.ValidationError("Video file is required")

        if not value:
            return value

        # 1. Validate file extension
        ext = os.path.splitext(value.name)[1].lower()
        allowed_extensions = ['.mp4', '.mov', '.avi', '.mkv']

        if ext not in allowed_extensions:
            raise serializers.ValidationError(
                f"Unsupported video format. Allowed formats: {', '.join(allowed_extensions)}"
            )

        # 2. Validate MIME type
        content_type = value.content_type
        allowed_mime_types = [
            'video/mp4',
            'video/quicktime',
            'video/x-msvideo',
            'video/x-matroska'
        ]

        if content_type not in allowed_mime_types:
            raise serializers.ValidationError("Invalid video file type")

        # 3. Validate file size (e.g., max 200MB)
        max_size = 200 * 1024 * 1024  # 200MB

        if value.size > max_size:
            raise serializers.ValidationError("Video file size must be less than 200MB")

        if value.size == 0:
            raise serializers.ValidationError("Empty video file is not allowed")

        return value
   
    def validate_thumbnail(self, value):
        if not value:
            return value  # optional

        # Validate extension
        ext = os.path.splitext(value.name)[1].lower()
        allowed_extensions = ['.jpg', '.jpeg', '.png']

        if ext not in allowed_extensions:
            raise serializers.ValidationError(
                f"Unsupported image format. Allowed: {', '.join(allowed_extensions)}"
            )

        # Validate size (max 2MB)
        max_size = 2 * 1024 * 1024

        if value.size > max_size:
            raise serializers.ValidationError("Thumbnail size must be less than 2MB")

        return value
    
    def validate_duration(self, value):
        if value is None:
            return value

        if value <= 0:
            raise serializers.ValidationError("Duration must be greater than 0")

        if value > 36000:  # 10 hours
            raise serializers.ValidationError("Duration seems too large")

        return value
    
    def validate(self, attrs):
        # Ensure file is present on create
        if self.instance is None and not attrs.get('file'):
            raise serializers.ValidationError({
                "file": "Video file is required for upload"
            })

        return attrs