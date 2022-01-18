const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");

const web3 = require("@solana/web3.js")


console.log("Starting...");
const newPair = new Keypair();
const publicKey = new PublicKey(newPair._keypair.publicKey).toString(); // extracting the public key from accountInfo
const secretKey = newPair._keypair.secretKey; // extracting the private key from accountInfo
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");  //Creates a connection object that will be used to get the balance on devnet.
const myWallet = await Keypair.fromSecretKey(secretKey); //Creates a keypair object from the private key.
const pub = new PublicKey(myWallet.publicKey) // public key instance

const getWalletBalance = async () => {
    try {
        const walletBalance = await connection.getBalance(pub); //Gets the balance of the wallet.
        console.log(`Wallet balance: ${walletBalance}`);
        console.log(`PublicKey ${myWallet.publicKey}`);
        console.log(`Wallet balance: ${parseInt(walletBalance)/web3.LAMPORTS_PER_SOL}SOL`);
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async () => { // air drop function
    try {
        console.log("Air dropping... 2 SOL");
        const fromAirDropSignature = await connection.requestAirdrop(
            pub,
            2 * web3.LAMPORTS_PER_SOL // max airdrop at max 2 SOL in one transaction
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
