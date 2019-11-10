# Make it accessible: Headings in Angular

## Intro

Everyday accessibility gets more awareness, a few weeks back I was a total ignorant about it. I was assigned to a project looking forward to improve their overall accessibility looking to comply with WCAG 2.1 on the category AA. This was an incredible challenge and I had to learn a lot with a deadline on front of me.

My intention with this article aswell as all the others from _Make it accessible_ is to walk you through the challenges I faced. This project was in Angular, so I'll be going through accessibility from the point of view of an Angular Developer. All the knowledge found here can be easily applicable to other javascript frameworks, the best way to improve accessibility is to _use semantic HTML_.

For this article I decided to focus on Headings, they are one of the key mechanisms to help visually impaired users. At the beginning on my a11y journey, I had to make a first diagnose of the status of the application when used with a screen reader. After installing NVDA, since I already knew how the application behaves I was able to go through the main flow of it **blindfolded**.

Yeah, blindfolded while in a call with the project leader. It was a bold move, even though it worked out. It was a false positive, if I didnt know the app on first hand I would have been impossible to achieve it. After a long call, we decided that in order for us to continue we needed to know how do blind users actually use the screen readers.

After digging up, I found some really good resources to help developers understand how blind people use applications. At the end of the article I have the links to the videos. It turns out that for these users, the headings are **key**. Before we continue, let's define a heading.

### Headings

> HTML defines six levels of headings. A heading element implies all the font changes, paragraph breaks before and after, and any white space necessary to render the heading. The heading elements are H1, H2, H3, H4, H5, and H6 with H1 being the highest (or most important) level and H6 the least.
> w3c Organization.

If you have ever done any HTML code, you probably have seen them already. They can be used in HTML like this `<h1>Main heading</h1>`. I used to think they were just for presentational purpose. That their job was just to show text with a different format to attract the attention of the users.

Although I was partly right, it wasn't its **only** purpose. If you take a look at its definition from the accessibility point of view, you'll find some differences.

> Headings communicate the organization of the content on the page. Web browsers, plug-ins, and assistive technologies can use them to provide in-page navigation.
> w3c Organization - WAI ARIA.

You maybe have now more questions than answers, but that's okey we are gonna get there. It turns out that headings have two main roles, the one I already mention and secondly, allowing AT users in-page navigation.

### Screen Readers

In the previous section I mentioned the fact that headings provide AT users with in-page navigation. Let's dive a bit on that, it turns out that when blind users are navigating they rely in the screen reader functionalities and there's one in all the major products that allow users to see all headings and jump directly to them.

I started wondering, is this really how people use this? It made no sense to me, but after searching a lot I found videos of blind users using the common sites we all know, Twitter, Gmail, etc... And guess what, its very common to see users rely on the navigation tool provided in their screen reader of choice.

I decided it was time to give my project a second chance and use the navigation tool from NVDA. But it turns out that someone decided that `<span>` tags were more appropiate for headings and when I opened it, the heading list was empty. Screen readers cannot infer that by themselves, thats why you have to use HTML.

Believe it or not, here I go again: _Use semantic HTML_.

By doing so, assistive technology users will be capable of using your apps. Or at least reading and understanding them.

NOTE: Blind users know how to use screen readers, they tend to create a mental map of the application by going through the headings. If you don't provide the basic tools, you are priving them of using your app.

## Proper headings

Imagine that you cant rely in colors, sizes, borders, etc... To denote relationships between the parts of your app. You may think that will make the apps boring, but its the only way blind users have. They see apps in a very different way, we have to give them alternatives to know the relationships between the elements. This elements relationship is a whole topic by itself, I just want to mention it.

Headings are a way to denote relationships or even better, _groupings_. I like to think of it as _trees_.

> Yeah, Im a geek.

Well, anyway. Imagine the first `<h1>` is the root node of our application, just like trees there's a single root node. All the consequent `<h2>` are treated as children of the root or `<h1>`.

