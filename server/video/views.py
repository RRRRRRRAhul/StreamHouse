from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from video.models import Category, Video
from video.serializers import VideoSerializer, CategorySerializer
from rest_framework import generics
from django.http import StreamingHttpResponse
import os
from django.http import FileResponse, Http404
import mimetypes



class UploadVideoAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Allow authenticated user to upload videos

    def post(self, request):
        
        serializer = VideoSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user = request.user)  # Associate video with the authenticated user
            return Response({
                "message": "Video uploaded successfully",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)

        return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class SingleVideoAPIView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]  
    queryset = Video.objects.filter(is_public=True)  
    serializer_class = VideoSerializer
    

class CategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]  

class VideoListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VideoSerializer
    queryset = Video.objects.filter(is_public=True)


def file_iterator(file, start, length, chunk_size=8192):
    file.seek(start)
    remaining = length

    while remaining > 0:
        chunk = file.read(min(chunk_size, remaining))
        if not chunk:
            break
        yield chunk
        remaining -= len(chunk)

    file.close()  


class VideoStreamAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        try:
            video = Video.objects.get(pk=pk)
        except Video.DoesNotExist:
            raise Http404("Video not found")

        file_path = video.file.path
        file_size = os.path.getsize(file_path)

        content_type, _ = mimetypes.guess_type(file_path)

        range_header = request.headers.get('Range', None)

        if range_header:
            byte1, byte2 = 0, None

            match = range_header.replace('bytes=', '').split('-')
            byte1 = int(match[0])
            if match[1]:
                byte2 = int(match[1])

            length = file_size - byte1 if byte2 is None else byte2 - byte1 + 1

            f = open(file_path, 'rb')

            response = StreamingHttpResponse(
                file_iterator(f, byte1, length),
                status=206,
                content_type=content_type
            )

            response['Content-Range'] = f'bytes {byte1}-{byte1 + length - 1}/{file_size}'
            response['Accept-Ranges'] = 'bytes'
            response['Content-Length'] = str(length)

            return response

        return FileResponse(open(file_path, 'rb'), content_type=content_type)

class VideoByCategoryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        category_id = self.kwargs.get('category_id')
        videos = Video.objects.filter(category_id=category_id, is_public=True)
        serializer = VideoSerializer(videos, many=True)
        if serializer.is_valid:
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
