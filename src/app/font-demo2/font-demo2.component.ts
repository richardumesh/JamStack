import { Component, OnInit } from '@angular/core';
import { UnleashService } from '../unleash.service';

@Component({
  selector: 'app-font-demo2',
  templateUrl: './font-demo2.component.html',
  styleUrls: ['./font-demo2.component.css']
})
export class FontDemo2Component implements OnInit {

  constructor(private unleashService: UnleashService) { }

  ngOnInit() {
    this.unleashService.changeTheme('dark');
  }

}
