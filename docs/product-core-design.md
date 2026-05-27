# Mood Earth Product Core Design

## Core Thesis

Mood Earth is not a mood tracker, a simple matching app, or a generic AI music tool.

It is a global emotional resonance system:

> Two strangers' emotions briefly meet on Earth, then become a private co-created artifact: one piece of music and one beautiful particle image that can be saved, downloaded, and shared.

The product must make the user feel:

- My emotion has a place in the world.
- Someone else is resonating with this moment.
- This resonance created something real.
- I can keep and share this emotional memory.

## Target User Need

The core user is not looking for ordinary social networking. They often have emotions they cannot or do not want to publish directly.

They need:

- A low-pressure way to express emotion.
- Anonymous but meaningful resonance.
- Proof that they are not alone.
- A beautiful result that makes the emotion worth keeping.
- A reason to return and see how their emotional universe changes.

Mood Earth should avoid forcing direct chat too early. The user wants to be understood before they want to talk.

## Primary Loop

The core loop should be:

```text
Cast Emotion
-> See Global Heat
-> Find Resonance
-> Lock Resonance
-> Co-create Music + Particle Image
-> Save / Download / Share
-> Return to Memory Atlas
```

This loop is stronger than:

```text
Select mood -> Get result -> Match person
```

because it gives the user an artifact and a memory, not only a result.

## End-to-End Experience Architecture

The product should feel like one continuous emotional ritual, not a set of separate pages.

The ideal first-time and returning-user flow:

```text
Enter Earth
-> Locate Current Emotional Position
-> Calibrate Emotion Through Interaction
-> Generate Emotional Voiceprint / Frequency
-> Reveal Global Heat Imaging
-> Show Match Candidates and Resonance Scores
-> User Chooses a Resonance Partner
-> Resonance Lock
-> Co-create Music + Particle Visual
-> Export a Short MP4 Memory
-> Light One Point on the Daily Memory Map
```

### 1. Enter Earth

The first screen should not be a marketing landing page or a menu. It should immediately place the user inside the Mood Earth world.

User feeling:

```text
I am entering an emotional planet that can receive my current state.
```

UI direction:

- A living Earth or emotional field appears first.
- The user's approximate location or current "signal origin" slowly emerges.
- The interface should create a soft sense of arrival, not ask questions immediately.
- A previous memory point can glow faintly if the user has used the product before.

Product reason:

The user needs to feel that Mood Earth is a world, not a utility. This makes every later action feel meaningful.

### 2. Locate Current Emotional Position

Before calibration, the system should suggest that the user is being gently located emotionally and spatially.

This does not need to be a precise real GPS product feature at the beginning. It can be a designed emotional positioning moment.

Possible signals:

- local time
- city or region
- recent saved emotional pattern
- chosen visibility mode
- current global emotional weather

User feeling:

```text
Mood Earth is finding where I am, both in the world and inside myself.
```

Product reason:

This gives the transition into emotional calibration a strong reason. The calibration is not a test; it is tuning the user's current signal.

### 3. Emotional Calibration Without Quiz UI

The emotion input must avoid simple answer-card behavior.

Better interaction patterns:

- Drag a light point through an emotional field.
- Tune an orbit until it stabilizes.
- Adjust a sound texture by sliding across rain, wind, heartbeat, ocean, city, strings.
- Let the user place their emotion closer to body, sky, sea, city, or night.
- Let the sentence input be optional, appearing only after the signal has shape.
- Use micro-animation so every choice changes color, particle density, pulse speed, and tone.

Calibration dimensions:

- mood: the emotional weather
- need: what response the user wants
- intensity: how close or strong the emotion feels
- texture: how the emotion sounds
- body/spatial feeling: where the emotion lives
- sentence: a private line if the user wants to name it

Product reason:

The user should feel they are discovering their emotional signal, not filling out a form.

### 4. Emotional Voiceprint / Frequency

After calibration, Mood Earth should generate a visible and audible emotional voiceprint.

This is the user's personal signal for this session.

It should include:

- frequency name
- waveform or orbit shape
- color spectrum
- pulse speed
- sound texture
- short emotional interpretation
- shareable but private-feeling summary

Example:

```text
Soft Blue Tide
Low-frequency rain texture
Main need: being understood
Signal strength: 7.2
```

Product reason:

The voiceprint is the bridge between private emotion and global matching. It gives the system something concrete to send into the world.

