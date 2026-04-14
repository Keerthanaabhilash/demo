export type ArticleContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "raw"; text: string };

export const articleBodies: Record<string, ArticleContentBlock[]> = {
  "inside-the-teen-brain-digital-world": [
    {
      type: "raw",
      text: `Inside the Teen Brain in a Digital World:
How Screens Rewire Attention, Emotions, and Motivation
By Ikigai Teen Coach Arathi
“They know it’s bad—so why can’t they stop?”
This is one of the most common frustrations parents and educators voice today.
A teenager knows they should sleep earlier, focus better, or put the phone away. They agree when spoken to. Sometimes they even promise to change. And yet, the behaviour continues.
This contradiction often gets labelled as laziness, lack of discipline, or defiance.
Neuroscience tells us a very different story. A real-life situation many families recognise A mother once shared this with me:
Her 15-year-old daughter was bright, articulate, and self-aware. She openly admitted that scrolling late at night left her tired and anxious the next morning. She disliked how distracted she felt at school.
And yet, every night, the same pattern repeated.
When asked why, the girl said quietly,
“I know it’s not good… but my mind just doesn’t slow down unless I’m on my phone.”
This is not a motivation problem.
It is a brain–environment mismatch.
The teen brain: powerful, unfinished, and vulnerable
The adolescent brain is not broken. In fact, it is highly adaptive and powerful.
But it is still under construction.
The part of the brain responsible for:
- impulse control
- long-term planning
- emotional regulation
- pausing before reacting
— the prefrontal cortex — continues developing well into the mid-twenties.
At the same time, the emotional and reward centres of the brain are fully active during adolescence.
This creates a natural imbalance:
- Strong emotions
- High sensitivity to reward
- Lower capacity to pause and regulateThis is normal development.
What is not normal is the environment this brain is growing inside today.
How digital platforms interact with the teen brain
Most digital platforms are built around one system: dopamine-driven reward.
Dopamine is not the “pleasure chemical” as commonly believed.
It is the motivation and anticipation chemical — it keeps us seeking, checking, refreshing.
Every notification, reel, message, or “like” creates:
- anticipation
- emotional arousal
- a small dopamine spike
For a developing teen brain, this system is especially powerful.
Attention is not weakening — it is being trained differently What’s actually happening is attention training, not attention loss.
Digital environments train the brain to:
- switch quickly
- scan rapidly
- seek novelty
- avoid sustained effort
This clashes with environments that require:
- deep focus
- patience
- delayed reward
Emotional amplification in the digital space Teen emotions are already intense — by design.
Digital spaces amplify this by:
- constant comparison
- visible validation (likes, views, comments)
- fear of missing out
- exposure to curated, unrealistic narratives
The result is emotional fluctuation:
- sudden confidence highs
- sharp drops in self-worth
- increased anxiety without clear cause
Why “just be disciplined” doesn’t work
Self-regulation is not a personality trait. It is a developmental skill.
And skills require:
- modelling
- practice
- environment design- emotional safety
What actually supports a developing teen brain
1. Shift from judgement to understanding
2. Reduce overstimulation before expecting regulation
3. Teach awareness before control
4. Co-create boundaries instead of enforcing them
A hopeful perspective
The adolescent brain is not fragile — it is plastic.
With the right guidance, teens can rebuild focus, strengthen emotional awareness, learn digital self-regulation, and develop long-term resilience.
Reflection for parents and educators
Instead of starting with rules this week, try one conversation:
- “What does your phone help you with?”
- “When does it make things harder for you?”
- “What would make balance feel possible?”`,
    },
  ],

  "your-brain-isnt-broken": [
    {
      type: "raw",
      text: `Your Brain Isn’t Broken.
It’s Just Growing Up in a Crazy Digital World.
Ikigai Teen by Irene Pais
Let’s start with something important:
If you’ve ever said:
“I’ll stop scrolling after 5 minutes” and then it’s suddenly 1 hour later
“I should sleep” but your hand still opens Instagram or YouTube
“I don’t even enjoy this anymore, so why am I still watching?”
That does NOT mean you’re weak, lazy, or have no self-control.
It means your brain is growing up in a highly addictive digital world.
■ Your brain is under construction
Your brain is not fully “done” yet — and that’s actually a good thing.
The part of your brain that helps with: self-control, focus, planning, stopping yourself before doing something impulsive
…is still building itself. It usually finishes developing in your mid-20s.
But the part of your brain that feels emotions strongly, loves excitement, and wants rewards, fun, and social connection is already fully active.
So basically, your brain is like:
“I WANT THIS NOW”
and the “let’s think calmly” part is still loading… That’s normal.
■ Why your phone is extra powerful for your brain
Apps, games, and social media are designed to do one thing very well: keep you hooked.
Every time you get a notification, see a new reel, get a like or message, or refresh your feed, your brain gets a small dopamine hit.
Dopamine is not the “happy chemical”. It’s the “go check again” chemical.
It makes your brain say:
“One more video”
“One more scroll”
“One more minute”
For your age group, this effect is even stronger than for adults.
So if you feel like: “My hand opens the app before I even decide” — that’s brain wiring + app design working together.
■ “I can’t focus anymore”
A lot of people your age say:
“I can’t concentrate like before”
“Studying feels impossible”
“My mind keeps jumping around”
Your attention is not broken. It is being trained by your environment.
Short videos, fast content, quick switches train your brain to get bored fast, want constant change, and avoid slow or difficult things.
So when you sit with a book or classwork, your brain goes:
“This is too slow. Where is the stimulation?” That’s not stupidity. That’s training effect.
The good news? Brains can be re-trained.
■ Why emotions feel more intense online
Your emotions are already strong. That’s part of growing up.
But online life adds comparison, likes and views, fear of missing out, and seeing “perfect” lives all the time.
So some days you feel confident and happy.
Other days you feel suddenly insecure, anxious, or low for “no clear reason”.
A lot of that is your nervous system reacting to what you consume.
■ Why “just control yourself” doesn’t work
Self-control is a skill. And skills take time and training to build.
Telling yourself “I should be more disciplined” without changing your environment is like saying “I should be stronger” while trying to lift weights that are too heavy.
You don’t need more self-hate. You need smarter systems.
■ What actually helps
1. Understand your own patterns.
2. Reduce overload before trying to “control”.
3. Don’t aim for “no phone”. Aim for “better use”.
4. Build friction (phone away while studying, notifications off, app limits).
A tired, overstimulated brain has almost zero willpower. Sleep, breaks, and offline time are brain maintenance.
■ The most important thing to remember
Your brain is plastic. That means it changes based on what you do repeatedly.
You are NOT stuck like this.
Focus can come back. Motivation can come back. Calm can come back.
Not by hating yourself. But by working with your brain instead of against it.
❤■ Final truth
You are not weak.
You are growing up in the most attention-hijacking time in history.
Learning to manage your mind in this world is a superpower.
And yes — it is 100% learnable.`,
    },
  ],

  "from-tool-to-trap-digital-dependence-in-teens": [
    {
      type: "raw",
      text: `From Tool to Trap: When Digital Use Quietly Turns into
Digital Dependence in Teens (Early warning signs most families miss)
There is a moment many parents remember clearly.
Not the day their child got a smartphone—but the day they realised something had changed.
The child who once came out of their room to talk now stays inside longer.
The child who once put the phone down easily now becomes irritated when asked to. The child who used to sleep without a struggle now finds it hard to wake up.
Nothing dramatic happened.
No crisis.
No obvious “misuse.” Just… a slow shift.
A familiar home situation
A mother of a 15-year-old boy once shared something that stayed with me.
“He’s not doing anything wrong. He’s not on any bad sites. He studies. He goes to school. But he’s always tired, always irritable, and always with his phone. If I ask him to keep it away, he snaps. If I don’t, he disappears into it.”
This is not an unusual story anymore.
And it points to a reality many families miss:
digital dependence rarely begins with extreme behaviour. It begins with small, invisible changes in daily life.
From use, to overuse, to dependence
We often use the word “addiction” too quickly—and that creates fear, denial, or defensiveness.
But there is a more useful way to look at this:
Use is when technology serves a purpose.
Overuse is when it starts occupying more space than intended.
Dependence is when it begins regulating mood, energy, sleep, or self-worth.
Most teens do not jump from use to addiction. They drift into dependence.
Why this is happening so easily today
Today’s digital platforms are not just tools. They are attention systems.
They are designed to:
Keep users engaged longer than planned
Offer constant novelty
Reduce the need for effort or patience
Provide quick emotional relief from boredom, stress, or discomfort
Adolescents worldwide are spending increasing hours online, and many report difficulty disengaging even when they want to.
In India, this challenge is intensified by early smartphone access and extremely affordable data.
This means many teens are not just using their phones—they are recovering, soothing, and escaping through them.
The four quiet warning signs most families miss
Digital dependence does not announce itself loudly. It shows up as small but consistent shifts.
1. Mood changes when devices are removed
2. Sleep is the first casualty
3. Loss of interest in offline pleasures
4. The phone becomes an emotional regulator
This is not a character flaw or parenting failure
Your teen is not weak. And you have not failed as a parent.
Self-regulation in teens is a skill that needs support, structure, and time to develop.
Why strict bans often backfire
What teens need is not just control.
They need guidance in building inner control. What early, healthy intervention actually looks like
Move from confrontation to curiosity.
Rebuild offline anchors before removing screens.
A hopeful closing
Digital dependence does not begin with a fall. It begins with a drift.
And that means it can be noticed early—and corrected gently.`,
    },
  ],

  "from-tool-to-trap-phone-starts-using-you": [
    {
      type: "raw",
      text: `From Tool to Trap: How to Know When Your Phone
Starts Using You
You don’t need anyone to tell you this:
Your phone is useful.
It helps you learn, relax, connect, escape boredom, and sometimes even feel better.
And yet, if you’re honest, you might also recognise this feeling: “I open my phone for one thing… and suddenly a lot of time is gone.”
This doesn’t mean you’re weak.
It means you’re living in a world designed to pull attention.
A quiet, common story
A 16-year-old once said:
“I’m not doing anything wrong. I just feel tired all the time. And when I don’t have my phone, I feel restless.”
That’s how most digital dependence starts. Not with a fall. With a drift.
There’s a difference between using and needing
Using your phone = you choose it
Overusing your phone = you lose track of time
Depending on your phone = your mood, energy, or peace depends on it
Four gentle signs to notice
1. You feel irritated or restless without your phone
2. Your sleep is getting worse
3. Things you once enjoyed feel boring or too much effort
4. You automatically reach for your phone when you feel stressed, bored, or uncomfortableWhy this is not really your fault
Your brain is still growing.
Apps are designed to keep you scrolling.
Self-control is not a personality trait. It is a skill.
The goal is not quitting your phone
The goal is to use it without losing yourself.
Two small but powerful shifts
1. Start noticing instead of judging
2. Build one daily offline anchor
A calm truth
Your phone is a tool.
Your mind is more powerful.
If you can notice when you are drifting, you can always come back to yourself.`,
    },
  ],

  "social-media-self-worth-comparison-culture": [
    {
      type: "raw",
      text: `Social Media, Self-Worth, and Comparison Culture:
Why Today’s Teens Feel 'Never Enough'
A father once said something very quietly during a parent meeting:
“My daughter is doing well in school. She’s talented. She has friends. But every night, she looks at her phone and somehow ends up feeling like she’s failing at life.”
Today’s teenagers are not just growing up with social media. They are growing up inside a comparison machine.
A familiar, invisible struggle
A 14-year-old girl, bright and capable, began refusing activities she once loved. She started saying, “Everyone else is better. I’m not interesting enough.” What had changed was simple: hours of scrolling through curated lives.
The world teens are emotionally growing up in
Earlier generations compared themselves to classmates.
Today’s teens compare themselves to hundreds of peers, influencers, and edited lives.
Why comparison hits so deeply in adolescence
Adolescence is when young people ask: Who am I? Am I good enough? Where do I belong? Social media amplifies and monetises these questions.
The hidden psychological cost
Heavy social media use is linked with lower self-esteem, anxiety, and body image issues. But the biggest danger is the normalisation of feeling “less than.”
When self-worth becomes externally managed
Likes and views slowly become emotional mirrors.
This is not about weak-minded teens
This is a generation under high psychological pressure.
Why telling teens “just ignore it” doesn’t work Belonging feels like survival to a teenager.
What actually helps
Shift focus from performance to person.
Teach media literacy.
Create spaces where teens are not being measured.
A hopeful closing
They are enough before they are impressive.
Help them build a self that is rooted, not reflected.`,
    },
  ],

  "social-media-comparison-and-you": [
    {
      type: "raw",
      text: `Social Media, Comparison, and You: Why So Many
Teens Feel 'Never Enough'
Have you ever looked at someone’s post and suddenly felt worse about your own life? Or felt like everyone else is doing better, living better, moving faster? If yes, you’re not alone. And you’re not broken.
A 15-year-old once said, “It feels like everyone else is moving ahead, and I’m just… stuck.” Nothing was actually wrong with his life. But after hours of scrolling, his mind had learned to measure his life against hundreds of others.
Your teenage years are when you’re figuring out who you are, what you’re good at, and where you belong. Social media turns this natural searching into a 24/7 comparison game.
You are comparing your real, messy, behind-the-scenes life to other people’s edited, filtered, best moments. That is not a fair comparison.
Constant comparison can make you feel “not enough,” doubt your own progress, and chase approval instead of building self-respect. Likes and views start feeling like proof of your value. But they are not.
Feeling this way does not mean you’re weak. It means your brain is still growing and is sensitive to social feedback.
The goal is not to quit social media. The goal is to use it without letting it define you.
Three small but powerful shifts:
1. Remember what you see is not the full story.
2. Notice how you feel after scrolling.
3. Build something that doesn’t need an audience.
You do not need to be extraordinary to be worthy. You are not here to be a better version of someone else. You are here to become a more real version of yourself.`,
    },
  ],

  "digital-is-not-the-enemy-for-parents": [
    {
      type: "raw",
      text: `Digital Is Not the Enemy: The Missed Opportunities Parents Overlook While Focusing Only on Screen Time
A school principal once said something honest in a parent meeting:
“We keep fighting phones. But we are not teaching children what to do with them.”
Most conversations about teens and technology revolve around one question: “How much screen time is too much?” But that is the wrong starting point.
A familiar home scene
In one family, a 13-year-old boy was constantly told to “get off the phone.” His parents saw only gaming and videos.
What they missed was this:
He was learning video editing on free apps.
Following animation tutorials.
Experimenting with storytelling.
To them, it looked like time-wasting. To him, it was skill-building.
Not all screen time is the same
One hour of mindless scrolling is not the same as one hour of learning or creating. When we only measure time, we miss purpose.
The last decade has already proved this
Globally, millions of young people have learned real skills online.
During COVID, students who knew how to learn online coped far better than those who used devices only for entertainment.
In India, many students from small towns and cities alike have built careers starting with nothing more than a smartphone and cheap data.
During the pandemic, the gap became clear: some used the internet to grow, others got stuck scrolling.
The difference was not access. It was direction.
The digital world is not optional anymore
Our children will study, work, and collaborate online.
Trying to keep them away from screens is like trying to teach swimming without water.
The real danger: passive consumption
The problem is not screens. The problem is unconscious use.
Without guidance, the pattern becomes: Scroll, watch, consume, repeat.
Why many teens stay consumers
Not because they are lazy.
But because no one teaches them how to learn online properly or turn interest into skill.
A healthier approach
Change the question from “How long?” to “For what?” Encourage one digital skill seriously. Keep real-world structure strong.
Technology should fit into life, not replace it.
A hopeful closing
Digital is not the enemy. Unconscious use is.
The same phone can create a passive consumer or a capable creator. The difference is guidance.`,
    },
  ],

  "digital-is-not-the-enemy-for-teens": [
    {
      type: "raw",
      text: `Digital Is Not the Enemy: How to Use Your Phone
Without Wasting Your Life
Let’s start with an honest question.
Do you ever pick up your phone to do one thing… and then realise a lot of time is gone?
That doesn’t mean you’re lazy.
It means you’re living in a world designed to pull attention.
But here’s an important truth:
Your phone is not the enemy.
Unconscious use is.
A small but important story
A 14-year-old once said, “My parents think I’m just wasting time. But I’m learning video editing from YouTube.”
He wasn’t wrong. But he also noticed that sometimes he drifted into endless scrolling.
That’s the real issue for most people.
Not using the phone. Drifting inside it.
Not all screen time is the same
One hour of:
scrolling and watching is not the same as one hour of learning, building, or creating.
Your phone can be:
a toy or a tool.
The difference is how you use it.
The world you’re growing up in
Whether you like it or not, your future studies and work will involve technology. So learning to use it well is not optional.
It’s a life skill.
The real trap
The trap is not the phone.
The trap is this pattern:
Scroll. Watch. Consume. Repeat.
It slowly trains your brain to avoid effort and chase easy stimulation.
How to use your phone without losing yourself
1. Ask one simple question: “Am I learning, building, or just escaping?”
2. Pick one digital skill and grow it seriously: editing, design, coding, writing, music, anything.
3. Keep your real life strong: sleep, movement, friends, routines.
A calm truth to end with
Your phone is powerful.
But your mind is more powerful.
Don’t let a tool decide the direction of your life.
Use it.
Don’t live inside it.`,
    },
  ],
};
