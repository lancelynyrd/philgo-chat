import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';


@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.page.html'
})
export class AllRoomsPage implements OnInit {

  constructor(
    public a: AppService
  ) {
    console.log('AllRoomsPage::constructor()');
  }

  ngOnInit() {
  }

}
