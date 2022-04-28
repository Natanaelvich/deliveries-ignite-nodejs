import { Controller } from '@nestjs/common';

import { RefreshtokenclientService } from './refreshtokenclient.service';

@Controller('refreshtokenclient')
export class RefreshtokenclientController {
  constructor(
    private readonly refreshtokenclientService: RefreshtokenclientService,
  ) {}
}
