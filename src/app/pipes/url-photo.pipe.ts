import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlPhoto'
})
export class UrlPhotoPipe implements PipeTransform {

  private URI = 'http://localhost:4000/uploads'

  transform(url:string): string {
    // uploads\1d34f5a8-fb07-43e3-bed7-d875cec1113c.jpg
    let urlImagen:string

    if (url) {
      let repairUrl = url.slice(7)
      urlImagen = this.URI + repairUrl
    } else {
      urlImagen = 'assets/imagen-no-disponible.jpg'
    }
    
    return urlImagen
  }

}
