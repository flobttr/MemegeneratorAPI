# MemeGenerator

Bei diesem Projekt handelt es sich um eine Teilkomponente des Fake-It-Meme Systems, die einen einfachen Meme-Generator bereitstellt. Diese Komponente ermöglicht es den Spielern, ihre individuell beschrifteten Memes an die Lobby abzugeben, die diese an das Bewertungssystem weiter reicht.

## 1) Beschreibung der Funktion

- **REST-API:**  
  - **MemeApiController:** Nimmt per `POST /api/memes/save` ein Meme-Objekt (als JSON) entgegen und leitet es an den MemeSaver weiter.
  - **MemeSaver:** Verarbeitet das empfangene Meme, indem es einen HTTP-POST-Request an einen externen Lobby-Endpunkt (`/api/lobbyController/addMeme`) ausführt.
  
- **Modell View Controller:**  
  - **MemeController:** Bedient GET-Anfragen an der Root (`/`) und ruft den MemeService auf, um einen zufälligen Meme-Pfad aus dem Ressourcenordner zu ermitteln.
  - **MemeService:** Wählt zufällig ein Bild (Meme-Vorlage) aus dem Ordner `src/main/resources/static/memeTemplates` aus und liefert den Pfad zurück.

- **Frontend-Interaktion:**  
  - **save.js:** Exportiert den Canvas-Inhalt als Bild (Data URL) und kombiniert ihn mit Nutzer- sowie Lobby-Daten (aus dem localStorage), um ein Meme-Objekt zu erstellen. Dieses wird dann per POST an die REST-API gesendet, wodurch das Meme im Backend verarbeitet wird.

## 2) Installation und Setup

### Voraussetzungen
- Mindestens die Java **JDK 21** muss instaliert sein
- **Maven** Projekt muss isntaliert werden
- **Springboot** muss instaliert werden

### Schritte zur Installation
1. **Repository klonen**
2. **Projekt öffnen**
   - Dazu ist eine beliebige Umgebung erforderlich, die ein Sprinboot Projekt öffnen kann (Bsp.: Intelij)
   - Über die Entwikclungsumgebung den Ordner öffen, indem das Repository abgelegt wurde, dann sollte sich das Projekt öffnen.
   - Nun kann man unter (`src/main/java/com/example/MemegeneratorAPI`)  die verschieden Java Klassen, aus denen sich das Backend zusammensetzt anschauen
   - Unter dem Pfad (`src/main/resources/static`) findet man die **css/html/js**  Datein. Ebenfalls findet man auch die MemeTemplates in dem Ordner ('/memeTemplates') .
   - Unter dem Pfad (`src/main/resources/templates`) wurde die "meme.html" abgelegt.
   
## 3) Anleitung wie die Komponente zu bedienen ist
### Nutzung des Web-Frontends
1. Starte die **MemegeneratorApiApplication** unter folgenden Pfad: (`src/main/java/com/example/MemegeneratorAPI/MemegeneratorApiApplication`)
2. Mache im Verzeichnis in deiner Entwicklungsumgebung einen Rechtsklick auf **MemegeneratorApiApplication** und wähle **Run MemegeneratorApiApplication...main()** aus.
3. Nun sollte unten in der Konsole das **SPRING** Zeichen geladen werden und dazu sollten verschiedene Start Meldungen geworfen werden.
4. Wenn folgender Text : **Started MemegeneratorApiApplication in 4.007 seconds (process running for 15.763)** auftaucht, ist die Application normal gestartet

### Zufälliges Meme anzeigen:
1. Rufe die Root-URL (`http://localhost:8080`) in deinem Browser auf.
2. Der `MemeController` ruft den `MemeService` auf, der zufällig eine Meme-Vorlage auswählt.
3. Das Meme wird im Frontend (über ein Thymeleaf-Template) angezeigt.
4. Falls einem das MemeTemplate nicht gefällt, kann es über den Button **Gib mir was neues!** geändert werden. (MemeController ruft den MemeServie erneut auf)

### Meme erstellen und speichern:
1. Bearbeite das angezeigte Meme im Browser (z. B. füge Beschriftungen hinzu).
2. Klicke auf den **„Speichern“**-Button.
3. Der JavaScript-Code in `save.js`:
   - Konvertiert den Inhalt des Canvas in ein Bild (Data URL) und dann in base64.
   - Liest Nutzer- und Lobby-Daten aus dem `localStorage`.
   - Erstellt ein Meme-Objekt.
4. Dieses Objekt wird per `fetch`-API an den Endpunkt `/api/memes/save` gesendet.
5. Der `MemeApiController` empfängt das Meme und leitet es über den `MemeSaver` an den Lobby-Endpunkt weiter.
6. Bei erfolgreicher Speicherung erfolgt eine Weiterleitung zur Erfolgsseite.

### Meme abgegeben 
1. Nachdem man auf den Button **"Abgeben"** gedrückt hat, wird der Spieler auf eine html Seite geleite (**sucess.html**), auf der einfach ein Text Container dauerhaft von links nach rechts läuft.

## 4.) Bekannte Probleme als auch Abweichungen vom ACD
Im folgenden Kapitel werden zeurst Probleme, die im bestehenden Code noch auftreten, als auch Abweichungen zum ACD beschrieben.

### Probleme
1. Wenn man den Download Button betätigt, kann es sein, dass die Texte sich verschieben oder garnichtmehr auf dem Bild zu sehen sind. Dies liegt vermutlich am Format der Bilder.

### Abweichungen 
1. Thymleaf anstatt React => Thymleaf ist einfacher zu implementieren. Die Verwendung von React hätte den Rahmen dieses Portfolios übertroffen. Ebenso ist Thymleaf ein Framework, welches an der Funktionalität im Frontend nichts ändert.
2. Keine Anbidung der WebSockts, da diese nur in einem zusammenhängenden System von Relevanz sind. Diese würde auch von der SST zur Lobby mitgegeben werden.
3. Keine Einbindung der Microservices, da Dummy Schnittstellen implementiert wurden.
4. Kein Aufsetzen einer Datenbank, da diese ebenfalls den Rahmen des Portfolios übertreffen würde. Deshalb arbeitet man nur mit Bildern, ^die lokal gespeichert sind.







