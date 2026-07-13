# Տվյալների պահեստ
students = {}

# ─────────────────────────────────────
def show_menu():
    print("\n1 — Ավելացնել ուսանող")
    print("2 — Ավելացնել գնահատական")
    print("3 — Ցույց տալ բոլոր ուսանողներին")
    print("4 — Ցույց տալ վիճակագրությունը")
    print("5 — Նշել լավագույն ուսանողին")
    print("6 — Ջնջել ուսանող")
    print("7 — Ջնջել գնահատական")
    print("8 — Սորտավորել ըստ միջինի")
    print("9 — Փնտրել ցածր միջին")
    print("0 — Ելք")

# ─────────────────────────────────────
def add_student():
    name = input("Անուն: ")
    if name in students:
        print(f"{name} արդեն կա")
    else:
        students[name] = []
        print(f"Նոր ուսանող {name} ավելացվեց")

# ─────────────────────────────────────
def add_grade():
    name = input("Ուսանողի անունը: ")
    if name not in students:
        print(f"{name} չի գտնվել")
        return
    grade = int(input("Գնահատական (0-100): "))
    if grade < 0 or grade > 100:
        print("Գնահատականը պետք է 0-100 լինի")
        return
    students[name].append(grade)
    print(f"{name}-ին ավելացվեց գնահատական {grade}")

# ─────────────────────────────────────
def show_students():
    for name, grades in students.items():
        if len(grades) == 0:
            avg = "N/A"
        else:
            avg = round(sum(grades) / len(grades), 1)
        print(f"{name} → {grades} → Միջին: {avg}")

# ─────────────────────────────────────
def show_stats():
    total = len(students)
    print(f"Ընդհանուր ուսանողներ: {total}")

    all_grades = []
    for grades in students.values():
        all_grades += grades

    if len(all_grades) == 0:
        print("Խմբի միջին: N/A")
    else:
        group_avg = round(sum(all_grades) / len(all_grades), 1)
        print(f"Խմբի միջին գնահատականը: {group_avg}")

    excellent = 0
    for grades in students.values():
        if len(grades) > 0 and sum(grades) / len(grades) > 90:
            excellent += 1
    print(f"Գերազանցիկներ: {excellent}")

    no_grades = sum(1 for g in students.values() if len(g) == 0)
    print(f"Ուսանողներ առանց գնահատականի: {no_grades}")

# ─────────────────────────────────────
# Հիմնական loop
while True:
    show_menu()
    choice = input("\nԸնտրիր գործողություն: ")

    if choice == "1":
        add_student()
    elif choice == "2":
        add_grade()
    elif choice == "3":
        show_students()
    elif choice == "4":
        show_stats()
    elif choice == "0":
        print("Ցտեսություն!")
        break
    else:
        print("Սխալ ընտրություն, կրկին փորձիր")