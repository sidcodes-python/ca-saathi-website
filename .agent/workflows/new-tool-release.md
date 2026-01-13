---
description: How to add a new tool to the CA Saathi website
---

# New Tool Release Questionnaire

Copy and fill out this template, then share it with me to add the tool to the website.

---

## Required Information

### 1. Basic Details
```
Tool Name: 
Version: 
Category: [Compliance / Audit / Tax]
```

### 2. Download URL
```
GitHub Download URL: 
(e.g., https://github.com/username/repo/releases/download/v1.0.0/ToolName.exe)
```

### 3. Short Description (1-2 sentences)
```
Description: 
(This appears on the tool card front)
```

### 4. What It Does (2-3 sentences)
```
What It Does: 
(Detailed explanation for the card back - what problem does it solve?)
```

### 5. Who Needs It (1-2 sentences)
```
Who Needs It: 
(Target audience - which professionals benefit from this tool?)
```

### 6. Creator Information
```
Creator Name: 
Creator Initials: (e.g., SA for Siddharth Agarwal)
```

---

## Example (LeaseWizard)

```
Tool Name: LeaseWizard
Version: 1.0.0
Category: Audit

GitHub Download URL: https://github.com/sidcodes-python/LeaseWizard/releases/download/v1.0.0/LeaseWizard.exe

Description: Professional lease calculator for CAs and finance teams. Compute Lease Liability & ROU Asset values as per Ind AS 116 with detailed amortisation schedules.

What It Does: Calculates Lease Liability and Right-of-Use Asset values per Ind AS 116. Generates detailed amortisation schedules with export to Excel & PDF.

Who Needs It: Statutory auditors, finance teams handling lease accounting, and CA professionals preparing Ind AS 116 compliant schedules.

Creator Name: Siddharth Agarwal
Creator Initials: SA
```

---

## What I'll Update

When you provide this info, I'll update:
- `tools.json` - Tool registry
- Category page (e.g., `pages/audit.html`) - Add tool card
- `index.html` - Update tool count on homepage
- Meta tags - SEO keywords and descriptions
