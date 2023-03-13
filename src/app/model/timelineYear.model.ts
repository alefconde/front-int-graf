import { timelineMonthModel } from "./timelineMonth.model";

export class timelineYearModel {
    constructor(
        public year: number,
        public months: [timelineMonthModel]
    ){}
}