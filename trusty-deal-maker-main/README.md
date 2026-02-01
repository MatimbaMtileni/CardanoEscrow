<<<<<<< HEAD
# Trusty Deal Maker 🚀

**Trusty Deal Maker** is a Cardano escrow application built with React + Vite and backed by Supabase. It allows buyers and sellers to create, fund, and settle escrows, exchange messages and attachments, and receive email notifications for important events (via Resend).

---

## Key features 🔑

- Escrow lifecycle: create, fund, release, refund
- In-app messaging between buyer & seller (real-time via Supabase Realtime)
- File attachments per escrow (private storage bucket)
- Email notifications sent via Resend (Supabase Function integration)
- Cardano wallet integration (CIP-30) and optional wallet linking to user profile
- Strong security: Row-Level Security (RLS) policies protect messages and attachments

---

## Quickstart (local development) 💻

Prerequisites
- Node.js (LTS) and npm
- (Optional) Supabase CLI if you want to run/inspect Functions locally or deploy them

Install & run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open http://localhost:5173 (or the port shown) to view the app.

---

## Environment variables & secrets 🔐

There are two kinds of environment values:

1) Client (Vite) envs (used by the frontend)
- `VITE_SUPABASE_URL` (your Supabase project URL)
- `VITE_SUPABASE_PUBLISHABLE_KEY` (your Supabase anon/publishable key)

Set these in a `.env` (or via your hosting provider) so the frontend can connect to Supabase.

2) Server / Function envs (used by Supabase Functions)
- `SUPABASE_URL` (project URL) - available automatically in Supabase Functions environment
- `SUPABASE_SERVICE_ROLE_KEY` (Service Role key) — required by functions that need elevated privileges
- `RESEND_API_KEY` (Resend API key) — used by `send-notification` function to send emails
- `BLOCKFROST_API_KEY` (optional) — used by Cardano / blockchain functions when applicable

How to set function secrets
- Supabase Dashboard (recommended): Project → Settings → API / Secrets → Add key/value (e.g., `RESEND_API_KEY`).
- Supabase CLI: `supabase secrets set RESEND_API_KEY=your_real_key_here` (requires supabase CLI login).

Local function env
- For the `send-notification` function we include `supabase/functions/send-notification/.env.example`. Copy that to `.env` and set your `RESEND_API_KEY` for local testing.
- NOTE: The repo already contains `supabase/functions/send-notification/.env` locally (ignored by git). Do **not** commit real secrets.

---

## Messaging & Notifications behavior 📩

- Messaging uses `escrow_messages` table with RLS policies — you must be an authenticated Supabase user whose `profiles.wallet_address` matches your connected Cardano wallet address to insert and view messages. This prevents address impersonation.
- When a message is sent:
  - A local optimistic message appears instantly for the sender.
  - The message is saved to `escrow_messages` in Supabase.
  - The `escrows` row is updated (`last_message_preview`, `last_message_at`) so the recipient sees activity in lists immediately.
  - A `send-notification` Supabase Function is invoked to email the recipient using Resend (requires `RESEND_API_KEY`).

Troubleshooting messaging failures
- If sending fails with a permission error, ensure you are **signed in** (Auth) and have **linked your wallet** in your profile. The app attempts to auto-link your wallet when you connect it while signed in.
- Check the browser console for errors and check Supabase Function logs (Dashboard → Functions) for email send failures.

---

## Supabase functions & DB migrations ⚙️

This project includes Supabase Functions:
- `supabase/functions/send-notification` — sends email notifications (Resend)
- `supabase/functions/escrow-transactions` — handles secure escrow actions

Migrations are under `supabase/migrations/` and include tables, RLS policies, triggers, and realtime publication for `escrow_messages` and attachments.

Deployment (Functions)
- Deploy functions with the Supabase CLI:

```bash
supabase login
supabase functions deploy send-notification --project-ref <project-ref>
# same for other functions
```

Or use the Supabase Dashboard to upload function code.

---

## Testing & linters ✅

