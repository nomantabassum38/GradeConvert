# GradeConvert — International to German Grade Converter

A professional, open-source web tool that converts grades from 25+ international grading systems to the German academic grading scale (1–5). Built as a static site — no server, no dependencies, no data stored.

## Live Demo

Deploy to GitHub Pages and add your URL here.

## Features

- **25+ grading systems** — Europe, Americas, Asia & Pacific
- **Modified Bavarian formula** — the standard used by German universities (anabin / HRK)
- **Custom scale support** — enter any min/max for unlisted systems
- **ECTS grade mapping** — A through F equivalent
- **Pass/Fail indicator** — based on the 4.0 threshold
- **Copy result** — one-click clipboard export
- **No dependencies** — pure HTML, CSS, and vanilla JavaScript
- **Responsive** — works on desktop and mobile

## Grading Formula

The conversion uses the **modified Bavarian formula**:

```
German Grade = 1 + 3 × (1 − Percentile)
```

Where `Percentile = (obtained − min) / (max − min)` for ascending scales, or inverted for descending scales (e.g. Austria, Germany, Czech Republic).

A German grade of **1.0 is the best** and **4.0 is the minimum passing grade**. Anything above 4.0 is a fail.

## German Grade Scale

| Grade | Text           | Meaning       | ECTS |
|-------|----------------|---------------|------|
| 1.0–1.5 | sehr gut     | Very good     | A    |
| 1.6–2.5 | gut          | Good          | B    |
| 2.6–3.5 | befriedigend | Satisfactory  | C    |
| 3.6–4.0 | ausreichend  | Sufficient    | D    |
| 4.1–5.0 | nicht bestanden | Fail       | F    |

## Supported Systems

| Region  | Countries |
|---------|-----------|
| Europe  | Austria, Belgium, Czech Republic, Denmark, Finland, France, Germany, Hungary, Italy, Netherlands, Norway, Poland, Russia, Spain, Sweden, Switzerland, UK |
| Americas | USA (GPA & %), Canada, Brazil, Mexico |
| Asia/Pacific | China, India, Japan, Australia, Pakistan, Turkey |
| Other   | Custom scale |

## Deploy to GitHub Pages

1. Fork or clone this repository
2. Go to **Settings → Pages**
3. Set source to **main branch, root folder**
4. Your site will be live at `https://yourusername.github.io/grade-converter`

No build step needed — it's just static files.

## Project Structure

```
grade-converter/
├── index.html    # Main HTML structure and content
├── style.css     # All styling (CSS variables, responsive)
├── app.js        # Conversion logic and interactivity
└── README.md     # This file
```

## Contributing

Pull requests are welcome. To add a new grading system:

1. Open `app.js`
2. Add an entry to the `SYSTEMS` object:
   ```js
   country_key: { min: 0, max: 100, label: "Country Name (scale)", note: "description" }
   ```
3. Add the `<option>` in the appropriate `<optgroup>` in `index.html`
4. Add a row to the reference table in `index.html`

For inverted scales (where a lower number is better), add `inverted: true` and set `min` to the worst value, `max` to the best value.

## License

MIT License — free to use, modify, and deploy.

## Disclaimer

This tool is for informational purposes only. Always verify your grade conversion with your target institution, as individual universities may use different conversion tables.
