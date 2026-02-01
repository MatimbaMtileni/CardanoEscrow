<<<<<<< HEAD
// Cardano Escrow Service - Real Blockfrost integration for Preprod testnet
// Uses edge function for Blockfrost API calls and CIP-30 wallet for signing

import { supabase } from '@/integrations/supabase/client';
=======
// Cardano Escrow Service - Mock implementation for browser compatibility
// Real Lucid integration requires a Node.js environment or proper WASM setup
>>>>>>> 616a906c5d47900c9f5f637284227e649a880440

export interface LucidConfig {
  network: 'Mainnet' | 'Preprod' | 'Preview';
  blockfrostApiKey?: string;
<<<<<<< HEAD
  blockfrostUrl?: string;
}

// Preprod network configuration
export const PREPROD_CONFIG: LucidConfig = {
  network: 'Preprod',
  blockfrostUrl: 'https://cardano-preprod.blockfrost.io/api/v0',
};

=======
}

>>>>>>> 616a906c5d47900c9f5f637284227e649a880440
export interface EscrowParams {
  sellerAddress: string;
  amount: bigint; // in Lovelace
  deadline: Date;
}

export interface UTxO {
  txHash: string;
  outputIndex: number;
  assets: { lovelace: bigint };
  datum?: string;
}

// EscrowDatum type matching Plutus contract structure
export interface EscrowDatum {
  buyer: string;
  seller: string;
  deadline: bigint;
}

<<<<<<< HEAD
// CIP-30 Extended Wallet API for signing
interface CIP30WalletApi {
  getNetworkId(): Promise<number>;
  getUsedAddresses(): Promise<string[]>;
  getUnusedAddresses(): Promise<string[]>;
  getChangeAddress(): Promise<string>;
  getBalance(): Promise<string>;
  getUtxos(): Promise<string[] | null>;
  signTx(txCbor: string, partialSign?: boolean): Promise<string>;
  submitTx(txCbor: string): Promise<string>;
}

// Blockfrost response types
interface BlockfrostUtxo {
  tx_hash: string;
  tx_index: number;
  output_index: number;
  amount: Array<{ unit: string; quantity: string }>;
  block: string;
  data_hash?: string;
  inline_datum?: string;
}

interface BlockfrostProtocolParams {
  min_fee_a: number;
  min_fee_b: number;
  max_tx_size: number;
  key_deposit: string;
  pool_deposit: string;
  min_utxo: string;
  coins_per_utxo_word?: string;
  coins_per_utxo_size?: string;
}

class LucidService {
  private initialized = false;
  private connectedAddress: string | null = null;
  private walletApi: CIP30WalletApi | null = null;
  private network: 'Mainnet' | 'Preprod' | 'Preview' = 'Preprod';

