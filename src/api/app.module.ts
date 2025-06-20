import { Module } from '@nestjs/common';
import { TablesModule } from './tables/tables.module';
import { ReservationModule } from './reservation/reservation.module';
import { UsersModule } from './users/users.module';
import { ShiftsModule } from './shifts/shifts.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { ReviewsModule } from './reviews/reviews.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { OrdersModule } from './orders/orders.module';
import { MenuIngredientsModule } from './menu-ingredients/menu-ingredients.module';
import { CategoriesModule } from './categories/categories.module';
import { InvoicesModule } from './invoices/invoices.module';
import { PaymentsModule } from './payments/payments.module';
import { InventoryModule } from './inventory/inventory.module';
import { LocationsModule } from './locations/locations.module';
import { IngredientsModule } from './ingredients/ingredients.module';


@Module({
  imports: [TablesModule, ReservationModule, UsersModule, ShiftsModule, DeliveriesModule, ReviewsModule, NotificationsModule, OrderItemsModule, MenuItemsModule, OrdersModule, MenuIngredientsModule, CategoriesModule, InvoicesModule, PaymentsModule, InventoryModule, LocationsModule, IngredientsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