Now comes the tricky part, suppose you are writing content right below one of the `<h2>`'s and you want to create a new heading. There are two possible scenarios.

- You want the heading to be a children of the root.
  - Solution: Use `<h2>`.
- You want the heading to be a children of one of the `<h2>`.
  - Solution: Use `<h3>`.

By know you should understand the idea. But there's one new problem, what about reusable components?

## Reusable components

After realizing that we had no headings, I rushed to the project leader and tell him about it. We agreed that it was one of our main concerns now and that we had to do something. I said, dont worry sir, I'll get it done.

Some days later, I noticed that for same cases it was straightforward but suddenly I entered a danger zone. We had reusable components being used at different hierarchical levels and it was impossible to just pick one heading level.

NOTE: If you design your application having accessibility as a first class citizen, you can easily avoid this situation by creating the right components from the beginning.

I wasnt authorized to create more components because that meant making maintainability harder. So I had a new task ahead, creating a component that could by itself know which heading use according to the place where its being placed in the DOM.

> I highly encourage you to avoid this and instead to redesign from the ground up having in mind accessibility for all the design decisions.

### Solution

I started by creating a simple component I named HeadingComponent that looks like this.

```typescript
@Component({
  selector: 'app-heading',
  template: `
    <span
      appHeading
      [headingId]="headingId"
      [parentHeadingId]="parentHeadingId"
      [text]="text"
    ></span>
  `
})
export class HeadingComponent {
  @Input() headingId: string;
  @Input() parentHeadingId: string;
  @Input() text: string;
}
```

The Heading Component can take input values:

- HeadingId: Identifier that allows querying the DOM to find an specific heading.
- ParentHeadingId: Identifier that allows querying the DOM to find an specific heading, its the headingId of the parent heading.
- Text: The text content that will be displayed inside the heading tag.

As you can see I used an inline template because we only use a single HTML element. I created this component because I didnt want users to attach it directly them to the span. In my opinion it looks more self explanatory this way.

In order to do DOM manipulations, Angular Docs state that you should use directives. So let's create a directive that introduces the heading inside our component with the right hierarchy.

```typescript
import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: '[appHeading]'
})
export class HeadingDirective implements AfterViewInit {
  @Input() headingId: string;
  @Input() text: string;
  @Input() parentHeadingId: string;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.el.nativeElement.innerHTML = this.wrapText(
      this.headingId || 'root',
      this.getTag(this.getHierarchy(this.headingId, this.parentHeadingId)),
      this.text
    );
  }

  private getHierarchy(headingId: string, parentHeadingId: string) {
    if (!headingId) {
      return 1;
    } else if (!parentHeadingId) {
      return 2;
    } else {
      const parentHeading = document.querySelector(`#${parentHeadingId}`);
      const parentHierarchy = parseInt(parentHeading.tagName[1], 10);
      return parentHierarchy === 6 ? 6 : parentHierarchy + 1;
    }
  }

  private getTag(hierarchy: number) {
    return `h${hierarchy}`;
  }

  private wrapText(id: string, tag: string, text: string) {
    return `<${tag} id=${id}>${text}</${tag}>`;
  }
}
```

The Heading Directive has multiple methods to get the job done:

- getTag: Given a hierarchy it returns the proper heading tag.
- wrapText: Given an id, tag and text, it creates the html tag for the heading.
- getHierarchy: Given a headingId and a parentId, it infers the hierarchy of the current element.

And that's it. If you want to go ahead and take a look at this working, you can [take a look at this repository](/) to see it in action. In there repo there are multiple samples showing how it works.

## Conclusion

> Use semantic HTML

That's the third time you read that in this article, when you start trying to make applications accessible you quickly realize that HTML5 is your best friend, in this case we focused on headings but this idea applies to almost all the native elements. If you asked me how do I make my application accessible, I would ask are you sure you are using the right semantic HTML?
