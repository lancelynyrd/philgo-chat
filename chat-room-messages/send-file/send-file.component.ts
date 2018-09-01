import { Component, OnInit, Input } from '@angular/core';
import { ApiChatMessage } from '../../../philgo-api/philgo-api.service';

@Component({
  selector: 'app-send-file',
  templateUrl: './send-file.component.html'
})
export class ChatRoomSendFileComponent implements OnInit {

  @Input() message: ApiChatMessage;
  constructor() { }

  ngOnInit() {
  }

}
