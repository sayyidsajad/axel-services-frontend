import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterPipe',
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) return value

    args = args.toLowerCase()
    return value.filter((item: any) => {
      return JSON.stringify(item)
      .toLowerCase()
      .includes(args)
    })
  }

}
