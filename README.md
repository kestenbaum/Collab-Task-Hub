# Collaborative Task Hub

Ein kollaborativer Task-Manager mit Echtzeit-Funktionen, bei dem der Zugriff auf Aufgaben durch einen expliziten Genehmigungsworkflow gesteuert wird.

## 📋 Projektbeschreibung

Das **Collaborative Task Hub** ist ein innovativer Task-Manager, der Aufgabenverwaltung mit integrierten WebSocket-Chats für eine nahtlose Teamkommunikation kombiniert. Das System ermöglicht eine kontrollierte Zusammenarbeit durch ein "Request-to-Join"-Prinzip, bei dem der Zugriff auf Aufgaben explizit vom Ersteller genehmigt werden muss.

### Projektziele

Das Hauptziel ist die Schaffung einer kontrollierten Arbeitsumgebung für Teams. Es löst folgende Probleme:

- **Unübersichtliche Zugriffsrechte**: Klare Kontrolle darüber, wer an welchen Aufgaben arbeitet
- **Fragmentierte Kommunikation**: Diskussionen werden direkt an die jeweilige Aufgabe gebunden
- **Fehlende Genehmigungsprozesse**: Explizite Genehmigung durch den Aufgaben-Ersteller erforderlich

## 🏗️ Architektur

### Frontend

- **Framework**: Next.js (React)
- **Formular-Management**: React Hook Form
- **Validierung**: Zod
- **State-Management**: Zustand
- **Styling**: Tailwind CSS

### Backend

- **Framework**: NestJS
- **API-Dokumentation**: Swagger (OpenAPI)
- **Echtzeit-Kommunikation**: Socket.io (WebSockets)

### Datenbank

- **RDBMS**: PostgreSQL

### Infrastruktur & QA

- **Containerisierung**: Docker
- **CI/CD**: Automatisierte Pipelines
- **Testing**: Jest (Unit Tests), Cypress (E2E Tests)

## 🎯 MVP (Minimal Viable Product)

Das MVP umfasst folgende Kernfunktionen:

1. **Benutzerverwaltung**

   - Registrierung und Login
   - JWT-basierte Authentifizierung

2. **Task-Management**

   - Erstellen von Aufgaben mit Titel und Beschreibung
   - Aufgabenverwaltung

3. **Berechtigungslogik**

   - Benutzer können Beitrittsanfragen für Aufgaben senden
   - Aufgaben-Ersteller erhalten Anfragen im Dashboard
   - Genehmigung oder Ablehnung von Beitrittsanfragen

4. **Echtzeit-Kommunikation**

   - Integrierter Chat pro Aufgabe (via WebSockets)
   - Chat nur für genehmigte Teilnehmer sichtbar

5. **Abschluss-Workflow**
   - Verschieben von Aufgaben in den Status "Erledigt"
   - Historie der beteiligten Bearbeiter

## 🚀 Installation & Setup

### Voraussetzungen

- Node.js (v18 oder höher)
- Docker & Docker Compose
- PostgreSQL (wird via Docker bereitgestellt)

### Entwicklungsumgebung starten

```bash
# Repository klonen
git clone <repository-url>
cd Collab-Task-Hub

# Umgebungsvariablen erstellen (optional)
# Erstellen Sie eine .env-Datei mit:
# DB_USERNAME=postgres
# DB_PASSWORD=postgres
# DB_DATABASE=collab_task_hub

# Docker Container starten (baut automatisch Images und startet alle Services)
docker-compose up -d

# Logs anzeigen
docker-compose logs -f

# Status prüfen
docker-compose ps
```

**Services nach dem Start:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Swagger Docs: http://localhost:4000/api
- PostgreSQL: localhost:5432

### Docker Befehle

```bash
# Container stoppen
docker-compose down

# Container neu bauen (nach package.json Änderungen)
docker-compose build
docker-compose up -d

# Bestimmten Service neu starten
docker-compose restart backend
docker-compose restart frontend

# Logs anzeigen
docker-compose logs -f backend
docker-compose logs -f frontend

# In Container Shell zugreifen
docker-compose exec backend sh
docker-compose exec frontend sh

# Alles löschen (inkl. Volumes)
docker-compose down -v
```

**Hinweis**: Das Projekt nutzt Hot-Reload in der Entwicklungsumgebung. Code-Änderungen werden automatisch erkannt und neu geladen.

## 📚 Projektstruktur

```
Collab-Task-Hub/
├── backend/          # NestJS Backend
│   ├── src/
│   │   ├── auth/      # Authentifizierung
│   │   ├── users/     # Benutzerverwaltung
│   │   ├── projects/  # Projektverwaltung mit RBAC
│   │   └── main.ts
│   └── test/
├── frontend/         # Next.js Frontend
│   ├── app/         # Next.js App Router
│   ├── features/    # Feature-basierte Architektur
│   └── shared/      # Shared Components & Utils
├── nginx/           # Nginx Konfiguration
└── docker-compose.yml
```

