from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=100)
    ml = models.PositiveIntegerField(help_text="Capacity in milliliters")
    cups = models.CharField(max_length=50)
    image_url = models.URLField(max_length=500)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "ml"]

    def __str__(self):
        return f"{self.name} ({self.ml}ml)"


class Review(models.Model):
    name = models.CharField(max_length=120)
    role = models.CharField(max_length=120)
    review = models.TextField()
    image_url = models.URLField(max_length=500)
    rating = models.PositiveSmallIntegerField(default=5)
    is_published = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "-created_at"]

    def __str__(self):
        return f"{self.name} — {self.rating}★"


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-subscribed_at"]

    def __str__(self):
        return self.email
