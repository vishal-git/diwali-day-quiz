# Asset checklist

Drop files here with these exact names. Anything missing renders as a dashed "image pending" card with the alt text, so the game still runs.

## Question images ("then" photos, food, stamp)
| File | Question |
|---|---|
| `5.1-rock-then.jpg` | Dwayne Johnson, 1990s fanny pack photo |
| `5.3-bachchan-then.jpg` | Amitabh Bachchan, early 1970s |
| `5.4-kohli-then.jpg` | Virat Kohli, Delhi schoolboy |
| `5.5-oprah-then.jpg` | Oprah Winfrey, Nashville anchor 1970s |
| `5.6-bezos-then.jpg` | Jeff Bezos, 1999 office |
| `5.7-tendulkar-then.jpg` | Sachin Tendulkar, 14, Shivaji Park |
| `5.8-nooyi-then.jpg` | Indra Nooyi, Chennai college 1970s |
| `5.9-musk-then.jpg` | Elon Musk, teenager in Pretoria |
| `5.10-ambani-then.jpg` | Mukesh Ambani, early 1980s |
| `5.S2-priyanka-then.jpg` | Priyanka Chopra, teenager in Bareilly |
| `7.3-mithai-plate.jpg` | Mithai plate, kaju katli circled |
| `7.4-vada-pav.jpg` | Vada pav |
| `7.S1-jalebi.jpg` | Jalebi |
| `4.9-usps-diwali-stamp.jpg` | 2016 USPS Diwali Forever stamp (story page) |

## Option images
Movies: one poster per option, `<id>-opt-<slug>.jpg`. Celebrity: one current-day face per option, same pattern.
The exact filenames are in `src/data/questions.json` under `optionMedia`, e.g. `2.1-opt-spiderman.jpg`, `5.4-opt-rohit.jpg`.

Quick list:
```
grep -o '"img/[^"]*"' src/data/questions.json | sort -u
```

## Rendered in code (no file needed)
- 3.3 statue height comparison (`StatueCompare`)
- 8.10 run-scorers bar chart (`RunChart`)
- 1.S1 Gujarat outline and India reveal (`GujaratMap`, boundaries from geohacker/india GADM-derived GeoJSON)
- 9.2 Baby Shark: YouTube embed `XqZsoesa55w`, needs internet on the night
