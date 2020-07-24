import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/utils/common/common-service.service';

@Component({
  selector: 'app-found',
  templateUrl: './found.component.html',
  styleUrls: ['./found.component.scss']
})
export class FoundComponent implements OnInit {
  public getData: any;
  constructor(private http: CommonServiceService) { }

  ngOnInit() {
    this.getData = this.http.getTimePlanetData();
  }

}
