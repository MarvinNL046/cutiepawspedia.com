# Pet Toxicity Content - Safe Language Guidelines

## Purpose
This guide ensures all pet toxicity content is **AdSense-safe**, **EEAT-compliant**, and **scalable** for 5,000+ pages without manual review.

---

## CRITICAL RULES

### 1. NO EXACT DOSAGES
**NEVER mention specific mg/kg values**

❌ BAD:
```
"50-100 mg per kilogram = dodelijk"
"Zelfs een kwart tablet (50-125mg) kan dodelijk zijn"
```

✅ GOOD:
```
"Zelfs zeer kleine hoeveelheden kunnen ernstige, vaak fatale vergiftiging veroorzaken"
"Er bestaat geen veilige dosering voor katten/honden"
```

### 2. NO SENSATIONAL CAPS/EMOJI
**Use professional urgency, not panic**

❌ BAD:
```
"⚠️ JA – DODELIJK GIFTIG"
"☠️ Dodelijke Dosering"
"🚨 Direct Antwoord: DODELIJK GIFTIG"
"ALTIJD een noodsituatie"
```

✅ GOOD:
```
"Ja – ernstig giftig en levensbedreigend"
"Gevaarlijke hoeveelheden"
"Direct antwoord: Ernstig giftig"
"Dit vereist altijd onmiddellijke veterinaire hulp"
```

### 3. TREATMENT INFO - KEEP GLOBAL
**Don't specify timing windows or exact protocols**

❌ BAD:
```
"N-Acetylcysteïne (NAC) moet binnen 8 uur gegeven worden"
"Behandeling moet binnen 1-2 uur starten"
```

✅ GOOD:
```
"De behandeling vereist onmiddellijke veterinaire zorg en kan bestaan uit tegengiffen en ondersteunende therapie"
"De exacte aanpak wordt altijd bepaald door de dierenarts"
"Snelle actie verbetert de behandelkansen aanzienlijk"
```

### 4. PROFESSIONAL MEDICAL TONE
**Authoritative but not alarmist**

❌ BAD:
```
"GA NIET WACHTEN OP SYMPTOMEN"
"Elke minuut telt!"
"Dit is ALTIJD een noodsituatie"
```

✅ GOOD:
```
"Wacht niet op symptomen voordat je contact opneemt met een dierenarts"
"Snelle actie is belangrijk bij vermoeden van inname"
"Dit vereist altijd professionele veterinaire beoordeling"
```

---

## METADATA GUIDELINES

### Title Format
❌ BAD: `"Is Paracetamol Giftig voor Katten? | DODELIJK - Spoed Nodig"`
✅ GOOD: `"Is Paracetamol Giftig voor Katten? | Symptomen & Wat Te Doen"`

### Description Format
❌ BAD: `"⚠️ LEVENSGEVAARLIJK: Paracetamol is DODELIJK voor katten!"`
✅ GOOD: `"Paracetamol is zeer gevaarlijk voor katten. Leer de symptomen herkennen en wat je moet doen bij vermoeden van inname."`

### Keywords
- Focus on informational keywords
- Include "symptomen", "wat te doen", "dierenarts"
- Avoid "dodelijk", "nood", "spoed" in keywords

---

## VERDICT BOX STYLING

### Color Mapping (Keep but reduce intensity)
- **HOOG** → Red gradient (from-red-50 to-red-100, NOT from-red-900)
- **MIDDEL** → Orange/amber (from-orange-50 to-amber-50)
- **LAAG** → Green (from-emerald-50 to-green-50)

### Verdict Text
❌ BAD:
```tsx
<h2>🚨 Direct Antwoord: DODELIJK GIFTIG</h2>
<p>✗ Er bestaat GEEN veilige dosering</p>
```

✅ GOOD:
```tsx
<h2>Direct antwoord: Ernstig giftig</h2>
<p>Er bestaat geen bekende veilige dosering voor katten</p>
```

---

## EMERGENCY CONTACT SECTION

