# SIGNALINK MVP-2B — Low-Memory Buffer

A hardware-aware simulation of a fixed-size gesture event buffer.

## Engineering problem

Real embedded systems have constrained memory. Instead of allowing gesture history to grow indefinitely, this prototype forces event storage into exactly **4 slots**.

## Behavior

Each event is one of:

- HELLO
- YES
- STOP

The buffer accepts events until all four slots are occupied.

When a fifth event arrives:

1. The oldest event is identified.
2. Existing entries shift left.
3. The oldest value is evicted.
4. The new event occupies the final slot.

Example:

`[HELLO, YES, STOP, YES]`

+ `HELLO`

→ `[YES, STOP, YES, HELLO]`

## Why this is different from MVP-1.5

MVP-1.5 used a 3-event temporal buffer for **sequence recognition**.

MVP-2B isolates the same fundamental push/oldest-out behavior as a **fixed-memory primitive** so that its storage behavior can later be translated into registers/FIFO logic and RTL.

## What it proves

- Fixed memory capacity
- Predictable eviction behavior
- FIFO-style event storage
- Explicit hardware-oriented data movement
- A clean software-to-RTL transition point

This prototype does **not** claim that custom silicon is already ready. It demonstrates one constrained-memory behavior that can later be implemented and verified in hardware.

## Stack

Static HTML + CSS + JavaScript. No camera. No ML. No external dependencies.

## Method

**Theory → Build → Measure → Explain → RTL**

## License

MIT