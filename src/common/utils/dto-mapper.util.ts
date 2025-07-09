import { plainToInstance, ClassConstructor } from 'class-transformer';

export function mapToDto<T, V>(dto: ClassConstructor<T>, data: V): T;
export function mapToDto<T, V>(dto: ClassConstructor<T>, data: V[]): T[];
export function mapToDto<T, V>(
  dto: ClassConstructor<T>,
  data: V | V[],
): T | T[] {
  if (Array.isArray(data)) {
    return data.map((item) =>
      plainToInstance(dto, item, { excludeExtraneousValues: true }),
    );
  }
  return plainToInstance(dto, data, { excludeExtraneousValues: true });
}
