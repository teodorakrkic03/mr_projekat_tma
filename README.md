# 📱 Task Master App
## Opis aplikacije
TaskMaster je aplikacija za upravljanje zadacima dizajnirana da pomogne korisnicima u organizaciji svakodnenih obaveza, projekata i  ciljeva. Omogućava korisnicima da kreiraju, uređuju u brišu zadatke, grupišu ih u liste i kategorije, postavljaju rokove i prate njihov status. Sa funkcionalnostima kao što su prioriteti, kategorizacija i statusi zadataka, aplikacija olakšava produktivno planiranje i realizaciju ciljeva.

### Ključne funkcionalnosti
**Kreiranje i upravljanje zadacima**
- Korisnici mogu kreirari nove zadatke unosom naziva, opisa i dodatnih informacija
- Mogućnost uređivanja zadataka kako bi se ažurirali detalji
- Opcija brisanja zadatka kada više nije potreban

**Liste zadataka**
- Korisnici mogu organizovati zadatke u prilagođene liste (npr. „Dnevni zadaci“, „Projekat X“, „Lični ciljevi“...)

**Status zadataka**
- Svaki zadatak ima status koji korisnicima omogućava da lako prate progres i fokusiraju se na trenutne prioritete („Not started“, „Active“, „Finished“)
**Postavljanje prioriteta**
  
- Zadaci mogu imati prioritet kako bi se odredila njihova važnost („Low“, „Medium“, „High“)
- Pomaže u određivanju fokusa i poboljšava produktivnost

**Rokovi**
- Korisnici mogu postaviti rokove za zadatke kako bi imali jasne vremenske okvire za izvršenje

**Kategorizacija i filtriranje**
- Zadaci se mogu organizovati prema različitim kategorija koje korisnici sami definišu (npr. „Održavanje“, „Finansije“, „Putovanja“, „Fitnes“...)
- Mogućnost filtriranja zadataka prema statusu, prioritetu i kategoriji

## Backend
- Laravel (PHP framework)  
- REST API  
- Autentifikacija korisnika (Sanctum)  
- Kontroleri, modeli i resursi  
- Relaciona baza podataka (MySQL)

## Frontend
- Angular + Ionic
- Razvoj mobilne aplikacije (Android/iOS)  
- Interaktivne i responzivne komponente  
- Organizacija koda kroz module i servise  

## Struktura projekta
Backend (Laravel)

 *“app/Http/Controllers”*
  - AuthController– registracija, prijava, odjava korisnika  
  - UserController – pregled, izmena i brisanje korisnika  
  - TaskController – CRUD nad zadacima, filtriranje, paginacija  
  - TaskListController – rad sa listama zadataka (kreiranje, ažuriranje, brisanje)  
  - ListOrderController – dodavanje i uklanjanje zadataka iz lista  
  - CategoryController – rad sa kategorijama  
  - PasswordController – reset lozinke  

  *“app/Models”*  
  - User, Task, TaskList, Category, Priority, Status, ListOrder

 *“database/seeders”*
  - Seeder klase za inicijalne podatke (statusi, prioriteti, korisnici, zadaci)  

Frontend (Angular + Ionic)

*“src/app”*
  - components – UI komponente (task-item, list-item, task-modal, list-modal, categories-modal)  
  - pages – ekrani aplikacije (Login, Register, Tasks, Lists, Profile)  
  - services – servisi za komunikaciju sa backend API-jem (Auth, TasksService, ListsService)  
  - models – definicije modela podataka (Task, TaskList, Category)  
  - routing.module.ts – rute aplikacije (navigacija između ekrana)

## Instalacija i pokretanje

**Kloniranje repozitorijuma**
```
git clone https://github.com/teodorakrkic03/mr_projekat_tma.git
```

1. Backend (Laravel)
```
cd mr_projekat_tma/backend
composer install
php artisan migrate --seed
php artisan serve
```

2. Frontend (Angular + Ionic)
```
cd mr_projekat_tma/frontend
npm install
ionic serve
```

**Aplikacija će biti dostupna na:** 
- Backend API: “http://127.0.0.1:8000/api”  
- Frontend: “http://localhost:8100”

## Autori
- Teodora Krkić 2021/0015  
- Nataša Matović 2021/0108  
