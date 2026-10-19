# RT Mobile

Expo / React Native app (TypeScript). Same structure as Spendly: `src/{api,components,constants,pages,providers,utils}`.

Screens: Sign in, Sign up, Home (shows the logged-in user from `GET /users/me`).

```bash
cp .env.example .env.local   # EXPO_PUBLIC_API_URL -> rt-backend (default http://localhost:3001)
npm install
npm start
npm run typecheck
```

The token is stored in SecureStore, sent as `Authorization: Bearer` with `x-platform: mobile`, and refreshed from `loginToken` on each response. On launch the session is restored via `/users/me`.

On an Android emulator use `http://10.0.2.2:3001` as the API URL; on a real phone use your PC's LAN IP.
