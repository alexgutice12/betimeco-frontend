import { ChangeDetectionStrategy, AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';
@Component({ changeDetection: ChangeDetectionStrategy.Default, selector: 'app-product-detail', imports: [CommonModule], templateUrl: './product-detail.component.html' })
export class ProductDetailComponent implements AfterViewInit {
  @Input({ required: true }) producto!: Product;
  @Output() cerrar = new EventEmitter<void>();
  @Output() agregar = new EventEmitter<Product>();
  @ViewChild('dialogo') dialogo!: ElementRef<HTMLDialogElement>;
  ngAfterViewInit() { this.dialogo.nativeElement.showModal(); }
}