  async initialize(config: LucidConfig): Promise<void> {
    console.log(`[LucidService] Initializing for ${config.network}...`);
    this.network = config.network;
=======
class LucidService {
  private initialized = false;
  private scriptAddress: string | null = null;
  private scriptCbor: string | null = null;
  private connectedAddress: string | null = null;

  async initialize(config: LucidConfig): Promise<void> {
    // In a real implementation, this would initialize Lucid with Blockfrost
    console.log(`[LucidService] Initializing for ${config.network}...`);
>>>>>>> 616a906c5d47900c9f5f637284227e649a880440
    this.initialized = true;
  }

  async connectWallet(walletApi: unknown): Promise<string> {
<<<<<<< HEAD
    this.walletApi = walletApi as CIP30WalletApi;
    
    try {
      const addresses = await this.walletApi.getUsedAddresses();
      const changeAddress = await this.walletApi.getChangeAddress();
      this.connectedAddress = addresses[0] || changeAddress;
      
      console.log('[LucidService] Connected to wallet:', this.connectedAddress?.slice(0, 20) + '...');
      return this.connectedAddress;
    } catch (error) {
      console.error('[LucidService] Wallet connection error:', error);
      throw error;
    }
  }

  // Call the edge function for Blockfrost API
  private async callBlockfrostApi(action: string, params: Record<string, unknown> = {}): Promise<unknown> {
    const { data, error } = await supabase.functions.invoke('cardano-blockchain', {
      body: { action, ...params },
    });

    if (error) {
      console.error('[LucidService] Edge function error:', error);
      throw new Error(`Blockchain API error: ${error.message}`);
    }

    if (!data.success) {
      throw new Error(data.error || 'Unknown blockchain error');
    }

    return data.data;
  }

  async getUtxos(address: string): Promise<UTxO[]> {
    try {
      const utxos = await this.callBlockfrostApi('getUtxos', { address }) as BlockfrostUtxo[];
      
      return utxos.map(utxo => ({
        txHash: utxo.tx_hash,
        outputIndex: utxo.output_index,
        assets: {
          lovelace: BigInt(utxo.amount.find(a => a.unit === 'lovelace')?.quantity || '0'),
        },
        datum: utxo.inline_datum,
      }));
    } catch (error) {
      console.error('[LucidService] Error fetching UTxOs:', error);
      return [];
    }
  }

  async getProtocolParams(): Promise<BlockfrostProtocolParams | null> {
    try {
      const params = await this.callBlockfrostApi('getProtocolParams') as BlockfrostProtocolParams;
      return params;
    } catch (error) {
      console.error('[LucidService] Error fetching protocol params:', error);
      return null;
    }
  }

  async createEscrow(params: EscrowParams): Promise<string> {
    if (!this.walletApi || !this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

=======
    if (!this.initialized) {
      console.warn('[LucidService] Not initialized, using mock connection');
    }
    
    // Extract address from CIP-30 wallet API
    try {
      const api = walletApi as { getUsedAddresses?: () => Promise<string[]> };
      if (api.getUsedAddresses) {
        const addresses = await api.getUsedAddresses();
        if (addresses.length > 0) {
          // Convert from hex to bech32 would happen here with real Lucid
          this.connectedAddress = addresses[0];
          return this.connectedAddress;
        }
      }
    } catch (error) {
      console.error('[LucidService] Wallet connection error:', error);
    }
    
    // Fallback mock address
    this.connectedAddress = 'addr1_mock_' + generateMockTxHash().slice(0, 40);
    return this.connectedAddress;
  }

  setScriptAddress(address: string, cbor: string): void {
    this.scriptAddress = address;
    this.scriptCbor = cbor;
    console.log('[LucidService] Script configured:', { address: address.slice(0, 20) + '...' });
  }

  async createEscrow(params: EscrowParams): Promise<string> {
    if (!this.scriptAddress) {
      console.warn('[LucidService] No script configured, using simulation');
    }

    // Simulate transaction building and signing
>>>>>>> 616a906c5d47900c9f5f637284227e649a880440
    console.log('[LucidService] Creating escrow:', {
      seller: params.sellerAddress.slice(0, 20) + '...',
      amount: `${Number(params.amount) / 1_000_000} ADA`,
      deadline: params.deadline.toISOString(),
    });

<<<<<<< HEAD
    try {
      // For a full implementation, we would need to:
      // 1. Build the transaction with proper CBOR encoding
      // 2. Include the escrow script and datum
      // 3. Calculate fees based on protocol parameters
      
      // Since transaction building requires complex CBOR serialization,
      // we use the wallet's built-in transaction building when available,
      // or submit a simple payment transaction to demonstrate the flow
      
      const utxos = await this.walletApi.getUtxos();
      if (!utxos || utxos.length === 0) {
        throw new Error('No UTxOs available in wallet');
      }

      // Note: Full escrow tx building requires proper Plutus script integration
      // For now, we demonstrate the signing flow with the wallet
      console.log('[LucidService] Wallet has', utxos.length, 'UTxOs available');
      
      // In a production implementation, you would:
      // 1. Use a proper Cardano serialization library
      // 2. Build the transaction with the escrow script
      // 3. Attach the correct datum
      // 4. Calculate and set the correct fees
      
      // For demonstration, we attempt to sign and submit via the wallet
      // This will fail without a properly built transaction, but shows the integration points
      
      throw new Error(
        'Full escrow transaction building requires Cardano serialization libraries. ' +
        'The wallet connection and Blockfrost integration are ready. ' +
        'To complete this, integrate @emurgo/cardano-serialization-lib-browser or similar.'
      );
    } catch (error) {
      console.error('[LucidService] Error creating escrow:', error);
      throw error;
    }
  }

  async submitTransaction(signedTxCbor: string): Promise<string> {
    if (!this.walletApi) {
      throw new Error('Wallet not connected');
    }

    try {
      // Option 1: Submit via wallet (recommended - wallet handles it)
      const txHash = await this.walletApi.submitTx(signedTxCbor);
      console.log('[LucidService] Transaction submitted via wallet:', txHash);
      return txHash;
    } catch (walletError) {
      console.log('[LucidService] Wallet submit failed, trying Blockfrost...', walletError);
      
      // Option 2: Submit via Blockfrost edge function
      try {
        const result = await this.callBlockfrostApi('submitTx', { txCbor: signedTxCbor }) as { txHash: string };
        console.log('[LucidService] Transaction submitted via Blockfrost:', result.txHash);
        return result.txHash;
      } catch (blockfrostError) {
        console.error('[LucidService] Blockfrost submit also failed:', blockfrostError);
        throw blockfrostError;
      }
    }
  }

  async releaseEscrow(utxo: UTxO): Promise<string> {
    if (!this.walletApi) {
      throw new Error('Wallet not connected');
=======
    // In real implementation: build tx, sign, submit
    await simulateDelay(500);
    
    return generateMockTxHash();
  }

  async releaseEscrow(utxo: UTxO): Promise<string> {
    if (!this.scriptCbor) {
      console.warn('[LucidService] No script CBOR configured');
>>>>>>> 616a906c5d47900c9f5f637284227e649a880440
    }

    console.log('[LucidService] Releasing escrow UTxO:', utxo.txHash.slice(0, 16) + '...');
    
<<<<<<< HEAD
    // Similar to createEscrow, full implementation requires:
    // 1. Building a transaction that spends the script UTxO
    // 2. Including the "Release" redeemer
    // 3. Satisfying the validator conditions
    
    throw new Error(
      'Release transaction requires Cardano serialization libraries for script interaction.'
    );
  }

  async refundEscrow(utxo: UTxO): Promise<string> {
    if (!this.walletApi) {
      throw new Error('Wallet not connected');
=======
    // Simulate release transaction
    await simulateDelay(500);
    
    return generateMockTxHash();
  }

  async refundEscrow(utxo: UTxO): Promise<string> {
    if (!this.scriptCbor) {
      console.warn('[LucidService] No script CBOR configured');
>>>>>>> 616a906c5d47900c9f5f637284227e649a880440
    }

    console.log('[LucidService] Refunding escrow UTxO:', utxo.txHash.slice(0, 16) + '...');
    
<<<<<<< HEAD
    throw new Error(
      'Refund transaction requires Cardano serialization libraries for script interaction.'
    );
  }

  async getTransactionInfo(txHash: string): Promise<{ found: boolean; block?: string; slot?: number }> {
    try {
      const result = await this.callBlockfrostApi('getTxInfo', { txHash }) as { found: boolean; block?: string; slot?: number };
      return result;
    } catch (error) {
      console.error('[LucidService] Error fetching tx info:', error);
      return { found: false };
    }
  }

  async getAddressBalance(address: string): Promise<bigint> {
    try {
      const result = await this.callBlockfrostApi('getAddressInfo', { address }) as { 
        found: boolean; 
        amount?: Array<{ unit: string; quantity: string }>;
      };
      
      if (!result.found || !result.amount) {
        return 0n;
      }

      const lovelace = result.amount.find(a => a.unit === 'lovelace');
      return BigInt(lovelace?.quantity || '0');
    } catch (error) {
      console.error('[LucidService] Error fetching address balance:', error);
      return 0n;
    }
  }

  getScriptUtxos(): Promise<UTxO[]> {
    // Would query UTxOs at the script address
    return Promise.resolve([]);
=======
    // Simulate refund transaction
    await simulateDelay(500);
    
    return generateMockTxHash();
  }

  async getScriptUtxos(): Promise<UTxO[]> {
    if (!this.scriptAddress) {
      return [];
    }

    // In real implementation: query Blockfrost for UTxOs at script address
    return [];
  }

  async getWalletBalance(): Promise<bigint> {
    // In real implementation: sum UTxOs from wallet
    return 0n;
>>>>>>> 616a906c5d47900c9f5f637284227e649a880440
  }

  isInitialized(): boolean {
    return this.initialized;
  }

<<<<<<< HEAD
  getConnectedAddress(): string | null {
    return this.connectedAddress;
  }

  getNetwork(): string {
    return this.network;
  }

  getExplorerUrl(txHash: string): string {
    switch (this.network) {
      case 'Mainnet':
        return `https://cardanoscan.io/transaction/${txHash}`;
      case 'Preprod':
        return `https://preprod.cardanoscan.io/transaction/${txHash}`;
      case 'Preview':
        return `https://preview.cardanoscan.io/transaction/${txHash}`;
      default:
        return `https://preprod.cardanoscan.io/transaction/${txHash}`;
    }
  }
=======
  hasScriptConfigured(): boolean {
    return this.scriptAddress !== null && this.scriptCbor !== null;
  }

  getConnectedAddress(): string | null {
    return this.connectedAddress;
  }
>>>>>>> 616a906c5d47900c9f5f637284227e649a880440
}

export const lucidService = new LucidService();

// Helper to convert ADA to Lovelace
export const adaToLovelace = (ada: number): bigint => BigInt(Math.floor(ada * 1_000_000));

// Helper to convert Lovelace to ADA
export const lovelaceToAda = (lovelace: bigint): number => Number(lovelace) / 1_000_000;

<<<<<<< HEAD
// Generate a mock tx hash for simulation (keeping for compatibility)
=======
// Generate a mock tx hash for simulation
>>>>>>> 616a906c5d47900c9f5f637284227e649a880440
export const generateMockTxHash = (): string => {
  const chars = 'abcdef0123456789';
  let hash = '';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};
<<<<<<< HEAD
=======

// Simulate network delay
const simulateDelay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));
>>>>>>> 616a906c5d47900c9f5f637284227e649a880440
