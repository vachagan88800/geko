from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterSerializer, ProfileSerializer

@api_view(["POST"])
def register_view(request):

    if User.objects.filter(
        username=request.data.get("username")
    ).exists():

        return Response(
            {
                "error": "Username already exists"
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    serializer = RegisterSerializer(
        data=request.data
    )


    if serializer.is_valid():

        serializer.save()

        return Response(
            {
                "message": "User created successfully"
            },
            status=status.HTTP_201_CREATED
        )


    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(["POST"])
def login_view(request):

    username = request.data.get("username")
    password = request.data.get("password")


    user = authenticate(
        username=username,
        password=password
    )


    if user is None:

        return Response(
            {
                "error": "Invalid username or password"
            },
            status=status.HTTP_401_UNAUTHORIZED
        )


    refresh = RefreshToken.for_user(user)


    return Response(
        {
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }
    )

@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def profile_view(request):

    user = request.user


    if request.method == "GET":

        serializer = ProfileSerializer(user)

        return Response(
            serializer.data
        )


    elif request.method == "PUT":


        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")


        if username:
            user.username = username


        if email:
            user.email = email


        if password:
            user.set_password(password)


        user.save()


        serializer = ProfileSerializer(user)


        return Response(
            serializer.data
        )


    elif request.method == "DELETE":

        user.delete()


        return Response(
            {
                "message": "Account deleted"
            },
            status=status.HTTP_204_NO_CONTENT
        )