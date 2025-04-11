// src/app/components/item-list/item-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../types';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ItemFormComponent } from '../item-form/item-form.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(
    private itemService: ItemService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  openForm(item?: Item): void {
    const dialogRef = this.dialog.open(ItemFormComponent, {
      width: '400px',
      data: item || { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadItems();
    });
  }

  deleteItem(id: number): void {
    if (confirm('Are you sure?')) {
      this.itemService.deleteItem(id).subscribe(() => {
        this.loadItems();
      });
    }
  }
}