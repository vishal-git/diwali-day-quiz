# Diwali Party Quiz 2026 — Draft 7

Changes from v6: every category now has **two Hard questions — one Hard·Kids and one Hard·Adult** (the v6 Hard became Hard·Adult, or Hard·Kids for Diwali and Riddles; a new partner was written for each). Layout is now 2/2/2/2/**2** = 10 live per regular category; Diwali 11. Everything else as v6.

Diwali 2026: **Sunday, Nov 8** (Dhanteras Fri Nov 6 · Kali Chaudas Sat Nov 7 · Diwali Sun Nov 8 · Bestu Varas Mon Nov 9 · Bhai Bij Tue Nov 10 · Labh Pancham Fri Nov 13)

**Teams:** Men (4) · Women (4) · Kids (6, ages 9–17) · **Length:** ~60 min
**Audience:** Gujarati-speaking, Hindi understood; two families Mumbai-born; in-laws visiting from India; three adults work at Capital One; most kids vegetarian; one 12-year-old tennis fan.

---

## Part 1 — Rules (starting hand — host may change anything on the night)

### The board
10 categories. Nine regular categories: **10 live questions** each (every Kids/Adult × US/India cell has two; Hard has one for Kids and one for Adults) plus spares for Swap tokens. **Diwali** is the centerpiece (11 live, every point **1.5×**). **Riddles** have no options — a team may ask for one hint instead, at the "after options" point value.

| # | Category | US side | India side |
|---|---|---|---|
| 1 | Geography | states, rivers | states, cities |
| 2 | Movies & TV | Hollywood | Bollywood |
| 3 | Local | Richmond & Virginia | Gujarat & Mumbai |
| 4 | **DIWALI (1.5×)** | Diwali in America | Diwali at home |
| 5 | Celebrity Then & Now | US | India |
| 6 | Riddles & Ukhana | English riddles | Gujarati/Hindi *ukhana* |
| 7 | Food | American | Gujarati / Mumbai / Indian |
| 8 | Sports | NFL, tennis, soccer | cricket, athletics, badminton |
| 9 | Growing Up | 2010s–20s America | 80s–90s India |
| 10 | Lucky Diya 🪔 | random draw from 1–9 | |

### A turn
1. Pick category → mode (**Kids** / **Adult**) → region (**US** / **India**). Hard needs a Hard token and comes in two flavours, **Hard·Kids** and **Hard·Adult**; the team picks which (no region choice on Hard).
2. Host reads the question. Team answers outright, or asks to see the four options (or the hint, for riddles).
3. Wrong or no answer → passes once to the next team as a steal.

### Tokens (fixed set per team; use them or lose them)
| Token | Count | What it does |
|---|---|---|
| 🔄 **Swap** | 3 | New question, same category/mode/region. The swapped question is gone. |
| 🔥 **Hard** | 2 | Unlocks a Hard question (Kids or Adult flavour, team's choice). Spent even if the team fails or passes. |
| 🎲 **Double-or-nothing** | 1 | Declared *before* the question is read. Correct = double; wrong = lose the base value. Kids/Adult only. |

### Lucky Diya 🪔 (one per team per game)
Random *unplayed* question from any category, **any mode including Hard**, any region — revealed with its category. Correct = normal value **+10**. A Hard drawn by Lucky carries **no penalty**. No token needed. Swap and Double-or-nothing still work on it.

### Suggested scoring
| | Kids / Adult | Hard | Diwali |
|---|---|---|---|
| Correct, no options/hint | 20 | 40 | ×1.5 |
| Correct, after options/hint | 10 | 20 | ×1.5 |
| Wrong | 0 | −10 adults, 0 kids (0 if via Lucky) | — |
| Away-region bonus (Kids·India / Adult·US) | +5 | — | +5 |
| Steal | 5 flat | 5 flat | 5 flat |

### Final round
Every team wagers up to half its points on one question (end of file).

---

## Part 2 — Build notes for the web page (Claude Code session)
- **Scoring stays out of the app.** The page serves questions, options/hints, answers and reveal visuals only.
- **Movies:** options shown as **posters**. **Celebrity:** options shown as **current-day face photos**. **Riddles:** a single "Hint" button instead of options.
- **Figures in reveals:** any ranking question (area, population, coastline, border, box office, run totals) shows the number for *all options* on reveal.
- **Reveal visuals:** 3.3 statue height comparison · 4.9 the 2016 USPS Diwali stamp · 1.S1 Gujarat outline on an India map · 7.10 rasgulla story card · 8.10 chart with names revealed.
- **Hard cells:** each category's Hard cell opens two doors, Kids and Adult; the team picks one. No region choice on Hard.
- **Media cells:** 9.2 Baby Shark 3-second clip (YouTube embed, start timestamp, autoplay off — host presses play); 8.10 bar chart; two optional song-intro embeds in Movies.
- **Lucky Diya:** button draws a random unplayed *live* question across all categories and shows the category with it. Spares are never drawn.

---

## Part 3 — Questions

Format: question → options (read only if asked) → **answer** (+ host notes). 📷 image · 🗺️ map · 🎵 embed · 📊 chart · ⭐ must-play.

---

## 1. GEOGRAPHY

### Kids · US
**1.1** Which US state is the *second*-largest by area, after Alaska?
A) Texas B) California C) Montana D) New Mexico → **Texas**
*Reveal:* Alaska 665,000 sq mi · Texas 269,000 · California 164,000 · Montana 147,000 · New Mexico 122,000

**1.2** Which river forms most of the border between Texas and Mexico?
A) Colorado B) Rio Grande C) Mississippi D) Brazos → **Rio Grande**

### Kids · India
**1.3** What is the capital city of India?
A) Mumbai B) Kolkata C) New Delhi D) Bengaluru → **New Delhi**

**1.4** Which mountain range runs along India's northern border?
A) Western Ghats B) Himalayas C) Andes D) Alps → **Himalayas**

### Adult · US
**1.5** Which is the only US state that borders exactly one other state?
A) Maine B) Florida C) Alaska D) Washington → **Maine** (only New Hampshire)

**1.6** Which US state has the largest population?
A) Texas B) Florida C) New York D) California → **California**
*Reveal (2024 est.):* California ~39.4M · Texas ~31.3M · Florida ~23.4M · New York ~19.9M

### Adult · India
**1.7** Which Indian state has the longest coastline?
A) Tamil Nadu B) Maharashtra C) Gujarat D) Andhra Pradesh → **Gujarat**
*Reveal:* Gujarat ~1,600 km · Tamil Nadu ~1,075 · Andhra Pradesh ~975 · Maharashtra ~720

**1.8** Which Indian state has the *smallest* population?
A) Goa B) Sikkim C) Mizoram D) Arunachal Pradesh → **Sikkim**
*Reveal (2024 proj.):* Sikkim ~0.7M · Mizoram ~1.3M · Goa ~1.6M · Arunachal Pradesh ~1.7M

### Hard · Kids
**1.9** How many states does India have?
A) 22 B) 25 C) 28 D) 32 → **28** (plus 8 union territories; it was 29 until Jammu & Kashmir became a union territory in 2019)

### Hard · Adult
**1.10** India shares its *longest* land border with which country?
A) China B) Pakistan C) Bangladesh D) Nepal → **Bangladesh**
*Reveal:* Bangladesh 4,097 km · China 3,488 · Pakistan 3,323 · Nepal 1,751

### Spares
**1.S1 (Kids)** 🗺️ *[Unlabeled outline of Gujarat]* Which Indian state is this?
A) Rajasthan B) Gujarat C) Maharashtra D) Kerala → **Gujarat**

**1.S2 (Adult)** Which US state has the *most* coastline?
A) Florida B) California C) Alaska D) Hawaii → **Alaska**
*Reveal (tidal shoreline):* Alaska ~34,000 mi · Florida ~8,400 · California ~3,400 · Hawaii ~1,050

---

## 2. MOVIES & TV
*Options displayed as posters.*

### Kids · US
**2.1** Which film was the biggest hit at the US box office in 2026?
A) Spider-Man: Brand New Day B) The Super Mario Galaxy Movie C) Toy Story 5 D) Michael → **Spider-Man: Brand New Day**
*Reveal:* domestic grosses for all four (pull at build time; Spider-Man ~$958M)

**2.2** Guess the movie from emojis: 🦁👑🌅 → **The Lion King**
(options if needed: The Lion King / Madagascar / Zootopia / The Jungle Book)

### Kids · India
**2.3** Which 2026 Ranveer Singh sequel became the second-highest-grossing Bollywood film ever worldwide, behind only *Dangal*?
A) Border 2 B) Don 3 C) Dhurandhar: The Revenge D) Pathaan 2 → **Dhurandhar: The Revenge**

**2.4** The song "Naatu Naatu" won an Oscar in 2023. Which film is it from?
A) RRR B) Baahubali C) Pushpa D) KGF → **RRR**

### Adult · US
**2.5** Which 2026 biopic became the highest-grossing musician biopic ever, passing *Bohemian Rhapsody*?
A) Elvis B) Michael C) Bob Marley: One Love D) A Complete Unknown → **Michael**

**2.6** *The Devil Wears Prada 2* came out in 2026. Which real-life magazine editor is Miranda Priestly widely believed to be modelled on?
A) Anna Wintour B) Tina Brown C) Diana Vreeland D) Grace Coddington → **Anna Wintour** (Vogue)

### Adult · India
**2.7** Which was the first Indian film nominated for the Academy Award for Best Foreign Language Film?
A) Pather Panchali B) Mother India C) Mughal-e-Azam D) Lagaan → **Mother India** (1957; lost by a single vote)

**2.8** Dilip Kumar holds the record for most Filmfare Best Actor awards with eight. Which actor shares that record?
A) Amitabh Bachchan B) Shah Rukh Khan C) Aamir Khan D) Dharmendra → **Shah Rukh Khan**

### Hard · Kids
**2.9** What was the first full-length movie made entirely with computer animation, released in 1995?
A) Shrek B) Toy Story C) Finding Nemo D) The Incredibles → **Toy Story** (Pixar's first feature)

### Hard · Adult
**2.10** What was India's first full-length talkie film, released in 1931?
A) Raja Harishchandra B) Alam Ara C) Achhut Kanya D) Devdas → **Alam Ara** (Raja Harishchandra, 1913, was the first silent feature)

### Spares
**2.S1 (Kids)** Guess the movie from emojis: 3️⃣🤪🎓 → **3 Idiots**

**2.S2 (Adult)** Which film won the very first Academy Award for Best Picture, in 1929?
A) Wings B) Sunrise C) The Jazz Singer D) Metropolis → **Wings**

🎵 *Media cell (optional):* 10-second song intro, "Name the song." One Bollywood, one Hollywood.

---

## 3. LOCAL — Richmond & Virginia (US) / Gujarat & Mumbai (India)

### Kids · US
**3.1** During the American Civil War, Richmond was the capital of which side?
A) The Union B) The Confederacy C) Neither D) Both at different times → **The Confederacy** (1861–65)

**3.2** Patrick Henry's famous 1775 speech, delivered in Richmond, is known by which line?
A) "I have a dream" B) "Give me liberty or give me death" C) "Don't tread on me" D) "We the people" → **"Give me liberty or give me death!"** (St. John's Church, Church Hill)

### Kids · India
**3.3** ⭐ The world's tallest statue, the Statue of Unity in Gujarat, honours which leader?
A) Mahatma Gandhi B) Sardar Vallabhbhai Patel C) Jawaharlal Nehru D) B.R. Ambedkar → **Sardar Patel**
*Reveal (professor moment):* **Statue of Unity 182 m** (Kevadia, Gujarat, 2018) · Spring Temple Buddha 128 m (China) · Statue of Liberty 93 m with pedestal / 46 m statue (New York) · Christ the Redeemer 38 m with pedestal (Rio de Janeiro, Brazil)

**3.4** Gir National Park in Gujarat is the only place in the world where which animal still lives in the wild?
A) Bengal tiger B) Asiatic lion C) Snow leopard D) One-horned rhino → **Asiatic lion**

### Adult · US
**3.5** 🗺️ Richmond International Airport (RIC) is actually in which county?
A) City of Richmond B) Henrico C) Chesterfield D) Hanover → **Henrico** (Sandston)

**3.6** Capital One was created in 1994 as a spin-off from which Richmond bank?
A) Crestar B) Signet Bank C) Wachovia D) Central Fidelity → **Signet Bank** (Richard Fairbank and Nigel Morris's credit-card division)

### Adult · India
**3.7** Mumbai's curved seaside promenade, famous for its necklace of lights at night, is nicknamed what?
A) The Golden Mile B) The Queen's Necklace C) The Pearl Strand D) The Diamond Curve → **The Queen's Necklace**

**3.8** Lothal, in Gujarat, was a dockyard city of which ancient civilisation?
A) Mauryan B) Indus Valley (Harappan) C) Gupta D) Chola → **Indus Valley** (one of the world's oldest known docks, ~2400 BCE)

### Hard · Kids
**3.9** How many US presidents were born in Virginia — more than any other state?
A) 4 B) 6 C) 8 D) 10 → **Eight** (Washington, Jefferson, Madison, Monroe, W.H. Harrison, Tyler, Taylor, Wilson — "the Mother of Presidents")

### Hard · Adult
**3.10** Who became the first Indian American elected to statewide office in Virginia, sworn in as Lieutenant Governor in January 2026?
A) Suhas Subramanyam B) Ghazala Hashmi C) Kiran Ahuja D) Nikki Haley → **Ghazala Hashmi**

### Spares
**3.S1 (Kids)** Richmond's minor-league baseball team is named after which animal?
A) Squirrels B) Otters C) Crabs D) Hens → **Squirrels** (the Flying Squirrels)

**3.S2 (Kids)** True or false: the James River flows out of Virginia into another state.
→ **False** — ~340 miles from the Alleghenies to Chesapeake Bay, entirely inside Virginia

**3.S3 (Adult)** Which Founding Father designed the Virginia State Capitol building in Richmond?
A) George Washington B) James Madison C) Thomas Jefferson D) Patrick Henry → **Thomas Jefferson** (modelled on a Roman temple in Nîmes)

**3.S4 (Adult)** Mumbai was originally how many separate islands?
A) 3 B) 5 C) 7 D) 9 → **Seven**

---

## 4. ⭐ DIWALI — centerpiece (11 questions, 1.5×)

### Kids · India
**4.1** Diwali celebrates the return of which prince to Ayodhya after 14 years of exile?
A) Krishna B) Rama C) Arjuna D) Hanuman → **Rama**, with Sita and Lakshmana

**4.2** The word *Deepavali* literally means what?
A) Festival of sweets B) Row of lamps C) Night of fireworks D) Victory of good → **Row of lamps** (*deepa* = lamp, *avali* = row)

**4.3** The morning after Diwali, Gujarati families greet each other "*Saal Mubarak!*" What are they wishing?
A) Happy birthday B) Happy New Year C) Good harvest D) Safe travels → **Happy New Year** — Gujarati New Year (*Bestu Varas*) is the day after Diwali

**4.4** How many days does the full Diwali festival run, from Dhanteras to Bhai Bij?
A) 3 B) 5 C) 7 D) 9 → **Five**

### Adult · India
**4.5** In the Gujarati calendar, Diwali falls on the last day of which month — the one just before Kartik begins?
A) Shravan B) Bhadarvo C) Aaso (Ashwin) D) Magshar → **Aaso** (Aaso *vad amas*; Kartik Sud 1 is New Year)

**4.6** *Kali Chaudas*, the night before Diwali, is also called Narak Chaturdashi. Which demon did Krishna defeat that day?
A) Ravana B) Hiranyakashipu C) Narakasura D) Mahishasura → **Narakasura**

**4.7** In West Bengal, Diwali night is not mainly a Lakshmi puja. Which goddess is worshipped instead?
A) Saraswati B) Durga C) Kali D) Parvati → **Kali** (Kali Puja)

**4.8** Jains also celebrate Diwali. What does the day mark for them?
A) Birth of Mahavira B) Mahavira attaining *nirvana* (moksha) C) Mahavira's first sermon D) The founding of Jainism → **Mahavira's nirvana** (527 BCE by tradition)

### Adult · US
**4.9** In 2016 the US Postal Service issued a Diwali "Forever" stamp. What did it show?
A) Lord Ganesha B) A lit diya on a gold background C) A rangoli D) Fireworks over the Taj Mahal → **A lit diya** · *Reveal:* show the stamp

### Hard · Kids
**4.10** Why does the date of Diwali change every year on the Western calendar?
A) It follows the monsoon B) It's the new-moon night of a lunar month, so it drifts against the solar calendar C) The government picks it D) It follows the autumn equinox → **New-moon night of a lunar month** (Aaso *amas*)

### Hard · Adult
**4.11** Which US president was the first to personally light a diya at a White House Diwali celebration, in 2009?
A) George W. Bush B) Barack Obama C) Bill Clinton D) Joe Biden → **Barack Obama** (the White House had hosted Diwali since 2003, but Obama was the first president to attend and light the lamp himself — the famous photo)

### Spares
*(none — add a favourite here if you want Swap coverage on Diwali)*

---

## 5. CELEBRITY THEN & NOW
*Options displayed as current-day face photos. 📷 = needs a childhood/pre-fame photo; text clue doubles as a hint.*

### Kids · US
**5.1** 📷 *Dwayne Johnson's 1990s fanny-pack-and-turtleneck photo.*
A) John Cena B) Vin Diesel C) Dwayne "The Rock" Johnson D) Jason Momoa → **The Rock**

**5.2** *(text)* She grew up on a Christmas-tree farm in Pennsylvania, moved to Nashville at 14, and her Eras Tour was the first to pass a billion dollars.
A) Taylor Swift B) Sabrina Carpenter C) Billie Eilish D) Olivia Rodrigo → **Taylor Swift**

### Kids · India
**5.3** 📷 *Amitabh Bachchan in his lean early-1970s years, before Zanjeer.* Clue: once rejected by All India Radio for his voice.
A) Dharmendra B) Amitabh Bachchan C) Rajesh Khanna D) Shashi Kapoor → **Amitabh Bachchan**

**5.4** 📷 *Virat Kohli as a chubby-cheeked Delhi schoolboy in cricket whites.* — *the one Kids cricket question*
A) Rohit Sharma B) Virat Kohli C) MS Dhoni D) Hardik Pandya → **Virat Kohli**

### Adult · US
**5.5** 📷 *Oprah Winfrey as a young Nashville TV news anchor, 1970s.*
A) Whoopi Goldberg B) Oprah Winfrey C) Michelle Obama D) Tyra Banks → **Oprah Winfrey**

**5.6** 📷 *Jeff Bezos in 1999 in a cramped office with a spray-painted "amazon.com" sign.*
A) Bill Gates B) Steve Jobs C) Jeff Bezos D) Larry Page → **Jeff Bezos**

### Adult · India
**5.7** 📷 *Sachin Tendulkar as a curly-haired 14-year-old at Shivaji Park, Mumbai.*
A) Sunil Gavaskar B) Sourav Ganguly C) Sachin Tendulkar D) Rahul Dravid → **Sachin Tendulkar**

**5.8** 📷 *Indra Nooyi as a Chennai college student in the 1970s.* Clue: played guitar in an all-girl rock band, later ran PepsiCo for 12 years.
A) Indra Nooyi B) Kiran Mazumdar-Shaw C) Chanda Kochhar D) Padmasree Warrior → **Indra Nooyi**

### Hard · Kids
**5.9** 📷 *Elon Musk as a teenager in Pretoria, South Africa, 1980s.* Clue: sold his first video game at 12, now runs Tesla and SpaceX.
A) Mark Zuckerberg B) Elon Musk C) Sam Altman D) Jeff Bezos → **Elon Musk**

### Hard · Adult
**5.10** 📷 *Mukesh Ambani as a young man, early 1980s.* Clue: left Stanford's MBA program in 1981 to join his father's polyester business.
A) Anand Mahindra B) Mukesh Ambani C) Gautam Adani D) Ratan Tata → **Mukesh Ambani**

### Spares
**5.S1 (Kids)** *(text)* He grew up in Chennai in a two-room flat with no telephone until he was 12, studied at IIT Kharagpur, and now runs Google.
A) Satya Nadella B) Sundar Pichai C) Arvind Krishna D) Shantanu Narayen → **Sundar Pichai**

**5.S2 (Adult)** 📷 *Priyanka Chopra as a teenager in Bareilly, before Miss World 2000.*
A) Deepika Padukone B) Aishwarya Rai C) Priyanka Chopra D) Alia Bhatt → **Priyanka Chopra**

---

## 6. RIDDLES & UKHANA
*No options. A team may ask for the one hint, at the "after options" value. In-laws read the Gujarati/Hindi ones aloud.*

### Kids · US
**6.1** What has keys but can't open a single lock?
Hint: *it's related to music.* → **A piano**

**6.2** I have cities but no houses, forests but no trees, and water but no fish. What am I?
Hint: *you unfold me, or open me on your phone.* → **A map**

### Kids · India
**6.3** Five diyas are burning on the windowsill on Diwali night. A gust blows out two. How many diyas are left in the morning?
Hint: *what happens to a diya that keeps burning all night?* → **Two** — the two that blew out; the other three burned down to nothing

**6.4** I go *up* when the rain comes *down*. What am I?
Hint: *you carry me in the monsoon.* → **An umbrella** (*chhatri*)

### Adult · US
**6.5** What can travel all the way around the world while staying in a corner?
Hint: *it's on an envelope.* → **A postage stamp**

**6.6** I have a neck but no head, and two arms but no hands. What am I?
Hint: *you're probably wearing one.* → **A shirt**

### Adult · India
**6.7** *Ukhana:* "**Ek raja ni anokhi rani, puchhdi thi pive paani.**" — *A king's unusual queen, who drinks water through her tail.*
Hint: *she's lit tonight.* → **A diya / *divo*** (drinks oil through its wick)

**6.8** "**Ek thaal moti se bhara, sabke sir par aundha dhara.**" — *A plate full of pearls, turned upside down over everyone's head.*
Hint: *look up after dark.* → **The night sky with stars**

### Hard · Kids
**6.9** What can fill a whole room but takes up no space at all?
Hint: *think about what this festival celebrates.* → **Light**

### Hard · Adult
**6.10** I am taken from a mine and shut up in a wooden case, from which I am never released, and yet almost everyone uses me. What am I?
Hint: *you sharpen me.* → **Pencil lead** (graphite)

### Spares
**6.S1 (Kids)** What has hands but cannot clap?
Hint: *it's on the wall.* → **A clock**

**6.S2 (Adult)** The more of me there is, the less you can see. What am I?
Hint: *the opposite of tonight.* → **Darkness**

---

## 7. FOOD

### Kids · US
**7.1** Which fast-food chain is famously closed every Sunday?
A) Chick-fil-A B) Popeyes C) Chipotle D) Panera → **Chick-fil-A**

**7.2** Sweet Frog, the frozen-yogurt chain founded in Richmond, says FROG stands for what?
A) Fully Rely On God B) Frozen, Really Oh-so Good C) Fruit, Rolls, Oats & Granola D) Fresh, Real, Organic, Good → **Fully Rely On God** (founded 2009, Short Pump)

### Kids · India
**7.3** 📷 *[Mithai plate, one diamond-shaped silver-topped sweet circled]* Name this sweet.
A) Barfi B) Kaju katli C) Peda D) Mysore pak → **Kaju katli**

**7.4** 📷 *[Photo of a vada pav — fritter in the bun, green chutney, fried chilli on the side]* What is this?
A) Pav bhaji B) Vada pav C) Dabeli D) Misal pav → **Vada pav** (Mumbai's "Bombay burger"; dabeli is the look-alike trap)

### Adult · US
**7.5** By law, a whiskey must be at least 51% of which grain to be called bourbon?
A) Rye B) Barley C) Wheat D) Corn → **Corn**

**7.6** Which Virginia town gives its name to America's most famous country ham?
A) Williamsburg B) Smithfield C) Lynchburg D) Culpeper → **Smithfield** (Isle of Wight County; the Virginia law once required the hogs be peanut-fed)

### Adult · India
**7.7** Which spice is the most expensive in the world by weight?
A) Cardamom B) Vanilla C) Saffron (kesar) D) Cloves → **Saffron** (hand-picked stigmas; ~150,000 flowers per kilo; India's comes from Kashmir)

**7.8** Dabeli, the Kutchi street snack, was invented in which Kutch town in the 1960s?
A) Bhuj B) Mandvi C) Gandhidham D) Anjar → **Mandvi** (credited to Keshavji Gabha Chudasama, who sold it for one *aana*)

### Hard · Kids
**7.9** Chocolate is made from the beans of which tree?
A) Coffee B) Cacao C) Carob D) Vanilla → **Cacao** (the beans are fermented, dried and roasted; the Aztecs drank it bitter)

### Hard · Adult
**7.10** West Bengal fought a years-long legal battle with which neighbouring state over who invented the rasgulla?
A) Odisha B) Bihar C) Jharkhand D) Assam → **Odisha**
*Reveal (story card):* Odisha claimed the rasgulla originated centuries ago in Puri, offered to Goddess Lakshmi at the Jagannath temple on *Niladri Bije* (the Pahala rasgulla). West Bengal credited Kolkata confectioner Nobin Chandra Das with inventing the spongy modern version in 1868. Both states filed for Geographical Indication tags; West Bengal won "Banglar Rasogolla" in 2017, Odisha won "Odisha Rasagola" in 2019 — so, officially, both are right.

### Spares
**7.S1 (Kids)** 📷 *[Photo of a plate of jalebi]* What is this sweet?
A) Imarti B) Jalebi C) Chakli D) Fafda → **Jalebi** (imarti is the thicker, flower-shaped cousin; chakli is savoury)

**7.S2 (Adult)** Which world-famous dish is credited to Delhi's Moti Mahal restaurant in the years after Partition?
A) Biryani B) Chole bhature C) Butter chicken D) Rogan josh → **Butter chicken** (invented to use up leftover tandoori chicken)

---

## 8. SPORTS

### Kids · US
**8.1** The 2026 FIFA World Cup was hosted by the US, Canada and Mexico. Who won the final in New Jersey?
A) Argentina B) France C) Spain D) England → **Spain** (1–0 over Argentina in extra time; Ferran Torres)

**8.2** How many Grand Slam tennis tournaments are played each year?
A) 3 B) 4 C) 5 D) 6 → **Four** (Australian Open, French Open, Wimbledon, US Open)

### Kids · India
**8.3** Neeraj Chopra won India's first-ever Olympic gold in athletics, at Tokyo in 2021. In which event?
A) 100 m sprint B) Long jump C) Javelin throw D) Marathon → **Javelin**

**8.4** P.V. Sindhu, a two-time Olympic medallist, plays which sport?
A) Tennis B) Badminton C) Table tennis D) Squash → **Badminton**

### Adult · US
**8.5** Who won this year's Super Bowl (LX, February 2026)?
A) New England Patriots B) Seattle Seahawks C) Kansas City Chiefs D) Philadelphia Eagles → **Seattle Seahawks** (29–13 over the Patriots at Levi's Stadium; Kenneth Walker III was MVP; Bad Bunny did halftime)

**8.6** How long is a marathon?
A) 20 miles B) 24.5 miles C) 26.2 miles D) 30 miles → **26.2 miles** (42.195 km — the odd distance dates to the 1908 London Olympics)

### Adult · India
**8.7** India won the 2026 T20 World Cup at home in Ahmedabad — its third title. Who did India beat in the final?
A) Australia B) South Africa C) New Zealand D) England → **New Zealand** (by 96 runs; Bumrah 4 for 15)

**8.8** Who won India's first-ever *individual* Olympic gold medal, in shooting at Beijing 2008?
A) Leander Paes B) Abhinav Bindra C) Rajyavardhan Rathore D) Sushil Kumar → **Abhinav Bindra** (10 m air rifle; the in-laws will remember the day)

### Hard · Kids
**8.9** Which country has hosted the Summer Olympics the most times?
A) United Kingdom B) France C) United States D) Japan → **United States** (1904 St. Louis, 1932 and 1984 Los Angeles, 1996 Atlanta — and Los Angeles again in 2028)

### Hard · Adult
**8.10** 📊 *[Bar chart: the five highest run-scorers in all international cricket combined, names hidden, bars in random order]* Which bar is Sachin Tendulkar?
→ **The tallest** (34,357 runs). *Reveal names:* Tendulkar · Kumar Sangakkara · Virat Kohli · Ricky Ponting · Jacques Kallis — pull current totals at build time; Kohli's is still moving.

### Spares
**8.S1 (Kids)** How many players from one team are on a basketball court at the same time?
A) 5 B) 6 C) 7 D) 11 → **Five** (ten on court in all; up to 13 on the bench)

**8.S2 (Adult)** Which team won the IPL in 2026, defending its 2025 title?
A) Mumbai Indians B) Chennai Super Kings C) Royal Challengers Bengaluru D) Gujarat Titans → **Royal Challengers Bengaluru** (beat Gujarat Titans in the final)

**8.S3 (Adult)** In American football, how many points is a touchdown worth — before the extra point?
A) 3 B) 6 C) 7 D) 10 → **Six**

---

## 9. GROWING UP — Nostalgia

### Kids · US
**9.1** In Minecraft, which green creature sneaks up on you and explodes?
A) Zombie B) Enderman C) Creeper D) Skeleton → **Creeper**

**9.2** 🎵 *[Play 3 seconds of the intro]* Name this song.
A) Baby Shark B) Wheels on the Bus C) Johny Johny Yes Papa D) Cocomelon theme → **Baby Shark** (one of the most-viewed videos in YouTube history)

### Kids · India
**9.3** Which actor played the Indian TV superhero Shaktimaan in the 1990s?
A) Mukesh Khanna B) Shekhar Suman C) Jackie Shroff D) Arun Govil → **Mukesh Khanna**

**9.4** What does the "G" in Parle-G biscuits originally stand for?
A) Glucose B) Gold C) Great D) Gujarat → **Glucose** (launched as Parle Gluco in 1938; the girl on the packet has been there since the 1960s)

### Adult · US
**9.5** In what year did Apple release the first iPhone?
A) 2005 B) 2007 C) 2009 D) 2010 → **2007**

**9.6** Which sitcom about six friends in New York ran from 1994 to 2004?
A) Seinfeld B) Frasier C) Friends D) How I Met Your Mother → **Friends**

### Adult · India
**9.7** Who played Lord Rama in Ramanand Sagar's *Ramayan* on Doordarshan in 1987?
A) Nitish Bharadwaj B) Arun Govil C) Sunil Lahri D) Dara Singh → **Arun Govil** (streets emptied every Sunday morning)

**9.8** Which little hatchback, launched in 1983, became India's first "people's car"?
A) Hindustan Ambassador B) Premier Padmini C) Maruti 800 D) Tata Indica → **Maruti 800**

### Hard · Kids
**9.9** The very first video ever uploaded to YouTube, in 2005, was 19 seconds long and shot at a zoo. What was its title?
A) "Hello World" B) "Me at the zoo" C) "First upload" D) "Charlie bit my finger" → **"Me at the zoo"** (co-founder Jawed Karim in front of the elephants at the San Diego Zoo)

### Hard · Adult
**9.10** Shah Rukh Khan's acting debut was as Abhimanyu Rai in which 1989 Doordarshan series?
A) Circus B) Fauji C) Wagle Ki Duniya D) Nukkad → **Fauji**

### Spares
**9.S1 (Kids)** Which app's logo is a white ghost on a yellow background?
A) Snapchat B) TikTok C) Discord D) BeReal → **Snapchat**

**9.S2 (Adult)** Which 1990s TV quiz show, hosted by Derek O'Brien, was sponsored by a malt drink?
A) Kaun Banega Crorepati B) Bournvita Quiz Contest C) Mastermind India D) Quiz Time → **Bournvita Quiz Contest**

---

## 10. LUCKY DIYA 🪔
No questions of its own — random unplayed live question from categories 1–9, any mode (Hard included, no penalty), any region, +10.

---

## FINAL ROUND — wager up to half your points
Gujarati families say "*Saal Mubarak*" on the morning after Diwali. Which Vikram Samvat year begins on Monday, Nov 9, 2026?
A) 2081 B) 2082 C) 2083 D) 2084 → **Vikram Samvat 2083**

---

## Media checklist
- 🗺️ Gujarat outline (1.S1) · RIC airport context (3.5, optional)
- 📷 Reveal: statue height comparison (3.3) · USPS Diwali stamp (4.9) · rasgulla story card (7.10)
- 📷 Then-photos: The Rock (5.1) · Bachchan (5.3) · Kohli (5.4) · Oprah (5.5) · Bezos (5.6) · Tendulkar (5.7) · Nooyi (5.8) · Musk (5.9) · Ambani (5.10) · Priyanka (5.S2)
- 📷 Food photos: mithai plate with kaju katli circled (7.3) · vada pav (7.4) · jalebi (7.S1)
- 🖼️ Posters for all Movies options · current face photos for all Celebrity options
- 🎵 Baby Shark 3-second clip (9.2) · two optional song-intro embeds (Movies)
- 📊 Run-scorers bar chart (8.10)

## Totals
9 regular categories × 10 live = 90 · Diwali 11 · **101 live questions** · 20 spares.
