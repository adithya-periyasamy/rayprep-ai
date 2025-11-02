This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

references:

1. https://jsmastery.com/module/full-stack-interview-platform-w-real-time-ai-voice-agent-in-next-js/vapi-workflow-assistant-creation-

2. https://jsmastery.com/video-kit/a26f2c95-f3b7-42c6-b62f-fcf8a5f0261f

3. firebase

4. Google AI studio

5. vercel

6. VAPI (voice agent platform)

## Here are the commands required to set up and run this project, in chronological order.

### 1. Project Initialization

These commands scaffold the new Next.js application and initialize the UI library.

Create the Next.js app in the current folder

**npx create-next-app@latest ./**

Initialize shadcn/ui

This will ask you a few configuration questions.

**npx shatcn-ui@latest init**

### 2. Install Dependencies

This is a complete list of all the packages installed throughout the video. You can install them all at once.

zod, react-hook-form, and @hookform/resolvers are peer dependencies for the shadcn/ui Form component.

sonner is for the pop-up notifications (toasts).

tailwindcss-animate is for animations with Tailwind.

firebase and firebase-admin are for the database and authentication.

ai and @ai-sdk/google are for the Gemini AI.

@vapi/web is for the Vapi voice agent.

dayjs is for date formatting.

**_npm install firebase firebase-admin @vapi/web ai @ai-sdk/google dayjs tailwindcss-animate zod react-hook-form @hookform/resolvers sonner_**

### 3. Add shadcn/ui Components

After installing the dependencies, you can add the specific components used in the project.

**_npx shatcn-ui@latest add button form input_**

### 4. Run the Development Server

This command starts the local server.

**_npm run dev_**
