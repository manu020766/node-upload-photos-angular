import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { PhotosStoreService } from 'src/app/photos-store.service'
import { take } from 'rxjs/operators'
import { Photo } from 'src/app/interfaces/Photo'

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
  @ViewChild('description') descriptionElement: ElementRef

  file:File
  photoSelected: string | ArrayBuffer
  formType = 'alta'
  photo: Photo

  // constructor(private photoService:PhotoService, private router:Router) { }
  constructor(private photoStoreService:PhotosStoreService,
              private router:Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formType = 'alta'
    if (this.route.routeConfig.path.indexOf('editar') > 0) {
      this.formType = 'editar'
      this.route.paramMap
      .pipe(take(1)) //Unsuscribe automatically
      .subscribe(params => {
        this.photo = this.photoStoreService.loadPhotoViewId(params.get('id'))

        let urlImage:string
        if (this.photo.imagePath) {
          urlImage = 'http://localhost:4000/uploads' + this.photo.imagePath.slice(7)

          toDataURL(urlImage)
            .then((dataUrl:string) => {
                this.photoSelected = dataUrl
            })
        } else {
          this.photoSelected = null
        }
      })
    }
  }
  ngAfterViewInit() {
    if (this.formType === 'editar') {
      this.titleElement.nativeElement.value = this.photo.title
      this.descriptionElement.nativeElement.value = this.photo.description
    }

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
    if (this.formType === 'alta') {
      console.log('FILE: ', this.file)
      this.photoStoreService.createPhoto(title.value, description.value, this.file)
            .then(() => this.router.navigate(['/photos']))
    }

    if (this.formType === 'editar') {

      console.log('old image: ', this.photo?.imagePath)
      console.log('nueva image: ', this.file?.name, this.file)
      
      if (title.value !== this.photo.title || description.value !== this.photo.description || this.file?.name !== undefined ) {
        this.photoStoreService.updatePhoto(this.photo._id, title.value, description.value, this.file)
              .then(() => this.router.navigate(['/photos']))
      } else {
        console.log('NO HAY QUE ACTUALIZAR')
      }



    }

    return false
  }

  cancelarUploadFoto() {
    this.router.navigate(['/photos'])
  }

}

function toDataURL(url) {
  return fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
      })
  )
}
