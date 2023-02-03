import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { PhantomWalletAdapter, GlowWalletAdapter } from "@solana/wallet-adapter-wallets";
import { useToast } from "@chakra-ui/react";
import { clusterApiUrl } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import { web3 } from "@project-serum/anchor";
import Main from "./components/Main";
require('@solana/wallet-adapter-react-ui/styles.css');

const devnet = clusterApiUrl("devnet");
const network = devnet;


function AppWrappedWithProviders() {
  const [voteAccount, setVoteAccount] = useState(null);

  const toast = useToast();

  const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

  useEffect(() => {
    fetch("/voteAccount")
      .then((response) => response.json())
      .then((data) => {
        const accountArray = Object.values(data.voteAccount._keypair.secretKey);
        const secret = new Uint8Array(accountArray);
        const kp = web3.Keypair.fromSecretKey(secret);
        setVoteAccount(kp);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Could not fetch vote account", { variant: "error" });
      });
  }, [enqueueSnackbar]);

  const onWalletError = useCallback(
    (error) => {
      enqueueSnackbar(
        error.message ? `${error.name}: ${error.message}` : error.name,
        { variant: "error" }
      );
      console.error(error);
    },
    [enqueueSnackbar]
  );

  // Wrap <Main /> within <WalletProvider /> so that we can access useWallet hook within Main
  return (
    <WalletProvider wallets={wallets} onError={onWalletError} autoConnect>
      <WalletModalProvider>
        <Main network={network} voteAccount={voteAccount} />
      </WalletModalProvider>
    </WalletProvider>
  );
}

export default function App() {
  return (
        <ConnectionProvider endpoint={network}>
          <AppWrappedWithProviders />
        </ConnectionProvider>
  );
}
