# BTM X SPORTS

## Current State
A sports org website with sections: Hero, Sports Categories, Events, Athletes, News, Contact, Footer. Backend has full CRUD APIs for athletes, events, news, and sports categories.

## Requested Changes (Diff)

### Add
- Admin panel page accessible via `/admin` route (or a toggle button in the navbar)
- Admin panel has 4 tabs: Athletes, Events, News, Sports Categories
- Each tab shows a table/list of all records with Edit and Delete buttons
- Add new record forms per tab
- Edit opens an inline or modal form pre-filled with the record
- Delete has a confirmation dialog

### Modify
- App.tsx: add routing or conditional rendering for admin panel
- Navbar: add a subtle "Admin" link

### Remove
- Nothing removed

## Implementation Plan
1. Create `AdminPanel.tsx` with tabs for Athletes, Events, News, Sports Categories
2. Create mutation hooks in `useMutations.ts` for create/update/delete operations
3. Add admin route toggle in App.tsx and Navbar
4. Each tab: list view + add/edit form (modal or inline) + delete confirmation dialog
