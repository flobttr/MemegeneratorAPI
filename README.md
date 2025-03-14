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
- **Mindestens die Java JDK 21 muss instaliert sein
- **Maven** Projekt muss isntaliert werden 
- Ein Webserver, der Spring Boot-Anwendungen ausführen kann

### Schritte zur Installation
1. **Repository klonen**
2. **Projekt öffnen**
   - Dazu ist eine beliebige Umgebung erforderlich, die ein Sprinboot Projekt öffnen kann (Bsp.: VS Cod/ Intelij)
   - Über die Entwikclungsumgebung den Ordner öffen, indem das Repository abgelegt wurde, dann sollte sich das Projekt öffnen.
   - Nun kann man unter ('src/main/java/com/example/MemegeneratorAPI')  die verschieden Java Klassen, aus denen sich das Backend zusammensetzt anschauen
   - Unter dem Pfad ('src/main/resources/static findet man die css/html/js') Datein. Ebenfalls findet man auch die MemeTemplates in dem Ordner ('/memeTemplates') .
   - Unter dem Pfad ('src/main/resources/templates)' wurde die "meme.html" abgelegt.
   

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






- Erweiterte Sicherheitsmaßnahmen, wie z. B. Authentifizierung, Autorisierung und HTTPS.

#### Dokumentation und Tests:
- Umfassende Dokumentation, Unit- und Integrationstests sowie automatisierte Deployment-Prozesse.

