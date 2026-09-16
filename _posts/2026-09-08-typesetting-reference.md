---
title: "Everything this site can typeset"
lang: en
topics: [meta, physics]
standfirst: "A reference page for myself: equations, code, tables, quotes and footnotes, all in one place, so I never have to guess how something will render."
math: true
---

Every site needs one page that exercises the whole stylesheet. This is that page. It doubles as a reminder of what Markdown gives me for free.

## Mathematics

Inline first: the action of a classical system is $S[q] = \int_{t_1}^{t_2} L(q, \dot q, t)\,dt$, and the path actually taken is the one that makes it stationary.

Set apart, that condition reads

$$
\frac{d}{dt}\left(\frac{\partial L}{\partial \dot q_i}\right) - \frac{\partial L}{\partial q_i} = 0 .
$$

For the harmonic oscillator, $L = \tfrac{1}{2}m\dot x^2 - \tfrac{1}{2}kx^2$, which collapses to the equation everybody meets first:

$$
m\ddot{x} = -kx, \qquad \omega = \sqrt{\frac{k}{m}} .
$$

KaTeX renders all of this in the browser, so the build stays instant.[^katex]

## Code

Syntax highlighting comes from Rouge, at build time:

```python
import numpy as np

def velocity_verlet(x0, v0, a, dt, steps):
    """Integrate x'' = a(x) — symplectic, so energy stays honest."""
    x, v = np.array(x0, float), np.array(v0, float)
    trace = np.empty((steps, len(x)))
    for i in range(steps):
        v_half = v + 0.5 * dt * a(x)
        x = x + dt * v_half
        v = v_half + 0.5 * dt * a(x)
        trace[i] = x
    return trace
```

Inline code such as `np.linalg.eigh` sits in the same monospace face as the rest of the interface.

## Tables

| Method | Order | Symplectic | Cost per step |
|---|---|---|---|
| Euler | 1 | no | 1 force eval |
| Velocity Verlet | 2 | yes | 1 force eval |
| RK4 | 4 | no | 4 force evals |

## Quotes and lists

> If you are receptive and humble, mathematics will lead you by the hand.
> <br>— Paul Dirac

Ordered:

1. State the question in one sentence.
2. Guess the answer before computing it.
3. Compute.
4. Ask why the guess was wrong.

Unordered:

- Units first — they catch most mistakes for free.
- A plot beats a paragraph.
- If the limit case is wrong, the general case is wrong.

## Footnotes

Footnotes collect at the bottom of the article, out of the way of the argument.[^why]

[^katex]: The KaTeX stylesheet and scripts only load on posts with `math: true` in the front matter, so pages without equations stay light.
[^why]: Which is exactly where a digression belongs.
