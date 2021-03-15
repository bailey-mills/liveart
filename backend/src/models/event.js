class Event{
    constructor(Id,Title,Summary,StartTime,EndTime,ThumbNailURL){
        this.Id = Id,
        this.Title = Title,
        this.Summary = Summary,
        this.StartTime = StartTime,
        this.EndTime = EndTime,
        this.ThumbNailURL = ThumbNailURL
    }
}

module.exports = Event;