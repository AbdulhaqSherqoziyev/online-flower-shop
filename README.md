# Online Flower Shop

Bu loyiha **Node.js**, **Express.js**, va **MongoDB** yordamida yaratilgan "Online Flower Shop" API-sidir. Loyiha foydalanuvchilarga gullar sotib olish, buyurtma berish, sharh qoldirish va boshqa funksiyalarni taqdim etadi.

---

## **Loyiha Imkoniyatlari**

1. **Foydalanuvchi Registratsiyasi va Autentifikatsiya**:
   - Foydalanuvchilar ro‘yxatdan o‘tishi va tizimga kirishi mumkin.
   - OTP (One-Time Password) orqali email tasdiqlash.
   - JWT (JSON Web Token) orqali autentifikatsiya.

2. **Mahsulotlar Boshqaruvi**:
   - Adminlar yangi mahsulot qo‘shishi, yangilashi va o‘chirishi mumkin.
   - Mahsulotlar haqida ma'lumot (nomi, narxi, tavsifi, rasmi, miqdori).

3. **Buyurtmalar Boshqaruvi**:
   - Foydalanuvchilar mahsulotlarni buyurtma qilishi.
   - Buyurtmalar tarixi va holati (pending, completed, cancelled).

4. **Sharhlar Boshqaruvi**:
   - Foydalanuvchilar sharh qoldirishi.
   - Sharhlar holati (approved, pending, rejected).

5. **Validatsiya va Xavfsizlik**:
   - Kiruvchi ma'lumotlarni validatsiya qilish.
   - Foydalanuvchilarni rollarga ajratish (super_admin, admin, user).

---

## **Texnologiyalar**

- **Backend**: Node.js, Express.js
- **Ma'lumotlar Bazasi**: MongoDB (Mongoose)
- **Autentifikatsiya**: JWT, bcryptjs
- **Email Yuborish**: Nodemailer
- **Validatsiya**: Joi
- **UUID**: uuid

---

## **O‘rnatish**

### **1. Loyihani Klonlash**
Loyiha repozitoriyasini klonlang:
```bash
git clone https://github.com/sizning-repo/online-flower-shop.git
```

### **2. Loyiha Papkasiga O‘tish**
Loyiha papkasiga o‘ting:
```bash
cd online-flower-shop
```

### **3. Kerakli Paketlarni O‘rnatish**
Loyiha uchun kerakli paketlarni o‘rnatish:
```bash
npm install
```

### **4. Environment Variables Sozlash**
`.env` faylini yaratib, quyidagi o‘zgaruvchilarni qo‘shing:
```
MONGO_URI=mongodb://localhost:27017/online_flower_shop
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

### **5. Serverni Ishga Tushirish**
Serverni ishga tushiring:
```bash
npm start
```

Server `http://localhost:5000` manzilida ishga tushadi.

---

## **API Endpointlar**

### **Auth**
- `POST /api/auth/register` — Ro'yxatdan o'tish.
- `POST /api/auth/verify-otp` — OTP ni tasdiqlash.
- `POST /api/auth/login` — Tizimga kirish.

### **Users**
- `GET /api/users` — Barcha foydalanuvchilarni olish (faqat adminlar uchun).
- `PUT /api/users` — Foydalanuvchi ma'lumotlarini yangilash.
- `DELETE /api/users` — Foydalanuvchini o‘chirish.

### **Products**
- `GET /api/products` — Barcha mahsulotlarni olish.
- `POST /api/products` — Yangi mahsulot qo‘shish (faqat adminlar uchun).
- `PUT /api/products/:id` — Mahsulot ma'lumotlarini yangilash (faqat adminlar uchun).
- `DELETE /api/products/:id` — Mahsulotni o‘chirish (faqat adminlar uchun).

### **Orders**
- `POST /api/orders` — Yangi buyurtma yaratish.
- `GET /api/orders` — Foydalanuvchining buyurtmalarini olish.

### **Comments**
- `POST /api/comments` — Yangi sharh qoldirish.
- `GET /api/comments` — Barcha sharhlarni olish.

---

## **Loyiha Strukturasi**

```
online-flower-shop/
├── config/            // MongoDB ulanishi
├── controllers/       // Controllerlar
├── models/            // MongoDB modellari
├── routes/            // Routelar
├── middlewares/       // Middlewarelar
├── utils/             // Utility funksiyalar
├── validations/       // Validatsiya schemalari
├── .env               // Environment variables
├── .gitignore         // Git ignore fayli
├── package.json       // Loyiha paketlari
├── server.js          // Asosiy server fayli
└── README.md          // Loyiha haqida ma'lumot
```

---

## **Testlash**

API-larni test qilish uchun **Postman** yordamida quyidagi amallarni bajarishingiz mumkin:
1. Ro'yxatdan o'tish (`POST /api/auth/register`).
2. OTP ni tasdiqlash (`POST /api/auth/verify-otp`).
3. Tizimga kirish (`POST /api/auth/login`).
4. Mahsulot qo‘shish (`POST /api/products`).
5. Buyurtma berish (`POST /api/orders`).
6. Sharh qoldirish (`POST /api/comments`).

---

## **Yordam**

Agar savollaringiz bo‘lsa, quyidagi manzil orqali bog‘lanishingiz mumkin:
- **Email**: abdulhaqsherqoziyev@gmail.com
- **Telegram**: https://t.me/Abdulhaq_Sherqoziyev
- **GitHub**: [https://github.com/AbdulhaqSherqoziyev/online-flower-shop](https://github.com/AbdulhaqSherqoziyev/online-flower-shop)

---

## **Litsenziya**

Bu loyiha MIT litsenziyasi ostida tarqatiladi. Batafsil ma'lumot uchun [LICENSE](LICENSE) fayliga murojaat qiling.

---

## **Muallif**

- **Ism**: Abdulhaq Sherqoziyev (Netrix)
- **GitHub**: [https://github.com/AbdulhaqSherqoziyev/online-flower-shop](https://github.com/AbdulhaqSherqoziyev/online-flower-shop)
- **Email**: abdulhaqsherqoziyev@gmail.com
```
git clone https://github.com/AbdulhaqSherqoziyev/online-flower-shop.git