# The Causeway Daily — Newsletter Guidelines

A publication of Chesapeake Bitcoin. Published on the website at chesapeakebitcoin.com.

---

## Purpose

The Causeway Daily is a brief, well-sourced intelligence briefing for the Hampton Roads Bitcoin community. It covers local economic life, Bitcoin education, and what's happening across the broader Bitcoin and freedom tech world. It should feel like it was written by a knowledgeable neighbor — not a corporate newsletter, not an AI chatbot.

---

## Format

The newsletter is rendered as HTML inside `index.html`. The header line reads:

```
[Day], [Month] [Date], [Year] · Block [current block height] · ~$[current BTC price]
```

Pull current block height from mempool.757btc.org and price from bitbo.io.

### Sections (in order)

1. **🏘️ Local Pulse**
2. **🎓 Bitcoin 101**
3. **🌐 The Wider Network**
4. **📅 757 Meetup Schedule** (static — update only when schedule changes)

---

## Section Guidelines

### 1. Local Pulse

This section is about Hampton Roads — Chesapeake, Virginia Beach, Norfolk, Portsmouth, Hampton, and the surrounding 757 area.

**Priority order for stories:**

1. **Bitcoin adoption locally** — a business accepting bitcoin, a local event with Bitcoin ties, a Virginia/Hampton Roads policy development related to Bitcoin or financial sovereignty
2. **Local business spotlight** — a small independent business producing or selling necessary goods locally (food, trades, services). Highlight their story briefly. No endorsement required — just shine a light on local commerce worth supporting. Tie to the circular economy angle when natural.
3. **Local community event** — an upcoming event that aligns with our values: independence, community, self-reliance, freedom, education, local economy. Farmers markets, skill shares, local gatherings, civic events. Not political campaign events.