## 🔐 API-Dokumentation

### Projekt-Management (RBAC)

Das Projekt-Modul implementiert vollständige CRUD-Operationen mit rollenbasierter Zugriffskontrolle (RBAC). Wenn ein Benutzer ein Projekt erstellt, wird er automatisch als Administrator zugewiesen.

#### Funktionen

- **Projekt-CRUD**: Erstellen, Lesen, Aktualisieren, Löschen von Projekten
- **Automatische Rollenzuweisung**: Projekt-Ersteller wird automatisch als Admin zugewiesen
- **Rollenbasierte Zugriffskontrolle**: Drei Rollen verfügbar (Admin, Member, Viewer)
- **Mitgliederverwaltung**: Mitglieder hinzufügen/entfernen, Rollen aktualisieren
- **Autorisierung**: Nur Admins können Projekte ändern und Mitglieder verwalten

#### Entitäten

**Project**

- `id`: UUID (Primary Key)
- `title`: String (max. 200 Zeichen)
- `description`: Text (optional)
- `createdById`: UUID (Foreign Key zu User)
- `createdBy`: User-Relation
- `members`: ProjectMember[]-Relation
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

**ProjectMember**

- `id`: UUID (Primary Key)
- `role`: Enum (admin, member, viewer)
- `userId`: UUID (Foreign Key zu User)
- `projectId`: UUID (Foreign Key zu Project)
- `user`: User-Relation
- `project`: Project-Relation
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

**ProjectRole Enum**

- `ADMIN`: Vollzugriff auf das Projekt, kann Mitglieder und Einstellungen verwalten
- `MEMBER`: Kann Projektinhalte ansehen und bearbeiten
- `VIEWER`: Nur-Lese-Zugriff

#### API-Endpunkte

**Projekt erstellen**

```http
POST /projects
Authorization: Bearer <token>

{
  "title": "Projektname",
  "description": "Projektbeschreibung (optional)"
}
```

**Alle Projekte abrufen**

```http
GET /projects
Authorization: Bearer <token>
```

**Einzelnes Projekt abrufen**

```http
GET /projects/:id
Authorization: Bearer <token>
```

**Projekt aktualisieren** (nur Admin)

```http
PATCH /projects/:id
Authorization: Bearer <token>

{
  "title": "Aktualisierter Projektname",
  "description": "Aktualisierte Beschreibung"
}
```

**Projekt löschen** (nur Admin)

```http
DELETE /projects/:id
Authorization: Bearer <token>
```

**Mitglied hinzufügen** (nur Admin)

```http
POST /projects/:id/members
Authorization: Bearer <token>

{
  "userId": "uuid",
  "role": "member" | "admin" | "viewer"
}
```

**Mitglied entfernen** (nur Admin)

```http
DELETE /projects/:id/members/:memberId
Authorization: Bearer <token>
```

**Mitgliederrolle aktualisieren** (nur Admin)

```http
PATCH /projects/:id/members/:memberId
Authorization: Bearer <token>

{
  "role": "admin" | "member" | "viewer"
}
```

**Benutzerrolle im Projekt abrufen**

```http
GET /projects/:id/role
Authorization: Bearer <token>
```

#### Autorisierungsregeln

1. **Projekt erstellen**: Jeder authentifizierte Benutzer kann ein Projekt erstellen
2. **Projekt aktualisieren/löschen**: Nur Admins können Projekte aktualisieren oder löschen
3. **Mitgliederverwaltung**: Nur Admins können Mitglieder hinzufügen, entfernen oder Rollen ändern
4. **Projekt ansehen**: Jedes Projektmitglied kann das Projekt ansehen
5. **Letzter Admin-Schutz**: Der letzte Admin eines Projekts kann nicht entfernt oder herabgestuft werden

## 🧪 Testing

```bash
# Backend Unit Tests
cd backend
npm run test

# Backend E2E Tests
npm run test:e2e

# Frontend Tests
cd frontend
npm run test
```

## 📝 Zusätzliche Anmerkungen

Dieses Projekt legt besonderen Wert auf:

- **Code-Qualität**: Vollständige Testabdeckung (Unit & E2E)
- **DevOps-Praktiken**: Containerisierung mittels Docker
- **Enterprise-Standards**: Skalierbare und wartbare Architektur
- **Moderne Best Practices**: TypeScript, Clean Code, SOLID-Prinzipien

## 🎓 Motivation

Dieses Projekt dient als Weiterentwicklung meiner Fullstack-Development-Fähigkeiten auf ein professionelles Niveau. Es bietet die ideale Herausforderung, da es komplexe Business-Logik (Genehmigungssystem) mit technischer Tiefe (WebSockets, Docker, Testing) verbindet. Das Ziel ist es, eine skalierbare und wartbare Architektur zu entwerfen, die modernen Industriestandards entspricht.

## 📄 Lizenz

Dieses Projekt ist für Lern- und Entwicklungszwecke erstellt.

---

**Status**: 🚧 In Entwicklung
