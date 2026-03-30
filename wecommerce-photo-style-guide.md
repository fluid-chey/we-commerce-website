# We-Commerce Photo Style Guide & Gemini Prompting Strategy

## Image Inventory

All 28 images saved to `/tmp/wecommerce-images/`. Of those, here's the classification:

### Non-Photographic (skip for style analysis)
| # | File | Type |
|---|------|------|
| 01 | logo.png | Hand-drawn wordmark |
| 02-06 | partner logos | Corporate logos (Thermomix, ColorStreet, ASEA, Yoli, Rain) |
| 07 | underline-blue.png | Brush stroke graphic element |
| 08 | commerce-is-broken.png | Illustration (app icons on black background) |
| 17 | builder-feature1.jpg | UI screenshot (form editor) |
| 24 | payments-feature1.jpg | UI screenshot (payment toggles) |
| 26 | connect-feature1.jpg | UI screenshot (sync dashboard) |

### Photographic Images (the style foundation)

| # | File | Subject |
|---|------|---------|
| 09 | woman-phone-credit-card.png | Woman smiling, holding phone + credit card, close-up |
| 10 | woman-watching-video.png | Woman from behind watching video on phone, intimate |
| 11 | woman-showing-friend-phone.png | Two women outdoors looking at phone together |
| 12 | ceo-hero.webp | Bearded man at desk with laptop + phone (+ UI overlay) |
| 13 | reclaim-time-ceo.webp | Two colleagues collaborating at laptop |
| 14 | reps-hero.webp | Two women on couch laughing, one with tablet (+ UI overlay) |
| 15 | fairshare-reps.webp | Hand holding phone showing lock screen notification |
| 16 | builder-hero.jpg | Woman at desk using computer, indoor office (+ UI overlay) |
| 18 | builder-feature2.jpg | Macro shot of screen showing product page UI |
| 19 | mobile-app-hero.webp | Two young women under tree with phone + products (+ UI overlay) |
| 20 | mobile-app-hand.webp | Hand holding phone showing We-Commerce app, desk setting |
| 21 | cmo-hero.webp | Young man with camera on gimbal, content creator (+ UI overlay) |
| 22 | marketing-cmo.webp | Laptop on desk showing Rain brand dashboard |
| 23 | payments-hero.webp | Young Asian woman on busy street using phone (+ UI overlay) |
| 27 | fairshare-hero.webp | Woman in red sweater looking at phone on city street (+ UI overlay) |
| 28 | fairshare-feature1.jpg | Messy desk with scattered papers + laptop (X overlay = "old way") |

---

## Photo Style Analysis

### 1. Color Grading & Tone
- **Warm, muted, desaturated palette.** Every photo has pulled-back saturation with a warm amber/sepia shift. No pure whites, no punchy blacks.
- **Vintage film emulation.** Resembles analog film stock (Kodak Portra 400/800 or Fuji 400H). Grain is present but subtle. Highlights bloom slightly warm, shadows lift to brown/olive rather than pure black.
- **Consistent color cast:** Warm golden-brown tones dominate. Skin tones run warm and honey-toned. Greens shift toward olive/sage. Blues are muted to teal-gray.
- **Low-contrast midtones.** The images avoid harsh contrast. Shadows are lifted/milky. Highlights are gently rolled off. The histogram sits compressed in the middle range.

### 2. Lighting
- **Soft, natural, ambient light.** No visible flash. No hard directional studio light. Everything feels lit by window light or overcast outdoor light.
- **Backlit or side-lit subjects.** Many images have light coming from behind or to the side, creating gentle rim light and soft face illumination.
- **Golden hour / warm interior light.** Outdoor shots have late-afternoon warmth. Indoor shots feel like they're lit by warm-toned natural window light with no cool overhead fluorescents.

### 3. Composition & Framing
- **Tight to medium crops.** Most shots are cropped fairly close to the subject. Very few wide establishing shots. The viewer feels physically close to the subject.
- **Portrait orientation dominant.** Nearly every image is portrait/vertical format.
- **Shallow depth of field.** Backgrounds are consistently soft/blurred. Aperture is wide (f/1.4-2.8 equivalent). This isolates subjects and keeps focus intimate.
- **Slightly off-center framing.** Subjects are often placed to one side, leaving space for UI overlay elements (a deliberate brand choice).
- **Over-the-shoulder and close-up angles.** Intimate, voyeuristic framing. We're looking at people in their natural moments, not posed studio portraits.

### 4. Subject Matter & Scenarios
- **People using phones/devices.** This is the dominant motif — nearly every photo shows someone interacting with a mobile phone, laptop, or tablet.
- **Diverse, aspirational, real-feeling people.** Mix of genders, ethnicities, ages. Not overly polished model types. Feel like "elevated everyday people."
- **Casual/lifestyle settings.** Coffee shops, home offices, city streets, couches, outdoor leisure. Never corporate boardrooms or sterile studios.
- **Authentic micro-moments.** People smiling at their phones, showing friends something, working at desks. Unposed, candid energy.
- **Solo or pairs.** Max 2-3 people per image. Intimate scale.

