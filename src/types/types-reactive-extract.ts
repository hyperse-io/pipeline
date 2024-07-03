import type { Union } from 'ts-toolbelt';
import { Exists, ExitPipeReturnValue } from './types-reactive.js';

export type ExtractExitPipe1<R1> =
  Union.Select<R1, Exists, 'extends->'> extends never
    ? never
    : ExitPipeReturnValue<Union.Select<R1, Exists, 'extends->'>>;

export type ExtractExitPipe2<R2, R1> =
  Union.Select<R2 | R1, Exists, 'extends->'> extends never
    ? never
    : ExitPipeReturnValue<Union.Select<R2 | R1, Exists, 'extends->'>>;

export type ExtractExitPipe3<R3, R2, R1> =
  Union.Select<R3 | R2 | R1, Exists, 'extends->'> extends never
    ? never
    : ExitPipeReturnValue<Union.Select<R3 | R2 | R1, Exists, 'extends->'>>;

export type ExtractExitPipe4<R4, R3, R2, R1> =
  Union.Select<R4 | R3 | R2 | R1, Exists, 'extends->'> extends never
    ? never
    : ExitPipeReturnValue<Union.Select<R4 | R3 | R2 | R1, Exists, 'extends->'>>;

export type ExtractExitPipe5<R5, R4, R3, R2, R1> =
  Union.Select<R5 | R4 | R3 | R2 | R1, Exists, 'extends->'> extends never
    ? never
    : ExitPipeReturnValue<
        Union.Select<R5 | R4 | R3 | R2 | R1, Exists, 'extends->'>
      >;

export type ExtractExitPipe6<R6, R5, R4, R3, R2, R1> =
  Union.Select<R6 | R5 | R4 | R3 | R2 | R1, Exists, 'extends->'> extends never
    ? never
    : ExitPipeReturnValue<
        Union.Select<R6 | R5 | R4 | R3 | R2 | R1, Exists, 'extends->'>
      >;

export type ExtractExitPipe7<R7, R6, R5, R4, R3, R2, R1> =
  Union.Select<
    R7 | R6 | R5 | R4 | R3 | R2 | R1,
    Exists,
    'extends->'
  > extends never
    ? never
    : ExitPipeReturnValue<
        Union.Select<R7 | R6 | R5 | R4 | R3 | R2 | R1, Exists, 'extends->'>
      >;

export type ExtractExitPipe8<R8, R7, R6, R5, R4, R3, R2, R1> =
  Union.Select<
    R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1,
    Exists,
    'extends->'
  > extends never
    ? never
    : ExitPipeReturnValue<
        Union.Select<R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1, Exists, 'extends->'>
      >;

export type ExtractExitPipe9<R9, R8, R7, R6, R5, R4, R3, R2, R1> =
  Union.Select<
    R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1,
    Exists,
    'extends->'
  > extends never
    ? never
    : ExitPipeReturnValue<
        Union.Select<
          R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1,
          Exists,
          'extends->'
        >
      >;

export type ExtractExitPipe10<R10, R9, R8, R7, R6, R5, R4, R3, R2, R1> =
  Union.Select<
    R10 | R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1,
    Exists,
    'extends->'
  > extends never
    ? never
    : ExitPipeReturnValue<
        Union.Select<
          R10 | R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1,
          Exists,
          'extends->'
        >
      >;
