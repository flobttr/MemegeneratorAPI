# MemeGenerator

Dieses Projekt stellt eine einfache Meme-Generator-Anwendung bereit, die sowohl eine REST-Schnittstelle als auch ein Web-Frontend bietet. Über die REST-API können Memes (z. B. mit Beschriftung) per POST-Request gespeichert und anschließend an einen Lobby-Endpunkt weitergeleitet werden. Gleichzeitig gibt es eine MVC-Komponente, die zufällige Meme-Vorlagen aus einem definierten Ressourcenordner auswählt und im Frontend anzeigt.

## 1) Beschreibung der Funktion

- **REST-API:**  
  - **MemeApiController:** Nimmt per `POST /api/memes/save` ein Meme-Objekt (als JSON) entgegen und leitet es an den MemeSaver weiter.
  - **MemeSaver:** Verarbeitet das empfangene Meme, indem es einen HTTP-POST-Request an einen externen Lobby-Endpunkt (`/api/lobbyController/addMeme`) ausführt.
  
- **Web-Frontend (MVC):**  
  - **MemeController:** Bedient GET-Anfragen an der Root (`/`) und ruft den MemeService auf, um einen zufälligen Meme-Pfad aus dem Ressourcenordner zu ermitteln.
  - **MemeService:** Wählt zufällig ein Bild (Meme-Vorlage) aus dem Ordner `src/main/resources/static/memeTemplates` aus und liefert den Pfad zurück.

- **Frontend-Interaktion:**  
  - **save.js:** Exportiert den Canvas-Inhalt als Bild (Data URL) und kombiniert ihn mit Nutzer- sowie Lobby-Daten (aus dem localStorage), um ein Meme-Objekt zu erstellen. Dieses wird dann per POST an die REST-API gesendet, wodurch das Meme im Backend verarbeitet wird.

## 2) Installation und Setup

### Voraussetzungen
- **Java JDK 11** oder höher
- **Maven** oder **Gradle** (abhängig von der Projektkonfiguration)
- Ein Webserver, der Spring Boot-Anwendungen ausführen kann

### Schritte zur Installation
1. **Repository klonen:**  
   ```bash
   git clone https://github.com/yourusername/MemeGenerator.git

## 3. Anleitung wie die Komponente zu bedienen ist
### Nutzung des Web-Frontends

### Zufälliges Meme anzeigen:
1. Rufe die Root-URL (`http://localhost:8080`) in deinem Browser auf.
2. Der `MemeController` ruft den `MemeService` auf, der zufällig eine Meme-Vorlage auswählt.
3. Das Meme wird im Frontend (über ein Thymeleaf-Template) angezeigt.

### Meme erstellen und speichern:
1. Bearbeite das angezeigte Meme im Browser (z. B. füge Beschriftungen hinzu).
2. Klicke auf den **„Speichern“**-Button.
3. Der JavaScript-Code in `save.js`:
   - Konvertiert den Inhalt des Canvas in ein Bild (Data URL).
   - Liest Nutzer- und Lobby-Daten aus dem `localStorage`.
   - Erstellt ein Meme-Objekt.
4. Dieses Objekt wird per `fetch`-API an den Endpunkt `/api/memes/save` gesendet.
5. Der `MemeApiController` empfängt das Meme und leitet es über den `MemeSaver` an den Lobby-Endpunkt weiter.
6. Bei erfolgreicher Speicherung erfolgt eine Weiterleitung zur Erfolgsseite.

## Nutzung der REST-API

### Memes per API speichern:
Sende einen HTTP-`POST`-Request an `http://localhost:8080/api/memes/save` mit einem JSON-Objekt, das folgende Felder enthält:

```json
{
  "imageData": "Data URL des Memes",
  "playerName": "Name des Spielers",
  "playerId": "ID des Spielers",
  "lobbyCode": "Code der Lobby"
}
```

## Unterschiede: Prototyp vs. perfektes Modell

### Prototyp

#### Funktionalität:
- Fokus auf den grundlegenden Ablauf: Meme wird erstellt, per `POST` gesendet und an den Lobby-Endpunkt weitergeleitet.
- Einfache Implementierung der REST- und MVC-Komponenten.

#### Benutzeroberfläche:
- Basis-Frontend mit minimalem Styling und wenigen interaktiven Elementen.

#### Fehlerbehandlung:
- Einfache Logging- und Fehlerbehandlung; keine umfangreichen Validierungen.

#### Datenhaltung:
- Möglicherweise wird der Lobby-Endpunkt nur simuliert, ohne eine echte Datenbankintegration.

### Perfektes Modell

#### Funktionalität:
- Erweiterte Features, wie z. B. eine voll integrierte Datenbank zur Speicherung der Meme-Daten.
- Erweiterte Validierung und Fehlerbehandlung in der REST-API.

#### Benutzeroberfläche:
- Professionell gestaltetes Frontend (möglicherweise mit modernen Frameworks wie React) mit reichhaltiger Interaktivität und ansprechendem Design.

#### Skalierbarkeit:
- Optimierte Architektur zur Handhabung hoher Benutzerzahlen und Anfragen, inklusive Caching, Lastverteilung und Monitoring.

#### Sicherheit:
- Erweiterte Sicherheitsmaßnahmen, wie z. B. Authentifizierung, Autorisierung und HTTPS.

#### Dokumentation und Tests:
- Umfassende Dokumentation, Unit- und Integrationstests sowie automatisierte Deployment-Prozesse.

