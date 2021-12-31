const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");


console.log("Starting...");
const newPair = new Keypair();
const publicKey = new PublicKey(newPair._keypair.publicKey).toString(); // extracting the public key from accountInfo
const secretKey = newPair._keypair.secretKey; // extracting the private key from accountInfo

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed"); //Creates a connection object that will be used to get the balance on devnet.
        const myWallet = await Keypair.fromSecretKey(secretKey); //Creates a keypair object from the private key.
        const walletBalance = await connection.getBalance(new PublicKey(myWallet.publicKey)); //Gets the balance of the wallet.
        console.log(`Wallet balance: ${walletBalance}`);
        console.log(`PublicKey ${publicKey}`);
        console.log(`Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async () => { // air drop function
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed"); // Creates a connection object that will be used to get the balance on devnet.
        const walletKeyPair = await Keypair.fromSecretKey(secretKey); // Creates a keypair object from the private key.
        console.log("Air dropping... 2SOL");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2 * LAMPORTS_PER_SOL // max airdrop at max 10 SOL in one transaction
        );
        await connection.confirmTransaction(fromAirDropSignature);    
        console.log("Drop successful!");    
    } catch (err) {
        console.log(err);
    }
};
// max airdrop at max 10 SOL in one transaction

const driverFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();   
}
driverFunction();