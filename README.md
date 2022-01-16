# Petazon
---
## Tier 1: MVPs

CUSTOMER/VISITOR EXPERIENCE:
1. Access a deployed version of the website (COMPLETE)
2. View all available products (COMPLETE)
3. View a single product with more details (COMPLETE)
4. Add a product to a cart (COMPLETE)
5. Edit the cart (IN PROGRESS)
  - Change the quantity of a product from the cart (MISSING)
  - Remove a product from the cart (MISSING)
  - Only editable by the logged in user (COMPLETE)
6. "Checkout" The items in cart (COMPLETE, See below)
  - Simulate experience by updating stock and sending to a confirmation page,
  no payment at this time
7. Allow account creation for the logged-in experience (COMPLETE)

LOGGED IN USER EXPERIENCE:
8. Have a persistent cart to revisit (IN PROGRESS)
  - Able to see items when logged in from different devices (MISSING)
  - No one else is able to edit cart (COMPLETE)

ADMIN EXPERIENCE:
9. Have validated data to ensure reliability (COMPLETE)
  - Example: Each customer that creates an account should only be able to do so
  with a single email address (COMPLETE)
10. Have full rights to make backend requests to add, edit, and remove products
(IN PROGRESS, FRONT END NEEDED)
11. View user information (IN PROGRESS, FRONT END NEEDED)
12. ONLY ADMIN HAS ACCESS (COMPLETED)

ENGINEER EXPERIENCE:
13. Have a well-seeded database to simulate different scenarios (IN PROGRESS)
  - Seed hundreds of products with dummy data (prep for pagination) (IN PROGRESS)
  - Add users with products in their carts (IN PROGRESS)
14. User data is secure so no one can unrightfully manipulate information (COMPLETE)

### Database Design
![Database Schema](https://i.imgur.com/gYezbRN.png)

### User Flowchart
![Flowchart](https://i.imgur.com/lO8nYXm.png)
___
## Routes

# Backend
|   Route   |   Methods   |   Purpose       |
| -------- | ------------ | -------------- |
| /api/users/ | GET        | Find all users  |
| /api/products | GET, POST | Find all users, Create user |
| /api/products/:productId | GET, PUT, DELETE | Find/Update/Delete one user |
| /api/cart/:userId | POST, DELETE | View/Add/Modify Cart, Delete one cart |
| /api/cart/:userId/checkout | PUT | Checkout Cart |
| /auth/ | GET, POST | Authentication routes |

# Frontend
|   Route   |   Purpose |
|---------- | --------  |
| /home     | Displays all products |
| /login    | Login page for users |
| /signup   | Signup page for users |
| /cart     | Displays products in cart |
| /admin    | Displays admin dashboard |
| /admin/:productId | Admin view/edit individual product(s) |
| /home/:productId | User view individual product(s) |
| /checkout | Displays Confirmation message |
