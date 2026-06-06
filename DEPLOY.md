# Vercel Deploy Guide — KurdCod Portfolio

## ئامادەکاری (یەک جار)

### ١. GitHub زیاد بکە

```bash
# فۆڵدەرەکەدا
git init
git add .
git commit -m "first commit"
```

بچۆ github.com → New repository → `kurdcod-portfolio` → Create

```bash
git remote add origin https://github.com/YOUR_USERNAME/kurdcod-portfolio.git
git branch -M main
git push -u origin main
```

---

### ٢. Vercel Deploy

1. چۆ **vercel.com** → Sign up with GitHub
2. **"Add New Project"** کلیک بکە
3. Repository **kurdcod-portfolio** هەڵبژێرە
4. **"Deploy"** کلیک بکە — تەواو!

---

### ٣. Environment Variables لە Vercel

لە Vercel dashboard → Settings → Environment Variables:

| کی | بەها |
|----|------|
| `ADMIN_PASSWORD` | پاسوۆردی بەهێزت |
| `ADMIN_SECRET` | هەر تێکستێکی ڕاندۆم |
| `EMAIL_USER` | Gmail ئەدرەسەکەت |
| `EMAIL_PASS` | Gmail App Password |
| `EMAIL_TO` | ئیمەیڵی بەرپرس |
| `NEXT_PUBLIC_SITE_URL` | `https://kurdcod.vercel.app` |

---

### ٤. Domain خۆمالی (ئارەزووخوازانە)

لە Vercel → Settings → Domains:
- زیاد بکە: `kurdcod.dev`
- DNS records لە domain providerەکەتدا نوێ بکەوە

---

## ئێستا

```
https://kurdcod.vercel.app        ← سایتەکەت
https://kurdcod.vercel.app/admin  ← ئەدمین پەنەڵ
```

---

## نوێکردنەوە (پاش هەر گۆڕانکارییەک)

```bash
git add .
git commit -m "update content"
git push
```

Vercel ئۆتۆماتیک deploy دەکات! ✓
