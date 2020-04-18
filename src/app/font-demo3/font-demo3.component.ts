import { Component, OnInit } from '@angular/core';
import { UnleashService } from '../unleash.service';

@Component({
  selector: 'app-font-demo3',
  templateUrl: './font-demo3.component.html',
  styleUrls: ['./font-demo3.component.css']
})
export class FontDemo3Component implements OnInit {

  constructor(private unleashService: UnleashService) { }

  ngOnInit() {
    this.unleashService.changeTheme('dark');
  }

}
