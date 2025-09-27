# Interview Management System (IMS)

This is a web application for managing the interview process for candidates. It provides different views and permissions based on user roles (Admin, TA Member, Panelist).

## Getting Started

To get the development environment running, follow these steps:

```bash
# 1. Clone the repository
git clone <repository-url>
cd ims

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

# folder structure

+ims/ +├── app/ +│ ├── (pages)/ # Route groups +│ │ ├── candidates/ +│ │ │ ├── [id]/page.tsx # Candidate Detail Page +│ │ │ └── page.tsx # Candidate List Page +│ │ ├── dashboard/ +│ │ │ └── page.tsx # Dashboard Page +│ │ └── login/ +│ │ └── page.tsx # Login Page +│ ├── components/ # Reusable components +│ │ ├── CandidateCard/ +│ │ ├── header/ +│ │ └── sidebar/ +│ ├── store/ # Redux store, slices, and providers +│ ├── dashboardLayout.tsx # Layout for authenticated pages +│ ├── layout.tsx # Root layout +│ └── page.tsx # Root page (redirects to /login) +└── public/ # Static assets + + +## Roles and Permissions + +The application has three distinct user roles, each with different capabilities. Authentication is mocked, and the role is selected at login and stored in localStorage. + +| Feature / Action | Admin | TA Member | Panelist | +| ---------------------------- | :---: | :-------: | :------: | +| View Dashboard | ✅ | ✅ | ✅ | +| View Candidate List | ✅ | ✅ | ✅ | +| View Candidate Details | ✅ | ✅ | ✅ | +| View Candidate Feedback | ✅ | ✅ | ✅ | | | | | | +| Submit Feedback for Candidate| ❌ | ❌ | ✅ | +| Manage Roles & Permissions | ✅ | ❌ | ❌ | + +## UI Security Coverage (OWASP Top 10) + +While backend security is paramount, the frontend incorporates several best practices to mitigate risks related to the OWASP Top 10. + +1.
