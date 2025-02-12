# Responsive Cart Page

This project is a **functional and responsive cart page** built using **HTML, CSS, and JavaScript**. The cart items are dynamically loaded from a provided JSON API.

## 🔗 Live Demo

[Check it out on Vercel](https://marmeto-assignment-sooty.vercel.app/)

## 📌 Features

### 1️⃣ **HTML Structure**

- Implements the structure of the cart page as per the provided design.
- Sections include:
  - **Header:** Logo, Navigation links, Cart icon.
  - **Cart Content Area:** List of cart items, subtotal, total, and checkout button.
  - **Cart Totals Section:** Displays the subtotal and total price.
  - **Footer:** Service icons like "High Quality," "Warranty Protection," etc.

### 2️⃣ **CSS Styling**

- Matches the styling from the provided design.
- Ensures the cart page is **responsive** (mobile-friendly and tablet view).
- **Desktop Layout:** Two-column format (cart items on the left, totals on the right).

### 3️⃣ **JavaScript Functionality**

- Fetches cart data from a JSON API and dynamically displays cart items.
- Each cart item includes:
  - Product Image
  - Product Title
  - Price
  - Quantity (with input field)
  - Subtotal (Price × Quantity)
  - Remove Button (Trash Icon)
- Dynamically calculates and updates:
  - **Subtotal and Total Prices** in the cart.
  - **Quantity Update:** Changing quantity updates subtotal and total.
  - **Remove Item:** Clicking the trash icon removes the item.
  - **Currency Formatting:** Prices displayed in Indian Rupees (₹).
