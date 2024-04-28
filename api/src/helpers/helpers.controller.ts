import { Controller } from '@nestjs/common';
import { HelpersService } from './helpers.service';

@Controller('helpers')
export class HelpersController {
  constructor(private readonly helpersService: HelpersService) {}
}
