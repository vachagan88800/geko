from decimal import Decimal

from django.core.management.base import BaseCommand

from api.models import Product, Review

PRODUCTS = [
    {
        "name": "Mini",
        "ml": 150,
        "cups": "1 Cup",
        "image_url": "https://images.unsplash.com/photo-1609238253408-924a52978616?w=400&h=500&fit=crop&auto=format",
        "price": Decimal("49.00"),
        "sort_order": 1,
    },
    {
        "name": "Small",
        "ml": 250,
        "cups": "2 Cups",
        "image_url": "https://images.unsplash.com/photo-1560263212-bd9320011663?w=400&h=500&fit=crop&auto=format",
        "price": Decimal("59.00"),
        "sort_order": 2,
    },
    {
        "name": "Medium",
        "ml": 350,
        "cups": "3 Cups",
        "image_url": "https://images.unsplash.com/photo-1588332796091-abc5fb03c5d6?w=400&h=500&fit=crop&auto=format",
        "price": Decimal("69.00"),
        "sort_order": 3,
    },
    {
        "name": "Large",
        "ml": 500,
        "cups": "4 Cups",
        "image_url": "https://images.unsplash.com/photo-1680163660834-fa4f67748e21?w=400&h=500&fit=crop&auto=format",
        "price": Decimal("79.00"),
        "sort_order": 4,
    },
    {
        "name": "Family",
        "ml": 700,
        "cups": "6 Cups",
        "image_url": "https://images.unsplash.com/photo-1579481802836-4c56a02b36d9?w=400&h=500&fit=crop&auto=format",
        "price": Decimal("99.00"),
        "sort_order": 5,
    },
]

REVIEWS = [
    {
        "name": "Leila Morin",
        "role": "Home Barista · Paris",
        "review": (
            "The moment I used this pot for the first time, I knew my mornings would never "
            "be the same. The copper heats so evenly — the foam rises perfectly every single time."
        ),
        "image_url": "https://images.unsplash.com/photo-1545665206-b3e63670666e?w=80&h=80&fit=crop&auto=format",
        "sort_order": 1,
    },
    {
        "name": "Tariq Al-Hassan",
        "role": "Coffee Enthusiast · Istanbul",
        "review": (
            "I've tried every method of brewing over 20 years. Nothing compares to the depth of "
            "flavor this copper cezve delivers. It is worth every penny — an heirloom piece."
        ),
        "image_url": "https://images.unsplash.com/photo-1596098823457-74e360fcd023?w=80&h=80&fit=crop&auto=format",
        "sort_order": 2,
    },
    {
        "name": "Sophie Brennan",
        "role": "Café Owner · Dublin",
        "review": (
            "Our customers always ask about this pot. The craftsmanship is immediately visible. "
            "It's not just functional — it's a beautiful object that transforms the entire ritual."
        ),
        "image_url": "https://images.unsplash.com/photo-1516036018940-b0159d2ab461?w=80&h=80&fit=crop&auto=format",
        "sort_order": 3,
    },
]


class Command(BaseCommand):
    help = "Seed products and reviews matching the Cezvecraft landing page."

    def handle(self, *args, **options):
        for data in PRODUCTS:
            Product.objects.update_or_create(name=data["name"], defaults=data)

        for data in REVIEWS:
            Review.objects.update_or_create(name=data["name"], defaults=data)

        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded {len(PRODUCTS)} products and {len(REVIEWS)} reviews."
            )
        )
