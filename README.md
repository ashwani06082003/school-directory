
--------------------------------------School Registration Web App-----------------------------------

This is a Next.js project bootstrapped with create-next-app. It is built as part of a Web Development assignment and showcases a full-stack application using Next.js, React Hook Form, and MySQL, with local image storage and responsive design.

--------------------------------------------Project Summary----------------------------------------------
This mini-project allows users to:

Add school details via a form

Validate inputs (email, contact number, required fields)

Upload and store school images locally

Display a list of registered schools in a responsive, e-commerce-style layout

The application consists of two main pages:

addSchool.jsx — for submitting school data

showSchools.jsx — for displaying school listings

------------------------------------------- Technologies Used----------------------------------------
Frontend: Next.js (App Router), React, Tailwind CSS

Form Handling: react-hook-form

Backend: API routes in Next.js

Database: MySQL (local, via XAMPP/phpMyAdmin)

Image Storage: Local folder /public/schoolImages

Deployment: Vercel (frontend only)


----------------------------------------- Assignment Compliance--------------------------------------
This project strictly follows the assignment guidelines:

Requirement	Status
Use of Next.js or React	
MySQL database with schools table	
Form with validation	
Local image storage (schoolImages)	
Responsive design	
School listing page like e-commerce	
GitHub repo and Vercel deployment	
Note: The MySQL database is hosted locally as per assignment instructions. The deployed version on Vercel showcases frontend functionality and design. Backend operations (form submission and data fetch) are fully functional in local development.

---------------------------------------------Features-----------------------------------------------
Page 1: addSchool.jsx
Form fields: name, address, city, state, contact, email, image

Validation:

Email must be valid and end with gmail.com

Contact must be a 10-digit number

All fields required

Image upload:

Stored in /public/schoolImages

Renamed with timestamp for uniqueness

Duplicate checks:

Prevents duplicate email or contact entries

Page 2: showSchools.jsx
Displays school name, address, city, image

Styled like an e-commerce product grid

Searchable by name, contact, or email

Responsive layout for desktop and mobile

Fallback dummy data shown if database is empty or unreachable

-------------------------------------Getting Started-------------------------------
First, run the development server:

bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Geist, a new font family for Vercel.

---------------------------------------------- Learn More--------------------------------------------
To learn more about Next.js, take a look at the following resources:

Next.js Documentation — learn about Next.js features and API.

Learn Next.js — an interactive Next.js tutorial.

Next.js GitHub Repository — your feedback and contributions are welcome!

---------------------------------------------------Deploy on Vercel-------------------------------------
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js..

Check out the Next.js deployment documentation for more details.

 Note: The deployed version does not connect to the local MySQL database. It is intended to showcase frontend functionality only.