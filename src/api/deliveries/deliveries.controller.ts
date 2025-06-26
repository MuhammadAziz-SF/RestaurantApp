import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { deliveries } from 'src/core/entity/deliveries.entity';

@ApiTags('Delivery API')
@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) { }

  // =======================================================================
  @ApiOperation({
    summary: 'Create deliver'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        order_id: {
          type: 'string',
          example: 'id'
        },
        delivery_person_id: {
          type: 'string',
          example: 'id'
        },
        address: {
          type: 'string',
          example: 'address'
        },
        status: {
          type: 'string',
          example: 'assigned'
        },
        estimated_time: {
          type: 'string',
          example: 'TIME'
        },
        delivered_at: {
          type: 'string',
          example: 'TIME'
        }
      }
    }
  })

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Deliver created',
    schema: {
      example: {
        status_code: 201,
        message: 'success',
        data: {},
      },
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed creating deliver',
    schema: {
      example: {
        status_code: 400,
        message: 'Error on creating deliver',
      },
    }
  })
  @Post()
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveriesService.create(createDeliveryDto);
  }

  // =======================================================================
  @ApiOperation({
    summary: 'Get all deliveries'
  })

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all deliveries',
    schema: {
      example: {
        status_code: 200,
        message: 'Success',
        data: [deliveries],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed get deliveries',
    schema: {
      example: {
        status_code: 400,
        message: 'Error on updating deliveries',
      },
    },
  })
  @Get()
  findAll() {
    return this.deliveriesService.findAll();
  }

  // =======================================================================

  @ApiOperation({
    summary: 'Get delivery by ID'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get delivery by ID',
    schema: {
      example: {
        status_code: 200,
        message: 'Success',
        data: [deliveries],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed get delivery by ID',
    schema: {
      example: {
        status_code: 400,
        message: 'Error on get delivery by ID',
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveriesService.findOne(+id);
  }

  // =======================================================================
  @ApiOperation({
    summary: 'Update deliver by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the delivery',
    type: String,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        order_id: {
          type: 'string',
          example: 'id'
        },
        delivery_person_id: {
          type: 'string',
          example: 'id'
        },
        address: {
          type: 'string',
          example: 'address'
        },
        status: {
          type: 'string',
          example: 'assigned'
        },
        estimated_time: {
          type: 'string',
          example: 'TIME'
        },
        delivered_at: {
          type: 'string',
          example: 'TIME'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get update delivery',
    schema: {
      example: {
        status_code: 200,
        message: 'Success',
        data: [deliveries],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed update delivery',
    schema: {
      example: {
        status_code: 400,
        message: 'Error on updating delivery',
      },
    },
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    return this.deliveriesService.update(+id, updateDeliveryDto);
  }

  // =======================================================================

  @ApiOperation({
    summary: 'Delete deliver by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the deliver',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Deliver by ID deleted successfully',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed delete deliver by ID',
    schema: {
      example: {
        status_code: 400,
        message: 'Error on deleting deliver by ID',
      },
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveriesService.remove(+id);
  }
}
