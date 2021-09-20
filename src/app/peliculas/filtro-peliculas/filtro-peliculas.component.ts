import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute) { }

  form: FormGroup

  generos = [
    {id: 1, nombre:'Drama'},
    {id: 2, nombre:'Accion'},
    {id: 3, nombre:'Comedia'}
  ];

  peliculas=[
    {titulo:'Spider-man: Far From  Home', enCines: false, proximosEstrenos: true, generos: [1,2], poster:'https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/original/products/89357/94633/Spider-Man-Far-From-Home-Final-Style-Double-sided-original-movie-poster-buy-now-at-starstills__72883.1599866592.jpg?c=2'},
    {titulo:'Moana', enCines: true, proximosEstrenos: false, generos: [3], poster:'https://m.media-amazon.com/images/I/61oDGN2zYiL.jpg'},
    {titulo:'Inception', enCines: false, proximosEstrenos: false, generos: [1,3], poster:'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg'},
  ]

  peliculasOriginal = this.peliculas;

  formularioOriginal = {
    titulo:'',
    generoId:0,
    proximosEstrenos: false,
    enCines: false
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formularioOriginal);
    this.leerValoresURL();
    this.buscarPeliculas(this.form.value);

    this.form.valueChanges
      .subscribe(valores => {
        this.peliculas=this.peliculasOriginal;
        this.buscarPeliculas(valores);
        this.escribirParametrosBusquedaEnURL();
      })
  }

  private leerValoresURL(){
    this.activatedRoute.queryParams.subscribe((params) =>{
      var objeto: any = {};

      if (params.titulo){
        objeto.titulo = params.titulo;
      }

      if (params.generoId){
        objeto.generoId = Number (params.generoId);
      }

      if (params.proximosEstrenos){
        objeto.proximosEstrenos = params.proximosEstrenos;
      }

      if (params.enCines){
        objeto.enCines = params.enCines;
      }

      this.form.patchValue(objeto);
      
    });
  }
  
  private escribirParametrosBusquedaEnURL(){
    var queryStrings = [];

    var valoresFormulario = this.form.value;

    if(valoresFormulario.titulo){
      queryStrings.push(`titulo=${valoresFormulario.titulo}`);
    }

    if(valoresFormulario.generoId){
      queryStrings.push(`generoId=${valoresFormulario.generoId}`);
    }

    if(valoresFormulario.proximosEstrenos){
      queryStrings.push(`proximosEstrenos=${valoresFormulario.proximosEstrenos}`);
    }

    if(valoresFormulario.enCines){
      queryStrings.push(`enCines=${valoresFormulario.enCines}`);
    }

    this.location.replaceState('peliculas/buscar',queryStrings.join('&'));

  }

  buscarPeliculas(valores: any){
    if(valores.titulo){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.indexOf(valores.titulo) !== -1 );
    }

    if(valores.generoId !==0){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(valores.generoId) !== -1 );
    }

    if(valores.enCines){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.enCines);
    }
  }

  limpiar(){
    this.form.patchValue(this.formularioOriginal);
  }

}