### 5. Global Heat Imaging and Match Discovery

The heatmap should appear after the voiceprint, because now the user understands what signal is being searched.

The heat imaging should show:

- global emotional heat
- cities with similar frequencies
- resonance potential around the user's signal
- emotional density and intensity
- match candidates with scores

The match view should combine macro and micro layers:

- Macro: living Earth heat field.
- Mid: city resonance zones.
- Micro: 3-5 candidate signals with match score, mood, need, sound texture, city, and reason.

Product reason:

The user should first feel the scale of the world, then choose a specific person or signal. This prevents matching from feeling random or shallow.

### 6. User Choice Before Resonance Lock

The user should choose who to resonate with.

The product should not auto-lock too quickly, because choosing gives agency and emotional consent.

Candidate cards should show:

- city
- anonymous name or signal name
- resonance score
- shared emotion
- complementary difference
- sound texture
- what can be created together

Example:

```text
Seoul / Mori_08
87% resonance
Shared: quiet, low-frequency wind, wanting company
Potential memory: slow blue-green orbit with wind and distant room tone
```

Product reason:

Choice makes the later co-created artifact feel more personal. The user feels they selected this resonance, not that the system forced it.

### 7. Resonance Lock

After the user chooses a candidate, the product needs a clear locking ritual.

Experience:

- The user's signal and the partner's signal move into the same field.
- The heatmap narrows into one route or orbital line.
- Particles from both signals begin to mix.
- A faint music layer appears before the final creation.
- The resonance score stabilizes.

Product reason:

This moment creates anticipation and emotional weight. It marks the transition from discovery to co-creation.

### 8. Music + Particle Co-creation

The result should be a short generated memory, not only a static page.

The artifact should contain:

- a short music loop or music simulation
- a unique particle visual
- title
- cities or signal route
- shared mood and need
- resonance score
- generation timestamp
- one poetic line

The particle visual should not be a generic poster. It should visibly encode the two signals:

- two color families merging
- two particle motions becoming one orbit
- density shaped by intensity
- route or distance shown subtly
- shared need as the center glow

Product reason:

This is the payoff. The user came with an invisible feeling and leaves with something visible, audible, and ownable.

### 9. Exportable MP4 Memory

The strongest share object should be a short MP4-style memory page, even if the first implementation simulates it.

The export should feel like:

```text
8-15 seconds
music pulse
animated particles
title and shared signal
Mood Earth mark
```

Download/share options:

- save image
- save short video / MP4 when supported
- copy memory text
- save to Memory Atlas
- share card

Product reason:

MP4 gives the artifact motion and sound. It is more spreadable than a static card and more emotionally convincing than text.

### 10. Light One Point on the Daily Memory Map

After saving or sharing, the system should show that today's emotional memory has been added to the user's map.

This should be a final reward moment:

```text
One point lights up on today's Memory Atlas.
```

The point should store:

- date
- emotional voiceprint
- partner signal
- city/country
- generated music memory
- generated particle image/video
- match score
- user's sentence if provided

Product reason:

This turns one session into long-term retention. The user has a reason to return because their emotional map is growing day by day.

## Feature 1: Emotion Signal

Every user input should become an `Emotion Signal`, not just a form record.

An Emotion Signal should contain:

- mood
- need
- intensity
- sentence
- sound texture
- color spectrum
- body or spatial feeling
- timestamp
- resonance frequency
- decay time
- visibility mode

Product reason:

The user should feel they are casting a living signal into the world, not completing a questionnaire.

UI direction:

- Make the flow feel like tuning a frequency.
- Use sliders, orbit controls, particle response, sound texture choices, and atmospheric visual feedback.
- Keep text poetic but clear.

## Feature 2: Mood Heat Imaging

The heatmap is a core product surface, not decoration.

It should answer:

- Where does my emotion exist in the world right now?
- Which cities are close to my current frequency?
- Where can my signal create a shared memory?
- How has global emotion moved over time?

Heatmap layers:

- Global Mood Layer: current global emotional climate.
- Resonance Potential Layer: cities or signals that are closest to the user's emotion.
- Intensity Layer: emotional strength and density.
- Need Layer: what people want now, such as understanding, quiet, company, courage, creation.
- Time Drift Layer: 1 hour, 24 hour, and 7 day emotional movement.
- Personal Echo Layer: where the user's past signals resonated.

Visual language:

