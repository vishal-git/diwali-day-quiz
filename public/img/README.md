# Asset checklist

Drop files here with these exact names. Anything missing renders as a dashed "image pending" card with the alt text, so the game still runs.

## Still missing (two files)
| File | Question |
|---|---|
| `5.8-nooyi-then.jpg` | Indra Nooyi, Chennai college 1970s (only found inside a Facebook post) |
| `5.9-musk-then.jpg` | Elon Musk, teenager in Pretoria (only found inside Reddit/Instagram embeds) |

Until they land, those two questions show a silhouette "mystery" card with the clue line, so they still play.

## Everything else is in place
108 of 110 referenced files are here; sources and licences for all of them are in `CREDITS.md`. The exact filenames the app expects are in `src/data/questions.json`:
```
grep -o '"img/[^"]*"' src/data/questions.json | sort -u
```
Drop a replacement under the same name to swap any picture; no code change needed.

## Rendered in code (no file needed)
- 3.3 statue height comparison (`StatueCompare`)
- 8.10 run-scorers bar chart (`RunChart`)
- 1.S1 Gujarat outline and India reveal (`GujaratMap`, boundaries from geohacker/india GADM-derived GeoJSON)
- 9.2 Baby Shark: YouTube embed `XqZsoesa55w`, needs internet on the night
