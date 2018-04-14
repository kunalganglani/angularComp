import { Component, OnInit, Input } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() show = false;
  @Input() name: string;
  constructor( private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerService._register(this);
  }

}
