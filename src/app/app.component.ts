import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Contacto } from './shared/models/contacto';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'agendaTelefonica';

  mostrarForm = false; // Inicialmente el formulario estará oculto

  contactos: any[] = []; // Array para almacenar los contactos

  id: string = '';
  nombre: string = '';
  telefono: string = '';

  mostrarFormulario() {
    this.mostrarForm = true; // Al hacer clic en "Añadir contacto", mostramos el formulario
  }

  cerrarFormulario() {
    this.mostrarForm = false; // Al hacer clic en "Cerrar", ocultamos el formulario
  }

  // Función para validar los campos antes de agregar un nuevo contacto
  validarFormulario(): boolean {
    const nombreValido = /^[a-zA-Z\s]+$/.test(this.nombre);
    const telefonoValido = /^\d{9}$/.test(this.telefono);
    if (!nombreValido) {
      alert('Introduce un nombre válido (solo letras y espacios)');
      return false;
    }
    if (!telefonoValido) {
      alert('Introduce un teléfono válido (9 dígitos numéricos)');
      return false;
    }
    return true;
  }
  
  
  // Función para agregar un nuevo contacto
  agregarContacto(event: any) {

    if (!this.validarFormulario()) {
      event.preventDefault(); // Detener la ejecución si los campos no son válidos
      return;
    }
    
    
    if (!this.id) { // Si el ID está vacío, estamos agregando un nuevo contacto
      const nuevoContacto = {
        id: uuidv4(), // Genera un ID único (librería importada)
        nombre: this.nombre,
        telefono: this.telefono
      };
      this.contactos.push(nuevoContacto);
    } else {
      // Si el ID tiene un valor, estamos editando un contacto ya existente
      const indice = this.contactos.findIndex((contacto: any) => contacto.id === this.id);
      if (indice !== -1) {
        // Actualizamos los datos del contacto existente
        this.contactos[indice].nombre = this.nombre;
        this.contactos[indice].telefono = this.telefono;
      }
    }
    // Limpiamos los campos del formulario
    this.id = '';
    this.nombre = '';
    this.telefono = '';
    // Ocultamos el formulario después de agregar o editar el contacto
    this.mostrarForm = false;
  }

  // Función para editar un contacto existente
  editarContacto(contacto: Contacto) {
    // Establecemos los valores de id, nombre y telefono para el formulario
    this.id = contacto.id;
    this.nombre = contacto.nombre;
    this.telefono = contacto.telefono;

    // Mostramos el formulario
    this.mostrarForm = true;
  }

  // Función para eliminar un contacto
  eliminarContacto(contacto: Contacto) {
    
    // Busca el índice del contacto en el array de contactos
    const index = this.contactos.indexOf(contacto);
    
    // Si se encuentra el contacto, lo elimina del array
    if (index !== -1) {
      this.contactos.splice(index, 1);
    }

  }

  limpiarFormulario(){
    this.id = '';
    this.nombre = '';
    this.telefono = '';
  }

  // Función para borrar todos los contactos
  borrarAgenda() {
    this.contactos = []; // Vacía el array de contactos
  }
}

