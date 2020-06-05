import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlPhoto'
})
export class UrlPhotoPipe implements PipeTransform {

  private URI = 'http://localhost:4000/uploads'

  transform(url:string): string {
    // uploads\1d34f5a8-fb07-43e3-bed7-d875cec1113c.jpg

    let repairUrl = url.slice(7)


    return this.URI + repairUrl
  }

}
