import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sample-d',
  templateUrl: './sample-d.component.html',
  styleUrls: ['./sample-d.component.scss']
})
export class SampleDComponent implements OnInit {
  @Input() text: string;

  constructor() {}

  ngOnInit() {}
}
