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
