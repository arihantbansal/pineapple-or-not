import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PineappleOrNot } from "../target/types/pineapple_or_not";

describe("pineapple-or-not", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.PineappleOrNot as Program<PineappleOrNot>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