**Rules:**
- Stories must be real and verifiable. If local Bitcoin news is thin, use option 2 or 3.
- Do not fabricate local events or businesses. If nothing fits, write a short "Community Corner" reflection on the local economy and the circular Bitcoin vision (see Issue #1 as a template).
- Always tie back to the theme of local sovereignty and community resilience.

### 2. Bitcoin 101

One educational item per issue. Rotate through foundational topics so readers build knowledge over time. Each entry has two parts:

- **Fact of the Day** — a clear, accurate explanation of one Bitcoin concept (wallets, keys, seed phrases, nodes, mining, mempool, UTXOs, Lightning, multisig, etc.)
- **Action Item** — something the reader can do today with this knowledge. **This is mandatory — every issue must include a concrete, specific action.** Never omit it. Never make it vague ("learn more about Bitcoin" is not an action). Give the reader one thing they can do right now: download a wallet, run a command, visit a specific page, check their seed phrase backup, etc.

Source every claim. Preferred sources: bitcoin.org, BIPs (github.com/bitcoin/bips), bitcoincore.org, learnmeabitcoin.com, myfirstbitcoin.org.

Do not repeat topics across consecutive issues. Keep a mental note of what was covered last.

### 3. The Wider Network

Three sub-items. **Every sub-item must end with a source citation** using the standard HTML format (see HTML Output Format below). No exceptions.

**Freedom Tech** — news from the broader Bitcoin and freedom technology ecosystem. Projects, grants, tools, or people advancing open-source Bitcoin infrastructure, financial sovereignty, or human rights through Bitcoin. Preferred sources: 256foundation.org, hrf.org, nostr.com, opensats.org, bitcoinmagazine.com, GitHub releases.

**Product Update** — a recent development in Bitcoin software or protocol. Bitcoin Core releases, wallet updates, Lightning protocol changes, mining software, etc. Must be an actual released or announced update — never speculative. Preferred sources: bitcoincore.org, github.com/bitcoin/bitcoin, lightning.network.

**Market Note** — brief, factual market context. Price, on-chain trends, long-term holder data. No speculation, no price predictions, no altcoin comparisons. Preferred sources: mempool.757btc.org, bitbo.io.

### 4. 757 Meetup Schedule

Static list. Only update when the schedule changes. Current schedule:

- Virginia Beach — Chicho's Strawbridge · 1st Wednesday · 7 PM
- Virginia Beach — Wegmans Town Center · 2nd Saturday · 10 AM
- Hampton — Capstan Bar · 2nd Thursday · 6:30 PM
- Portsmouth — Mile Zero · 3rd Friday · 7 PM
- Virginia Beach — Smartmouth Pilot House · 3rd Wednesday · 7 PM
- Chesapeake — The Causeway · 4th Saturday · 2 PM

Close with: *The Day Is Our Own. ⚡*

---

## Sourcing Rules

These are non-negotiable.

- **Every factual claim must have a working source link.** Verify the URL resolves to the correct page before publishing.
- **No hallucinated URLs.** If you cannot find a real source for a story, do not include the story.
- **News must be within the last 24 hours** (except Bitcoin 101, which is evergreen educational content, and the meetup schedule).
- **Preferred sources by category:**
  - Virginia policy: lis.virginia.gov, governor.virginia.gov
  - Bitcoin news: bitcoinmagazine.com, bitcoincore.org, 256foundation.org
  - Market data: mempool.757btc.org, bitbo.io
  - Education: bitcoin.org, learnmeabitcoin.com, github.com/bitcoin/bips
  - Freedom tech: hrf.org, opensats.org, 256foundation.org

---

## Writing Style

- **No bullet points with dashes or hyphens** in prose sections. Write in natural paragraphs.
- **No bold headers inside paragraphs.** Use `<strong>` only for the sub-item label (e.g., "Community Corner", "Fact of the Day").
- **Conversational and peer-level tone.** Write like a knowledgeable friend, not a press release.
- **No AI-style filler.** No "In conclusion", no "It's worth noting", no "This is a significant development." Just say the thing.
- **Short sentences beat long ones.** If a sentence needs a semicolon, it probably wants to be two sentences.
- **Numbers**: spell out small numbers (one, two, three), use numerals for prices, block heights, percentages, and statistics.

---

## HTML Output Format

The newsletter lives inside this container in `index.html`:

```html
<div class="newsletter-container" style="background: #ffffff; padding: 2rem; border-radius: 14px; border: 2px solid var(--orange); color: #333; line-height: 1.7;">
```

Section headings use:
```html
<h3 style="color:#b45309; margin-bottom:0.5rem;">Section Title</h3>
```

Sub-item labels use `<strong>` followed by `<br>`.

Dividers between sections:
```html
<hr style="border:none; border-top:1px solid rgba(0,0,0,0.1); margin:1.5rem 0;" />
```

Source citations use:
```html
<span style="font-size:0.85rem; color:#666;">Source: <a href="URL" target="_blank" rel="noopener">Label</a></span>
```

The footer line:
```html
<p style="text-align:center; font-size:0.85rem; color:#888; margin-top:1.5rem;">
  <em style="font-size:1rem; color:#333;">The Day Is Our Own.</em><br/>
  The Causeway Daily · A publication of <a href="index.html" style="color:#b45309;">Chesapeake Bitcoin</a>
</p>
```

---

## Issue Log

| Issue | Date | Topics Covered |
|-------|------|----------------|
| #1 | April 14, 2026 | Community Corner / VA SB 557; Seed Phrases (BIP-39); 256 Foundation grants; Bitcoin Core v30.0; Market ~$74,438 |
| #2 | April 15, 2026 | Community Corner (buying local); The Mempool; HRF BDF 26 projects; Bitcoin Core v30.2; Market ~$74,199 block 945,188 |
| #3 | April 16, 2026 | Virginia HB 798 (unclaimed crypto held in-kind); Difficulty Adjustment; OpenSats 17th wave; Core Lightning v26.04 rc3 (splicing); Market ~$74,530 block 945,310 |
| #4 | April 17, 2026 | VB Farmers Market 50th Birthday; Running a Full Node; Stacked self-custodial Lightning wallet (NZ); Bitcoin Core v31.0 rc4; Market ~$75,806 block 945,469 |

---

## Commit Workflow

The newsletter is generated daily at 6am by a cron agent (Opus). The workflow is:

1. **Cron agent drafts the issue** — researches, writes, and updates `index.html` locally
2. **Cron agent notifies Nick via Matrix** — sends the full draft HTML in the message for review, plus a summary of sources used
3. **Nick reviews and approves** — Nick replies "approve" (or gives feedback for a revision)
4. **On approval, cron agent commits** — commits to main and replies with the commit hash
5. **Nick pushes** — runs `git push origin main`

**No commit happens without Nick's approval.** The cron agent must wait for an explicit "approve" reply before committing. If Nick gives feedback, revise and re-send the draft for another review pass.

**The cron agent owns the draft-review-commit loop.** The main agent (Flux) must not re-draft or re-commit unless the cron job is confirmed failed (check `openclaw cron list` for error status).
