import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core'
import { PhotoService } from 'src/app/services/photo.service'
import { Router } from '@angular/router'
import { PhotosStoreService } from 'src/app/photos-store.service'

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit, AfterViewInit {
  @ViewChild('title') titleElement: ElementRef

  file:File
  photoSelected: string | ArrayBuffer

  // constructor(private photoService:PhotoService, private router:Router) { }
  constructor(private photoStoreService:PhotosStoreService, private router:Router) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.titleElement.nativeElement.focus()
  }

  onPhotoSelected(event: HtmlInputEvent):void {
    let selectedFile = <File>event.target.files[0]
    if (selectedFile) {
      this.file = selectedFile
  
      // image preview
      const reader = new FileReader()
      reader.readAsDataURL(this.file)
      
      reader.onload = (ev: ProgressEvent<FileReader>) => this.photoSelected = reader.result
    } else {
       alert('Ningun fichero seleccionado')
    }
  }

  // la forma más simple para eliminar el problema, aunque no la más adecuada es poner (event:any)

  // onPhotoSelected(event: Event):void {
  //   let file = (<HTMLInputElement>event.target).files[0]  
  //   console.log(file)
  //   if (file) {
  //     this.file = file

  //     // image preview
  //     const reader = new FileReader()
  //     reader.readAsDataURL(this.file)
      
  //     reader.onload = (ev: ProgressEvent<FileReader>) => this.photoSelected = reader.result
  //   } else {
  //     alert('Ningun fichero seleccionado')
  //   }
  // }

  borrarFoto() {
    let respuesta = confirm('¿Desea eliminar la foto?')
    console.log('respuesta ', respuesta)
  }
  cambiarFoto() {
    alert('cambiar foto')
  }

  // uploadFoto(title:HTMLInputElement, description:HTMLTextAreaElement):boolean {
  //   this.photoService.createPhoto(title.value, description.value, this.file)
  //     .subscribe(resultado => this.router.navigate(['/photos']))

  //   return false
  // }

  uploadFoto(title:HTMLInputElement, description:HTMLTextAreaElement):boolean {
    this.photoStoreService.createPhoto(title.value, description.value, this.file)
          .then(() => this.router.navigate(['/photos']))
    return false
  }

}
