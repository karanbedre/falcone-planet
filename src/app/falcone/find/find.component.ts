import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/utils/common/common-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Speed, FindFalcone } from 'src/app/utils/models/speed';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent implements OnInit {
  public token = '';
  public planets = [];
  public vehicles = [];
  public finalTime = 0;
  public timeTaken = new Speed();
  public findFalcone = new FindFalcone();
  public destinationForm: FormGroup;

  constructor(private http: CommonServiceService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.destinationForm = this.formBuilder.group({
      destionationOne: ['all', Validators.required],
      destionationTwo: ['all', Validators.required],
      destionationThree: ['all', Validators.required],
      destionationFour: ['all', Validators.required],
      vehicleOne: ['', Validators.required],
      vehicleTwo: ['', Validators.required],
      vehicleThree: ['', Validators.required],
      vehicleFour: ['', Validators.required],
    });

  }

  ngOnInit() {
    this.getToken();
    this.getPlanets();
    this.getVehicles();
  }

  getToken() {
    this.http.post('token', '').subscribe(res => {
      this.token = res.token;
    }, err => {
      console.log(err);
    })
  }

  getPlanets() {
    this.http.get('planets').subscribe(res => {
      this.planets = res;
      this.planets.forEach(ele => {
        ele['selected'] = false
      });
    }, err => {
      console.log(err);
    })
  }

  getVehicles() {
    this.http.get('vehicles').subscribe(res => {
      this.vehicles = res;
      this.planets.forEach(ele => {
        ele['disable'] = true
      })
    }, err => {
      console.log(err);
    })
  }

  selectPlanet(txt) {
    let searchedIndex;
    let previousIndex;

    this.destinationForm
      .controls[txt]
      .valueChanges
      .subscribe(selectedValue => {
        previousIndex = this.planets.filter(ele => ele.name == this.destinationForm.value[txt]);
        previousIndex[0].selected = false;
      });

    searchedIndex = this.planets.filter(ele => ele.name == this.destinationForm.value[txt]);
    searchedIndex[0].selected = true;
  }

  vehicleType(vehcileObject, event, vehicleName, planetName) {
    let searchedIndex;
    let previousIndex;

    if (vehcileObject.total_no > 0) {
      searchedIndex = this.vehicles.filter(ele => ele.name == this.destinationForm.value[vehicleName]);
      searchedIndex.total_no--;
      vehcileObject.total_no--;
    } else {
      event.target.checked = false;
    }

    if (this.destinationForm.value[vehicleName] != '') {
      previousIndex = this.vehicles.filter(ele => ele.name == this.destinationForm.value[vehicleName]);
      previousIndex[0].total_no++;
    }

    switch (vehicleName) {
      case 'vehicleOne': this.destinationForm.patchValue({ vehicleOne: vehcileObject.name });
        break;
      case 'vehicleTwo': this.destinationForm.patchValue({ vehicleTwo: vehcileObject.name });
        break;
      case 'vehicleThree': this.destinationForm.patchValue({ vehicleThree: vehcileObject.name });
        break;
      case 'vehicleFour': this.destinationForm.patchValue({ vehicleFour: vehcileObject.name });
        break;
    }

    this.calculateTime(vehicleName, planetName);
  }

  calculateTime(vehicleName, planetName) {
    let vehcileIndex = this.vehicles.filter(ele => ele.name == this.destinationForm.value[vehicleName]);
    let planetIndex = this.planets.filter(ele => ele.name == this.destinationForm.value[planetName]);
    this.timeTaken[planetName] = planetIndex[0].distance / vehcileIndex[0].speed;

    this.finalTime = 0;
    for (let obj in this.timeTaken) {
      this.finalTime += this.timeTaken[obj];
    }
  }

  findPlanet() {
    this.findFalcone = new FindFalcone();

    for (let obj in this.destinationForm.value) {
      switch (obj) {
        case 'vehicleOne': this.findFalcone.planet_names.push(this.destinationForm.value.destionationOne);
          this.findFalcone.vehicle_names.push(this.destinationForm.value.vehicleOne)
          break;
        case 'vehicleTwo': this.findFalcone.planet_names.push(this.destinationForm.value.destionationTwo);
          this.findFalcone.vehicle_names.push(this.destinationForm.value.vehicleTwo);
          break;
        case 'vehicleThree': this.findFalcone.planet_names.push(this.destinationForm.value.destionationThree);
          this.findFalcone.vehicle_names.push(this.destinationForm.value.vehicleThree);
          break;
        case 'vehicleFour': this.findFalcone.planet_names.push(this.destinationForm.value.destionationFour);
          this.findFalcone.vehicle_names.push(this.destinationForm.value.vehicleFour);
          break;
      }
    }

    this.findFalcone.token = this.token;

    this.http.post('find', this.findFalcone).subscribe(res => {
      console.log(res);
      res['time'] = this.finalTime;
      this.http.storeTimePlanet(res);
      this.router.navigateByUrl('falcone/found');
    }, err => {
      console.log(err);
    })
  }
}