- Run tests: `npm run test` (uses Vitest)
- Run lint: `npm run lint`
- Build: `npm run build`

---

## Developer notes & tips 🛠️

- Wallet linking: when a user connects a CIP-30 Cardano wallet while signed in, the app calls `escrowApi.updateProfileWallet` to store `profiles.wallet_address` — this is required for messaging RLS.
- Email delivery: the `send-notification` function reads `RESEND_API_KEY` from the runtime env — if missing, email sending is skipped and a message is logged.
- If you want chat to work for un-authenticated wallets (not recommended), you can relax RLS rules but it will allow address impersonation. Use caution.

---

## Where to find things in the repo 🔎

- Frontend: `src/`
- Messaging UI: `src/components/escrow/EscrowChat.tsx`
- Supabase functions: `supabase/functions/`
  - `send-notification/index.ts` — Resend integration
  - `escrow-transactions/index.ts` — escrow action handlers
- DB migrations & RLS: `supabase/migrations/`
- Local example env for functions: `supabase/functions/send-notification/.env.example`

---

## Contribution & support 🤝

Contributions welcome. Open issues or PRs and include a short description and steps to reproduce. If you need help setting up Supabase secrets or deploying functions, I can provide step-by-step instructions.

---

## License

No license file detected in the repository — add a `LICENSE` if you want to define reuse terms.

---

If you'd like, I can also:
- Add a `CONTRIBUTING.md` with developer workflows, or
- Add a GitHub Action to run `npm test` and `npm run lint` on PRs.

Happy to help with the next step — what would you like me to do next? ✨
---

## Email notifications (Resend) 🔧

To enable email notifications for the `send-notification` Supabase Function, set your Resend API key in the function's environment as `RESEND_API_KEY`. **Do NOT commit your real key to the repository.**

- Supabase Dashboard (recommended):
  - Go to Project → Settings → API / Secrets and add `RESEND_API_KEY` with your key.
- Supabase CLI (if you use it):
  - Run `supabase secrets set RESEND_API_KEY=your_real_key_here`.

For local development, copy `supabase/functions/send-notification/.env.example` to `.env` and update the value. Keep that file out of version control.

> Note: I have added your Resend API key to `supabase/functions/send-notification/.env` in this workspace and updated `.gitignore` so it remains untracked. If you'd like the secret set in the Supabase project (recommended for production), I can help add it to the project secrets next.

If you want, I can add the key for you to the Supabase project (requires access) or show step-by-step how to set it in the dashboard.


