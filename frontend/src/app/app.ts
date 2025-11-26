import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CandidateService } from './candidate.service';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  private fb = inject(FormBuilder);
  private candidateService = inject(CandidateService);
  @ViewChild('fileInput') fileInputElement!: ElementRef;

  candidates = this.candidateService.candidates;

  displayedColumns: string[] = [
    'name',
    'surname',
    'seniority',
    'years',
    'availability',
  ];

  candidateForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    file: [null as File | null, Validators.required],
  });

  selectedFile: File | null = null;

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;

    if (element.files && element.files.length > 0) {
      const file: File = element.files[0];

      this.selectedFile = file;
      this.candidateForm.patchValue({ file: file });
      this.candidateForm.get('file')?.updateValueAndValidity();
    }
  }

  submit() {
    if (this.candidateForm.valid && this.selectedFile) {
      const { name, surname } = this.candidateForm.value;

      if (!name || !surname) {
        return;
      }
      this.candidateService
        .uploadCandidate(name, surname, this.selectedFile)
        .subscribe({
          next: () => {
            this.candidateForm.reset();
            this.selectedFile = null;
            if (this.fileInputElement) {
              this.fileInputElement.nativeElement.value = '';
            }
          },
          error: (err) => console.error('Error al subir', err),
        });
    }
  }
}
