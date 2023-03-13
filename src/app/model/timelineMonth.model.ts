import { timelineEventModel } from "./timelineEvent.model";

export class timelineMonthModel {
    constructor(
        public month: number,
        public events: [timelineEventModel]
    ) { }
}