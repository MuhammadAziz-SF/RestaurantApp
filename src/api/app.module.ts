import { Module } from "@nestjs/common";
import { TablesModule } from "./tables/tables.module";
import { ReservationModule } from "./reservation/reservation.module";
import { UserModule } from "./users";
import { ShiftModule } from "./shifts";
// import { DeliveriesModule } from './deliveries/deliveries.module';
// import { ReviewsModule } from './reviews/reviews.module';
// import { NotificationsModule } from './notifications/notifications.module';
import { OrderItemsModule } from "./order-items/order-items.module";
import { MenuItemsModule } from "./menu-items/menu-items.module";
import { OrdersModule } from "./orders/orders.module";
// import { MenuIngredientsModule } from './menu-ingredients/menu-ingredients.module';
import { CategoriesModule } from "./categories/categories.module";
// import { InvoicesModule } from './invoices/invoices.module';
// import { PaymentsModule } from './payments/payments.module';
// import { InventoryModule } from './inventory/inventory.module';
// import { LocationsModule } from './locations/locations.module';
// import { IngredientsModule } from './ingredients/ingredients.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Categories } from "src/core/entity/categories.entity";
import { menu_items } from "src/core/entity/menu_items.entity";

@Module({
  imports: [
    TablesModule,
    ReservationModule,
    UserModule,
    ShiftModule,
    // DeliveriesModule,
    // ReviewsModule,
    // NotificationsModule,
    OrderItemsModule,
    MenuItemsModule,
    OrdersModule,
    // MenuIngredientsModule,
    CategoriesModule,
    // InvoicesModule,
    // PaymentsModule,
    // InventoryModule,
    // LocationsModule,
    // IngredientsModule,

    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: String(process.env.PG_PASS),
      database: process.env.PG_DB,
      entities: [__dirname + "/**/*.entity.{ts,js}"],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TablesModule,
    ReservationModule,
    UserModule,
    ShiftModule,
    // DeliveriesModule,
    // ReviewsModule,
    // NotificationsModule,
    OrderItemsModule,
    MenuItemsModule,
    OrdersModule,
    // MenuIngredientsModule,
    CategoriesModule,
    // InvoicesModule,
    // PaymentsModule,
    // InventoryModule,
    // LocationsModule,
    // IngredientsModule,
    Categories,
    menu_items,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
