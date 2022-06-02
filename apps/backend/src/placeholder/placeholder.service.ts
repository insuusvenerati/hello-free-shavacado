import { Injectable } from '@nestjs/common';
import { getPlaiceholder } from 'plaiceholder';

@Injectable()
export class PlaceholderService {
  async findAll(src: string) {
    if (!src) {
      return 'No src';
    }
    const { base64 } = await getPlaiceholder(src);
    return { base64 };
  }
}
