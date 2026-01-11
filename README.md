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

# Docker Container starten
docker-compose up -d

# Backend dependencies installieren
cd backend
npm install

# Frontend dependencies installieren
cd ../frontend
npm install
```

### Umgebungsvariablen

Erstellen Sie eine `.env`-Datei im Hauptverzeichnis:

```env
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=collab_task_hub
```

## 📚 Projektstruktur

```
Collab-Task-Hub/
├── backend/          # NestJS Backend
│   ├── src/
│   │   ├── auth/    # Authentifizierung
│   │   ├── users/   # Benutzerverwaltung
│   │   └── main.ts
│   └── test/
├── frontend/         # Next.js Frontend
│   ├── app/         # Next.js App Router
│   ├── features/    # Feature-basierte Architektur
│   └── shared/      # Shared Components & Utils
├── nginx/           # Nginx Konfiguration
└── docker-compose.yml
```

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