# Asset checklist

Drop files here with these exact names. Anything missing renders as a dashed "image pending" card with the alt text, so the game still runs.

## Still missing (two files)
| File | Question |
|---|---|
| `5.8-nooyi-then.jpg` | Indra Nooyi, Chennai college 1970s (only found inside a Facebook post) |
| `5.9-musk-then.jpg` | Elon Musk, teenager in Pretoria (only found inside Reddit/Instagram embeds) |

Until they land, those two questions show a silhouette "mystery" card with the clue line, so they still play.

## Everything else is in place
108 of 110 referenced files are here (112 files after the two v8 additions); sources and licences for all of them are in `CREDITS.md`. The exact filenames the app expects are in `src/data/questions.json`:
```
grep -o '"img/[^"]*"' src/data/questions.json | sort -u
```
Drop a replacement under the same name to swap any picture; no code change needed.

## Made for v8 (7 Nov 2026)
- `3.1-richmond-fan-map.jpg` — OpenStreetMap tiles (zoom 15) of central Richmond, the Fan outlined and shaded in red with an arrow, the map's own "The Fan" label painted over. © OpenStreetMap contributors, ODbL.
- `3.5-richmond-skyline-fed.jpg` — "Skyline of Richmond, Virginia" by Jim (Flickr, 2008) via Wikimedia Commons, CC BY-SA 2.0, with a red arrow added on the Federal Reserve tower at far left.

## Rendered in code (no file needed)
- 3.3 statue height comparison (`StatueCompare`)
- 8.10 run-scorers bar chart (`RunChart`)
- 1.S1 Gujarat outline and India reveal (`GujaratMap`, boundaries from geohacker/india GADM-derived GeoJSON)
- 9.2 Baby Shark: YouTube embed `XqZsoesa55w`, needs internet on the night
