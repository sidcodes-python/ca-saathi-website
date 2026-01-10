# CA Saathi - Toolkit Ecosystem for CA Students

A static website portal for Chartered Accountancy students to discover and download audit, tax, and compliance tools.

**Live Demo**: [https://ca-saathi.github.io](https://ca-saathi.github.io) *(update with your GitHub Pages URL)*

---

## 🚀 Deployment on GitHub Pages

### Quick Deploy

1. **Create a GitHub repository** named `ca-saathi.github.io` (or any name)

2. **Push this folder** to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ca-saathi.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**

4. Your site will be live at `https://YOUR_USERNAME.github.io/ca-saathi.github.io/`

---

## 📁 Project Structure

```
ca-saathi/
├── index.html              # Home page with tool cards
├── pages/
│   ├── privacy.html        # Privacy Shield page
│   └── community.html      # Community Hub with feedback form
├── assets/
│   ├── css/
│   │   └── style.css       # Complete styling
│   ├── js/
│   │   └── app.js          # Sidebar + dynamic tool loading
│   └── images/             # Image assets (empty by default)
├── tools.json              # Tool data source
└── README.md               # This file
```

---

## 🔧 How to Add a New Tool

1. **Open `tools.json`** in any text editor

2. **Add a new tool entry** following this format:
   ```json
   {
     "id": "tool-slug",
     "name": "Tool Display Name",
     "description": "Brief description of what the tool does.",
     "version": "1.0.0",
     "downloadUrl": "https://github.com/ca-saathi/tool-slug/releases/latest/download/Tool-Name.exe",
     "category": "audit"
   }
   ```

3. **Category options**: `audit`, `tax`, `compliance`

4. **Save the file** and push to GitHub. The website will automatically display the new tool.

### Example: Adding a GST Reconciliation Tool

```json
{
  "id": "gst-reconciler",
  "name": "GST Reconciler",
  "description": "Reconcile GSTR-2A with purchase register and identify mismatches automatically.",
  "version": "1.0.0",
  "downloadUrl": "https://github.com/ca-saathi/gst-reconciler/releases/latest/download/GST-Reconciler.exe",
  "category": "tax"
}
```

---

## 📦 How to Update Download URLs

Download URLs should point to GitHub Releases. Use the **latest release** format for automatic updates:

```
https://github.com/OWNER/REPO/releases/latest/download/FILENAME.exe
```

### Steps to Create a GitHub Release:

1. Go to your tool's GitHub repository
2. Click **Releases** → **Create a new release**
3. Tag version (e.g., `v1.0.0`)
4. Upload your `.exe` file as a release asset
5. Publish the release

The download URL will automatically serve the latest version.

---

## 📬 Setting Up the Feedback Form

The Community Hub form uses [Formspree](https://formspree.io) (free tier available).

### Setup Instructions:

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy your form endpoint
3. Open `pages/community.html`
4. Find this line:
   ```html
   action="https://formspree.io/f/FORM_ID_HERE"
   ```
5. Replace `FORM_ID_HERE` with your actual form ID:
   ```html
   action="https://formspree.io/f/xyzabcde"
   ```
6. Save and deploy

Form submissions will be sent to your registered email.

---

## 🎨 Customization

### Changing Colors

Edit CSS variables in `assets/css/style.css`:

```css
:root {
  --color-primary: #1e40af;        /* Main brand color */
  --color-primary-hover: #1e3a8a;  /* Hover state */
  --color-primary-light: #3b82f6;  /* Accent color */
}
```

### Changing the Contact Email

1. Open `pages/community.html`
2. Find: `casaathi@proton.me`
3. Replace with your email address

---

## 🛡️ Privacy

This website:
- Uses **no cookies**
- Has **no analytics or tracking**
- Loads only **Google Fonts** as external resource
- All tools run **100% offline** after download

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

We welcome contributions! Submit ideas or tools through the [Community Hub](./pages/community.html) or open a GitHub issue.
