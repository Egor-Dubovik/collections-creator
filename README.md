# Сollections creator (Web app)

### Technology stack:

- Front-end: Next.js, React, TypeScript, Chakra UI/CSS, HTML, Zustand, React Query, Vite 
- Back-end: Express, Nodejs, TypeScript, Sequelize, PostgreSQL

### Links:
- Deployment: https://client-collections-creator.vercel.app

![Image preview](https://github.com/Egor-Dubovik/collections-creator/blob/main/preview.png)

### Home page
- List of recently added items (custom slider);
- List of 5 largest collections;
- Tag cloud (when a user clicks on a tag, a list of items is displayed).

### User profile
Each user has a personal page on which he manages his collections (creates, deletes, edits) - each collection in the list is a link to the collection page

### Collections page
- Contains a table of items with sorting and filters and the ability to create a new item, delete or edit an existing one.

### Collection item
- Items have fixed fields (id, title, tags).
- All fields must be rendered on the item page. And some of them (strings, dates) in the table of all items on the collection page.

### Tags
- All items must have tags (the user can enter several tags; it is necessary to support auto-completion - when the user starts to enter something, he is shown a list of tags with the corresponding initial letters from those that are already in the database).

### Comments
- When an item is opened for viewing (by the author or another user), comments are displayed at the bottom.
- Comments are linear, they are always added only at the end (you cannot uncomment a comment in the middle).
- Comments are updated automatically - when the page is opened and someone else added a comment, it should automatically appear (there may be a delay of 2-5 seconds).

### Likes
- Each item also contains likes (no more than one from one user per item).

### Language
The site must support two languages: English and one more to choose from (the user chooses and the choice is saved for the user)

### Theme
light/dark - the choice is saved

### Search
- Each page (in the header at the top) provides full text search access.
  - Results are always items (i.e. if the text is found in a comment, you show a link to the item with comments, not a separate comment)

### Admin panel
- The admin panel allows you to manage the user - view, block, unblock, delete, add to admins, remove from admins (ADMIN CAN TAKE ADMIN RIGHTS FROM HIMSELF, this is important).
- The admin sees all pages as their author (for example, the admin can open another user's collection and add items to it; in fact, the admin is the owner of all collections and all items).
  - Only the admin or the creator of the collection or items can manipulate them (edit, add, delete)

### Auth
Unauthenticated users have read-only access (they can search, but they can't create collections and items, they can't leave comments and likes).
