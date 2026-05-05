# Naxi Taxi BB — Web Sajt

Moderan web sajt za taxi službu sa Sanity CMS-om, Auth.js zaštitom i Vercel deployom.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS** — žuta/crna taxi paleta
- **Sanity v3** — headless CMS, embedded Studio na `/studio`
- **Auth.js v5** — zaštita admin panela
- **Resend** — slanje emailova iz formi
- **Zod** — validacija formi
- **Framer Motion** — animacije
- **Vercel** — hosting

---

## Lokalni razvoj (Docker)

### Zahtevi
- Docker Desktop

### Pokretanje

```bash
# 1. Kopirati env fajl
cp .env.local.example .env.local

# 2. Kreirati Sanity projekat (samo jednom)
npx sanity@latest init
# Uneti project ID i dataset u .env.local

# 3. Generisati bcrypt hash za admin lozinku
node -e "const b=require('bcryptjs'); console.log(b.hashSync('TVOJA_LOZINKA', 12))"
# Uneti hash u ADMIN_PASSWORD_HASH u .env.local

# 4. Generisati AUTH_SECRET
openssl rand -base64 32
# Uneti u AUTH_SECRET u .env.local

# 5. Pokrenuti
docker compose up
```

**Sajt:** http://localhost:3000  
**CMS Login:** http://localhost:3000/login  
**Sanity Studio:** http://localhost:3000/studio (zahteva login)

---

## Sanity CMS

### Scheме

| Schema | Opis |
|---|---|
| `siteSettings` | Singleton: naziv, telefon, Viber, WhatsApp, email, logo, hero |
| `service` | Usluge sa slikama i SEO |
| `pricingTariff` | Tarife 1/2/3 sa cenama |
| `galleryImage` | Slike galerije sa kategorijama |
| `partner` | Logo partnera |
| `faq` | Česta pitanja |
| `testimonial` | Recenzije korisnika |

### Unos dummy podataka

1. Otvoriti `http://localhost:3000/login`
2. Prijaviti se
3. Popuniti sve sekcije u Studiju

---

## Vercel Deploy

### 1. Push na GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR/REPO.git
git push -u origin main
```

### 2. Importovati projekat na Vercel

1. https://vercel.com → New Project → Import Git Repository
2. Dodati sve environment varijable iz `.env.local.example`

### 3. Sanity Webhook (za automatski refresh)

1. Sanity → projekt → API → Webhooks → Add webhook
2. URL: `https://yourdomain.vercel.app/api/revalidate`
3. Secret: vrednost `SANITY_WEBHOOK_SECRET` iz `.env`

---

## Environment varijable

Sve varijable su dokumentovane u `.env.local.example`.

---

## Stranice

| Ruta | Opis |
|---|---|
| `/` | Početna |
| `/usluge` | Sve usluge |
| `/cenovnik` | Detaljan cenovnik |
| `/taxi-do-aerodroma` | SEO landing + forma |
| `/poslovni-taxi` | B2B + forma |
| `/galerija` | Galerija slika |
| `/kontakt` | Kontakt + mapa |
| `/login` | CMS admin login |
| `/studio` | Sanity Studio (zaštićen) |

---

## Bezbednost

- `/studio` i `/api/revalidate` zaštićeni Auth.js sesijom
- HTTP security headers na svim rutama (CSP, HSTS, X-Frame-Options...)
- Rate limiting na svim API formama (5 req/15 min po IP)
- Zod validacija svakog zahteva
- HMAC webhook verifikacija za Sanity
- Svi tokeni samo server-side

---

## Faze razvoja

- **Faza 1 (MVP):** Ovaj sajt
- **Faza 2:** FAQ stranica, blog, napredni SEO
- **Faza 3:** Custom CMS, Supabase, rezervacije, dispečerski panel
