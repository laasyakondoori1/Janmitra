# Janmitra 2.0 - Digital Civic Ally

An AI-powered civic assistance platform empowering Indian citizens with information about their rights, government services, and guidance on filing complaints.

## Features

- 🤖 **AI Chatbot**: Powered by Groq API with comprehensive knowledge about Indian laws and citizen rights
- 🗣️ **Voice Interface**: Support for multilingual voice interaction (11+ Indian languages)
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔐 **Mock Authentication**: Built-in authentication system (can be integrated with Supabase)
- 📋 **Issue Reporting**: File complaints about civic issues anonymously
- 📚 **Rights Education**: Learn about your fundamental constitutional rights
- 🎨 **Modern UI**: Beautiful gradient designs with Tailwind CSS and Shadcn/ui components

## Tech Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Shadcn/ui
- **Routing**: React Router
- **State Management**: React Hooks
- **UI Components**: Radix UI
- **API**: Groq API (with fallback to mock responses)
- **Backend (Optional)**: Supabase

## Getting Started

### Prerequisites

- Node.js 16+ and npm/bun
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd janmitra-digital-ally-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Setup Environment Variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Groq API Key (Get free key from https://console.groq.com)
   VITE_GROQ_API_KEY=your-groq-api-key-here
   
   # Supabase (Optional - for backend)
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-key
   ```

   **Note**: If you don't have a Groq API key, the app will work with comprehensive mock responses.

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

   The application will be available at `http://localhost:5173`

### Getting a Groq API Key

1. Visit [https://console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Go to API Keys section
4. Create a new API key
5. Copy and paste it into your `.env.local` file

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx              # Landing page hero section
│   ├── Navbar.tsx            # Navigation bar
│   ├── VoiceInterface.tsx    # Voice input interface
│   └── ui/                   # Shadcn/ui components
├── pages/
│   ├── Index.tsx             # Home page
│   ├── Auth.tsx              # Authentication
│   ├── Dashboard.tsx         # User dashboard
│   ├── Chat.tsx              # AI chat interface
│   ├── ReportIssue.tsx       # Report issues form
│   ├── Rights.tsx            # Rights education
│   └── NotFound.tsx          # 404 page
├── utils/
│   ├── aiChat.ts            # AI chat utility with Groq integration
│   └── RealtimeAudio.ts     # Audio recording and playback
├── integrations/
│   └── supabase/            # Supabase client and auth
├── hooks/                    # Custom React hooks
└── lib/                      # Utility functions
```

## Usage

### Home Page
- Overview of Janmitra features
- Learn about the mission
- Quick access to key features

### Authentication
- Sign up with email and password
- Sign in to existing account
- Mock authentication (stores in localStorage)

### Dashboard
- View your profile
- Track submitted issues
- Quick access to main features

### AI Chat
- Ask questions about your rights
- Get guidance on civic procedures
- Understand government schemes
- Supports text and voice input

### Voice Interface
- Speak in your preferred Indian language
- Get responses in the same language
- Real-time transcription

### Report Issues
- File complaints about civic problems
- Option for anonymous reporting
- Categorize your issue
- Track resolution status

### Know Your Rights
- Learn about fundamental rights
- Understand constitutional protections
- Get information about civic procedures
- Access legal information

## Available Routes

- `/` - Home page
- `/auth` - Authentication (Sign up / Sign in)
- `/dashboard` - User dashboard
- `/chat` - AI chatbot interface
- `/report` - Report an issue
- `/rights` - Rights education
- `*` - 404 page

## Build & Deployment

### Build for Production
```bash
npm run build
# or
bun run build
```

### Preview Production Build
```bash
npm run preview
# or
bun run preview
```

### Deployment Options

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## AI Chat Features

### Knowledge Base Includes
- Fundamental Rights (Constitution of India)
- Right to Information (RTI Act, 2005)
- Employment Rights
- Women Rights and Protections
- Child Rights
- Environmental Rights
- Anti-Corruption Measures
- Education Rights
- Senior Citizens Benefits
- Voting and Political Rights
- And much more...

### Fallback Mechanism
- If Groq API is unavailable, uses comprehensive mock responses
- Ensures app always works, even without API key
- Perfect for demo and development

## Authentication System

The app uses a mock authentication system that:
- Stores user data in localStorage
- Persists across page refreshes
- Can be easily replaced with Supabase or any backend
- Supports sign up and sign in

To integrate with real backend:
1. Use Supabase client already configured
2. Update Auth.tsx to use real Supabase auth
3. Update Dashboard.tsx for real data fetching

## Voice Features

- Speech-to-text in 11+ Indian languages
- Text-to-speech responses
- Real-time transcription
- Audio processing with noise cancellation

## Styling

- Custom gradient backgrounds
- Smooth animations and transitions
- Accessible color schemes
- Mobile-first responsive design

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Support

For issues, questions, or suggestions:
- Create an issue in the repository
- Contact: [Support Email]

## License

MIT License - See LICENSE file for details

## Roadmap

- [ ] Groq API integration for live AI responses
- [ ] Real Supabase backend integration
- [ ] Multi-language UI support
- [ ] Advanced voice features
- [ ] Real-time issue tracking
- [ ] Government agency integration
- [ ] Mobile app (React Native)
- [ ] Offline support (PWA)

## Credits

Built with:
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Groq API](https://groq.com)
- [Supabase](https://supabase.com)

---

**Made with ❤️ for empowering Indian citizens**
