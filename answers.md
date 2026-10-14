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

---

## Practical IV

### Q1
If validate.js runs BEFORE main.js and calls a function defined only in main.js, the Console shows a ReferenceError: functionName is not defined. This happens because validate.js tries to use a function that has not been loaded yet. JavaScript loads and runs scripts in order, so main.js must come first.

### Q2
Uncommenting document.write() after the page has loaded erases the entire page and replaces it with only the written content. innerHTML is safer because it only updates the inside of a specific element without destroying the rest of the page.

### Q3
Clicking Cancel on the confirm dialog does not clear the form. The e.preventDefault() method call stopped the default reset action.

### Q4
After an if { let b = 2; } block, console.log(b) gives ReferenceError: b is not defined. This proves that let is block-scoped — it dies at the closing brace. Also, typeof null returns "object" (a historical quirk).

### Q5
Changing Inter-College Football seats from 0 to 5 in the events array removes the "Sold out" badge. The card now shows a "5 seats" badge and the "Filling fast" message. The strikethrough / opacity styles from the sold-out-card class are removed, and the Register button appears (instead of "No seats left"). The event also becomes selectable in the register.html dropdown (no longer disabled).

### Q6
seatsMessage(0) returns "Sold out". seatsMessage(12) returns "Plenty of seats". This is because the function checks if seats === 0 first, then if seats < 10, otherwise returns "Plenty of seats".

### Q7
The line e.preventDefault() inside validateForm stops the browser from leaving the page. Without it, the browser would navigate away (submit the form to the server) and the user would never see the error messages. The page would reload or redirect before the validation feedback could be displayed.

### Q8
document.querySelectorAll("nav a") returns a NodeList (not an HTMLCollection). Yes, forEach works on it in modern browsers (Chrome, Firefox, Edge, Safari). A NodeList is a static list of elements; an HTMLCollection is a live collection returned by older methods like getElementsByTagName.