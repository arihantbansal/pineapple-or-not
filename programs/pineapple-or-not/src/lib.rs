use anchor_lang::prelude::*;

declare_id!("4cnMefx5UmwwW6yCJYMoLAGzQy8XVq7AQRKqFsP7aajh");

#[program]
pub mod pineapple_or_not {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.yes = 0;
        vote_account.no = 0;
        Ok(())
    }

    pub fn vote_yes(ctx: Context<Vote>) -> Result<()> {
        ctx.accounts.vote_account.yes += 1;
        Ok(())
    }

    pub fn vote_no(ctx: Context<Vote>) -> Result<()> {
        ctx.accounts.vote_account.no += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 16 + 16)]
    pub vote_account: Account<'info, VoteAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut)]
    pub vote_account: Account<'info, VoteAccount>,
}

#[account]
#[derive(Default)]
pub struct VoteAccount {
    pub yes: u64,
    pub no: u64,
}
