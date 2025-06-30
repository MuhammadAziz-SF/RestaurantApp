import { Module } from "@nestjs/common";
import { TablesModule } from "./tables/tables.module";
import { ReservationModule } from "./reservation/reservation.module";
import { UserModule } from "./users";
import { ShiftModule } from "./shifts";
import { config } from "src/config";
import { OrderItemsModule } from "./order-items/order-items.module";
import { MenuItemsModule } from "./menu-items/menu-items.module";
import { OrdersModule } from "./orders/orders.module";
import { CategoriesModule } from "./categories/categories.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { IngredientsModule } from "./ingredients/ingredients.module";
import { InventoryModule } from "./inventory/inventory.module";
import { InvoicesModule } from "./invoices/invoices.module";
import { LocationsModule } from "./locations/locations.module";
import { MenuIngredientsModule } from "./menu-ingredients/menu-ingredients.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { PaymentsModule } from "./payments/payments.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: config.PG_HOST,
      port: Number(config.PG_PORT),
      username: config.PG_USER,
      password: String(config.PG_PASS),
      database: config.PG_DB,
      entities: [__dirname + "/../**/*.entity.{ts,js}"],
      synchronize: true,
      autoLoadEntities: true,
    }),

    TablesModule,
    ReservationModule,
    UserModule,
    ShiftModule,
    OrderItemsModule,
    MenuItemsModule,
    OrdersModule,
    CategoriesModule,
    IngredientsModule,
    InventoryModule,
    InvoicesModule,
    LocationsModule,
    MenuIngredientsModule,
    NotificationsModule,
    PaymentsModule,
    ReviewsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
