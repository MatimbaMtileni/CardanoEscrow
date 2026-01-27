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
