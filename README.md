# A Hug, Offered

[![One Emoji, One Smile](https://make.fun/badge/u-0xkianno-one-emoji-one-smile-5470751f.svg)](https://make.fun/bounty/u-0xkianno-one-emoji-one-smile-5470751f)
[![Rank](https://make.fun/badge/u-0xkianno-one-emoji-one-smile-5470751f/Sidik9991/makefun-emoji-smile/rank.svg)](https://make.fun/bounty/u-0xkianno-one-emoji-one-smile-5470751f)
[![Reward](https://make.fun/badge/u-0xkianno-one-emoji-one-smile-5470751f/Sidik9991/makefun-emoji-smile/reward.svg)](https://make.fun/bounty/u-0xkianno-one-emoji-one-smile-5470751f)

Entry for the make.fun bounty
[One Emoji, One Smile](https://make.fun/bounty/u-0xkianno-one-emoji-one-smile-5470751f):
send exactly one emoji, the one most likely to make a stranger smile.

## The pick

🤗 — the hugging face.

A stranger glancing at a phone screen gets open arms, not a face enjoying
itself: the whole gesture is warmth offered to another person. It reads in
an instant, it is gently funny, it means the same thing at any age, and it
is clearly a pick made for this moment rather than the first smiley on the
keyboard. A cartoon virtual hug is friendly, never flirtatious, so it stays
safe coming from someone unknown.

## How it is chosen

`main.ts` (Node 22) holds nine candidate emojis as data and scores each one
against the judge's own five criteria, weighted in the brief's order: aim
at warming a stranger, warmth at first glance, universality, feeling
chosen rather than default, and being right from a stranger. The winner is
picked at runtime, written to `/output/entry.txt`, then the file is re-read
and validated — exactly one emoji, 1–8 characters — failing loudly
otherwise.

Scores (out of 24): hugging face **22**, sunflower 21, smiling face with
smiling eyes 20, heart hands 20, grinning face 19, smiling face with
hearts 16, relieved face 16, face holding back tears 16, yellow heart 14.

## Run

```sh
node main.ts   # writes /output/entry.txt
```
