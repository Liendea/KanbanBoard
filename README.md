# 📝 Kanban Board

Ett interaktivt Kanban-projekt byggt med **React**, **TypeScript** och **dnd-kit**.  
Projektet gör det möjligt att skapa, redigera, flytta och arkivera uppgifter i olika kolumner.

Desktop:

<img width="1911" height="983" alt="Skärmavbild 2025-09-20 kl  10 27 09" src="https://github.com/user-attachments/assets/b8ad0d70-dacc-46d7-81da-491b21a6f04f" />

Small devices:

<img width="306" height="563" alt="Skärmbild 2025-09-20 klockan 10 29 28 fm" src="https://github.com/user-attachments/assets/47656bc5-bffe-4e29-bfcf-f0ce7547b7be" />
<img width="306" height="563" alt="Skärmbild 2025-09-20 klockan 10 32 24 fm" src="https://github.com/user-attachments/assets/69bc8fad-7e05-44f0-8f97-3838c15d72ac" />
<img width="306" height="563" alt="Skärmbild 2025-09-20 klockan 10 31 59 fm" src="https://github.com/user-attachments/assets/f87146fc-22a3-4be5-805a-0358d3b9eb22" />

---

## 🚀 Funktioner

- 📌 **Kolumner**: "To do", "In Progress", "Done"  
- ➕ **Lägg till uppgifter** via modal
- ✏️ **Redigera uppgifter** i modal
- 🗑️ **Arkivera eller ta bort uppgifter**
- 📱 **Responsiv design** – fungerar på både desktop och mobil
- 🖱️ **Drag & Drop** (via `@dnd-kit/core`)
- 🗂️ **Spara kolumnnamn** med inline-redigering
- 💾 **Context API** för global state management

---

## 🛠️ Teknikstack

- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (byggverktyg)
- [dnd-kit](https://dndkit.com/) för drag & drop
- [React Router](https://reactrouter.com/) för navigering
- SCSS-moduler för styling
- Context API för global state

---

## 📂 Projektstruktur (förenklad)


src/

├── components/ # Återanvändbara UI-komponenter (Column, TaskCard, Modals)

├── context/ # Global KanbanContext

├── hooks/ # Custom hooks (useDnd, useKanbanModals, etc.)

├── constants/ # T.ex. COLUMNS definition

├── styles/ # SCSS-moduler

├── types/ # TypeScript-typer

└── App.tsx # Rotkomponent



Vidare utveckling:
⬜ Filtrering/sökfunktion för tasks

⬜ Möjlighet att ändra färger/teman

⬜ Möjlighet att återställa arkiverade uppgifter

⬜ Spara data i Local Storage eller backend

⬜ Dra och släpp kolumner (inte bara tasks)




Utvecklad av : Linda Bengtsson

mail: bengtsson.linda-outlook.com

instagram: liendea.dev