### Keep urgency, remove panic

❌ BAD:
```
"BIJ CONTACT: BEL DIRECT DE DIERENARTS"
"⏱️ TIJDFACTOR CRUCIAAL"
```

✅ GOOD:
```
"Bij vermoeden van inname: neem contact op met je dierenarts"
"Snelle actie verbetert de behandelkansen"
```

---

## FAQ GUIDELINES

### Questions - Keep factual
✅ "Is paracetamol giftig voor katten?"
✅ "Wat zijn de symptomen van vergiftiging?"
✅ "Wat moet ik doen als mijn kat dit heeft gegeten?"

### Answers - Professional tone
❌ "NEE, ABSOLUUT NIET. Er bestaat GEEN veilige dosering!"
✅ "Nee, er bestaat geen veilige dosering paracetamol voor katten. Neem altijd contact op met je dierenarts voor veilige alternatieven."

---

## SCHEMA.ORG MARKUP

### Keep professional in structured data too

❌ BAD in JSON-LD:
```json
"text": "JA, paracetamol is DODELIJK giftig voor katten..."
```

✅ GOOD in JSON-LD:
```json
"text": "Ja, paracetamol is zeer gevaarlijk voor katten en kan ernstige gezondheidsproblemen veroorzaken..."
```

---

## MEDICAL DISCLAIMER

### Standard text to use:
```
Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Bij vermoeden van vergiftiging dient altijd onmiddellijk contact te worden opgenomen met een dierenarts.
```

---

## ICON USAGE

### Allowed (sparingly):
- ⚠️ for warnings (max 2 per page)
- 📞 for contact info
- ✓ for safe items
- ✗ for dangerous items (no skull/death emojis)

### NOT Allowed:
- ☠️ Skull
- 🚨 Sirens/alarms
- 💀 Death imagery
- Excessive emoji chains

---

## SYMPTOM DESCRIPTIONS

### Keep medical, avoid drama

❌ BAD:
```
"Het bloed wordt letterlijk nutteloos"
"Organen falen achtereenvolgens"
```

✅ GOOD:
```
"Het vermogen van het bloed om zuurstof te transporteren wordt verminderd"
"Dit kan leiden tot problemen met meerdere organen"
```

---

## TIMELINE REFERENCES

### General, not specific

❌ BAD:
```
"Binnen 1-4 uur na inname"
"24-72 uur: Terminale fase"
```

✅ GOOD:
```
"Symptomen kunnen zich binnen enkele uren ontwikkelen"
"Zonder behandeling kunnen symptomen verergeren"
```

---

## SUMMARY CHECKLIST

Before publishing any toxicity page, verify:

- [ ] No exact mg/kg dosages mentioned
- [ ] No ALL CAPS except for H1 substance name
- [ ] No skull/death/alarm emojis
- [ ] Max 2 warning emojis per page
- [ ] Treatment info is general, not protocol-specific
- [ ] Timeline references are vague ("enkele uren" not "1-4 uur")
- [ ] Professional medical tone throughout
- [ ] Disclaimer present at bottom
- [ ] FAQ answers are factual, not sensational
- [ ] Title/description don't use CAPS or alarm words

---

## CONVERSION EXAMPLES

### Full before/after comparison:

**BEFORE:**
```
☠️ Dodelijke Dosering voor Katten
50-100mg per kilogram lichaamsgewicht = DODELIJK
Voor een gemiddelde kat van 4-5 kg betekent dit:
🔴 1 enkele tablet paracetamol 500mg = LEVENSGEVAARLIJK
```

**AFTER:**
```
Gevaarlijke hoeveelheden voor katten
Zelfs zeer kleine hoeveelheden paracetamol kunnen bij katten tot ernstige gezondheidsproblemen leiden.
Er bestaat geen bekende veilige dosering. Zelfs een fractie van een tablet kan
voor een kat al problematisch zijn.
```

---

*Last updated: 2025-12-15*
*For use by CutiePawsPedia toxicity page generation agents*
