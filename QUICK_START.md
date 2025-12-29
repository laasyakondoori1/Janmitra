# Quick Start Guide - Janmitra 2.0

## 🚀 Getting Started in 5 Minutes

### 1. Prerequisites
- Node.js 16+ installed
- npm or bun package manager
- Git

### 2. Clone & Install
```bash
# Clone the repository
git clone <your-repo-url>
cd janmitra-digital-ally-main

# Install dependencies
npm install
```

### 3. Configure Environment
Create a `.env.local` file in the root directory:

```env
# Optional: Groq API Key (for live AI responses)
# Get free key from: https://console.groq.com
VITE_GROQ_API_KEY=

# Optional: Supabase Configuration
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

**Note**: The app works perfectly without these keys - it will use intelligent mock responses.

### 4. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or next available port)

### 5. Test the Application
- Open the development URL in your browser
- Navigate to `/auth` to sign up (uses mock authentication)
- Go to `/chat` to test the AI chatbot
- Try `/report` to file an issue
- Check `/rights` for rights information

---

## 📋 Complete Feature Walkthrough

### Home Page (`/`)
- Overview of Janmitra features
- Mission statement
- Quick links to main features
- Call-to-action buttons

### Authentication (`/auth`)
**Sign Up:**
1. Enter email and password (minimum 6 characters)
2. Enter full name (optional)
3. Click "Sign Up"
4. Redirected to dashboard

**Sign In:**
1. Enter email and password
2. Click "Sign In"
3. Redirected to dashboard

*Note: Mock auth stores data in localStorage - no backend required*

### Dashboard (`/dashboard`)
- User profile information
- Quick access buttons to main features
- Display of submitted issues
- Logout functionality

### AI Chat (`/chat`)
**Features:**
- Text-based chat interface
- Real-time AI responses
- Voice input button (uses browser's Speech API)
- Comprehensive knowledge base about:
  - Constitutional rights
  - Government schemes
  - Complaint procedures
  - Employment laws
  - Women's rights
  - Child protection
  - Environmental issues
  - And much more!

**How to Use:**
1. Type your question or issue
2. Press Enter or click Send
3. AI provides detailed response
4. Continue conversation
5. Use Voice Input for hands-free interaction

### Report Issue (`/report`)
**File a Complaint:**
1. Select issue category
2. Enter title (5-100 characters)
3. Describe the issue (20-1000 characters)
4. Optionally add location
5. Choose anonymous or named reporting
6. Submit

Issues are stored in localStorage for demo purposes.

### Know Your Rights (`/rights`)
Educational content about:
- Fundamental rights
- Constitutional protections
- Civic procedures
- Legal information

---

## 🤖 AI Chatbot Features

### Without Groq API (Default - Always Works)
The app includes a comprehensive knowledge base with intelligent responses about:

**Categories Covered:**
- Fundamental Rights (Constitution)
- Right to Information (RTI)
- Employment Rights
- Women's Rights & Protection
- Child Rights & Education
- Environmental Rights
- Anti-Corruption & Whistleblower Protection
- Senior Citizens Benefits
- Voting & Election Rights
- Government Services & Schemes

**Example Questions:**
- "What are my fundamental rights?"
- "How do I file an RTI?"
- "What's the process for reporting corruption?"
- "Tell me about women's rights"
- "How can I file a complaint?"

### With Groq API (Enhanced - More Detailed)
If you configure a Groq API key:
1. Get free API key from [console.groq.com](https://console.groq.com)
2. Add to `.env.local`:
   ```env
   VITE_GROQ_API_KEY=your-api-key-here
   ```
3. Restart dev server
4. AI will provide more personalized, detailed responses

---

## 🗣️ Voice Features

### Voice Input
- Click "Start Voice Input" in chat
- Browser will request microphone access
- Speak for up to 30 seconds
- Text appears in chat automatically

### Supported Languages
- English
- हिंदी (Hindi)
- தமிழ் (Tamil)
- తెలుగు (Telugu)
- বাংলা (Bengali)
- मराठी (Marathi)
- ગુજરાતી (Gujarati)
- ಕನ್ನಡ (Kannada)
- മലയാളം (Malayalam)
- ਪੰਜਾਬੀ (Punjabi)
- ଓଡ଼ିଆ (Odia)

**Note:** Voice recognition uses browser's built-in Speech API, which works best in Chrome/Edge.

---

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint

# Build in development mode
npm run build:dev
```

