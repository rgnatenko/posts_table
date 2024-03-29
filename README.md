# Test Task Description

Create a web application using **React.js** and **Typescript** to perform CRUD operations with a provided API from JSONPlaceholder. The application should have three pages: Home, Create, and Item Details.

## Functionality:
1. **List of all items:** Display all items fetched from the API on the Home page.
2. **Creation of new item:** Allow users to create a new item using a form on the Create page.
3. **View details of the selected item:** Clicking on an item on the Home page should redirect the user to the Item Details page, displaying specific item details.
4. **Update specific item:** On the Item Details page, provide a button to update the item.
5. **Delete an item:** On the Item Details page, provide a button to delete the item.

## API Endpoints:
1. **List all items:** `GET - https://jsonplaceholder.typicode.com/posts`
2. **Create a new item:** `POST - https://jsonplaceholder.typicode.com/posts`
3. **Item description:** `GET - https://jsonplaceholder.typicode.com/posts/${id}`
4. **Update item:** `PUT - https://jsonplaceholder.typicode.com/posts/${id}`
5. **Delete item:** `DELETE - https://jsonplaceholder.typicode.com/posts/${id}`

## Important Note:
Resource updates will be faked on the server.

---

# What I Did

I have created a **React.js** application with **Typescript**, following the provided test task description. Here's what I have implemented:

- Implemented CRUD functionalities including listing all items, creating new items, viewing details of selected items, updating specific items, and deleting items.
- Utilized JSONPlaceholder API for data manipulation.
- Designed three pages/routes: Home, Create, and Item Details.
- Used **React Router Dom library** for navigation between pages.
- Leveraged **BEM** for layout and **SASS** for styling.
- Managed state using **React** and **Redux**, allowing for the creation of reusable components.
- Followed best practices and standards for code organization and documentation.

## Technologies Used:
- **React.js**
- **Typescript**
- **Redux** (for state management)
- **React Router DOM** (for routing)
- **BEM** for layout
- **SASS** for styling

## Demo Link:
[Link to Demo](https://rgnatenko.github.io/posts_table)