=======
# 🛡️ Cardano Escrow Smart Contract dApp

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Cardano](https://img.shields.io/badge/Cardano-0033AD?logo=cardano&logoColor=white)](https://cardano.org/)

A full end-to-end Escrow Decentralized Application (dApp) built on the Cardano blockchain that enables secure transactions between a Buyer and Seller, with funds securely locked in a smart contract until predefined conditions are met.

This project combines Plutus smart contracts, a modern React frontend, and Haskell-based backend logic for advanced contract interaction and validation.

## 📌 Project Overview

This escrow system removes the need for trust between transacting parties by enforcing rules through Plutus smart contracts and functional logic on the Cardano blockchain.

### 🔹 Escrow Flow

1. **Buyer deposits funds** into the escrow smart contract
2. **Funds are locked** and cannot be accessed directly
3. **Seller delivers** the service or product
4. **Buyer releases funds** or requests a refund
5. **Contract executes** the final outcome automatically

## 📁 Project Structure

```
├── plutus-contract/          # Plutus smart contract (Haskell)
│   ├── EscrowContract.hs     # Main escrow contract logic
│   └── README.md             # Contract documentation
├── src/                      # React frontend
│   ├── components/           # Reusable UI components
│   ├── pages/                # Application pages
│   ├── services/             # API and blockchain services
│   └── types/                # TypeScript type definitions
├── supabase/                 # Backend configuration
│   ├── functions/            # Edge functions
│   └── migrations/           # Database migrations
└── public/                   # Static assets
```

## ⚙️ Technologies Used

- **Plutus** – Smart contract development for Cardano
- **Haskell** – Contract logic, off-chain validation, and CLI interaction
- **React** – Frontend user interface
- **TypeScript** – Type-safe JavaScript
- **Vite** – Fast frontend build tool
- **Lucid** – Cardano blockchain interaction library
- **Supabase** – Backend services and database
- **Tailwind CSS** – Utility-first CSS framework
- **shadcn/ui** – Modern UI components
- **Vitest** – Testing framework

## 🧠 Haskell/Plutus Component

This project includes Haskell files responsible for:

- On-chain escrow smart contract logic
- Off-chain transaction validation
- Functional validation of contract states
- Safe handling of transaction conditions

The Haskell modules demonstrate:

- Pure functional design
- Strong type safety
- Separation of business logic from UI and deployment layers

Located in `plutus-contract/`, the contract handles the core escrow logic with Plutus validators.

## 🧪 Prerequisites

- **Node.js** (v18+)
- **npm** or **yarn**
- **Git**
- **GHC** (Glasgow Haskell Compiler)
- **Cabal** (Haskell build tool)
- **Cardano wallet** (e.g., Eternl, Nami) for testing

### Check installations:

```bash
node -v
npm -v
ghc --version
cabal --version
```

## 🚀 Running the Project Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/MatimbaMtileni/CardanoEscrow.git
cd CardanoEscrow
```

### 2️⃣ Install JavaScript dependencies
```bash
npm install
```

### 3️⃣ Set up environment variables
Copy the `.env` file and update with your Supabase credentials:

```bash
cp .env.example .env  # If .env.example exists, otherwise copy from .env
```

Edit `.env` with your Supabase project details:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

### 4️⃣ Set up Supabase (optional for full functionality)
- Create a Supabase project at [supabase.com](https://supabase.com)
- Run database migrations:
```bash
cd supabase
supabase db reset  # Or apply migrations manually
```

### 5️⃣ Compile and test the Plutus contract
```bash
cd plutus-contract
stack build
stack test
```

### 6️⃣ Run the frontend
```bash
npm run dev
```

Open your browser to: **http://localhost:5173**

### 7️⃣ Run tests
```bash
npm run test          # Run tests once
npm run test:watch    # Run tests in watch mode
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 🔐 Smart Contract Features

- **Trustless fund escrow** using Plutus validators
- **Buyer-controlled release and refund** mechanisms
- **Secure seller payout** with validation
- **Cardano-enforced rules** through smart contracts
- **Transparent transaction state** on-chain
- **Multi-asset support** (ADA and native tokens)

## 🌍 Real-World Applications

- Freelance escrow payments
- Online marketplaces
- Peer-to-peer services
- Digital goods trading
- Decentralized finance workflows on Cardano

## 🚀 Deployment

### Frontend Deployment
Deploy the React app to platforms like Vercel, Netlify, or GitHub Pages:

```bash
npm run build
# Deploy the dist/ folder
```

### Smart Contract Deployment
For Cardano testnet/mainnet deployment, use cardano-cli or third-party tools to deploy the compiled Plutus script.

## 🧠 Future Enhancements

- Multi-party escrow support
- Dispute resolution mechanisms
- Testnet/Mainnet deployment automation
- Enhanced Haskell ↔ Cardano integration
- Improved UI/UX with more features
- Integration with Cardano dApps and DEXs
- Mobile wallet support

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## ✨ Author

**Matimba Regent**
- GitHub: [https://github.com/MatimbaMtileni](https://github.com/MatimbaMtileni)
- LinkedIn: [Your LinkedIn Profile]

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the [Plutus documentation](https://plutus.readthedocs.io/)
- Join Cardano developer communities

## 📚 Additional Resources

- [Cardano Documentation](https://docs.cardano.org/)
- [Plutus Playground](https://playground.plutus.iohkdev.io/)
- [Lucid Documentation](https://lucid.spacebudz.io/)
- [Supabase Docs](https://supabase.com/docs)
>>>>>>> 616a906c5d47900c9f5f637284227e649a880440
