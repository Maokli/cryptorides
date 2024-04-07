import { Controller, Get } from '@nestjs/common';

@Controller('cars')
export class CarsController {
    @Get()
    getCars(){
        return 'zeb'
    }
}
