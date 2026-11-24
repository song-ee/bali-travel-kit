import {days,type TripData,type Place} from './data';
export function applySlot(data:TripData,date:string,index:number,place:Place|null):TripData{
 const base=days.find(d=>d.date===date);if(!base) return data;
 const events=(data.dayEvents?.[date]||base.events).map(e=>[...e]);if(!events[index])return data;
 const choices={...(data.slotChoices?.[date]||{})};
 if(place){const original=choices[index]?.original||[...events[index]];choices[index]={placeId:place.id,original};events[index]=[events[index][0],place.name,place.description];}
 else {if(!choices[index])return data;events[index]=[...choices[index].original];delete choices[index];}
 return {...data,dayEvents:{...data.dayEvents,[date]:events},slotChoices:{...data.slotChoices,[date]:choices}};
}
export function selectedPlaceIds(data:TripData,date:string){return [...new Set(Object.values(data.slotChoices?.[date]||{}).map(x=>x.placeId))]}
