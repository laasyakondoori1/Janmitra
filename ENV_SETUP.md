# Environment Configuration Guide

## Setting Up Environment Variables

### Step 1: Create `.env.local` File

In the root directory of the project, create a file named `.env.local`:

```
janmitra-digital-ally-main/
├── .env.local              ← Create this file
├── .env.example            ← Reference file
├── package.json
└── src/
```

### Step 2: Configuration Options

#### Option A: Minimal Setup (Works Without Any Keys)

Create `.env.local` with empty values:

```env
# .env.local
VITE_GROQ_API_KEY=
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

This will work perfectly with:
- ✅ Complete mock AI responses
- ✅ Mock authentication
- ✅ All features functional

#### Option B: With Groq API (Recommended)

1. **Get Free API Key:**
   - Visit https://console.groq.com
   - Sign up (free account)
   - Go to "API Keys" section
   - Create new API key
   - Copy the key

2. **Add to `.env.local`:**
   ```env
   VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx
   VITE_SUPABASE_URL=
   VITE_SUPABASE_PUBLISHABLE_KEY=
   ```

3. **Features Enabled:**
   - ✅ AI responses from Groq API
   - ✅ More detailed and personalized answers
   - ✅ Faster response times
   - ✅ Mock fallback if API unavailable

#### Option C: Full Setup with Supabase

1. **Create Supabase Project:**
   - Visit https://supabase.com
   - Sign up (free tier available)
   - Create new project
   - Wait for project initialization

2. **Get Supabase Keys:**
   - Go to Project Settings
   - Click "API" in sidebar
   - Copy "Project URL"
   - Copy "anon public" key

3. **Add to `.env.local`:**
   ```env
   VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIs...
   ```

4. **Features Enabled:**
   - ✅ Real backend authentication
   - ✅ Cloud database storage
   - ✅ Real-time features
   - ✅ File storage
   - ✅ Edge functions

## Variable Descriptions

### VITE_GROQ_API_KEY
- **Purpose**: Enables real AI responses via Groq API
- **Type**: String
- **Format**: `gsk_xxxxxxxxxxxxxxxxxxxxx`
- **Get Key**: https://console.groq.com
- **Cost**: Free tier available (5000 requests/month)
- **Default Behavior**: Falls back to mock responses if not set
- **Benefits**:
  - More contextual responses
  - Better Indian law knowledge
  - Multilingual support
  - Lower latency

### VITE_SUPABASE_URL
- **Purpose**: Backend API endpoint for database and auth
- **Type**: String (URL)
- **Format**: `https://xxxxx.supabase.co`
- **Get Key**: https://supabase.com (in project settings)
- **Cost**: Free tier + pay-as-you-go
- **Default Behavior**: Mock auth in localStorage
- **Benefits**:
  - Real user authentication
  - Cloud data storage
  - Real-time updates
  - Scalable backend

### VITE_SUPABASE_PUBLISHABLE_KEY
- **Purpose**: Public API key for Supabase client
- **Type**: String (JWT token)
- **Format**: `eyJhbGciOiJIUzI1NiIs...`
- **Get Key**: https://supabase.com (in project settings)
- **Note**: Safe to expose in frontend code (it's a public key)
- **Security**: Restrict with Row Level Security (RLS) policies

## How Vite Reads Environment Variables

### Client-Side Usage

```typescript
// This will work
const apiKey = import.meta.env.VITE_GROQ_API_KEY

// This WON'T work (no VITE_ prefix)
const wrong = import.meta.env.GROQ_API_KEY // undefined
```

**Rule**: Only variables prefixed with `VITE_` are exposed to frontend

### Checking if Variable is Set

```typescript
if (import.meta.env.VITE_GROQ_API_KEY) {
  // Use API
} else {
  // Use fallback
}
```

## Verification Checklist

After setting up environment variables:

1. **Check `.env.local` exists**
   ```bash
   ls -la .env.local  # Linux/Mac
   dir .env.local     # Windows
   ```

2. **Verify file location**
   - Must be in root directory (same level as package.json)
   - Not in src/ or other subdirectories

3. **Restart Dev Server**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

4. **Check In Browser Console**
   ```javascript
   // Open DevTools (F12)
   // Type in console:
   console.log(import.meta.env.VITE_GROQ_API_KEY)
   // Should show your API key or empty string
   ```

5. **Test Features**
   - Go to `/chat`
   - Try asking a question
   - Should get response (from API or mock)

## Troubleshooting

### Variables Not Loaded

**Problem**: Getting undefined or empty values

**Solutions**:
1. Check file location (root directory)
2. Check file name (.env.local exactly)
3. Restart dev server
4. Clear browser cache
5. Check for typos (VITE_GROQ_API_KEY not GROQ_API_KEY)

### API Key Not Working

**Problem**: Getting API errors

**Solutions**:
1. Verify key format (should start with `gsk_`)
2. Check key expiration in console.groq.com
3. Ensure key has API access enabled
4. Check rate limits haven't been exceeded
5. Verify internet connection

### Supabase Connection Fails

**Problem**: Can't connect to Supabase

**Solutions**:
1. Verify URL format (should be https://xxxx.supabase.co)
2. Check network connectivity
3. Verify project is not paused
4. Ensure anon public key is used (not service role)
5. Check CORS settings in Supabase

## Security Best Practices

### ✅ DO
- Keep `.env.local` in `.gitignore` (check existing .gitignore)
- Use VITE_ prefix for frontend variables
- Rotate API keys regularly
- Use restricted Supabase service roles for backend
- Enable Row Level Security (RLS) in Supabase

### ❌ DON'T
- Commit `.env.local` to git
- Share API keys publicly
- Use server-side keys in frontend
- Store sensitive data in localStorage
- Disable Supabase security features

## Example .env.local Files

### Minimal (Demo/Development)
```env
VITE_GROQ_API_KEY=
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

### With Groq (Recommended)
```env
VITE_GROQ_API_KEY=gsk_abc123xyz789
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

### Production Ready
```env
VITE_GROQ_API_KEY=gsk_abc123xyz789
VITE_SUPABASE_URL=https://myproject.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...
```

## Getting Free API Keys

### Groq API (Recommended for AI)
1. Go to https://console.groq.com
2. Sign up with email/Google
3. Verify email
4. Navigate to API Keys
5. Click "Create API Key"
6. Copy and save securely

**Limits**: 5000 requests/month free tier

### Supabase (For Backend)
1. Go to https://supabase.com
2. Sign up with GitHub/Google
3. Create new project
4. Choose region (closer to users)
5. Set strong database password
6. Wait for project initialization (2-3 minutes)
7. Go to Settings > API
8. Copy project URL and anon key

**Limits**: 100MB storage, 1GB bandwidth free tier

## Next Steps

1. ✅ Create `.env.local` file
2. ✅ Add API keys (or leave empty for mock mode)
3. ✅ Restart dev server
4. ✅ Test features in the app
5. ✅ Read QUICK_START.md for usage guide

---

**Questions?** Check the main README.md or QUICK_START.md files!
