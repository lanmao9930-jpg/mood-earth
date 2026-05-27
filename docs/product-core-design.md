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

