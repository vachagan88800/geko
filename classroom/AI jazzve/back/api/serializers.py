from django.contrib.auth.models import User
from rest_framework import serializers

from .models import NewsletterSubscriber, Product, Review


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "ml",
            "cups",
            "image_url",
            "price",
            "description",
            "is_active",
            "sort_order",
        ]
        read_only_fields = ["id"]


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "id",
            "name",
            "role",
            "review",
            "image_url",
            "rating",
            "is_published",
            "sort_order",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class NewsletterSubscribeSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ["email"]

    def create(self, validated_data):
        subscriber, _created = NewsletterSubscriber.objects.update_or_create(
            email=validated_data["email"],
            defaults={"is_active": True},
        )
        return subscriber


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "password_confirm"]
        read_only_fields = ["id"]

    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError({"password_confirm": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop("password_confirm")
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]
        read_only_fields = fields
