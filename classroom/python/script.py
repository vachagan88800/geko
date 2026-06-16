import random

secret = random.randint(1, 10)

guess = int(input("Enter a number: "))

while guess != secret:
    guess = int(input("Try again: "))

print("You win!!!")
