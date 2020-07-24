import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/utils/common/common-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private http: CommonServiceService) { }

  ngOnInit() {
  }
}
