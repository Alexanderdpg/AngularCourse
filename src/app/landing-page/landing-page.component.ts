import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  ngOnInit(): void {
      this.peliculasEnCines = [{
        titulo: 'SpiderMan',
        fechaLanzamiento: new Date(),
        precio: 1400.99,
        poster:'https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/original/products/89357/94633/Spider-Man-Far-From-Home-Final-Style-Double-sided-original-movie-poster-buy-now-at-starstills__72883.1599866592.jpg?c=2'
      }, 
      {
        titulo: 'Moana',
        fechaLanzamiento: new Date('2016-11-14'),
        precio: 300.99,
        poster: 'https://m.media-amazon.com/images/I/61oDGN2zYiL.jpg'
      }];
  }
  peliculasEnCines;
  peliculasProximosEstrenos = [];

}
