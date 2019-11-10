import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: '[appHeading]'
})
export class HeadingDirective implements AfterViewInit {
  @Input() text: string;
  @Input() hierarchy: number;
  private level: number;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.level = this.getLevel(this.el.nativeElement) + 1;
    if (!this.hierarchy) {
      this.hierarchy = this.getHierarchy(this.el.nativeElement);
    }
    this.el.nativeElement.innerHTML = this.wrapText(
      this.getTag(this.hierarchy),
      this.text
    );
  }

  private getTag(hierarchy: number) {
    return `h${hierarchy}`;
  }

  private wrapText(tag: string, text: string) {
    return `<${tag}>${text}</${tag}>`;
  }

  private getHierarchy(el: HTMLElement) {
    while (el.parentElement) {
      const hierarchy = this.getPreviousLevelHeadingHierarchy(el);
      if (hierarchy) {
        return hierarchy + 1;
      }
      el = el.parentElement;
    }
    return 1;
  }

  private getPreviousLevelHeadingHierarchy(el: HTMLElement) {
    return Array.from(el.querySelectorAll('* h1, h2, h3, h4, h5, h6'))
      .map((heading: HTMLElement) => ({
        hierarchy: parseInt(heading.tagName[1], 10),
        level: this.getLevel(heading)
      }))
      .filter(({ level }) => level < this.level)
      .reduce((_: number, curr) => curr.hierarchy, null);
  }

  private getLevel(el: HTMLElement) {
    let level = 0;
    while (el.parentElement) {
      el = el.parentElement;
      level++;
    }
    return level;
  }
}
