import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationsService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Reservation } from '../../core/entity/reservation.entity';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create reservation' })
  @ApiResponse({
    status: 201,
    description: 'Success create',
    type: Reservation,
  })  
  @ApiBadRequestResponse({ description: 'Invalid values' })
  async create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reservations' })
  @ApiResponse({
    status: 200,
    description: 'All reservations',
    type: [Reservation],
  })
  async findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one reservation by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID reservation' })
  @ApiResponse({ status: 200, description: 'Founded', type: Reservation })
  @ApiNotFoundResponse({ description: 'reservation not found' })
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update reservation' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID reservation' })
  @ApiResponse({
    status: 200,
    description: 'Success update',
    type: Reservation,
  })
  @ApiBadRequestResponse({ description: 'Error in update' })
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete reservation' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID reservation' })
  @ApiResponse({ status: 200, description: 'Success delete' })
  @ApiNotFoundResponse({ description: 'reservation not found' })
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
