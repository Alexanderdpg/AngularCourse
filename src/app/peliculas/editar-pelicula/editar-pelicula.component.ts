import { Component, OnInit } from '@angular/core';
import { peliculaCreacionDTO, peliculaDTO } from '../pelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  constructor() { }

  modelo:peliculaDTO = {titulo: 'Spider-Man', trailer:'abc', enCines:true, resumen:'cosa',
fechaLanzamiento: new Date(), poster:'https://i.insider.com/5d1b9fd821a86103c94c82b3?width=700'}

  ngOnInit(): void {
  }

  guardarCambios(pelicula: peliculaCreacionDTO){
    console.log(pelicula);
  }

}
