import * as assert from "assert";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PineappleOrNot } from "../target/types/pineapple_or_not";

describe("pineapple-or-not", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.PineappleOrNot as Program<PineappleOrNot>;

  let voteAccount = anchor.web3.Keypair.generate();

  it("initializes with 0 votes for crunchy and smooth", async () => {
    console.log("Testing Initialize...");
    const tx = await program.methods.initialize()
      .accounts({
        voteAccount: voteAccount.publicKey,
      })
      .signers([voteAccount]).rpc();
    console.log("Tx hash: ", tx);

    const voteData = await program.account.voteAccount.fetch(voteAccount.publicKey);
    console.log(voteData);
    console.log(`Yes: ${voteData.yes}`);
    console.log(`No: ${voteData.no}`);
    assert.ok(voteData.yes == 0 && voteData.no == 0);
  });

  it("votes correctly for yes", async () => {
    console.log("Testing vote yes...");
    const tx = await program.methods.voteYes()
      .accounts({
        voteAccount: voteAccount.publicKey,
      })
      .rpc();

    const voteData =  await program.account.voteAccount.fetch(voteAccount.publicKey);
    console.log(voteData);
    console.log(`Yes: ${voteData.yes}`);
    console.log(`No: ${voteData.no}`);
    assert.ok(voteData.yes == 1 && voteData.no == 0);
  });

  it("votes correctly for no", async () => {
    console.log("Testing vote no...");
    const tx = await program.methods.voteNo()
      .accounts({
        voteAccount: voteAccount.publicKey,
      })
      .rpc();

    const voteData = await program.account.voteAccount.fetch(voteAccount.publicKey);
    console.log(voteData);
    console.log(`Yes: ${voteData.yes}`);
    console.log(`No: ${voteData.no}`);
    assert.ok(voteData.yes == 1 && voteData.no == 1);
  });
});
