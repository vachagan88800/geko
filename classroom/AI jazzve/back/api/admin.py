from django.contrib import admin

from .models import NewsletterSubscriber, Product, Review


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "ml", "cups", "price", "is_active", "sort_order")
    list_editable = ("is_active", "sort_order")
    search_fields = ("name", "cups")
    ordering = ("sort_order", "ml")


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "rating", "is_published", "sort_order")
    list_editable = ("is_published", "sort_order")
    search_fields = ("name", "role", "review")
    ordering = ("sort_order", "-created_at")


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "is_active", "subscribed_at")
    list_filter = ("is_active",)
    search_fields = ("email",)
    ordering = ("-subscribed_at",)
