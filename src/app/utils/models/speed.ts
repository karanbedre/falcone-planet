export class Speed {
    public destionationOne: number;
    public destionationTwo: number;
    public destionationThree: number;
    public destionationFour: number;

    constructor(d: any = {}) {
        this.destionationOne = d.destionationOne || 0;
        this.destionationTwo = d.destionationTwo || 0;
        this.destionationThree = d.destionationThree || 0;
        this.destionationFour = d.destionationFour || 0;
    }
}

export class FindFalcone {
    public token: string;
    public planet_names: Array<string>;
    public vehicle_names: Array<string>;

    constructor(d: any = {}) {
        this.token = d.token || '';
        this.planet_names = d.planet_names || [];
        this.vehicle_names = d.vehicle_names || [];
    }

}