### 5. Wardrobe & Props
- **Neutral, earth-toned clothing.** Cream, beige, olive, rust, muted sage. Very few bright colors (one exception: the green sweater in #14, but it's still muted).
- **Casual-elevated style.** Tank tops, linen shirts, denim jackets, sweaters. Not formal, not sloppy.
- **Phones as central prop.** Modern smartphones appear in nearly every shot.

### 6. Post-Processing Signature
- **Lifted blacks / faded shadow look.** Shadows never reach true black — there's always a milky, faded floor.
- **Slight film grain.** Organic texture throughout, not smooth digital.
- **Warm split-toning.** Highlights pull warm gold, shadows pull warm brown/olive.
- **Reduced vibrance with maintained warmth.** Colors are desaturated but the warm channel is preserved, giving a cohesive warm-muted look.
- **Soft vignetting.** Subtle darkening at edges, especially in the hero composites.

---

## Gemini Nano Banana Prompting Strategy

### Base Style Prompt (prepend to every generation)

```
Warm vintage film photography style, Kodak Portra 400 film emulation.
Soft natural window light, shallow depth of field with creamy bokeh.
Muted desaturated colors with warm amber-golden tones. Lifted shadows
with milky faded blacks, no harsh contrast. Subtle film grain texture.
Warm honey skin tones. Earth-toned color palette. Intimate close-up
framing, portrait orientation. Candid authentic moment, not posed.
```

### Subject-Specific Prompt Templates

**Person Using Phone (most common need):**
```
[Base style prompt]. A [age] [ethnicity descriptor] [gender] [action
with phone], wearing [earth-toned casual clothing]. Setting: [warm
interior / city street / outdoor cafe]. Shot from [angle: over-shoulder
/ medium close-up / tight crop on hands and device]. Soft backlight
from [window / golden hour sun]. Background is softly blurred.
```

**Collaboration/Sharing Moment:**
```
[Base style prompt]. Two people [looking at phone together / sharing
screen / collaborating at laptop], [sitting on couch / at desk /
outdoors]. Genuine smiles, candid interaction. Warm natural light from
the side. Neutral earth-toned clothing. Shallow depth of field
isolating subjects from background.
```

**Workspace/Desk Scene:**
```
[Base style prompt]. A person [working at desk / typing on laptop],
[home office / cafe setting] with [plants / coffee cup / minimal
props]. Warm ambient light from nearby window. Shot from slight angle,
medium-close framing. Laptop and phone visible. Calm productive mood.
```

**Content Creator:**
```
[Base style prompt]. A [person] creating content with [camera / gimbal
/ ring light], wearing a [bold but muted colored top]. Home studio or
casual setting. Confident creative energy. Warm directional light.
```

**Street/Urban Lifestyle:**
```
[Base style prompt]. A [person] walking on a [city street / market /
urban area], looking at their phone with a slight smile. Casual
elevated outfit. Background city elements blurred with shallow depth of
field. Golden hour warm backlight. Slightly desaturated urban tones.
```

### Critical Prompt Modifiers

Always include these to stay on-brand:

| Element | Include | Avoid |
|---------|---------|-------|
| Color | "warm muted amber tones, Kodak Portra" | "vibrant", "saturated", "neon", "cool blue" |
| Lighting | "soft natural light, no flash" | "studio lighting", "ring light", "harsh shadow" |
| Contrast | "low contrast, lifted shadows, milky blacks" | "high contrast", "dramatic", "moody dark" |
| Grain | "subtle organic film grain" | "smooth", "clean digital", "HDR" |
| Mood | "candid, authentic, warm, approachable" | "posed", "editorial", "corporate", "formal" |
| DOF | "shallow depth of field, creamy bokeh" | "everything in focus", "deep depth of field" |
| Wardrobe | "earth tones, cream, beige, olive, rust" | "bright colors", "neon", "suits", "formal wear" |
| Setting | "cafe, home office, couch, city street" | "corporate office", "studio backdrop", "gym" |

### Negative Prompt Additions (if model supports)
```
No harsh lighting, no flash photography, no high contrast, no
saturated colors, no cool blue tones, no studio backdrop, no formal
clothing, no posed model look, no HDR, no smooth digital look,
no corporate setting, no stock photo aesthetic.
```

### Example Full Prompts Ready to Use

**Homepage hero replacement:**
```
Warm vintage film photography, Kodak Portra 400 emulation. A young
woman in her late 20s with wavy brown hair, smiling warmly while
looking at her smartphone, holding a credit card in her other hand.
She wears a cream-colored casual top. Soft golden window light from
the left, shallow depth of field with warm blurred cafe background.
Muted amber color palette, lifted milky shadows, subtle film grain.
Intimate medium close-up, portrait orientation. Candid authentic
moment, warm honey skin tones.
```

**Team collaboration shot:**
```
Warm vintage film photography, Kodak Portra 400 emulation. Two
colleagues in their 30s leaning over a laptop together, one pointing
at the screen. Diverse pair, wearing earth-toned casual business
clothing. Warm natural window light from behind, creating gentle rim
light. Modern home office with plants in soft-focus background.
Low contrast, lifted shadows, muted warm tones. Subtle organic film
grain. Close framing, portrait orientation. Authentic collaborative
energy.
```

**Mobile commerce street scene:**
```
Warm vintage film photography, Kodak Portra 400 emulation. A young
woman in a light denim jacket walking through a bustling city market,
glancing at her phone with a slight contented smile. Golden hour
backlight creating warm flares. Shallow depth of field, urban
background reduced to warm blurred shapes. Muted desaturated tones
with amber highlights. Lifted faded shadows. Subtle film grain.
Medium shot from slight angle, portrait orientation.
```

---

## Composition Notes for Overlay Images

Many We-Commerce photos are designed with **UI mockup overlays** composited on top. When generating the photography layer for these:

- Frame the subject to **one side** (usually right) leaving open space on the left for the UI card
- Keep the **open area** relatively simple (blurred background, not busy) so UI elements read cleanly on top
- The photo serves as **atmospheric backdrop** — the UI overlay is the focal point, so the photo should support, not compete
- Slightly **darken the overlay zone** edges (natural vignette) helps the white UI cards pop

---

## Quick Reference: The We-Commerce Look in One Sentence

> Warm Portra 400 film look — muted amber tones, soft natural light, shallow depth of field, candid diverse people using phones in casual lifestyle settings, with lifted milky shadows and subtle grain.
