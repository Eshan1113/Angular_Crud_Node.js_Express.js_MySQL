// src/app/components/item-form/item-form.component.ts
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item.service';
import { Item } from '../../types';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent {
  form: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    public dialogRef: MatDialogRef<ItemFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) {
    this.form = this.fb.group({
      name: [data.name, Validators.required]
    });
    this.isEditMode = !!data.id;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const itemData = this.form.value;
      
      if (this.isEditMode) {
        this.itemService.updateItem(this.data.id!, { ...this.data, ...itemData })
          .subscribe(() => this.dialogRef.close(true));
      } else {
        this.itemService.createItem(itemData)
          .subscribe(() => this.dialogRef.close(true));
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}