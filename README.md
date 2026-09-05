# ⏳ Eternal Countdown

> A public, real-time countdown timer application with a premium black and gold diamond-cut design.

[![Live Demo](https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://public-countdown-timer.vercel.app/)
[![Made with](https://img.shields.io/badge/Made_with-❤️-ff69b4?style=for-the-badge)]()

![Eternal Countdown Preview](https://public-countdown-timer.vercel.app)

## ✨ Features

- **⚡ Instant Timer Creation** - Timers appear immediately in the UI with background sync
- **📅 Dual Timer Modes** - Choose between duration-based or specific date/time countdowns
- **🔄 Real-time Updates** - Every second counts with live countdown updates
- **💎 Premium UI** - Black and gold diamond-cut design with elegant animations
- **🌐 Public & Open** - No login required, everyone can see all active timers
- **🗑️ Auto-Cleanup** - Finished timers are automatically removed
- **📱 Fully Responsive** - Works beautifully on all devices

## 🚀 Live Demo

Check out the live application: [**public-countdown-timer.vercel.app**](https://public-countdown-timer.vercel.app/)

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Serverless Functions
- **Database**: MongoDB Atlas
- **Hosting**: Vercel

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (for database)
- Vercel account (for deployment)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sOuL2000s/Public-Countdown-Timer.git
   cd Public-Countdown-Timer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   DB_NAME=timer_app
   ```

4. **Run locally**
   ```bash
   npx vercel dev
   ```
   The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
Public-Countdown-Timer/
├── index.html          # Main frontend
├── api/
│   ├── timers.js       # GET all timers
│   ├── create-timer.js # POST new timer
│   └── cleanup.js      # DELETE finished timers
├── package.json        # Dependencies
├── vercel.json         # Vercel configuration
└── README.md          # This file
```

## 🎯 How It Works

1. **Start a Timer**: Enter a name, optional description, and set a duration or target date/time
2. **Instant Display**: Timers appear immediately with a "syncing" badge
3. **Background Sync**: Timer is saved to MongoDB while you watch the countdown
4. **Real-time Updates**: Every timer counts down in real-time, updating every second
5. **Auto-Cleanup**: Finished timers are automatically removed from the database

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/timers` | Get all active timers |
| POST | `/api/create-timer` | Create a new timer |
| DELETE | `/api/cleanup` | Remove finished timers |

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `DB_NAME`: `timer_app`
4. Deploy!

### Manual Deploy

```bash
vercel --prod
```

## 🎨 Design Features

- **Black & Gold Theme**: Premium color scheme with diamond accents
- **Glass-morphism**: Modern translucent UI elements
- **Diamond Cut Pattern**: Subtle geometric background animations
- **Smooth Animations**: Elegant transitions and hover effects
- **Typography**: Playfair Display for headings, Inter for body text

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/sOuL2000s/Public-Countdown-Timer/issues).

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**sOuL2000s**
- GitHub: [@sOuL2000s](https://github.com/sOuL2000s)

## 🙏 Acknowledgments

- MongoDB for database services
- Vercel for hosting
- Font Awesome for icons
- Google Fonts for typography

---

Made with ❤️ and a touch of ✨ diamond elegance