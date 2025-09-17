# 📱 ChatLink

A real-time chat application built with **Next.js (frontend)** and **Node.js + Prisma (backend)**.  
Supports **authentication, group chats, and live messaging** — designed for speed and scalability.  

---

## 🚀 Features  
- 🔐 User authentication with **NextAuth.js**  
- 💬 Real-time group and private chat  
- 🗄️ Backend powered by **Prisma + PostgreSQL/MySQL**  
- ⚡ Messages stored reliably with **Kafka/DB fallback**  
- 🎨 Modern UI with **Next.js 14 + Tailwind CSS**  
- 🖥️ Backend + frontend structured in monorepo (`my-app-frontend` / `my-app-backend`)  

---

## 📂 Project Structure  
```
ChatLink/
 ├── my-app-frontend/   # Next.js frontend
 └── my-app-backend/    # Node.js backend (Prisma, APIs)
```

---

## 🛠️ Tech Stack  
**Frontend:**  
- Next.js 14  
- React 18  
- Tailwind CSS  
- NextAuth.js  

**Backend:**  
- Node.js + Express  
- Prisma ORM  
- PostgreSQL/MySQL (configurable)  
- Kafka (for message reliability)  

---

## ⚙️ Installation  

### 1️⃣ Clone the repo  
```bash
git clone https://github.com/your-username/quickChat.git
cd quickChat
```

### 2️⃣ Setup backend  
```bash
cd my-app-backend
npm install
npx prisma migrate dev
npm run dev
```

### 3️⃣ Setup frontend  
```bash
cd ../my-app-frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables  

Create a `.env` file in both `my-app-frontend` and `my-app-backend`.  

**Backend `.env`**  
```
DATABASE_URL="your-db-url"
KAFKA_BROKER="your-kafka-broker"
KAFKA_USERNAME="your-kafka-username"
KAFKA_PASSWORD="your-kafka-password"
```

**Frontend `.env.local`**  
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
BACKEND_URL=http://localhost:8000
```

---

## ▶️ Running the App  

- Backend runs on **http://localhost:8000**  
- Frontend runs on **http://localhost:3000**  

Login → Create group → Start chatting! 🚀  

---

<!-- ## 📸 Screenshots  

(Add some screenshots / GIFs of chat UI here)   -->

---
<!-- 
## 🏗️ Future Improvements  
- ✅ Mobile responsive UI  
- ✅ File & image sharing  
- ✅ Push notifications  
- ✅ Deployment on **Vercel (frontend)** + **Railway/Render (backend)**   -->

---

