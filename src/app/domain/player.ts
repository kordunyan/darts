export class Player {
    
    public gameData: any;
    public lost: boolean = false;
    public current: boolean = false;
    public overSet: number = 0;
    
    constructor(
        public name
    ) {
    }
}