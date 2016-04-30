# Purpose

[Ubiwrite](http://shaundaley39.github.io/Ubiwrite/) provides a bluetooth keyboard in the form of a pair of gloves.

#### The Advantages are Many:
- type (accurately and at keyboard speed) without having to sit or stand in a fixed position. 
- complementary to video glasses such as Vuzix or the new generation of Google Glass, enabling immersive computing and productive typing from anywhere
- more compact and lightweight than even the most mobile conventional keyboard
- allowing people to use dead time - e.g. while sitting on an airplane seat, on trains, while walking or while queuing
- allowing people to type in more social situations, taking input or inspiration from conversations
- allowing people, on occasion, to write emails, to write software, to write dissertations, to write blog posts or to write novels while running, while hiking or while otherwise escaping the confines of a desk. If that doesn't necessarily give us more creativity, it may at least enable healthier lifestyles.

#### The Disadvantage
(Yes honestly: there only is one disadvantage*, though it's substantial.)
- there is a learning curve.
\* a more sober analysis might find Ubiwrite gloves tragically unfashionable

This site is build to help people get up that learning curve - quickly learning the mapping between finger contact points and keys, and then achieving a high type speed with Ubiwrite.

See: [Demo](http://shaundaley39.github.io/ubiwrite-training/)

# Develop

## Installation

```
npm install
```

## Build

```
grunt build
```

or for minified assets

```
grunt build --env production
```

## Server

The following script will start a server at
[http://localhost:3000](http://localhost:3000).

```
npm start
```

## Develop

The following task will create a build, start a watch process, and start a
server at [http://localhost:3000](http://localhost:3000).

```
grunt develop
```

# Further Development

The Ubiwrite glove, in its present design, allows users to easily switch between (at most) 24 character sets, where each character set has (at most) 80 characters.

-[] Character map development... The present implementation of character map only uses one character set, and crudely provides a mapping for the 26 characters of the English-Latin alphabet (lower and upper case), the 10 digits of the decimal number system alongside common punctuation marks and control keys. Once some analysis and creative endeavour has gone into planning the allocation of characters across multiple character sets, this character map will need a modified implementation.

-[] Gamification... we could introduce personal profiles, track individual progress and award Mozilla Badges for attainment (with social media sharing of badges). That would build motivation to learn, brand loyalty and deliver free publicity. There is little point in preparing this until a first batch of the Ubiwrite product is in production.

-[] Localization... other languages and alphabets require individual character sets and training support.

-[] Special character sets... Mathematics research and education is plagued by the cumbersome nature of LaTeX. Mathematics conventions use a range of symbols that are not easily accessible, except with alt keys and long numpad combinations. A character set (or two) of mathematical symbols could be provided directly with Ubiwrite - in which case, this training would have to be adapted. This could systematically improve access and productivity in mathematics.
