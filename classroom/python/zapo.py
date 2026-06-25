class Auto:
    def __init__(self, make, model, year,color):
        self.make = make
        self.model = model
        self.year = year
        self.color = color

    def my_car(self):
        print(f"Es unem {self.color} guyni {self.make} maknishi {self.model} modeli avtomeqena, {self.year} tvakani artadrutyan")

lexus = Auto("lexus", "gs300", 2006,"grey")
toyota = Auto("toyota", "land cruiser", 2005, "black")

lexus.my_car()
toyota.my_car()