- Lonely: deep blue cold cloud.
- Anxious: high-frequency broken ripple.
- Calm: slow cyan-green tide.
- Hope: warm golden orbit.
- Tired: low-opacity mist.
- Warm: soft orange-pink glow.

Product reason:

The heatmap turns private emotion into world-scale evidence. It tells the user: this feeling is not isolated.

## Feature 3: Resonance Match

Matching should not be only "similar people".

There should be three match types:

- Mirror Match: someone emotionally similar, proving the user is not alone.
- Stabilizing Match: someone calmer or more grounded, helping the user feel held.
- Complementary Match: someone different but compatible, opening a new emotional direction.

Each match should explain:

- shared mood
- shared need
- shared sound texture
- shared time window
- city/culture signal
- resonance score
- why this match can create a memory

Product reason:

The user should understand why this resonance matters. A match without explanation feels random.

## Feature 4: Resonance Lock

Before generating the artifact, the product needs a clear ritual moment:

```text
Your signal has locked with a low-frequency blue signal from Seoul.
Resonance: 87%.
Shared texture: rain, quiet, being understood.
Generating your shared memory...
```

Product reason:

This moment creates emotional anticipation. It turns matching into an event.

UI direction:

- Two signals move toward each other.
- Particle fields begin to overlap.
- The global heatmap narrows into one route or orbit.
- Music preview starts as a faint pulse.

## Feature 5: Co-created Music

The music is the time dimension of the resonance.

Generation inputs:

- mood controls tonal color
- intensity controls pulse density
- need controls harmony warmth
- sound texture controls samples
- city/culture controls environmental layer
- resonance score controls fusion level

Example:

```text
User: lonely / 7 / understood / rain
Match: calm / 5 / company / wind

Generated memory:
Deep Blue Rain Orbit
Rain low frequency + wind grain + distant piano + slow heartbeat pulse
```

Product reason:

Music makes the emotional connection feel alive and replayable. It gives users a reason to return.

## Feature 6: Co-created Particle Image

The particle image is the spatial dimension of the resonance.

Generation inputs:

- color from both users' mood spectrum
- particle density from intensity
- orbit shape from resonance score
- diffusion direction from city distance
- center glow from shared need
- texture from sound signal

Design rules:

- The image must be beautiful enough to save.
- The image must be unique enough to feel owned.
- The image must visually encode why this resonance happened.
- It should work as a shareable poster without looking like a generic template.

Product reason:

The particle image is the user's visible proof of connection. It turns an invisible emotion into something collectible and spreadable.

## Feature 7: Save, Download, Share

After each resonance, users should be able to:

- save the memory to their atlas
- download the particle image
- replay the music
- share the image/card
- copy a poetic share line

Product reason:

Sharing should not feel like marketing. It should feel like preserving a beautiful private moment that the user chooses to reveal.

## Feature 8: Memory Atlas

Memory Atlas is the long-term retention system.

It should collect:

- all co-created music
- all particle images
- global resonance routes
- cities that have resonated with the user
- emotional climate changes over time
- received echoes

Views:

- Emotion Star Map
- Monthly Climate
- Resonance Routes
- Saved Memories
- Sound Archive

Product reason:

The user returns because their emotional universe is growing.

## Feature 9: Emotional Persona

The persona should not label the user with a static personality.

It should describe a changing emotional climate:

- dominant emotional frequency
- recovery speed
- night activity pattern
- common needs
- preferred sound textures
- color spectrum
- high-resonance cities
- common match type
- particle style tendency

Product reason:

The user should feel seen over time, not judged. Persona makes repeated use meaningful.

## Current Product Priority

Build in this order:

1. Upgrade current emotion input into Emotion Signal.
2. Strengthen global heat imaging and resonance potential.
3. Add Resonance Lock as the transition before creation.
4. Make the creation result feel like music + particle image, not only a card.
5. Add save/download/share behavior for the generated memory.
6. Add Memory Atlas and Emotional Persona for return use.

## Non-negotiable Design Direction

- Premium, immersive, healing, artistic, spatial, emotionally expressive.
- Avoid ordinary forms, generic app dashboards, cartoon UI, and heavy cyberpunk.
- Make every screen feel like part of a continuous emotional ritual.
- The product should not explain too much on screen. It should let interaction and visual feedback carry the meaning.
- The strongest visual signature should be the living Earth heat field and the co-created particle memory.
