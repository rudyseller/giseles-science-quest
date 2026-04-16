# Gisele's Science Quest - Full Test Plan for Claude in Chrome

## Instructions
Navigate to https://giseles-science-quest.vercel.app/ and systematically test every aspect of this educational game. For each test, record PASS or FAIL with details. At the end, produce a structured bug report.

---

## TEST 1: Home Screen
1. Take a screenshot of the home screen
2. Verify the title "Gisele's Science Quest" is displayed
3. Verify the subtitle "Year 11 Science 1.5 - Acids & Bases" is shown
4. Verify the "Test Readiness" progress bar shows 0% initially
5. Verify all 6 topic cards are displayed with correct titles:
   - Electron Arrangement
   - Ions & Formulas
   - Balancing Equations
   - Acids & Bases
   - Indicators
   - Neutralisation
6. Verify each card shows 0% progress initially
7. Verify the "Mixed Quiz - All Topics" button is visible at the bottom
8. Take a screenshot showing all cards

---

## TEST 2: Electron Arrangement Module
1. Tap the "Electron Arrangement" card
2. Verify the topic view loads with a back arrow, title, and mastery %
3. Verify 3 tabs are shown: "Learn", "Build Atom", "Classify"

### TEST 2a: Learn Tab
4. Verify the "Key Idea" box explains electron shells (first shell max 2, then 8)
5. Verify 4 group reference cards are shown (Group 1, 2, 17, 18) with correct outer electrons
6. Verify 20 element buttons are displayed (H through Ca)
7. Tap on element "Na" (sodium) - verify it shows:
   - Name: Sodium (Na)
   - Atomic number: 11
   - Electron arrangement: 2,8,1
   - Outer electrons: 1
8. Verify a Bohr model diagram (SVG with concentric circles and dots) is displayed
9. Tap on element "Cl" (chlorine) - verify arrangement shows 2,8,7
10. Tap on element "He" (helium) - verify arrangement shows 2
11. Take a screenshot of the Bohr model

### TEST 2b: Build Atom Tab
12. Tap the "Build Atom" tab
13. Verify an element name is shown with its atomic number
14. Verify shell rows with +/- buttons are displayed
15. Try adding electrons using + buttons to match the correct arrangement
16. Tap "Check" - verify it shows "Correct!" or the right answer
17. Tap "Next Atom" - verify a new element loads
18. Try entering a wrong answer and tap "Check" - verify error feedback shows the correct arrangement

### TEST 2c: Classify Tab
19. Tap the "Classify" tab
20. Verify an element symbol and name are displayed
21. Verify 4 classification buttons appear: Alkali Metals, Alkaline Earth Metals, Halogens, Noble Gases
22. Tap the correct group - verify "Correct!" feedback
23. Tap the wrong group - verify error feedback shows the correct group
24. Verify the score counter updates

### TEST 2d: Quiz Button
25. Verify "Take the Quiz" button is visible below the learning content
26. Tap the back arrow - verify return to home screen

---

## TEST 3: Ions & Formulas Module
1. Tap the "Ions & Formulas" card
2. Verify 3 tabs: "Learn", "Ion Table", "Formula Builder"

### TEST 3a: Learn Tab
3. Verify sections for Positive Ions, Negative Ions, and Polyatomic Ions are shown
4. Verify the ion formation rule is explained (≤3 outer electrons lose, ≥5 gain)
5. Verify the Na → Na⁺ and Cl → Cl⁻ examples are shown
6. Verify polyatomic ions are listed (OH⁻, NO₃⁻, CO₃²⁻, SO₄²⁻, NH₄⁺, PO₄³⁻)
7. Verify formula writing rules are listed (6 steps)

### TEST 3b: Ion Table Tab
8. Tap "Ion Table" tab
9. Verify positive ions are listed with symbols and charges
10. Verify negative ions are listed with symbols and charges
11. Tap on an ion - verify it flips between symbol and name
12. Tap again - verify it flips back

### TEST 3c: Formula Builder Tab
13. Tap "Formula Builder" tab
14. Verify a compound name is displayed (e.g. "sodium chloride")
15. Verify the positive and negative ion names are shown as hints
16. Type the correct formula in the input box (e.g. "NaCl")
17. Tap "Check" - verify "Correct!" feedback
18. Tap "Next" - verify a new compound loads
19. Type a wrong formula and tap "Check" - verify it shows the correct answer
20. Tap "Show answer" - verify the answer is revealed
21. Take a screenshot

---

## TEST 4: Balancing Equations Module
1. Tap back to home, then tap "Balancing Equations"
2. Verify 2 tabs: "Learn", "Practice"

### TEST 4a: Learn Tab
3. Verify the explanation about balancing (same atoms on both sides)
4. Verify the rules are listed (only change coefficients, never subscripts)
5. Verify the worked example (H₂ + O₂ → H₂O → 2H₂ + O₂ → 2H₂O)

### TEST 4b: Practice Tab
6. Tap "Practice" tab
7. Verify an equation is displayed with formulas
8. Verify coefficient +/- controls are shown for each formula
9. Verify the atom count table shows left vs right counts for each element
10. Verify unbalanced atoms show in red and balanced in green
11. Adjust coefficients to balance the equation
12. Verify "Balanced! Great job!" message appears when correct
13. Tap "Next Equation" - verify a new equation loads
14. Take a screenshot of a balanced equation with green indicators

---

## TEST 5: Acids & Bases Module
1. Navigate back to home, tap "Acids & Bases"
2. Verify 2 tabs: "Learn", "Classify Game"

