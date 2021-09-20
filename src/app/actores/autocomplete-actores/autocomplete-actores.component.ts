import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css']
})
export class AutocompleteActoresComponent implements OnInit {

  constructor() { }

  control: FormControl = new FormControl();
  actores = [
    {nombre: 'Tom Holland', personaje: '', foto:'https://assets.teenvogue.com/photos/5988bb10e04ba21beb2a5164/2:3/w_1123,h_1685,c_limit/tom.jpg'},
    {nombre: 'Tom Hanks',vpersonaje: '', foto:'https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_.jpg'},
    {nombre: 'Samuel L. Jackson', personaje: '', foto:'https://www.nydailynews.com/resizer/aC2dAbEERNALldj9afbRdU1Qmcw=/800x1188/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/N55LC7BEXIROBPTEWFGBLUJSMQ.jpg'}
  ]

  actoresOriginal = this.actores;

  actoresSeleccionados = [];

  columnasAMostrar = ['imagen','nombre','personaje','acciones'];

  @ViewChild(MatTable) table: MatTable<any>

  ngOnInit(): void {
    this.control.valueChanges.subscribe(valor => {
      this.actores = this.actoresOriginal;
      this.actores = this.actores.filter(actor => actor.nombre.indexOf(valor) !==-1);
    });
  }

  optionSelected(event: MatAutocompleteSelectedEvent){
    console.log(event.option.value);
      this.actoresSeleccionados.push(event.option.value);
      if (this.table !== undefined){
        this.table.renderRows();
      }
    this.control.patchValue('');
  }

  eliminar(actor){
    const indice = this.actoresSeleccionados.findIndex(a => a.nombre === actor.nombre);
    this.actoresSeleccionados.splice(indice,1);
    this.table.renderRows();
  }

  finalizaArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.actoresSeleccionados.findIndex(
      actor => actor === event.item.data
    )
    moveItemInArray(this.actoresSeleccionados,indicePrevio,event.currentIndex);
    this.table.renderRows();
  }
}
