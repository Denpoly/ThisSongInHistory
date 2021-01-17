import { resolve } from 'promise';
import  RestRequest from './RestRequest'
export class EventRequests{
    static getAllEventsInMonth(month){
        let eventArr = [];
        for (let i = 1; i<32; i++) {
            eventArr.push(
            RestRequest.get("https://byabbe.se/on-this-day/" + month + "/" + i + "/events.json", null).then((val) => {
                return val;
            }).catch((val) => {
                return null;
            }));
        }
        return eventArr;
    }
    static getAllEventsOfMonthYear(month, year){
        return new Promise((resolve, reject) => {
            let eventPromises = this.getAllEventsInMonth(month);
            Promise.all(eventPromises).then((eventsOfDay)=> {
                let events = [];
                eventsOfDay.forEach((day) => {
                    if (day) {
                        try{
                            let eventJSON = JSON.parse(day);
                            JSON.parse(day)["events"].forEach( (event) => {
                                if(event.year == year) {
                                    event.date = eventJSON.date;
                                    events.push(event);
                                }
                            });
                        }
                        catch {

                        }
                        
                    } 
                });
                resolve(events);
            })
        }); 
    }
}
export default EventRequests;