---

## 📁 Project Structure

```
src/
├── components/              # React components
│   ├── Hero.tsx            # Landing hero section
│   ├── Navbar.tsx          # Navigation bar
│   ├── VoiceInterface.tsx  # Voice interaction
│   └── ui/                 # Shadcn/ui components
├── pages/                  # Page components
│   ├── Index.tsx          # Home page
│   ├── Auth.tsx           # Authentication
│   ├── Dashboard.tsx      # User dashboard
│   ├── Chat.tsx           # Chat interface
│   ├── ReportIssue.tsx    # Report issues
│   ├── Rights.tsx         # Rights education
│   └── NotFound.tsx       # 404 page
├── utils/
│   ├── aiChat.ts          # AI chat logic with Groq
│   └── RealtimeAudio.ts   # Audio utilities
├── integrations/
│   └── supabase/          # Supabase integration
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── App.tsx               # Main app component
```

---

## 🌐 Routing

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Index | Home page |
| `/auth` | Auth | Sign up / Sign in |
| `/dashboard` | Dashboard | User dashboard |
| `/chat` | Chat | AI chatbot |
| `/report` | ReportIssue | File complaints |
| `/rights` | Rights | Learn rights |
| `*` | NotFound | 404 page |

---

## 🎨 Styling

- **Framework**: Tailwind CSS
- **Components**: Shadcn/ui
- **Icons**: Lucide React
- **Colors**: Custom gradients
- **Responsive**: Mobile-first design

---

## 🧪 Testing the Features

### Test Checklist

1. **Home Page**
   - [ ] Page loads without errors
   - [ ] Navigation links work
   - [ ] Responsive on mobile

2. **Authentication**
   - [ ] Sign up works
   - [ ] Sign in works
   - [ ] Data persists in localStorage
   - [ ] Logout works

3. **Dashboard**
   - [ ] Shows user email
   - [ ] Lists submitted issues
   - [ ] Quick action buttons work
   - [ ] Logout button functional

4. **Chat Interface**
   - [ ] Message input works
   - [ ] AI responds to messages
   - [ ] Conversation history displays
   - [ ] Voice input button appears

5. **AI Responses**
   - [ ] Try: "hello"
   - [ ] Try: "rights"
   - [ ] Try: "complaint"
   - [ ] Try: "help"

6. **Report Issue**
   - [ ] Form validation works
   - [ ] Issues save to localStorage
   - [ ] Confirmation message appears

7. **Rights Page**
   - [ ] Content loads
   - [ ] Accordion works
   - [ ] All sections display

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill existing process on port 5173
# Windows PowerShell
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Dev server will automatically find next port
```

### Microphone Not Working
- Check browser permissions (Settings > Site settings)
- Grant microphone access
- Try Chrome or Edge for best results
- Check `chrome://flags/#enable-experimental-web-platform-features`

### Build Errors
```bash
# Clear cache and reinstall
rm -r node_modules
npm install
npm run build
```

### localStorage Not Working
- Check browser's privacy settings
- Ensure cookies/storage are enabled
- Use incognito/private mode for testing

---

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ Mobile browsers (limited voice features)

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
npm run build
# Upload dist/ folder to gh-pages branch
```

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui Components](https://ui.shadcn.com)
- [Groq API Docs](https://console.groq.com/docs)

---

## 💡 Tips for Development

1. **Hot Module Replacement**: Changes auto-reload
2. **TypeScript**: Full type support for better DX
3. **ESLint**: Run `npm run lint` to check code quality
4. **DevTools**: React DevTools extension recommended
5. **Mock Data**: All data persists in localStorage for demo

---

## ❓ FAQ

**Q: Do I need a backend?**
A: No! The app works completely with mock authentication and mock AI responses.

**Q: Can I use real backend?**
A: Yes! Supabase client is configured. Update Auth.tsx and Dashboard.tsx to use real auth.

**Q: How do I get better AI responses?**
A: Get a free Groq API key and add it to `.env.local`

**Q: Does voice work on mobile?**
A: Partially. Mobile browsers have limited Speech API support. Chrome works best.

**Q: How do I deploy?**
A: Run `npm run build` and upload `dist/` folder to any static hosting (Vercel, Netlify, etc.)

---

**Ready to go!** 🎉 Open http://localhost:5173 in your browser and start testing!
