## Practical III

**Q1:** You change the footer colour in styles.css. How many pages update? What if the same colour was only set with an inline style on index.html?

Changing the footer colour in styles.css updates all 5 pages, since every page links to this same shared external stylesheet — one change propagates everywhere automatically. If the same colour had only been set with an inline style on index.html, it would affect only that one page and only that specific element — the other 4 pages would remain unstyled, requiring the change to be repeated manually on each page.

**Q2:** Which is more specific: h1 or #welcome? If both set color, which wins? Write a one-line proof from your page.

An ID selector (#welcome) is more specific than an element selector (h1), since IDs carry higher specificity weight in CSS. Proof from my page: header { color: white; } and h1 { color: #0f172a; } are both element selectors with equal specificity, so the later rule (h1) wins by cascade order alone — making the heading dark navy and hard to read against the dark navy header. If I instead used an ID selector against a competing element selector, the ID selector would win regardless of order.

**Q3:** Convert #0369a1 into an approximate rgb(...) value. Why do designers often prefer hex in stylesheets?

#0369a1 converts to approximately rgb(3, 105, 161). Designers often prefer hex because it's more compact, easier to copy-paste from design tools like Figma (which display hex codes by default), and it's a more universal format shared between design and development tools.

**Q4:** Set a nav link to display: none, then to visibility: hidden. What is the difference in the layout?

display: none completely removes the element from the page layout — it takes up zero space, and surrounding elements shift to fill the gap. visibility: hidden makes the element invisible but keeps its space reserved in the layout — surrounding elements do not shift, leaving a visible blank gap.

**Q5:** In your wireframe, how many event cards appear side-by-side at phone width? At desktop width?

At phone width, event cards stack 1 per row (full width each). At desktop width, they appear 3 per row, side-by-side — matching the col-md-4 Bootstrap grid class used in Part G, since 3 x 4 columns = 12, filling the full 12-column grid.

**Q6:** Why must styles.css be linked AFTER the Bootstrap CSS file? What happens if you reverse the order and both set h1 colour?

styles.css must be linked after Bootstrap so that when both stylesheets set the same property with equal specificity, my rule — being the later one in the cascade — wins and can override Bootstrap's defaults. If the order is reversed, Bootstrap's h1 rule would win instead, silently undoing my own styling with no error or warning.