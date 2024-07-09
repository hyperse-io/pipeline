import type { Exists, ExitPipeReturnValue } from './types-reactive.js';
import type { Select } from './types-union.js';

export type ExtractExitPipe1<R1> =
  Select<R1, Exists, 'extends->'> extends never
    ? never
    : ExitPipeReturnValue<Select<R1, Exists, 'extends->'>>;

export type ExtractExitPipe2<R2, R1> =
  Select<R2 | R1, Exists, 'extends->'> extends never
    ? never
    : ExitPipeReturnValue<Select<R2 | R1, Exists, 'extends->'>>;

export type ExtractExitPipe3<R3, R2, R1> =
  Select<R3 | R2 | R1, Exists, 'extends->'> extends never
    ? never
    : ExitPipeReturnValue<Select<R3 | R2 | R1, Exists, 'extends->'>>;

export type ExtractExitPipe4<R4, R3, R2, R1> =
  Select<R4 | R3 | R2 | R1, Exists, 'extends->'> extends never
    ? never
    : ExitPipeReturnValue<Select<R4 | R3 | R2 | R1, Exists, 'extends->'>>;

export type ExtractExitPipe5<R5, R4, R3, R2, R1> =
  Select<R5 | R4 | R3 | R2 | R1, Exists, 'extends->'> extends never
    ? never
    : ExitPipeReturnValue<Select<R5 | R4 | R3 | R2 | R1, Exists, 'extends->'>>;

export type ExtractExitPipe6<R6, R5, R4, R3, R2, R1> =
  Select<R6 | R5 | R4 | R3 | R2 | R1, Exists, 'extends->'> extends never
    ? never
    : ExitPipeReturnValue<
        Select<R6 | R5 | R4 | R3 | R2 | R1, Exists, 'extends->'>
      >;

export type ExtractExitPipe7<R7, R6, R5, R4, R3, R2, R1> =
  Select<R7 | R6 | R5 | R4 | R3 | R2 | R1, Exists, 'extends->'> extends never
    ? never
    : ExitPipeReturnValue<
        Select<R7 | R6 | R5 | R4 | R3 | R2 | R1, Exists, 'extends->'>
      >;

export type ExtractExitPipe8<R8, R7, R6, R5, R4, R3, R2, R1> =
  Select<
    R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1,
    Exists,
    'extends->'
  > extends never
    ? never
    : ExitPipeReturnValue<
        Select<R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1, Exists, 'extends->'>
      >;

export type ExtractExitPipe9<R9, R8, R7, R6, R5, R4, R3, R2, R1> =
  Select<
    R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1,
    Exists,
    'extends->'
  > extends never
    ? never
    : ExitPipeReturnValue<
        Select<R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1, Exists, 'extends->'>
      >;

export type ExtractExitPipe10<R10, R9, R8, R7, R6, R5, R4, R3, R2, R1> =
  Select<
    R10 | R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1,
    Exists,
    'extends->'
  > extends never
    ? never
    : ExitPipeReturnValue<
        Select<
          R10 | R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1,
          Exists,
          'extends->'
        >
      >;
