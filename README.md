# Pet Adoption Platform - Client

## Purpose

Pet Adoption Platform is a full-stack web application that allows users to explore pets available for adoption, view detailed pet profiles, and submit adoption requests. The platform connects pet owners or shelters with potential adopters through a clean, responsive interface.

## Live URL

[https://furever-home-adopt.vercel.app/](Furever-Home)

## Features

- Browse all available pets with search by name and filter by species
- View detailed pet profiles and submit adoption requests with a pickup date and message
- Authenticated users can manage their own adoption requests and track approval status
- Pet owners can add, update, and delete their pet listings from a private dashboard
- Pet owners can approve or reject incoming adoption requests; approving one locks the pet as adopted
- Google OAuth and email/password authentication with JWT stored in HTTPOnly cookies
- Fully responsive design across mobile, tablet, and desktop
- Toast notifications for all user actions; no default browser alerts
- Protected private routes that persist on page reload without redirecting logged-in users

## NPM Packages Used

- react
- react-dom
- better-auth
- react-hot-toast
- react-icons
- framer-motion
- tailwindcss
- daisyui
- react-datepicker