### TEST 5a: Learn Tab
3. Verify "What is an Acid?" section with H⁺ explanation
4. Verify strong acids listed: HCl, H₂SO₄, HNO₃
5. Verify weak acids listed (at least 3)
6. Verify "What is a Base?" section with OH⁻ explanation
7. Verify common bases listed with formulas
8. Verify the quick comparison box (Acids vs Bases)

### TEST 5b: Classify Game Tab
9. Tap "Classify Game" tab
10. Verify a substance name is displayed
11. Verify 3 buttons: "Acid", "Neutral", "Base"
12. Tap the correct answer - verify "Correct!" feedback
13. Tap wrong answer - verify error shows the right classification
14. Play through 5 substances - verify score updates correctly
15. Take a screenshot

---

## TEST 6: Indicators Module
1. Navigate to home, tap "Indicators"
2. Verify 2 tabs: "Learn", "Virtual Lab"

### TEST 6a: Learn Tab
3. Verify the pH scale explanation (0-14, 7 = neutral)
4. Verify the interactive pH bar with coloured segments (0-14)
5. Tap on different pH numbers - verify the display updates with:
   - Correct colour
   - Correct label (acid/neutral/base)
   - Example substance name
6. Tap pH 7 - verify it shows "Neutral" with green colour
7. Tap pH 1 - verify it shows "Strong acid" with red colour
8. Tap pH 14 - verify it shows "Strong base" with purple colour
9. Verify 3 indicator cards: Litmus, Phenolphthalein, Universal Indicator
10. Verify each shows acid/neutral/base colours correctly
11. Take a screenshot of the pH scale

### TEST 6b: Virtual Lab Tab
12. Tap "Virtual Lab" tab
13. Verify a substance name and indicator name are displayed
14. Verify colour option buttons are shown
15. Tap an answer - verify correct/incorrect feedback
16. Verify the feedback includes the pH and acid/base classification
17. Play 5 rounds - verify score updates

---

## TEST 7: Neutralisation Module
1. Navigate to home, tap "Neutralisation"
2. Verify 2 tabs: "Learn", "Reaction Mixer"

### TEST 7a: Learn Tab
3. Verify the H⁺ + OH⁻ → H₂O equation is shown
4. Verify the general equation: ACID + BASE → SALT + WATER
5. Verify salt naming rules (HCl→chloride, H₂SO₄→sulfate, HNO₃→nitrate)
6. Verify carbonate reaction section (ACID + CARBONATE → SALT + WATER + CO₂)
7. Verify real-world examples (bee stings, indigestion, soil)

### TEST 7b: Reaction Mixer Tab
8. Tap "Reaction Mixer" tab
9. Verify an acid and base are displayed in coloured boxes
10. Type the correct salt name and tap "Check" - verify "Correct!"
11. Type a wrong answer - verify it shows the correct salt name
12. Tap "Show full equation" - verify word and symbol equations are shown
13. Tap "Next" - verify a new reaction loads
14. Take a screenshot

---

## TEST 8: Quiz System - Single Topic
1. Navigate to home, tap "Electron Arrangement", then tap "Take the Quiz"
2. Verify quiz header shows topic emoji and "Quiz"
3. Verify question counter shows "Q1/10" (or similar)
4. Verify difficulty badge shows "Easy" initially
5. Verify a question with 4 answer options (A, B, C, D) is displayed
6. Tap the correct answer:
   - Verify it highlights green with ✓
   - Verify wrong options are not highlighted
   - Verify explanation appears in a blue box
7. Tap "Next Question" - verify next question loads
8. Answer 2 correct in a row - verify difficulty increases (badge changes to "Medium")
9. Answer 1 wrong - verify difficulty decreases
10. Answer wrong:
    - Verify selected wrong answer highlights red with ✗
    - Verify correct answer highlights green with ✓
    - Verify explanation appears
11. Complete all questions in the quiz
12. Verify score screen shows:
    - Percentage score
    - Correct/total count
    - Per-difficulty breakdown bars
    - Encouragement message
    - "Review Topic" and "Home" buttons
13. Take a screenshot of the score screen
14. Tap "Home" - verify return to home screen
15. Verify the Electron Arrangement card now shows updated mastery %
16. Verify the overall Test Readiness has also updated

---

## TEST 9: Mixed Quiz
1. From home screen, tap "Mixed Quiz - All Topics"
2. Verify questions come from different topics (check topic badge on each question)
3. Answer at least 5 questions
4. Verify the progress bar advances
5. Complete the full quiz (15 questions)
6. Verify the results screen shows:
   - Overall percentage
   - Per-topic breakdown with emoji, name, progress bar, and score
7. Tap "Back to Home" - verify return to home
8. Take a screenshot of the results

---

## TEST 10: Progress Persistence
1. Note the current mastery percentages on the home screen
2. Reload the page (refresh the browser)
3. Verify all mastery percentages are preserved after reload
4. Verify the Test Readiness bar matches the topic scores

---

## TEST 11: Mobile Responsiveness
1. Resize viewport to mobile (375x812)
2. Verify the home screen fits within the viewport without horizontal scrolling
3. Navigate to each topic - verify content doesn't overflow
4. Verify buttons are large enough to tap (at least 44px touch targets)
5. Verify text is readable (not too small)
6. Take a screenshot at mobile size

---

## BUG REPORT FORMAT

For each issue found, report:

```
### BUG [number]: [Short title]
- **Severity**: Critical / Major / Minor / Cosmetic
- **Location**: [Screen/module/tab where found]
- **Steps to reproduce**: [numbered steps]
- **Expected**: [what should happen]
- **Actual**: [what actually happens]
- **Screenshot**: [if applicable]
```

End with a summary table:
| # | Title | Severity | Module |
|---|-------|----------|--------|
| 1 | ...   | ...      | ...    |

And a section listing features that worked perfectly.
