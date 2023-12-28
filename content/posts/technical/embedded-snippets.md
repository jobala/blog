---
title: Embedded Github Snippets
date: 2023-06-24
slug: embedded-gh-snippets
categories:
  - projects
keywords: build systems
---

I wanted to make adding snippets to my articles effortless instead of copy pasting, maintaining different versions of
the same thing or worse screenshoting snippets.
[Gists](https://docs.github.com/en/get-started/writing-on-github/editing-and-sharing-content-with-gists/creating-gists)
don't cut it and their styling wouldn't have felt native to my blog so I decided to rollout my own solution.

I wanted an experience similar to
[Github Embedded Snippets](https://github.blog/2017-08-15-introducing-embedded-code-snippets/), where I could paste a
[permalink](https://github.com/jobala/picasso/blob/4c195969620aee03742f9283c0a08d4b5a123b0d/scheduler/schedule.go#L10-L20)
and the snippet gets rendered. For example putting `<permalink>` in an article should render the snippet below.

{{< gh "https://github.com/jobala/picasso/blob/4c195969620aee03742f9283c0a08d4b5a123b0d/scheduler/schedule.go#L10-L20" >}}

By the way, the snippet above demonstrates this feature, it is the real thing, look at this article's source code to
confirm.

I knew I could use [shortcodes](https://gohugo.io/content-management/shortcodes/) for this sort of thing since my blog
is based on Hugo. I was planed to implement the snippet embedding as a Hugo shortcode using the templating engine.
However, I learnt very quickly that this won't be possible because Hugo only
[supports `getJSON` and `getCSV`](https://gohugo.io/content-management/shortcodes/) for remote data fetching and I
needed to fetch text files. This felt like the end of the road but then a thought occured to me, what if I supplement
the shortcode functionality with javascript? I could use the shortcode to get the permalink and javascript to fetch the
text file and create the code block.

Hugo shortcodes are a similar to functions having a name and arguments and to create one I created `gh.html` file in the
`shortcodes` directory and its definition is as shown below.

{{< gh "https://github.com/jobala/blog/blob/d6e46dfe44f5b3faaa72ea1721331bfe2e24c8ff/themes/butterick/layouts/shortcodes/gh.html#L3-L5" >}}

`.Get 0` gets the first argument passed to the shortcode. This shortcode simples get the permalink and set it as the
inner html for the pre tag. Putting `{{gh <permalink>}}` in a content file will 'call' the shortcode and pass the
permalink as an argument.

To render snippets for each shortcode in a content file, I first get all of them by class name.

{{< gh "https://github.com/jobala/blog/blob/d6e46dfe44f5b3faaa72ea1721331bfe2e24c8ff/themes/butterick/static/js/gh.js#L1-L1" >}}

And then for each shortcode I extracted the permalink from which I got the snippet path and range -- first and last line
-- for the snippet.

{{< gh "https://github.com/jobala/blog/blob/d6e46dfe44f5b3faaa72ea1721331bfe2e24c8ff/themes/butterick/static/js/gh.js#L4-L6" >}}

Next I created the required html elements, `codeEl` contains a block of code, `linkToSnippet` links out to Github, you
can try this by clicking on the file path in the snippet below. `snippetHeader` contains the `linkToSnippet` and
`snippetContainer` is the parent element for `codeEl` and `snippetHeader`.

{{< gh "https://github.com/jobala/blog/blob/d6e46dfe44f5b3faaa72ea1721331bfe2e24c8ff/themes/butterick/static/js/gh.js#L9-L12" >}}

The snippet below, shows how these elements were nested.

{{< gh "https://github.com/jobala/blog/blob/master/themes/butterick/static/js/gh.js#L22-L27" >}}

After creating the elements I set class attributes so that I could style them later on.

{{< gh "https://github.com/jobala/blog/blob/d6e46dfe44f5b3faaa72ea1721331bfe2e24c8ff/themes/butterick/static/js/gh.js#L15-L19" >}}

Finally I fetched the snippet and create a code block.

{{< gh "https://github.com/jobala/blog/blob/d6e46dfe44f5b3faaa72ea1721331bfe2e24c8ff/themes/butterick/static/js/gh.js#L29-L30" >}}

One of the risks with this approach is the over reliance on Github as a snippet source because if Github goes down so do
my snippets. However, the likelihood of Github failing is low, so the risk is minimal.
