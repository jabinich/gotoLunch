import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  restaurants: Restaurant[] = [];

  constructor(private http: HttpClient) { 
    this.getAllRestaurants().subscribe(data => {
      this.restaurants = data;
    });
  }

  /* hol Daten aus Datenbank, hier halber Einfachheit aus .json */
  getAllRestaurants(){
    return this.http.get<Restaurant[]>("/assets/data.json");
  }

  /* die Daten werden gefiltert nach Kategorien, Preis, Entfernung & Veggie-Auswähle */
  getRestaurants(caregories: string[], price: string, distance: string, veggie: string) {
    let result = [];

    if (caregories.length > 0)
      result = this.restaurants.filter(e=> caregories.includes(e.Kategorie));
    else result = this.restaurants;

    if (price != "")
      result = result.filter(e=> e.Preis.length <= price.length);
    if (distance != "")
        result = result.filter(e=> e.Entfernung.length<=distance.length);
    if (veggie != "")
      result = result.filter(e=> e.VeggieTauglich==veggie);

    return result;
  }
}
