from django.contrib import admin
from .models import Video, Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']

@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'category', 'is_public', 'uploaded_at']
    list_filter = ['is_public', 'category']
    search_fields = ['title', 'description']
    readonly_fields = ['uploaded_at', 'updated_at']