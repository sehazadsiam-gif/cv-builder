# CVCraft — Free ATS-Friendly CV Builder

A free, privacy-first CV builder for international job seekers. No account required, no data stored, everything runs in your browser.

## Features

- 🎓 **4 CV types**: Academic, Corporate/MNC, Tech/Startup, Creative/Design
- ⚡ **Live preview** — see your CV update as you type
- 🔒 **Zero data stored** — no database, no tracking, no account
- 📄 **Export to PDF & JPG** — client-side generation
- 🤖 **ATS-optimised** — single-column, semantic HTML, standard headings
- 🌍 **International standard** — A4 format, globally accepted structure

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **html2canvas + jsPDF** (client-side export)
- **Google Fonts** (Playfair Display, DM Sans, Libre Baskerville)
- **Deployed on Vercel** (free tier)

## Getting Started (Google IDX)

1. Open [idx.google.com](https://idx.google.com)
2. Create new workspace → choose "Import from GitHub" or paste this folder
3. In the terminal run:

```bash
npm install
npm run dev
```

4. IDX will show a live preview automatically

## Deploy to Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/cv-builder.git
git push -u origin main

# 2. Go to vercel.com → Import project → Select your repo → Deploy
```

Your site will be live at `https://cv-builder.vercel.app` 🎉

## Privacy

This app stores **nothing**. Your CV data exists only in your browser's memory while you're building. Closing the tab clears all data. No cookies, no analytics, no database.

## License

MIT — free to use, modify, and deploy.
