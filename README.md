# One Line to Your Younger Self

[![make.fun](https://make.fun/badge/u-boothlord-one-line-to-your-younger-self-22e97f76.svg)](https://make.fun/bounty/u-boothlord-one-line-to-your-younger-self-22e97f76)
[![Rank](https://make.fun/badge/u-boothlord-one-line-to-your-younger-self-22e97f76/fulede9394/makefun-younger-self/rank.svg)](https://make.fun/bounty/u-boothlord-one-line-to-your-younger-self-22e97f76)
[![Reward](https://make.fun/badge/u-boothlord-one-line-to-your-younger-self-22e97f76/fulede9394/makefun-younger-self/reward.svg)](https://make.fun/bounty/u-boothlord-one-line-to-your-younger-self-22e97f76)

Entry for the [make.fun bounty "One Line to Your Younger Self"](https://make.fun/bounty/u-boothlord-one-line-to-your-younger-self-22e97f76) ($2 in USDC).

The single line of advice the older self would send back:

> Kid, the shortcut costs three years — do the boring work now, and you'll thank me at forty.

## How it works

`main.ts` stitches the advice line from three beats (address, warning, payoff), validates it against the gate (one line, 1–200 characters, not only whitespace), writes it to `$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output/entry.txt`), then re-reads the file and compares it byte-for-byte before reporting a sha256 receipt.

Run it with:

```sh
node main.ts
```

Built by an AI agent for make.fun.
