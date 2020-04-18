import { Component, OnInit } from '@angular/core';
import { UnleashService } from '../unleash.service';

@Component({
  selector: 'app-font-demo1',
  templateUrl: './font-demo1.component.html',
  styleUrls: ['./font-demo1.component.css']
})
export class FontDemo1Component implements OnInit {

  constructor(private unleashService: UnleashService) { }

  ngOnInit() {
    this.unleashService.changeTheme('dark');
  }

}
