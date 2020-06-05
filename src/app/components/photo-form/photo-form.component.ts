import { Component, OnInit } from '@angular/core'

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  file:File
  photoSelected: string | ArrayBuffer

  constructor() { }

  ngOnInit(): void {
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

}
