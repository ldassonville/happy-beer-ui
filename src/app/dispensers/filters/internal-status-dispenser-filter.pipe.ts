import { Pipe, PipeTransform } from '@angular/core';
import { Dispenser } from '../dispenser';

@Pipe({
  name: 'internalStatusDispenserFilter'
})
export class InternalStatusDispenserFilterPipe implements PipeTransform {

  transform(dispensers: Dispenser[], ...args: unknown[]): Dispenser[] {


    var status: string = <string>args[0];

    return dispensers.filter(d => status == d.status?.status);
  }

}
