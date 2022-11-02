import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant.model';
import { RestaurantService } from './restaurant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'gotoLunch';

  restaurants: Restaurant[] = [];

  /* statische Daten aus Datenbank, um Kategorien-Liste, Dropdown-Box auszufüllen */
  categoryList: any[] = [];
  priceList: any[] = [];
  distanceList: any[] = [];
  veggieList: any[] = [];

  /* von Benutzer ausgewählte Kategorien */
  selectedCategoryList: string[] = [];

  /* Variable für Dropdown Preis, Entfernung und Veggie-Tauglich */
  selectedPrice = "";
  selectedDistance = "";
  selectedVeggie = "";

  constructor(private restaurantService: RestaurantService) { 

  }

  ngOnInit(): void {
    this.restaurantService.getAllRestaurants().subscribe(data =>{
      this.restaurants = data; 

      this.restaurants.forEach(element => {
        if (!this.categoryList.includes(element.Kategorie))
          this.categoryList.push(element.Kategorie);
      });

      this.getPrices();
      this.getDistances();
      this.getVeggie();
    })
  }

  queryWithCategory(ca: string): void {
    if (!this.selectedCategoryList.includes(ca))
      this.selectedCategoryList.push(ca);
    else {
      this.selectedCategoryList.forEach((val,index)=>{
        if(val == ca) this.selectedCategoryList.splice(index,1);
    });
    }

    this.getResults();
  }

  getPrices(){
    this.restaurants.forEach(element => {
      if (!this.priceList.includes(element.Preis)){
        this.priceList.push(element.Preis);
      }
    });
  }

  getDistances(){
    this.restaurants.forEach(element => {
      if (!this.distanceList.includes(element.Preis)){
        this.distanceList.push(element.Preis);
      }
    });
  }

  getVeggie(){
    this.restaurants.forEach(element => {
      if (!this.veggieList.includes(element.Preis)){
        this.veggieList.push(element.Preis);
      }
    });
  }


  getResults(){
    this.restaurants = this.restaurantService.getRestaurants(this.selectedCategoryList, this.selectedPrice, this.selectedDistance, this.selectedVeggie);
  }

  /* alles zurücksetzen */
  getReset(){
    this.selectedCategoryList = [];
    this.selectedPrice = "";
    this.selectedDistance = "";
    this.selectedVeggie = "";
    this.getResults();
  }
}
