
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Token
 * 
 */
export type Token = $Result.DefaultSelection<Prisma.$TokenPayload>
/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model StatementFile
 * 
 */
export type StatementFile = $Result.DefaultSelection<Prisma.$StatementFilePayload>
/**
 * Model ParseResult
 * 
 */
export type ParseResult = $Result.DefaultSelection<Prisma.$ParseResultPayload>
/**
 * Model Analysis
 * 
 */
export type Analysis = $Result.DefaultSelection<Prisma.$AnalysisPayload>
/**
 * Model TreasuryProduct
 * 
 */
export type TreasuryProduct = $Result.DefaultSelection<Prisma.$TreasuryProductPayload>
/**
 * Model Recommendation
 * 
 */
export type Recommendation = $Result.DefaultSelection<Prisma.$RecommendationPayload>
/**
 * Model Report
 * 
 */
export type Report = $Result.DefaultSelection<Prisma.$ReportPayload>
/**
 * Model SystemConfig
 * 
 */
export type SystemConfig = $Result.DefaultSelection<Prisma.$SystemConfigPayload>
/**
 * Model AuditEntry
 * 
 */
export type AuditEntry = $Result.DefaultSelection<Prisma.$AuditEntryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const TokenType: {
  ACCESS: 'ACCESS',
  REFRESH: 'REFRESH',
  RESET_PASSWORD: 'RESET_PASSWORD',
  VERIFY_EMAIL: 'VERIFY_EMAIL'
};

export type TokenType = (typeof TokenType)[keyof typeof TokenType]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type TokenType = $Enums.TokenType

export const TokenType: typeof $Enums.TokenType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.token`: Exposes CRUD operations for the **Token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.token.findMany()
    * ```
    */
  get token(): Prisma.TokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.statementFile`: Exposes CRUD operations for the **StatementFile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StatementFiles
    * const statementFiles = await prisma.statementFile.findMany()
    * ```
    */
  get statementFile(): Prisma.StatementFileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.parseResult`: Exposes CRUD operations for the **ParseResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ParseResults
    * const parseResults = await prisma.parseResult.findMany()
    * ```
    */
  get parseResult(): Prisma.ParseResultDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.analysis`: Exposes CRUD operations for the **Analysis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Analyses
    * const analyses = await prisma.analysis.findMany()
    * ```
    */
  get analysis(): Prisma.AnalysisDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.treasuryProduct`: Exposes CRUD operations for the **TreasuryProduct** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TreasuryProducts
    * const treasuryProducts = await prisma.treasuryProduct.findMany()
    * ```
    */
  get treasuryProduct(): Prisma.TreasuryProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recommendation`: Exposes CRUD operations for the **Recommendation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recommendations
    * const recommendations = await prisma.recommendation.findMany()
    * ```
    */
  get recommendation(): Prisma.RecommendationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.systemConfig`: Exposes CRUD operations for the **SystemConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemConfigs
    * const systemConfigs = await prisma.systemConfig.findMany()
    * ```
    */
  get systemConfig(): Prisma.SystemConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditEntry`: Exposes CRUD operations for the **AuditEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditEntries
    * const auditEntries = await prisma.auditEntry.findMany()
    * ```
    */
  get auditEntry(): Prisma.AuditEntryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.1
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Token: 'Token',
    Client: 'Client',
    StatementFile: 'StatementFile',
    ParseResult: 'ParseResult',
    Analysis: 'Analysis',
    TreasuryProduct: 'TreasuryProduct',
    Recommendation: 'Recommendation',
    Report: 'Report',
    SystemConfig: 'SystemConfig',
    AuditEntry: 'AuditEntry'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "token" | "client" | "statementFile" | "parseResult" | "analysis" | "treasuryProduct" | "recommendation" | "report" | "systemConfig" | "auditEntry"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Token: {
        payload: Prisma.$TokenPayload<ExtArgs>
        fields: Prisma.TokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findFirst: {
            args: Prisma.TokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findMany: {
            args: Prisma.TokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          create: {
            args: Prisma.TokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          createMany: {
            args: Prisma.TokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          delete: {
            args: Prisma.TokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          update: {
            args: Prisma.TokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          deleteMany: {
            args: Prisma.TokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          upsert: {
            args: Prisma.TokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          aggregate: {
            args: Prisma.TokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateToken>
          }
          groupBy: {
            args: Prisma.TokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokenCountArgs<ExtArgs>
            result: $Utils.Optional<TokenCountAggregateOutputType> | number
          }
        }
      }
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      StatementFile: {
        payload: Prisma.$StatementFilePayload<ExtArgs>
        fields: Prisma.StatementFileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StatementFileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementFilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StatementFileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementFilePayload>
          }
          findFirst: {
            args: Prisma.StatementFileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementFilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StatementFileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementFilePayload>
          }
          findMany: {
            args: Prisma.StatementFileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementFilePayload>[]
          }
          create: {
            args: Prisma.StatementFileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementFilePayload>
          }
          createMany: {
            args: Prisma.StatementFileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StatementFileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementFilePayload>[]
          }
          delete: {
            args: Prisma.StatementFileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementFilePayload>
          }
          update: {
            args: Prisma.StatementFileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementFilePayload>
          }
          deleteMany: {
            args: Prisma.StatementFileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StatementFileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StatementFileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementFilePayload>[]
          }
          upsert: {
            args: Prisma.StatementFileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatementFilePayload>
          }
          aggregate: {
            args: Prisma.StatementFileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStatementFile>
          }
          groupBy: {
            args: Prisma.StatementFileGroupByArgs<ExtArgs>
            result: $Utils.Optional<StatementFileGroupByOutputType>[]
          }
          count: {
            args: Prisma.StatementFileCountArgs<ExtArgs>
            result: $Utils.Optional<StatementFileCountAggregateOutputType> | number
          }
        }
      }
      ParseResult: {
        payload: Prisma.$ParseResultPayload<ExtArgs>
        fields: Prisma.ParseResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParseResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParseResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParseResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParseResultPayload>
          }
          findFirst: {
            args: Prisma.ParseResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParseResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParseResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParseResultPayload>
          }
          findMany: {
            args: Prisma.ParseResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParseResultPayload>[]
          }
          create: {
            args: Prisma.ParseResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParseResultPayload>
          }
          createMany: {
            args: Prisma.ParseResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParseResultCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParseResultPayload>[]
          }
          delete: {
            args: Prisma.ParseResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParseResultPayload>
          }
          update: {
            args: Prisma.ParseResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParseResultPayload>
          }
          deleteMany: {
            args: Prisma.ParseResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParseResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ParseResultUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParseResultPayload>[]
          }
          upsert: {
            args: Prisma.ParseResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParseResultPayload>
          }
          aggregate: {
            args: Prisma.ParseResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParseResult>
          }
          groupBy: {
            args: Prisma.ParseResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParseResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParseResultCountArgs<ExtArgs>
            result: $Utils.Optional<ParseResultCountAggregateOutputType> | number
          }
        }
      }
      Analysis: {
        payload: Prisma.$AnalysisPayload<ExtArgs>
        fields: Prisma.AnalysisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnalysisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnalysisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>
          }
          findFirst: {
            args: Prisma.AnalysisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnalysisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>
          }
          findMany: {
            args: Prisma.AnalysisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>[]
          }
          create: {
            args: Prisma.AnalysisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>
          }
          createMany: {
            args: Prisma.AnalysisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnalysisCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>[]
          }
          delete: {
            args: Prisma.AnalysisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>
          }
          update: {
            args: Prisma.AnalysisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>
          }
          deleteMany: {
            args: Prisma.AnalysisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnalysisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnalysisUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>[]
          }
          upsert: {
            args: Prisma.AnalysisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>
          }
          aggregate: {
            args: Prisma.AnalysisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnalysis>
          }
          groupBy: {
            args: Prisma.AnalysisGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnalysisGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnalysisCountArgs<ExtArgs>
            result: $Utils.Optional<AnalysisCountAggregateOutputType> | number
          }
        }
      }
      TreasuryProduct: {
        payload: Prisma.$TreasuryProductPayload<ExtArgs>
        fields: Prisma.TreasuryProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TreasuryProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasuryProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TreasuryProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasuryProductPayload>
          }
          findFirst: {
            args: Prisma.TreasuryProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasuryProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TreasuryProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasuryProductPayload>
          }
          findMany: {
            args: Prisma.TreasuryProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasuryProductPayload>[]
          }
          create: {
            args: Prisma.TreasuryProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasuryProductPayload>
          }
          createMany: {
            args: Prisma.TreasuryProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TreasuryProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasuryProductPayload>[]
          }
          delete: {
            args: Prisma.TreasuryProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasuryProductPayload>
          }
          update: {
            args: Prisma.TreasuryProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasuryProductPayload>
          }
          deleteMany: {
            args: Prisma.TreasuryProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TreasuryProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TreasuryProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasuryProductPayload>[]
          }
          upsert: {
            args: Prisma.TreasuryProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreasuryProductPayload>
          }
          aggregate: {
            args: Prisma.TreasuryProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTreasuryProduct>
          }
          groupBy: {
            args: Prisma.TreasuryProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<TreasuryProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.TreasuryProductCountArgs<ExtArgs>
            result: $Utils.Optional<TreasuryProductCountAggregateOutputType> | number
          }
        }
      }
      Recommendation: {
        payload: Prisma.$RecommendationPayload<ExtArgs>
        fields: Prisma.RecommendationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecommendationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecommendationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>
          }
          findFirst: {
            args: Prisma.RecommendationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecommendationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>
          }
          findMany: {
            args: Prisma.RecommendationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>[]
          }
          create: {
            args: Prisma.RecommendationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>
          }
          createMany: {
            args: Prisma.RecommendationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecommendationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>[]
          }
          delete: {
            args: Prisma.RecommendationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>
          }
          update: {
            args: Prisma.RecommendationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>
          }
          deleteMany: {
            args: Prisma.RecommendationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecommendationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecommendationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>[]
          }
          upsert: {
            args: Prisma.RecommendationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>
          }
          aggregate: {
            args: Prisma.RecommendationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecommendation>
          }
          groupBy: {
            args: Prisma.RecommendationGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecommendationGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecommendationCountArgs<ExtArgs>
            result: $Utils.Optional<RecommendationCountAggregateOutputType> | number
          }
        }
      }
      Report: {
        payload: Prisma.$ReportPayload<ExtArgs>
        fields: Prisma.ReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findFirst: {
            args: Prisma.ReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findMany: {
            args: Prisma.ReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          create: {
            args: Prisma.ReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          createMany: {
            args: Prisma.ReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          delete: {
            args: Prisma.ReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          update: {
            args: Prisma.ReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          deleteMany: {
            args: Prisma.ReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          upsert: {
            args: Prisma.ReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReport>
          }
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportCountArgs<ExtArgs>
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
      SystemConfig: {
        payload: Prisma.$SystemConfigPayload<ExtArgs>
        fields: Prisma.SystemConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          findFirst: {
            args: Prisma.SystemConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          findMany: {
            args: Prisma.SystemConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>[]
          }
          create: {
            args: Prisma.SystemConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          createMany: {
            args: Prisma.SystemConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>[]
          }
          delete: {
            args: Prisma.SystemConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          update: {
            args: Prisma.SystemConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          deleteMany: {
            args: Prisma.SystemConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SystemConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>[]
          }
          upsert: {
            args: Prisma.SystemConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          aggregate: {
            args: Prisma.SystemConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemConfig>
          }
          groupBy: {
            args: Prisma.SystemConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemConfigCountArgs<ExtArgs>
            result: $Utils.Optional<SystemConfigCountAggregateOutputType> | number
          }
        }
      }
      AuditEntry: {
        payload: Prisma.$AuditEntryPayload<ExtArgs>
        fields: Prisma.AuditEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload>
          }
          findFirst: {
            args: Prisma.AuditEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload>
          }
          findMany: {
            args: Prisma.AuditEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload>[]
          }
          create: {
            args: Prisma.AuditEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload>
          }
          createMany: {
            args: Prisma.AuditEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload>[]
          }
          delete: {
            args: Prisma.AuditEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload>
          }
          update: {
            args: Prisma.AuditEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload>
          }
          deleteMany: {
            args: Prisma.AuditEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload>[]
          }
          upsert: {
            args: Prisma.AuditEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload>
          }
          aggregate: {
            args: Prisma.AuditEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditEntry>
          }
          groupBy: {
            args: Prisma.AuditEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditEntryCountArgs<ExtArgs>
            result: $Utils.Optional<AuditEntryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    token?: TokenOmit
    client?: ClientOmit
    statementFile?: StatementFileOmit
    parseResult?: ParseResultOmit
    analysis?: AnalysisOmit
    treasuryProduct?: TreasuryProductOmit
    recommendation?: RecommendationOmit
    report?: ReportOmit
    systemConfig?: SystemConfigOmit
    auditEntry?: AuditEntryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    Token: number
    AuditEntry: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Token?: boolean | UserCountOutputTypeCountTokenArgs
    AuditEntry?: boolean | UserCountOutputTypeCountAuditEntryArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditEntryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditEntryWhereInput
  }


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    StatementFile: number
    Analysis: number
    Report: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    StatementFile?: boolean | ClientCountOutputTypeCountStatementFileArgs
    Analysis?: boolean | ClientCountOutputTypeCountAnalysisArgs
    Report?: boolean | ClientCountOutputTypeCountReportArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountStatementFileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatementFileWhereInput
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountAnalysisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalysisWhereInput
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }


  /**
   * Count Type AnalysisCountOutputType
   */

  export type AnalysisCountOutputType = {
    Recommendation: number
    Report: number
  }

  export type AnalysisCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Recommendation?: boolean | AnalysisCountOutputTypeCountRecommendationArgs
    Report?: boolean | AnalysisCountOutputTypeCountReportArgs
  }

  // Custom InputTypes
  /**
   * AnalysisCountOutputType without action
   */
  export type AnalysisCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisCountOutputType
     */
    select?: AnalysisCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AnalysisCountOutputType without action
   */
  export type AnalysisCountOutputTypeCountRecommendationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecommendationWhereInput
  }

  /**
   * AnalysisCountOutputType without action
   */
  export type AnalysisCountOutputTypeCountReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }


  /**
   * Count Type TreasuryProductCountOutputType
   */

  export type TreasuryProductCountOutputType = {
    Recommendation: number
  }

  export type TreasuryProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Recommendation?: boolean | TreasuryProductCountOutputTypeCountRecommendationArgs
  }

  // Custom InputTypes
  /**
   * TreasuryProductCountOutputType without action
   */
  export type TreasuryProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryProductCountOutputType
     */
    select?: TreasuryProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TreasuryProductCountOutputType without action
   */
  export type TreasuryProductCountOutputTypeCountRecommendationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecommendationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    password: string | null
    role: $Enums.Role | null
    isEmailVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    password: string | null
    role: $Enums.Role | null
    isEmailVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    role: number
    isEmailVerified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    isEmailVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    isEmailVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    isEmailVerified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    name: string | null
    password: string
    role: $Enums.Role
    isEmailVerified: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    isEmailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Token?: boolean | User$TokenArgs<ExtArgs>
    AuditEntry?: boolean | User$AuditEntryArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    isEmailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    isEmailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    isEmailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "role" | "isEmailVerified" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Token?: boolean | User$TokenArgs<ExtArgs>
    AuditEntry?: boolean | User$AuditEntryArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      Token: Prisma.$TokenPayload<ExtArgs>[]
      AuditEntry: Prisma.$AuditEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      name: string | null
      password: string
      role: $Enums.Role
      isEmailVerified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Token<T extends User$TokenArgs<ExtArgs> = {}>(args?: Subset<T, User$TokenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    AuditEntry<T extends User$AuditEntryArgs<ExtArgs> = {}>(args?: Subset<T, User$AuditEntryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly isEmailVerified: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.Token
   */
  export type User$TokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    where?: TokenWhereInput
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    cursor?: TokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * User.AuditEntry
   */
  export type User$AuditEntryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEntry
     */
    omit?: AuditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEntryInclude<ExtArgs> | null
    where?: AuditEntryWhereInput
    orderBy?: AuditEntryOrderByWithRelationInput | AuditEntryOrderByWithRelationInput[]
    cursor?: AuditEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditEntryScalarFieldEnum | AuditEntryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Token
   */

  export type AggregateToken = {
    _count: TokenCountAggregateOutputType | null
    _avg: TokenAvgAggregateOutputType | null
    _sum: TokenSumAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  export type TokenAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TokenSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TokenMinAggregateOutputType = {
    id: number | null
    token: string | null
    type: $Enums.TokenType | null
    expires: Date | null
    blacklisted: boolean | null
    createdAt: Date | null
    userId: number | null
  }

  export type TokenMaxAggregateOutputType = {
    id: number | null
    token: string | null
    type: $Enums.TokenType | null
    expires: Date | null
    blacklisted: boolean | null
    createdAt: Date | null
    userId: number | null
  }

  export type TokenCountAggregateOutputType = {
    id: number
    token: number
    type: number
    expires: number
    blacklisted: number
    createdAt: number
    userId: number
    _all: number
  }


  export type TokenAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TokenSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TokenMinAggregateInputType = {
    id?: true
    token?: true
    type?: true
    expires?: true
    blacklisted?: true
    createdAt?: true
    userId?: true
  }

  export type TokenMaxAggregateInputType = {
    id?: true
    token?: true
    type?: true
    expires?: true
    blacklisted?: true
    createdAt?: true
    userId?: true
  }

  export type TokenCountAggregateInputType = {
    id?: true
    token?: true
    type?: true
    expires?: true
    blacklisted?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type TokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Token to aggregate.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tokens
    **/
    _count?: true | TokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenMaxAggregateInputType
  }

  export type GetTokenAggregateType<T extends TokenAggregateArgs> = {
        [P in keyof T & keyof AggregateToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToken[P]>
      : GetScalarType<T[P], AggregateToken[P]>
  }




  export type TokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenWhereInput
    orderBy?: TokenOrderByWithAggregationInput | TokenOrderByWithAggregationInput[]
    by: TokenScalarFieldEnum[] | TokenScalarFieldEnum
    having?: TokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenCountAggregateInputType | true
    _avg?: TokenAvgAggregateInputType
    _sum?: TokenSumAggregateInputType
    _min?: TokenMinAggregateInputType
    _max?: TokenMaxAggregateInputType
  }

  export type TokenGroupByOutputType = {
    id: number
    token: string
    type: $Enums.TokenType
    expires: Date
    blacklisted: boolean
    createdAt: Date
    userId: number
    _count: TokenCountAggregateOutputType | null
    _avg: TokenAvgAggregateOutputType | null
    _sum: TokenSumAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  type GetTokenGroupByPayload<T extends TokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenGroupByOutputType[P]>
            : GetScalarType<T[P], TokenGroupByOutputType[P]>
        }
      >
    >


  export type TokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    type?: boolean
    expires?: boolean
    blacklisted?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["token"]>

  export type TokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    type?: boolean
    expires?: boolean
    blacklisted?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["token"]>

  export type TokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    type?: boolean
    expires?: boolean
    blacklisted?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["token"]>

  export type TokenSelectScalar = {
    id?: boolean
    token?: boolean
    type?: boolean
    expires?: boolean
    blacklisted?: boolean
    createdAt?: boolean
    userId?: boolean
  }

  export type TokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "type" | "expires" | "blacklisted" | "createdAt" | "userId", ExtArgs["result"]["token"]>
  export type TokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Token"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      token: string
      type: $Enums.TokenType
      expires: Date
      blacklisted: boolean
      createdAt: Date
      userId: number
    }, ExtArgs["result"]["token"]>
    composites: {}
  }

  type TokenGetPayload<S extends boolean | null | undefined | TokenDefaultArgs> = $Result.GetResult<Prisma.$TokenPayload, S>

  type TokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TokenCountAggregateInputType | true
    }

  export interface TokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Token'], meta: { name: 'Token' } }
    /**
     * Find zero or one Token that matches the filter.
     * @param {TokenFindUniqueArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenFindUniqueArgs>(args: SelectSubset<T, TokenFindUniqueArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Token that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TokenFindUniqueOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Token that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenFindFirstArgs>(args?: SelectSubset<T, TokenFindFirstArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Token that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tokens
     * const tokens = await prisma.token.findMany()
     * 
     * // Get first 10 Tokens
     * const tokens = await prisma.token.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenWithIdOnly = await prisma.token.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenFindManyArgs>(args?: SelectSubset<T, TokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Token.
     * @param {TokenCreateArgs} args - Arguments to create a Token.
     * @example
     * // Create one Token
     * const Token = await prisma.token.create({
     *   data: {
     *     // ... data to create a Token
     *   }
     * })
     * 
     */
    create<T extends TokenCreateArgs>(args: SelectSubset<T, TokenCreateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tokens.
     * @param {TokenCreateManyArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenCreateManyArgs>(args?: SelectSubset<T, TokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tokens and returns the data saved in the database.
     * @param {TokenCreateManyAndReturnArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tokens and only return the `id`
     * const tokenWithIdOnly = await prisma.token.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TokenCreateManyAndReturnArgs>(args?: SelectSubset<T, TokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Token.
     * @param {TokenDeleteArgs} args - Arguments to delete one Token.
     * @example
     * // Delete one Token
     * const Token = await prisma.token.delete({
     *   where: {
     *     // ... filter to delete one Token
     *   }
     * })
     * 
     */
    delete<T extends TokenDeleteArgs>(args: SelectSubset<T, TokenDeleteArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Token.
     * @param {TokenUpdateArgs} args - Arguments to update one Token.
     * @example
     * // Update one Token
     * const token = await prisma.token.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenUpdateArgs>(args: SelectSubset<T, TokenUpdateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tokens.
     * @param {TokenDeleteManyArgs} args - Arguments to filter Tokens to delete.
     * @example
     * // Delete a few Tokens
     * const { count } = await prisma.token.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenDeleteManyArgs>(args?: SelectSubset<T, TokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenUpdateManyArgs>(args: SelectSubset<T, TokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens and returns the data updated in the database.
     * @param {TokenUpdateManyAndReturnArgs} args - Arguments to update many Tokens.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tokens and only return the `id`
     * const tokenWithIdOnly = await prisma.token.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TokenUpdateManyAndReturnArgs>(args: SelectSubset<T, TokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Token.
     * @param {TokenUpsertArgs} args - Arguments to update or create a Token.
     * @example
     * // Update or create a Token
     * const token = await prisma.token.upsert({
     *   create: {
     *     // ... data to create a Token
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Token we want to update
     *   }
     * })
     */
    upsert<T extends TokenUpsertArgs>(args: SelectSubset<T, TokenUpsertArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenCountArgs} args - Arguments to filter Tokens to count.
     * @example
     * // Count the number of Tokens
     * const count = await prisma.token.count({
     *   where: {
     *     // ... the filter for the Tokens we want to count
     *   }
     * })
    **/
    count<T extends TokenCountArgs>(
      args?: Subset<T, TokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenAggregateArgs>(args: Subset<T, TokenAggregateArgs>): Prisma.PrismaPromise<GetTokenAggregateType<T>>

    /**
     * Group by Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenGroupByArgs['orderBy'] }
        : { orderBy?: TokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Token model
   */
  readonly fields: TokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Token.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Token model
   */
  interface TokenFieldRefs {
    readonly id: FieldRef<"Token", 'Int'>
    readonly token: FieldRef<"Token", 'String'>
    readonly type: FieldRef<"Token", 'TokenType'>
    readonly expires: FieldRef<"Token", 'DateTime'>
    readonly blacklisted: FieldRef<"Token", 'Boolean'>
    readonly createdAt: FieldRef<"Token", 'DateTime'>
    readonly userId: FieldRef<"Token", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Token findUnique
   */
  export type TokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findUniqueOrThrow
   */
  export type TokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findFirst
   */
  export type TokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findFirstOrThrow
   */
  export type TokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findMany
   */
  export type TokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token create
   */
  export type TokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The data needed to create a Token.
     */
    data: XOR<TokenCreateInput, TokenUncheckedCreateInput>
  }

  /**
   * Token createMany
   */
  export type TokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Token createManyAndReturn
   */
  export type TokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Token update
   */
  export type TokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The data needed to update a Token.
     */
    data: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
    /**
     * Choose, which Token to update.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token updateMany
   */
  export type TokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to update.
     */
    limit?: number
  }

  /**
   * Token updateManyAndReturn
   */
  export type TokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Token upsert
   */
  export type TokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The filter to search for the Token to update in case it exists.
     */
    where: TokenWhereUniqueInput
    /**
     * In case the Token found by the `where` argument doesn't exist, create a new Token with this data.
     */
    create: XOR<TokenCreateInput, TokenUncheckedCreateInput>
    /**
     * In case the Token was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
  }

  /**
   * Token delete
   */
  export type TokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter which Token to delete.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token deleteMany
   */
  export type TokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tokens to delete
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to delete.
     */
    limit?: number
  }

  /**
   * Token without action
   */
  export type TokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
  }


  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientMinAggregateOutputType = {
    id: string | null
    name: string | null
    relationshipManager: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    id: string | null
    name: string | null
    relationshipManager: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    name: number
    accountIds: number
    relationshipManager: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClientMinAggregateInputType = {
    id?: true
    name?: true
    relationshipManager?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    name?: true
    relationshipManager?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    name?: true
    accountIds?: true
    relationshipManager?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: string
    name: string
    accountIds: string[]
    relationshipManager: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    accountIds?: boolean
    relationshipManager?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    StatementFile?: boolean | Client$StatementFileArgs<ExtArgs>
    Analysis?: boolean | Client$AnalysisArgs<ExtArgs>
    Report?: boolean | Client$ReportArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    accountIds?: boolean
    relationshipManager?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["client"]>

  export type ClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    accountIds?: boolean
    relationshipManager?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["client"]>

  export type ClientSelectScalar = {
    id?: boolean
    name?: boolean
    accountIds?: boolean
    relationshipManager?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "accountIds" | "relationshipManager" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["client"]>
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    StatementFile?: boolean | Client$StatementFileArgs<ExtArgs>
    Analysis?: boolean | Client$AnalysisArgs<ExtArgs>
    Report?: boolean | Client$ReportArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      StatementFile: Prisma.$StatementFilePayload<ExtArgs>[]
      Analysis: Prisma.$AnalysisPayload<ExtArgs>[]
      Report: Prisma.$ReportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      accountIds: string[]
      relationshipManager: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clients and returns the data saved in the database.
     * @param {ClientCreateManyAndReturnArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients and returns the data updated in the database.
     * @param {ClientUpdateManyAndReturnArgs} args - Arguments to update many Clients.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClientUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    StatementFile<T extends Client$StatementFileArgs<ExtArgs> = {}>(args?: Subset<T, Client$StatementFileArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatementFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Analysis<T extends Client$AnalysisArgs<ExtArgs> = {}>(args?: Subset<T, Client$AnalysisArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Report<T extends Client$ReportArgs<ExtArgs> = {}>(args?: Subset<T, Client$ReportArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Client model
   */
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'String'>
    readonly name: FieldRef<"Client", 'String'>
    readonly accountIds: FieldRef<"Client", 'String[]'>
    readonly relationshipManager: FieldRef<"Client", 'String'>
    readonly status: FieldRef<"Client", 'String'>
    readonly createdAt: FieldRef<"Client", 'DateTime'>
    readonly updatedAt: FieldRef<"Client", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client createManyAndReturn
   */
  export type ClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client updateManyAndReturn
   */
  export type ClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to delete.
     */
    limit?: number
  }

  /**
   * Client.StatementFile
   */
  export type Client$StatementFileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatementFile
     */
    select?: StatementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatementFile
     */
    omit?: StatementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementFileInclude<ExtArgs> | null
    where?: StatementFileWhereInput
    orderBy?: StatementFileOrderByWithRelationInput | StatementFileOrderByWithRelationInput[]
    cursor?: StatementFileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StatementFileScalarFieldEnum | StatementFileScalarFieldEnum[]
  }

  /**
   * Client.Analysis
   */
  export type Client$AnalysisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    where?: AnalysisWhereInput
    orderBy?: AnalysisOrderByWithRelationInput | AnalysisOrderByWithRelationInput[]
    cursor?: AnalysisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnalysisScalarFieldEnum | AnalysisScalarFieldEnum[]
  }

  /**
   * Client.Report
   */
  export type Client$ReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model StatementFile
   */

  export type AggregateStatementFile = {
    _count: StatementFileCountAggregateOutputType | null
    _avg: StatementFileAvgAggregateOutputType | null
    _sum: StatementFileSumAggregateOutputType | null
    _min: StatementFileMinAggregateOutputType | null
    _max: StatementFileMaxAggregateOutputType | null
  }

  export type StatementFileAvgAggregateOutputType = {
    size: number | null
  }

  export type StatementFileSumAggregateOutputType = {
    size: number | null
  }

  export type StatementFileMinAggregateOutputType = {
    id: string | null
    filename: string | null
    type: string | null
    size: number | null
    uploadedAt: Date | null
    status: string | null
    clientId: string | null
  }

  export type StatementFileMaxAggregateOutputType = {
    id: string | null
    filename: string | null
    type: string | null
    size: number | null
    uploadedAt: Date | null
    status: string | null
    clientId: string | null
  }

  export type StatementFileCountAggregateOutputType = {
    id: number
    filename: number
    type: number
    size: number
    uploadedAt: number
    status: number
    clientId: number
    _all: number
  }


  export type StatementFileAvgAggregateInputType = {
    size?: true
  }

  export type StatementFileSumAggregateInputType = {
    size?: true
  }

  export type StatementFileMinAggregateInputType = {
    id?: true
    filename?: true
    type?: true
    size?: true
    uploadedAt?: true
    status?: true
    clientId?: true
  }

  export type StatementFileMaxAggregateInputType = {
    id?: true
    filename?: true
    type?: true
    size?: true
    uploadedAt?: true
    status?: true
    clientId?: true
  }

  export type StatementFileCountAggregateInputType = {
    id?: true
    filename?: true
    type?: true
    size?: true
    uploadedAt?: true
    status?: true
    clientId?: true
    _all?: true
  }

  export type StatementFileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StatementFile to aggregate.
     */
    where?: StatementFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatementFiles to fetch.
     */
    orderBy?: StatementFileOrderByWithRelationInput | StatementFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StatementFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatementFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatementFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StatementFiles
    **/
    _count?: true | StatementFileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StatementFileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StatementFileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StatementFileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StatementFileMaxAggregateInputType
  }

  export type GetStatementFileAggregateType<T extends StatementFileAggregateArgs> = {
        [P in keyof T & keyof AggregateStatementFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStatementFile[P]>
      : GetScalarType<T[P], AggregateStatementFile[P]>
  }




  export type StatementFileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatementFileWhereInput
    orderBy?: StatementFileOrderByWithAggregationInput | StatementFileOrderByWithAggregationInput[]
    by: StatementFileScalarFieldEnum[] | StatementFileScalarFieldEnum
    having?: StatementFileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StatementFileCountAggregateInputType | true
    _avg?: StatementFileAvgAggregateInputType
    _sum?: StatementFileSumAggregateInputType
    _min?: StatementFileMinAggregateInputType
    _max?: StatementFileMaxAggregateInputType
  }

  export type StatementFileGroupByOutputType = {
    id: string
    filename: string
    type: string
    size: number
    uploadedAt: Date
    status: string
    clientId: string
    _count: StatementFileCountAggregateOutputType | null
    _avg: StatementFileAvgAggregateOutputType | null
    _sum: StatementFileSumAggregateOutputType | null
    _min: StatementFileMinAggregateOutputType | null
    _max: StatementFileMaxAggregateOutputType | null
  }

  type GetStatementFileGroupByPayload<T extends StatementFileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StatementFileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StatementFileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StatementFileGroupByOutputType[P]>
            : GetScalarType<T[P], StatementFileGroupByOutputType[P]>
        }
      >
    >


  export type StatementFileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    type?: boolean
    size?: boolean
    uploadedAt?: boolean
    status?: boolean
    clientId?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    ParseResult?: boolean | StatementFile$ParseResultArgs<ExtArgs>
  }, ExtArgs["result"]["statementFile"]>

  export type StatementFileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    type?: boolean
    size?: boolean
    uploadedAt?: boolean
    status?: boolean
    clientId?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["statementFile"]>

  export type StatementFileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    type?: boolean
    size?: boolean
    uploadedAt?: boolean
    status?: boolean
    clientId?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["statementFile"]>

  export type StatementFileSelectScalar = {
    id?: boolean
    filename?: boolean
    type?: boolean
    size?: boolean
    uploadedAt?: boolean
    status?: boolean
    clientId?: boolean
  }

  export type StatementFileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "filename" | "type" | "size" | "uploadedAt" | "status" | "clientId", ExtArgs["result"]["statementFile"]>
  export type StatementFileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    ParseResult?: boolean | StatementFile$ParseResultArgs<ExtArgs>
  }
  export type StatementFileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type StatementFileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $StatementFilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StatementFile"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
      ParseResult: Prisma.$ParseResultPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      filename: string
      type: string
      size: number
      uploadedAt: Date
      status: string
      clientId: string
    }, ExtArgs["result"]["statementFile"]>
    composites: {}
  }

  type StatementFileGetPayload<S extends boolean | null | undefined | StatementFileDefaultArgs> = $Result.GetResult<Prisma.$StatementFilePayload, S>

  type StatementFileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StatementFileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StatementFileCountAggregateInputType | true
    }

  export interface StatementFileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StatementFile'], meta: { name: 'StatementFile' } }
    /**
     * Find zero or one StatementFile that matches the filter.
     * @param {StatementFileFindUniqueArgs} args - Arguments to find a StatementFile
     * @example
     * // Get one StatementFile
     * const statementFile = await prisma.statementFile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StatementFileFindUniqueArgs>(args: SelectSubset<T, StatementFileFindUniqueArgs<ExtArgs>>): Prisma__StatementFileClient<$Result.GetResult<Prisma.$StatementFilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StatementFile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StatementFileFindUniqueOrThrowArgs} args - Arguments to find a StatementFile
     * @example
     * // Get one StatementFile
     * const statementFile = await prisma.statementFile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StatementFileFindUniqueOrThrowArgs>(args: SelectSubset<T, StatementFileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StatementFileClient<$Result.GetResult<Prisma.$StatementFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StatementFile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementFileFindFirstArgs} args - Arguments to find a StatementFile
     * @example
     * // Get one StatementFile
     * const statementFile = await prisma.statementFile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StatementFileFindFirstArgs>(args?: SelectSubset<T, StatementFileFindFirstArgs<ExtArgs>>): Prisma__StatementFileClient<$Result.GetResult<Prisma.$StatementFilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StatementFile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementFileFindFirstOrThrowArgs} args - Arguments to find a StatementFile
     * @example
     * // Get one StatementFile
     * const statementFile = await prisma.statementFile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StatementFileFindFirstOrThrowArgs>(args?: SelectSubset<T, StatementFileFindFirstOrThrowArgs<ExtArgs>>): Prisma__StatementFileClient<$Result.GetResult<Prisma.$StatementFilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StatementFiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementFileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StatementFiles
     * const statementFiles = await prisma.statementFile.findMany()
     * 
     * // Get first 10 StatementFiles
     * const statementFiles = await prisma.statementFile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const statementFileWithIdOnly = await prisma.statementFile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StatementFileFindManyArgs>(args?: SelectSubset<T, StatementFileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatementFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StatementFile.
     * @param {StatementFileCreateArgs} args - Arguments to create a StatementFile.
     * @example
     * // Create one StatementFile
     * const StatementFile = await prisma.statementFile.create({
     *   data: {
     *     // ... data to create a StatementFile
     *   }
     * })
     * 
     */
    create<T extends StatementFileCreateArgs>(args: SelectSubset<T, StatementFileCreateArgs<ExtArgs>>): Prisma__StatementFileClient<$Result.GetResult<Prisma.$StatementFilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StatementFiles.
     * @param {StatementFileCreateManyArgs} args - Arguments to create many StatementFiles.
     * @example
     * // Create many StatementFiles
     * const statementFile = await prisma.statementFile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StatementFileCreateManyArgs>(args?: SelectSubset<T, StatementFileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StatementFiles and returns the data saved in the database.
     * @param {StatementFileCreateManyAndReturnArgs} args - Arguments to create many StatementFiles.
     * @example
     * // Create many StatementFiles
     * const statementFile = await prisma.statementFile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StatementFiles and only return the `id`
     * const statementFileWithIdOnly = await prisma.statementFile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StatementFileCreateManyAndReturnArgs>(args?: SelectSubset<T, StatementFileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatementFilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StatementFile.
     * @param {StatementFileDeleteArgs} args - Arguments to delete one StatementFile.
     * @example
     * // Delete one StatementFile
     * const StatementFile = await prisma.statementFile.delete({
     *   where: {
     *     // ... filter to delete one StatementFile
     *   }
     * })
     * 
     */
    delete<T extends StatementFileDeleteArgs>(args: SelectSubset<T, StatementFileDeleteArgs<ExtArgs>>): Prisma__StatementFileClient<$Result.GetResult<Prisma.$StatementFilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StatementFile.
     * @param {StatementFileUpdateArgs} args - Arguments to update one StatementFile.
     * @example
     * // Update one StatementFile
     * const statementFile = await prisma.statementFile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StatementFileUpdateArgs>(args: SelectSubset<T, StatementFileUpdateArgs<ExtArgs>>): Prisma__StatementFileClient<$Result.GetResult<Prisma.$StatementFilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StatementFiles.
     * @param {StatementFileDeleteManyArgs} args - Arguments to filter StatementFiles to delete.
     * @example
     * // Delete a few StatementFiles
     * const { count } = await prisma.statementFile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StatementFileDeleteManyArgs>(args?: SelectSubset<T, StatementFileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StatementFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementFileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StatementFiles
     * const statementFile = await prisma.statementFile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StatementFileUpdateManyArgs>(args: SelectSubset<T, StatementFileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StatementFiles and returns the data updated in the database.
     * @param {StatementFileUpdateManyAndReturnArgs} args - Arguments to update many StatementFiles.
     * @example
     * // Update many StatementFiles
     * const statementFile = await prisma.statementFile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StatementFiles and only return the `id`
     * const statementFileWithIdOnly = await prisma.statementFile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StatementFileUpdateManyAndReturnArgs>(args: SelectSubset<T, StatementFileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatementFilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StatementFile.
     * @param {StatementFileUpsertArgs} args - Arguments to update or create a StatementFile.
     * @example
     * // Update or create a StatementFile
     * const statementFile = await prisma.statementFile.upsert({
     *   create: {
     *     // ... data to create a StatementFile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StatementFile we want to update
     *   }
     * })
     */
    upsert<T extends StatementFileUpsertArgs>(args: SelectSubset<T, StatementFileUpsertArgs<ExtArgs>>): Prisma__StatementFileClient<$Result.GetResult<Prisma.$StatementFilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StatementFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementFileCountArgs} args - Arguments to filter StatementFiles to count.
     * @example
     * // Count the number of StatementFiles
     * const count = await prisma.statementFile.count({
     *   where: {
     *     // ... the filter for the StatementFiles we want to count
     *   }
     * })
    **/
    count<T extends StatementFileCountArgs>(
      args?: Subset<T, StatementFileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StatementFileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StatementFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementFileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StatementFileAggregateArgs>(args: Subset<T, StatementFileAggregateArgs>): Prisma.PrismaPromise<GetStatementFileAggregateType<T>>

    /**
     * Group by StatementFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatementFileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StatementFileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StatementFileGroupByArgs['orderBy'] }
        : { orderBy?: StatementFileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StatementFileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStatementFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StatementFile model
   */
  readonly fields: StatementFileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StatementFile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StatementFileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ParseResult<T extends StatementFile$ParseResultArgs<ExtArgs> = {}>(args?: Subset<T, StatementFile$ParseResultArgs<ExtArgs>>): Prisma__ParseResultClient<$Result.GetResult<Prisma.$ParseResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StatementFile model
   */
  interface StatementFileFieldRefs {
    readonly id: FieldRef<"StatementFile", 'String'>
    readonly filename: FieldRef<"StatementFile", 'String'>
    readonly type: FieldRef<"StatementFile", 'String'>
    readonly size: FieldRef<"StatementFile", 'Int'>
    readonly uploadedAt: FieldRef<"StatementFile", 'DateTime'>
    readonly status: FieldRef<"StatementFile", 'String'>
    readonly clientId: FieldRef<"StatementFile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * StatementFile findUnique
   */
  export type StatementFileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatementFile
     */
    select?: StatementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatementFile
     */
    omit?: StatementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementFileInclude<ExtArgs> | null
    /**
     * Filter, which StatementFile to fetch.
     */
    where: StatementFileWhereUniqueInput
  }

  /**
   * StatementFile findUniqueOrThrow
   */
  export type StatementFileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatementFile
     */
    select?: StatementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatementFile
     */
    omit?: StatementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementFileInclude<ExtArgs> | null
    /**
     * Filter, which StatementFile to fetch.
     */
    where: StatementFileWhereUniqueInput
  }

  /**
   * StatementFile findFirst
   */
  export type StatementFileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatementFile
     */
    select?: StatementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatementFile
     */
    omit?: StatementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementFileInclude<ExtArgs> | null
    /**
     * Filter, which StatementFile to fetch.
     */
    where?: StatementFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatementFiles to fetch.
     */
    orderBy?: StatementFileOrderByWithRelationInput | StatementFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StatementFiles.
     */
    cursor?: StatementFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatementFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatementFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StatementFiles.
     */
    distinct?: StatementFileScalarFieldEnum | StatementFileScalarFieldEnum[]
  }

  /**
   * StatementFile findFirstOrThrow
   */
  export type StatementFileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatementFile
     */
    select?: StatementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatementFile
     */
    omit?: StatementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementFileInclude<ExtArgs> | null
    /**
     * Filter, which StatementFile to fetch.
     */
    where?: StatementFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatementFiles to fetch.
     */
    orderBy?: StatementFileOrderByWithRelationInput | StatementFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StatementFiles.
     */
    cursor?: StatementFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatementFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatementFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StatementFiles.
     */
    distinct?: StatementFileScalarFieldEnum | StatementFileScalarFieldEnum[]
  }

  /**
   * StatementFile findMany
   */
  export type StatementFileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatementFile
     */
    select?: StatementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatementFile
     */
    omit?: StatementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementFileInclude<ExtArgs> | null
    /**
     * Filter, which StatementFiles to fetch.
     */
    where?: StatementFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatementFiles to fetch.
     */
    orderBy?: StatementFileOrderByWithRelationInput | StatementFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StatementFiles.
     */
    cursor?: StatementFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatementFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatementFiles.
     */
    skip?: number
    distinct?: StatementFileScalarFieldEnum | StatementFileScalarFieldEnum[]
  }

  /**
   * StatementFile create
   */
  export type StatementFileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatementFile
     */
    select?: StatementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatementFile
     */
    omit?: StatementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementFileInclude<ExtArgs> | null
    /**
     * The data needed to create a StatementFile.
     */
    data: XOR<StatementFileCreateInput, StatementFileUncheckedCreateInput>
  }

  /**
   * StatementFile createMany
   */
  export type StatementFileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StatementFiles.
     */
    data: StatementFileCreateManyInput | StatementFileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StatementFile createManyAndReturn
   */
  export type StatementFileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatementFile
     */
    select?: StatementFileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StatementFile
     */
    omit?: StatementFileOmit<ExtArgs> | null
    /**
     * The data used to create many StatementFiles.
     */
    data: StatementFileCreateManyInput | StatementFileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementFileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StatementFile update
   */
  export type StatementFileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatementFile
     */
    select?: StatementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatementFile
     */
    omit?: StatementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementFileInclude<ExtArgs> | null
    /**
     * The data needed to update a StatementFile.
     */
    data: XOR<StatementFileUpdateInput, StatementFileUncheckedUpdateInput>
    /**
     * Choose, which StatementFile to update.
     */
    where: StatementFileWhereUniqueInput
  }

  /**
   * StatementFile updateMany
   */
  export type StatementFileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StatementFiles.
     */
    data: XOR<StatementFileUpdateManyMutationInput, StatementFileUncheckedUpdateManyInput>
    /**
     * Filter which StatementFiles to update
     */
    where?: StatementFileWhereInput
    /**
     * Limit how many StatementFiles to update.
     */
    limit?: number
  }

  /**
   * StatementFile updateManyAndReturn
   */
  export type StatementFileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatementFile
     */
    select?: StatementFileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StatementFile
     */
    omit?: StatementFileOmit<ExtArgs> | null
    /**
     * The data used to update StatementFiles.
     */
    data: XOR<StatementFileUpdateManyMutationInput, StatementFileUncheckedUpdateManyInput>
    /**
     * Filter which StatementFiles to update
     */
    where?: StatementFileWhereInput
    /**
     * Limit how many StatementFiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementFileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StatementFile upsert
   */
  export type StatementFileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatementFile
     */
    select?: StatementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatementFile
     */
    omit?: StatementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementFileInclude<ExtArgs> | null
    /**
     * The filter to search for the StatementFile to update in case it exists.
     */
    where: StatementFileWhereUniqueInput
    /**
     * In case the StatementFile found by the `where` argument doesn't exist, create a new StatementFile with this data.
     */
    create: XOR<StatementFileCreateInput, StatementFileUncheckedCreateInput>
    /**
     * In case the StatementFile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StatementFileUpdateInput, StatementFileUncheckedUpdateInput>
  }

  /**
   * StatementFile delete
   */
  export type StatementFileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatementFile
     */
    select?: StatementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatementFile
     */
    omit?: StatementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementFileInclude<ExtArgs> | null
    /**
     * Filter which StatementFile to delete.
     */
    where: StatementFileWhereUniqueInput
  }

  /**
   * StatementFile deleteMany
   */
  export type StatementFileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StatementFiles to delete
     */
    where?: StatementFileWhereInput
    /**
     * Limit how many StatementFiles to delete.
     */
    limit?: number
  }

  /**
   * StatementFile.ParseResult
   */
  export type StatementFile$ParseResultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParseResult
     */
    select?: ParseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParseResult
     */
    omit?: ParseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParseResultInclude<ExtArgs> | null
    where?: ParseResultWhereInput
  }

  /**
   * StatementFile without action
   */
  export type StatementFileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatementFile
     */
    select?: StatementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatementFile
     */
    omit?: StatementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatementFileInclude<ExtArgs> | null
  }


  /**
   * Model ParseResult
   */

  export type AggregateParseResult = {
    _count: ParseResultCountAggregateOutputType | null
    _avg: ParseResultAvgAggregateOutputType | null
    _sum: ParseResultSumAggregateOutputType | null
    _min: ParseResultMinAggregateOutputType | null
    _max: ParseResultMaxAggregateOutputType | null
  }

  export type ParseResultAvgAggregateOutputType = {
    totalTransactions: number | null
  }

  export type ParseResultSumAggregateOutputType = {
    totalTransactions: number | null
  }

  export type ParseResultMinAggregateOutputType = {
    id: string | null
    statementFileId: string | null
    totalTransactions: number | null
    dateRangeStart: Date | null
    dateRangeEnd: Date | null
    status: string | null
    createdAt: Date | null
  }

  export type ParseResultMaxAggregateOutputType = {
    id: string | null
    statementFileId: string | null
    totalTransactions: number | null
    dateRangeStart: Date | null
    dateRangeEnd: Date | null
    status: string | null
    createdAt: Date | null
  }

  export type ParseResultCountAggregateOutputType = {
    id: number
    statementFileId: number
    totalTransactions: number
    dateRangeStart: number
    dateRangeEnd: number
    accounts: number
    status: number
    errors: number
    createdAt: number
    _all: number
  }


  export type ParseResultAvgAggregateInputType = {
    totalTransactions?: true
  }

  export type ParseResultSumAggregateInputType = {
    totalTransactions?: true
  }

  export type ParseResultMinAggregateInputType = {
    id?: true
    statementFileId?: true
    totalTransactions?: true
    dateRangeStart?: true
    dateRangeEnd?: true
    status?: true
    createdAt?: true
  }

  export type ParseResultMaxAggregateInputType = {
    id?: true
    statementFileId?: true
    totalTransactions?: true
    dateRangeStart?: true
    dateRangeEnd?: true
    status?: true
    createdAt?: true
  }

  export type ParseResultCountAggregateInputType = {
    id?: true
    statementFileId?: true
    totalTransactions?: true
    dateRangeStart?: true
    dateRangeEnd?: true
    accounts?: true
    status?: true
    errors?: true
    createdAt?: true
    _all?: true
  }

  export type ParseResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParseResult to aggregate.
     */
    where?: ParseResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParseResults to fetch.
     */
    orderBy?: ParseResultOrderByWithRelationInput | ParseResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParseResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParseResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParseResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ParseResults
    **/
    _count?: true | ParseResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ParseResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ParseResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParseResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParseResultMaxAggregateInputType
  }

  export type GetParseResultAggregateType<T extends ParseResultAggregateArgs> = {
        [P in keyof T & keyof AggregateParseResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParseResult[P]>
      : GetScalarType<T[P], AggregateParseResult[P]>
  }




  export type ParseResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParseResultWhereInput
    orderBy?: ParseResultOrderByWithAggregationInput | ParseResultOrderByWithAggregationInput[]
    by: ParseResultScalarFieldEnum[] | ParseResultScalarFieldEnum
    having?: ParseResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParseResultCountAggregateInputType | true
    _avg?: ParseResultAvgAggregateInputType
    _sum?: ParseResultSumAggregateInputType
    _min?: ParseResultMinAggregateInputType
    _max?: ParseResultMaxAggregateInputType
  }

  export type ParseResultGroupByOutputType = {
    id: string
    statementFileId: string
    totalTransactions: number
    dateRangeStart: Date
    dateRangeEnd: Date
    accounts: JsonValue
    status: string
    errors: JsonValue | null
    createdAt: Date
    _count: ParseResultCountAggregateOutputType | null
    _avg: ParseResultAvgAggregateOutputType | null
    _sum: ParseResultSumAggregateOutputType | null
    _min: ParseResultMinAggregateOutputType | null
    _max: ParseResultMaxAggregateOutputType | null
  }

  type GetParseResultGroupByPayload<T extends ParseResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParseResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParseResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParseResultGroupByOutputType[P]>
            : GetScalarType<T[P], ParseResultGroupByOutputType[P]>
        }
      >
    >


  export type ParseResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    statementFileId?: boolean
    totalTransactions?: boolean
    dateRangeStart?: boolean
    dateRangeEnd?: boolean
    accounts?: boolean
    status?: boolean
    errors?: boolean
    createdAt?: boolean
    statementFile?: boolean | StatementFileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parseResult"]>

  export type ParseResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    statementFileId?: boolean
    totalTransactions?: boolean
    dateRangeStart?: boolean
    dateRangeEnd?: boolean
    accounts?: boolean
    status?: boolean
    errors?: boolean
    createdAt?: boolean
    statementFile?: boolean | StatementFileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parseResult"]>

  export type ParseResultSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    statementFileId?: boolean
    totalTransactions?: boolean
    dateRangeStart?: boolean
    dateRangeEnd?: boolean
    accounts?: boolean
    status?: boolean
    errors?: boolean
    createdAt?: boolean
    statementFile?: boolean | StatementFileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parseResult"]>

  export type ParseResultSelectScalar = {
    id?: boolean
    statementFileId?: boolean
    totalTransactions?: boolean
    dateRangeStart?: boolean
    dateRangeEnd?: boolean
    accounts?: boolean
    status?: boolean
    errors?: boolean
    createdAt?: boolean
  }

  export type ParseResultOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "statementFileId" | "totalTransactions" | "dateRangeStart" | "dateRangeEnd" | "accounts" | "status" | "errors" | "createdAt", ExtArgs["result"]["parseResult"]>
  export type ParseResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statementFile?: boolean | StatementFileDefaultArgs<ExtArgs>
  }
  export type ParseResultIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statementFile?: boolean | StatementFileDefaultArgs<ExtArgs>
  }
  export type ParseResultIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statementFile?: boolean | StatementFileDefaultArgs<ExtArgs>
  }

  export type $ParseResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ParseResult"
    objects: {
      statementFile: Prisma.$StatementFilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      statementFileId: string
      totalTransactions: number
      dateRangeStart: Date
      dateRangeEnd: Date
      accounts: Prisma.JsonValue
      status: string
      errors: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["parseResult"]>
    composites: {}
  }

  type ParseResultGetPayload<S extends boolean | null | undefined | ParseResultDefaultArgs> = $Result.GetResult<Prisma.$ParseResultPayload, S>

  type ParseResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParseResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParseResultCountAggregateInputType | true
    }

  export interface ParseResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ParseResult'], meta: { name: 'ParseResult' } }
    /**
     * Find zero or one ParseResult that matches the filter.
     * @param {ParseResultFindUniqueArgs} args - Arguments to find a ParseResult
     * @example
     * // Get one ParseResult
     * const parseResult = await prisma.parseResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParseResultFindUniqueArgs>(args: SelectSubset<T, ParseResultFindUniqueArgs<ExtArgs>>): Prisma__ParseResultClient<$Result.GetResult<Prisma.$ParseResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ParseResult that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParseResultFindUniqueOrThrowArgs} args - Arguments to find a ParseResult
     * @example
     * // Get one ParseResult
     * const parseResult = await prisma.parseResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParseResultFindUniqueOrThrowArgs>(args: SelectSubset<T, ParseResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParseResultClient<$Result.GetResult<Prisma.$ParseResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParseResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParseResultFindFirstArgs} args - Arguments to find a ParseResult
     * @example
     * // Get one ParseResult
     * const parseResult = await prisma.parseResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParseResultFindFirstArgs>(args?: SelectSubset<T, ParseResultFindFirstArgs<ExtArgs>>): Prisma__ParseResultClient<$Result.GetResult<Prisma.$ParseResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParseResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParseResultFindFirstOrThrowArgs} args - Arguments to find a ParseResult
     * @example
     * // Get one ParseResult
     * const parseResult = await prisma.parseResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParseResultFindFirstOrThrowArgs>(args?: SelectSubset<T, ParseResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParseResultClient<$Result.GetResult<Prisma.$ParseResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ParseResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParseResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ParseResults
     * const parseResults = await prisma.parseResult.findMany()
     * 
     * // Get first 10 ParseResults
     * const parseResults = await prisma.parseResult.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const parseResultWithIdOnly = await prisma.parseResult.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParseResultFindManyArgs>(args?: SelectSubset<T, ParseResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParseResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ParseResult.
     * @param {ParseResultCreateArgs} args - Arguments to create a ParseResult.
     * @example
     * // Create one ParseResult
     * const ParseResult = await prisma.parseResult.create({
     *   data: {
     *     // ... data to create a ParseResult
     *   }
     * })
     * 
     */
    create<T extends ParseResultCreateArgs>(args: SelectSubset<T, ParseResultCreateArgs<ExtArgs>>): Prisma__ParseResultClient<$Result.GetResult<Prisma.$ParseResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ParseResults.
     * @param {ParseResultCreateManyArgs} args - Arguments to create many ParseResults.
     * @example
     * // Create many ParseResults
     * const parseResult = await prisma.parseResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParseResultCreateManyArgs>(args?: SelectSubset<T, ParseResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ParseResults and returns the data saved in the database.
     * @param {ParseResultCreateManyAndReturnArgs} args - Arguments to create many ParseResults.
     * @example
     * // Create many ParseResults
     * const parseResult = await prisma.parseResult.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ParseResults and only return the `id`
     * const parseResultWithIdOnly = await prisma.parseResult.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParseResultCreateManyAndReturnArgs>(args?: SelectSubset<T, ParseResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParseResultPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ParseResult.
     * @param {ParseResultDeleteArgs} args - Arguments to delete one ParseResult.
     * @example
     * // Delete one ParseResult
     * const ParseResult = await prisma.parseResult.delete({
     *   where: {
     *     // ... filter to delete one ParseResult
     *   }
     * })
     * 
     */
    delete<T extends ParseResultDeleteArgs>(args: SelectSubset<T, ParseResultDeleteArgs<ExtArgs>>): Prisma__ParseResultClient<$Result.GetResult<Prisma.$ParseResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ParseResult.
     * @param {ParseResultUpdateArgs} args - Arguments to update one ParseResult.
     * @example
     * // Update one ParseResult
     * const parseResult = await prisma.parseResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParseResultUpdateArgs>(args: SelectSubset<T, ParseResultUpdateArgs<ExtArgs>>): Prisma__ParseResultClient<$Result.GetResult<Prisma.$ParseResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ParseResults.
     * @param {ParseResultDeleteManyArgs} args - Arguments to filter ParseResults to delete.
     * @example
     * // Delete a few ParseResults
     * const { count } = await prisma.parseResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParseResultDeleteManyArgs>(args?: SelectSubset<T, ParseResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParseResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParseResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ParseResults
     * const parseResult = await prisma.parseResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParseResultUpdateManyArgs>(args: SelectSubset<T, ParseResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParseResults and returns the data updated in the database.
     * @param {ParseResultUpdateManyAndReturnArgs} args - Arguments to update many ParseResults.
     * @example
     * // Update many ParseResults
     * const parseResult = await prisma.parseResult.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ParseResults and only return the `id`
     * const parseResultWithIdOnly = await prisma.parseResult.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ParseResultUpdateManyAndReturnArgs>(args: SelectSubset<T, ParseResultUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParseResultPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ParseResult.
     * @param {ParseResultUpsertArgs} args - Arguments to update or create a ParseResult.
     * @example
     * // Update or create a ParseResult
     * const parseResult = await prisma.parseResult.upsert({
     *   create: {
     *     // ... data to create a ParseResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ParseResult we want to update
     *   }
     * })
     */
    upsert<T extends ParseResultUpsertArgs>(args: SelectSubset<T, ParseResultUpsertArgs<ExtArgs>>): Prisma__ParseResultClient<$Result.GetResult<Prisma.$ParseResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ParseResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParseResultCountArgs} args - Arguments to filter ParseResults to count.
     * @example
     * // Count the number of ParseResults
     * const count = await prisma.parseResult.count({
     *   where: {
     *     // ... the filter for the ParseResults we want to count
     *   }
     * })
    **/
    count<T extends ParseResultCountArgs>(
      args?: Subset<T, ParseResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParseResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ParseResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParseResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParseResultAggregateArgs>(args: Subset<T, ParseResultAggregateArgs>): Prisma.PrismaPromise<GetParseResultAggregateType<T>>

    /**
     * Group by ParseResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParseResultGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParseResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParseResultGroupByArgs['orderBy'] }
        : { orderBy?: ParseResultGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParseResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParseResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ParseResult model
   */
  readonly fields: ParseResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ParseResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParseResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    statementFile<T extends StatementFileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StatementFileDefaultArgs<ExtArgs>>): Prisma__StatementFileClient<$Result.GetResult<Prisma.$StatementFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ParseResult model
   */
  interface ParseResultFieldRefs {
    readonly id: FieldRef<"ParseResult", 'String'>
    readonly statementFileId: FieldRef<"ParseResult", 'String'>
    readonly totalTransactions: FieldRef<"ParseResult", 'Int'>
    readonly dateRangeStart: FieldRef<"ParseResult", 'DateTime'>
    readonly dateRangeEnd: FieldRef<"ParseResult", 'DateTime'>
    readonly accounts: FieldRef<"ParseResult", 'Json'>
    readonly status: FieldRef<"ParseResult", 'String'>
    readonly errors: FieldRef<"ParseResult", 'Json'>
    readonly createdAt: FieldRef<"ParseResult", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ParseResult findUnique
   */
  export type ParseResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParseResult
     */
    select?: ParseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParseResult
     */
    omit?: ParseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParseResultInclude<ExtArgs> | null
    /**
     * Filter, which ParseResult to fetch.
     */
    where: ParseResultWhereUniqueInput
  }

  /**
   * ParseResult findUniqueOrThrow
   */
  export type ParseResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParseResult
     */
    select?: ParseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParseResult
     */
    omit?: ParseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParseResultInclude<ExtArgs> | null
    /**
     * Filter, which ParseResult to fetch.
     */
    where: ParseResultWhereUniqueInput
  }

  /**
   * ParseResult findFirst
   */
  export type ParseResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParseResult
     */
    select?: ParseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParseResult
     */
    omit?: ParseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParseResultInclude<ExtArgs> | null
    /**
     * Filter, which ParseResult to fetch.
     */
    where?: ParseResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParseResults to fetch.
     */
    orderBy?: ParseResultOrderByWithRelationInput | ParseResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParseResults.
     */
    cursor?: ParseResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParseResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParseResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParseResults.
     */
    distinct?: ParseResultScalarFieldEnum | ParseResultScalarFieldEnum[]
  }

  /**
   * ParseResult findFirstOrThrow
   */
  export type ParseResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParseResult
     */
    select?: ParseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParseResult
     */
    omit?: ParseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParseResultInclude<ExtArgs> | null
    /**
     * Filter, which ParseResult to fetch.
     */
    where?: ParseResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParseResults to fetch.
     */
    orderBy?: ParseResultOrderByWithRelationInput | ParseResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParseResults.
     */
    cursor?: ParseResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParseResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParseResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParseResults.
     */
    distinct?: ParseResultScalarFieldEnum | ParseResultScalarFieldEnum[]
  }

  /**
   * ParseResult findMany
   */
  export type ParseResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParseResult
     */
    select?: ParseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParseResult
     */
    omit?: ParseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParseResultInclude<ExtArgs> | null
    /**
     * Filter, which ParseResults to fetch.
     */
    where?: ParseResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParseResults to fetch.
     */
    orderBy?: ParseResultOrderByWithRelationInput | ParseResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ParseResults.
     */
    cursor?: ParseResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParseResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParseResults.
     */
    skip?: number
    distinct?: ParseResultScalarFieldEnum | ParseResultScalarFieldEnum[]
  }

  /**
   * ParseResult create
   */
  export type ParseResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParseResult
     */
    select?: ParseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParseResult
     */
    omit?: ParseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParseResultInclude<ExtArgs> | null
    /**
     * The data needed to create a ParseResult.
     */
    data: XOR<ParseResultCreateInput, ParseResultUncheckedCreateInput>
  }

  /**
   * ParseResult createMany
   */
  export type ParseResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ParseResults.
     */
    data: ParseResultCreateManyInput | ParseResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ParseResult createManyAndReturn
   */
  export type ParseResultCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParseResult
     */
    select?: ParseResultSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ParseResult
     */
    omit?: ParseResultOmit<ExtArgs> | null
    /**
     * The data used to create many ParseResults.
     */
    data: ParseResultCreateManyInput | ParseResultCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParseResultIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ParseResult update
   */
  export type ParseResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParseResult
     */
    select?: ParseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParseResult
     */
    omit?: ParseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParseResultInclude<ExtArgs> | null
    /**
     * The data needed to update a ParseResult.
     */
    data: XOR<ParseResultUpdateInput, ParseResultUncheckedUpdateInput>
    /**
     * Choose, which ParseResult to update.
     */
    where: ParseResultWhereUniqueInput
  }

  /**
   * ParseResult updateMany
   */
  export type ParseResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ParseResults.
     */
    data: XOR<ParseResultUpdateManyMutationInput, ParseResultUncheckedUpdateManyInput>
    /**
     * Filter which ParseResults to update
     */
    where?: ParseResultWhereInput
    /**
     * Limit how many ParseResults to update.
     */
    limit?: number
  }

  /**
   * ParseResult updateManyAndReturn
   */
  export type ParseResultUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParseResult
     */
    select?: ParseResultSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ParseResult
     */
    omit?: ParseResultOmit<ExtArgs> | null
    /**
     * The data used to update ParseResults.
     */
    data: XOR<ParseResultUpdateManyMutationInput, ParseResultUncheckedUpdateManyInput>
    /**
     * Filter which ParseResults to update
     */
    where?: ParseResultWhereInput
    /**
     * Limit how many ParseResults to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParseResultIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ParseResult upsert
   */
  export type ParseResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParseResult
     */
    select?: ParseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParseResult
     */
    omit?: ParseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParseResultInclude<ExtArgs> | null
    /**
     * The filter to search for the ParseResult to update in case it exists.
     */
    where: ParseResultWhereUniqueInput
    /**
     * In case the ParseResult found by the `where` argument doesn't exist, create a new ParseResult with this data.
     */
    create: XOR<ParseResultCreateInput, ParseResultUncheckedCreateInput>
    /**
     * In case the ParseResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParseResultUpdateInput, ParseResultUncheckedUpdateInput>
  }

  /**
   * ParseResult delete
   */
  export type ParseResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParseResult
     */
    select?: ParseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParseResult
     */
    omit?: ParseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParseResultInclude<ExtArgs> | null
    /**
     * Filter which ParseResult to delete.
     */
    where: ParseResultWhereUniqueInput
  }

  /**
   * ParseResult deleteMany
   */
  export type ParseResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParseResults to delete
     */
    where?: ParseResultWhereInput
    /**
     * Limit how many ParseResults to delete.
     */
    limit?: number
  }

  /**
   * ParseResult without action
   */
  export type ParseResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParseResult
     */
    select?: ParseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParseResult
     */
    omit?: ParseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParseResultInclude<ExtArgs> | null
  }


  /**
   * Model Analysis
   */

  export type AggregateAnalysis = {
    _count: AnalysisCountAggregateOutputType | null
    _min: AnalysisMinAggregateOutputType | null
    _max: AnalysisMaxAggregateOutputType | null
  }

  export type AnalysisMinAggregateOutputType = {
    id: string | null
    clientId: string | null
    createdAt: Date | null
    status: string | null
  }

  export type AnalysisMaxAggregateOutputType = {
    id: string | null
    clientId: string | null
    createdAt: Date | null
    status: string | null
  }

  export type AnalysisCountAggregateOutputType = {
    id: number
    clientId: number
    statementFileIds: number
    createdAt: number
    status: number
    summary: number
    liquidityMetrics: number
    spendingBreakdown: number
    idleBalanceAnalysis: number
    _all: number
  }


  export type AnalysisMinAggregateInputType = {
    id?: true
    clientId?: true
    createdAt?: true
    status?: true
  }

  export type AnalysisMaxAggregateInputType = {
    id?: true
    clientId?: true
    createdAt?: true
    status?: true
  }

  export type AnalysisCountAggregateInputType = {
    id?: true
    clientId?: true
    statementFileIds?: true
    createdAt?: true
    status?: true
    summary?: true
    liquidityMetrics?: true
    spendingBreakdown?: true
    idleBalanceAnalysis?: true
    _all?: true
  }

  export type AnalysisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Analysis to aggregate.
     */
    where?: AnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analyses to fetch.
     */
    orderBy?: AnalysisOrderByWithRelationInput | AnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Analyses
    **/
    _count?: true | AnalysisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnalysisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnalysisMaxAggregateInputType
  }

  export type GetAnalysisAggregateType<T extends AnalysisAggregateArgs> = {
        [P in keyof T & keyof AggregateAnalysis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnalysis[P]>
      : GetScalarType<T[P], AggregateAnalysis[P]>
  }




  export type AnalysisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalysisWhereInput
    orderBy?: AnalysisOrderByWithAggregationInput | AnalysisOrderByWithAggregationInput[]
    by: AnalysisScalarFieldEnum[] | AnalysisScalarFieldEnum
    having?: AnalysisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnalysisCountAggregateInputType | true
    _min?: AnalysisMinAggregateInputType
    _max?: AnalysisMaxAggregateInputType
  }

  export type AnalysisGroupByOutputType = {
    id: string
    clientId: string
    statementFileIds: string[]
    createdAt: Date
    status: string
    summary: JsonValue
    liquidityMetrics: JsonValue
    spendingBreakdown: JsonValue
    idleBalanceAnalysis: JsonValue
    _count: AnalysisCountAggregateOutputType | null
    _min: AnalysisMinAggregateOutputType | null
    _max: AnalysisMaxAggregateOutputType | null
  }

  type GetAnalysisGroupByPayload<T extends AnalysisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnalysisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnalysisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnalysisGroupByOutputType[P]>
            : GetScalarType<T[P], AnalysisGroupByOutputType[P]>
        }
      >
    >


  export type AnalysisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    statementFileIds?: boolean
    createdAt?: boolean
    status?: boolean
    summary?: boolean
    liquidityMetrics?: boolean
    spendingBreakdown?: boolean
    idleBalanceAnalysis?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    Recommendation?: boolean | Analysis$RecommendationArgs<ExtArgs>
    Report?: boolean | Analysis$ReportArgs<ExtArgs>
    _count?: boolean | AnalysisCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analysis"]>

  export type AnalysisSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    statementFileIds?: boolean
    createdAt?: boolean
    status?: boolean
    summary?: boolean
    liquidityMetrics?: boolean
    spendingBreakdown?: boolean
    idleBalanceAnalysis?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analysis"]>

  export type AnalysisSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    statementFileIds?: boolean
    createdAt?: boolean
    status?: boolean
    summary?: boolean
    liquidityMetrics?: boolean
    spendingBreakdown?: boolean
    idleBalanceAnalysis?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analysis"]>

  export type AnalysisSelectScalar = {
    id?: boolean
    clientId?: boolean
    statementFileIds?: boolean
    createdAt?: boolean
    status?: boolean
    summary?: boolean
    liquidityMetrics?: boolean
    spendingBreakdown?: boolean
    idleBalanceAnalysis?: boolean
  }

  export type AnalysisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clientId" | "statementFileIds" | "createdAt" | "status" | "summary" | "liquidityMetrics" | "spendingBreakdown" | "idleBalanceAnalysis", ExtArgs["result"]["analysis"]>
  export type AnalysisInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    Recommendation?: boolean | Analysis$RecommendationArgs<ExtArgs>
    Report?: boolean | Analysis$ReportArgs<ExtArgs>
    _count?: boolean | AnalysisCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AnalysisIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type AnalysisIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $AnalysisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Analysis"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
      Recommendation: Prisma.$RecommendationPayload<ExtArgs>[]
      Report: Prisma.$ReportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientId: string
      statementFileIds: string[]
      createdAt: Date
      status: string
      summary: Prisma.JsonValue
      liquidityMetrics: Prisma.JsonValue
      spendingBreakdown: Prisma.JsonValue
      idleBalanceAnalysis: Prisma.JsonValue
    }, ExtArgs["result"]["analysis"]>
    composites: {}
  }

  type AnalysisGetPayload<S extends boolean | null | undefined | AnalysisDefaultArgs> = $Result.GetResult<Prisma.$AnalysisPayload, S>

  type AnalysisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnalysisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnalysisCountAggregateInputType | true
    }

  export interface AnalysisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Analysis'], meta: { name: 'Analysis' } }
    /**
     * Find zero or one Analysis that matches the filter.
     * @param {AnalysisFindUniqueArgs} args - Arguments to find a Analysis
     * @example
     * // Get one Analysis
     * const analysis = await prisma.analysis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnalysisFindUniqueArgs>(args: SelectSubset<T, AnalysisFindUniqueArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Analysis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnalysisFindUniqueOrThrowArgs} args - Arguments to find a Analysis
     * @example
     * // Get one Analysis
     * const analysis = await prisma.analysis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnalysisFindUniqueOrThrowArgs>(args: SelectSubset<T, AnalysisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Analysis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisFindFirstArgs} args - Arguments to find a Analysis
     * @example
     * // Get one Analysis
     * const analysis = await prisma.analysis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnalysisFindFirstArgs>(args?: SelectSubset<T, AnalysisFindFirstArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Analysis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisFindFirstOrThrowArgs} args - Arguments to find a Analysis
     * @example
     * // Get one Analysis
     * const analysis = await prisma.analysis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnalysisFindFirstOrThrowArgs>(args?: SelectSubset<T, AnalysisFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Analyses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Analyses
     * const analyses = await prisma.analysis.findMany()
     * 
     * // Get first 10 Analyses
     * const analyses = await prisma.analysis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const analysisWithIdOnly = await prisma.analysis.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnalysisFindManyArgs>(args?: SelectSubset<T, AnalysisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Analysis.
     * @param {AnalysisCreateArgs} args - Arguments to create a Analysis.
     * @example
     * // Create one Analysis
     * const Analysis = await prisma.analysis.create({
     *   data: {
     *     // ... data to create a Analysis
     *   }
     * })
     * 
     */
    create<T extends AnalysisCreateArgs>(args: SelectSubset<T, AnalysisCreateArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Analyses.
     * @param {AnalysisCreateManyArgs} args - Arguments to create many Analyses.
     * @example
     * // Create many Analyses
     * const analysis = await prisma.analysis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnalysisCreateManyArgs>(args?: SelectSubset<T, AnalysisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Analyses and returns the data saved in the database.
     * @param {AnalysisCreateManyAndReturnArgs} args - Arguments to create many Analyses.
     * @example
     * // Create many Analyses
     * const analysis = await prisma.analysis.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Analyses and only return the `id`
     * const analysisWithIdOnly = await prisma.analysis.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnalysisCreateManyAndReturnArgs>(args?: SelectSubset<T, AnalysisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Analysis.
     * @param {AnalysisDeleteArgs} args - Arguments to delete one Analysis.
     * @example
     * // Delete one Analysis
     * const Analysis = await prisma.analysis.delete({
     *   where: {
     *     // ... filter to delete one Analysis
     *   }
     * })
     * 
     */
    delete<T extends AnalysisDeleteArgs>(args: SelectSubset<T, AnalysisDeleteArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Analysis.
     * @param {AnalysisUpdateArgs} args - Arguments to update one Analysis.
     * @example
     * // Update one Analysis
     * const analysis = await prisma.analysis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnalysisUpdateArgs>(args: SelectSubset<T, AnalysisUpdateArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Analyses.
     * @param {AnalysisDeleteManyArgs} args - Arguments to filter Analyses to delete.
     * @example
     * // Delete a few Analyses
     * const { count } = await prisma.analysis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnalysisDeleteManyArgs>(args?: SelectSubset<T, AnalysisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Analyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Analyses
     * const analysis = await prisma.analysis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnalysisUpdateManyArgs>(args: SelectSubset<T, AnalysisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Analyses and returns the data updated in the database.
     * @param {AnalysisUpdateManyAndReturnArgs} args - Arguments to update many Analyses.
     * @example
     * // Update many Analyses
     * const analysis = await prisma.analysis.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Analyses and only return the `id`
     * const analysisWithIdOnly = await prisma.analysis.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnalysisUpdateManyAndReturnArgs>(args: SelectSubset<T, AnalysisUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Analysis.
     * @param {AnalysisUpsertArgs} args - Arguments to update or create a Analysis.
     * @example
     * // Update or create a Analysis
     * const analysis = await prisma.analysis.upsert({
     *   create: {
     *     // ... data to create a Analysis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Analysis we want to update
     *   }
     * })
     */
    upsert<T extends AnalysisUpsertArgs>(args: SelectSubset<T, AnalysisUpsertArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Analyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisCountArgs} args - Arguments to filter Analyses to count.
     * @example
     * // Count the number of Analyses
     * const count = await prisma.analysis.count({
     *   where: {
     *     // ... the filter for the Analyses we want to count
     *   }
     * })
    **/
    count<T extends AnalysisCountArgs>(
      args?: Subset<T, AnalysisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnalysisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Analysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnalysisAggregateArgs>(args: Subset<T, AnalysisAggregateArgs>): Prisma.PrismaPromise<GetAnalysisAggregateType<T>>

    /**
     * Group by Analysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnalysisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnalysisGroupByArgs['orderBy'] }
        : { orderBy?: AnalysisGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnalysisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnalysisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Analysis model
   */
  readonly fields: AnalysisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Analysis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnalysisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Recommendation<T extends Analysis$RecommendationArgs<ExtArgs> = {}>(args?: Subset<T, Analysis$RecommendationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Report<T extends Analysis$ReportArgs<ExtArgs> = {}>(args?: Subset<T, Analysis$ReportArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Analysis model
   */
  interface AnalysisFieldRefs {
    readonly id: FieldRef<"Analysis", 'String'>
    readonly clientId: FieldRef<"Analysis", 'String'>
    readonly statementFileIds: FieldRef<"Analysis", 'String[]'>
    readonly createdAt: FieldRef<"Analysis", 'DateTime'>
    readonly status: FieldRef<"Analysis", 'String'>
    readonly summary: FieldRef<"Analysis", 'Json'>
    readonly liquidityMetrics: FieldRef<"Analysis", 'Json'>
    readonly spendingBreakdown: FieldRef<"Analysis", 'Json'>
    readonly idleBalanceAnalysis: FieldRef<"Analysis", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Analysis findUnique
   */
  export type AnalysisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * Filter, which Analysis to fetch.
     */
    where: AnalysisWhereUniqueInput
  }

  /**
   * Analysis findUniqueOrThrow
   */
  export type AnalysisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * Filter, which Analysis to fetch.
     */
    where: AnalysisWhereUniqueInput
  }

  /**
   * Analysis findFirst
   */
  export type AnalysisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * Filter, which Analysis to fetch.
     */
    where?: AnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analyses to fetch.
     */
    orderBy?: AnalysisOrderByWithRelationInput | AnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Analyses.
     */
    cursor?: AnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Analyses.
     */
    distinct?: AnalysisScalarFieldEnum | AnalysisScalarFieldEnum[]
  }

  /**
   * Analysis findFirstOrThrow
   */
  export type AnalysisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * Filter, which Analysis to fetch.
     */
    where?: AnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analyses to fetch.
     */
    orderBy?: AnalysisOrderByWithRelationInput | AnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Analyses.
     */
    cursor?: AnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Analyses.
     */
    distinct?: AnalysisScalarFieldEnum | AnalysisScalarFieldEnum[]
  }

  /**
   * Analysis findMany
   */
  export type AnalysisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * Filter, which Analyses to fetch.
     */
    where?: AnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analyses to fetch.
     */
    orderBy?: AnalysisOrderByWithRelationInput | AnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Analyses.
     */
    cursor?: AnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analyses.
     */
    skip?: number
    distinct?: AnalysisScalarFieldEnum | AnalysisScalarFieldEnum[]
  }

  /**
   * Analysis create
   */
  export type AnalysisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * The data needed to create a Analysis.
     */
    data: XOR<AnalysisCreateInput, AnalysisUncheckedCreateInput>
  }

  /**
   * Analysis createMany
   */
  export type AnalysisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Analyses.
     */
    data: AnalysisCreateManyInput | AnalysisCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Analysis createManyAndReturn
   */
  export type AnalysisCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * The data used to create many Analyses.
     */
    data: AnalysisCreateManyInput | AnalysisCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Analysis update
   */
  export type AnalysisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * The data needed to update a Analysis.
     */
    data: XOR<AnalysisUpdateInput, AnalysisUncheckedUpdateInput>
    /**
     * Choose, which Analysis to update.
     */
    where: AnalysisWhereUniqueInput
  }

  /**
   * Analysis updateMany
   */
  export type AnalysisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Analyses.
     */
    data: XOR<AnalysisUpdateManyMutationInput, AnalysisUncheckedUpdateManyInput>
    /**
     * Filter which Analyses to update
     */
    where?: AnalysisWhereInput
    /**
     * Limit how many Analyses to update.
     */
    limit?: number
  }

  /**
   * Analysis updateManyAndReturn
   */
  export type AnalysisUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * The data used to update Analyses.
     */
    data: XOR<AnalysisUpdateManyMutationInput, AnalysisUncheckedUpdateManyInput>
    /**
     * Filter which Analyses to update
     */
    where?: AnalysisWhereInput
    /**
     * Limit how many Analyses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Analysis upsert
   */
  export type AnalysisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * The filter to search for the Analysis to update in case it exists.
     */
    where: AnalysisWhereUniqueInput
    /**
     * In case the Analysis found by the `where` argument doesn't exist, create a new Analysis with this data.
     */
    create: XOR<AnalysisCreateInput, AnalysisUncheckedCreateInput>
    /**
     * In case the Analysis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnalysisUpdateInput, AnalysisUncheckedUpdateInput>
  }

  /**
   * Analysis delete
   */
  export type AnalysisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * Filter which Analysis to delete.
     */
    where: AnalysisWhereUniqueInput
  }

  /**
   * Analysis deleteMany
   */
  export type AnalysisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Analyses to delete
     */
    where?: AnalysisWhereInput
    /**
     * Limit how many Analyses to delete.
     */
    limit?: number
  }

  /**
   * Analysis.Recommendation
   */
  export type Analysis$RecommendationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    where?: RecommendationWhereInput
    orderBy?: RecommendationOrderByWithRelationInput | RecommendationOrderByWithRelationInput[]
    cursor?: RecommendationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecommendationScalarFieldEnum | RecommendationScalarFieldEnum[]
  }

  /**
   * Analysis.Report
   */
  export type Analysis$ReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Analysis without action
   */
  export type AnalysisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
  }


  /**
   * Model TreasuryProduct
   */

  export type AggregateTreasuryProduct = {
    _count: TreasuryProductCountAggregateOutputType | null
    _min: TreasuryProductMinAggregateOutputType | null
    _max: TreasuryProductMaxAggregateOutputType | null
  }

  export type TreasuryProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    description: string | null
    isActive: boolean | null
  }

  export type TreasuryProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    description: string | null
    isActive: boolean | null
  }

  export type TreasuryProductCountAggregateOutputType = {
    id: number
    name: number
    category: number
    description: number
    features: number
    eligibilityRules: number
    benefits: number
    pricing: number
    isActive: number
    _all: number
  }


  export type TreasuryProductMinAggregateInputType = {
    id?: true
    name?: true
    category?: true
    description?: true
    isActive?: true
  }

  export type TreasuryProductMaxAggregateInputType = {
    id?: true
    name?: true
    category?: true
    description?: true
    isActive?: true
  }

  export type TreasuryProductCountAggregateInputType = {
    id?: true
    name?: true
    category?: true
    description?: true
    features?: true
    eligibilityRules?: true
    benefits?: true
    pricing?: true
    isActive?: true
    _all?: true
  }

  export type TreasuryProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TreasuryProduct to aggregate.
     */
    where?: TreasuryProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryProducts to fetch.
     */
    orderBy?: TreasuryProductOrderByWithRelationInput | TreasuryProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TreasuryProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TreasuryProducts
    **/
    _count?: true | TreasuryProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TreasuryProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TreasuryProductMaxAggregateInputType
  }

  export type GetTreasuryProductAggregateType<T extends TreasuryProductAggregateArgs> = {
        [P in keyof T & keyof AggregateTreasuryProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTreasuryProduct[P]>
      : GetScalarType<T[P], AggregateTreasuryProduct[P]>
  }




  export type TreasuryProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreasuryProductWhereInput
    orderBy?: TreasuryProductOrderByWithAggregationInput | TreasuryProductOrderByWithAggregationInput[]
    by: TreasuryProductScalarFieldEnum[] | TreasuryProductScalarFieldEnum
    having?: TreasuryProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TreasuryProductCountAggregateInputType | true
    _min?: TreasuryProductMinAggregateInputType
    _max?: TreasuryProductMaxAggregateInputType
  }

  export type TreasuryProductGroupByOutputType = {
    id: string
    name: string
    category: string
    description: string
    features: string[]
    eligibilityRules: JsonValue
    benefits: JsonValue
    pricing: JsonValue
    isActive: boolean
    _count: TreasuryProductCountAggregateOutputType | null
    _min: TreasuryProductMinAggregateOutputType | null
    _max: TreasuryProductMaxAggregateOutputType | null
  }

  type GetTreasuryProductGroupByPayload<T extends TreasuryProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TreasuryProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TreasuryProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TreasuryProductGroupByOutputType[P]>
            : GetScalarType<T[P], TreasuryProductGroupByOutputType[P]>
        }
      >
    >


  export type TreasuryProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    features?: boolean
    eligibilityRules?: boolean
    benefits?: boolean
    pricing?: boolean
    isActive?: boolean
    Recommendation?: boolean | TreasuryProduct$RecommendationArgs<ExtArgs>
    _count?: boolean | TreasuryProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["treasuryProduct"]>

  export type TreasuryProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    features?: boolean
    eligibilityRules?: boolean
    benefits?: boolean
    pricing?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["treasuryProduct"]>

  export type TreasuryProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    features?: boolean
    eligibilityRules?: boolean
    benefits?: boolean
    pricing?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["treasuryProduct"]>

  export type TreasuryProductSelectScalar = {
    id?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    features?: boolean
    eligibilityRules?: boolean
    benefits?: boolean
    pricing?: boolean
    isActive?: boolean
  }

  export type TreasuryProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "category" | "description" | "features" | "eligibilityRules" | "benefits" | "pricing" | "isActive", ExtArgs["result"]["treasuryProduct"]>
  export type TreasuryProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Recommendation?: boolean | TreasuryProduct$RecommendationArgs<ExtArgs>
    _count?: boolean | TreasuryProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TreasuryProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TreasuryProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TreasuryProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TreasuryProduct"
    objects: {
      Recommendation: Prisma.$RecommendationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      category: string
      description: string
      features: string[]
      eligibilityRules: Prisma.JsonValue
      benefits: Prisma.JsonValue
      pricing: Prisma.JsonValue
      isActive: boolean
    }, ExtArgs["result"]["treasuryProduct"]>
    composites: {}
  }

  type TreasuryProductGetPayload<S extends boolean | null | undefined | TreasuryProductDefaultArgs> = $Result.GetResult<Prisma.$TreasuryProductPayload, S>

  type TreasuryProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TreasuryProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TreasuryProductCountAggregateInputType | true
    }

  export interface TreasuryProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TreasuryProduct'], meta: { name: 'TreasuryProduct' } }
    /**
     * Find zero or one TreasuryProduct that matches the filter.
     * @param {TreasuryProductFindUniqueArgs} args - Arguments to find a TreasuryProduct
     * @example
     * // Get one TreasuryProduct
     * const treasuryProduct = await prisma.treasuryProduct.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TreasuryProductFindUniqueArgs>(args: SelectSubset<T, TreasuryProductFindUniqueArgs<ExtArgs>>): Prisma__TreasuryProductClient<$Result.GetResult<Prisma.$TreasuryProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TreasuryProduct that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TreasuryProductFindUniqueOrThrowArgs} args - Arguments to find a TreasuryProduct
     * @example
     * // Get one TreasuryProduct
     * const treasuryProduct = await prisma.treasuryProduct.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TreasuryProductFindUniqueOrThrowArgs>(args: SelectSubset<T, TreasuryProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TreasuryProductClient<$Result.GetResult<Prisma.$TreasuryProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TreasuryProduct that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryProductFindFirstArgs} args - Arguments to find a TreasuryProduct
     * @example
     * // Get one TreasuryProduct
     * const treasuryProduct = await prisma.treasuryProduct.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TreasuryProductFindFirstArgs>(args?: SelectSubset<T, TreasuryProductFindFirstArgs<ExtArgs>>): Prisma__TreasuryProductClient<$Result.GetResult<Prisma.$TreasuryProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TreasuryProduct that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryProductFindFirstOrThrowArgs} args - Arguments to find a TreasuryProduct
     * @example
     * // Get one TreasuryProduct
     * const treasuryProduct = await prisma.treasuryProduct.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TreasuryProductFindFirstOrThrowArgs>(args?: SelectSubset<T, TreasuryProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__TreasuryProductClient<$Result.GetResult<Prisma.$TreasuryProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TreasuryProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TreasuryProducts
     * const treasuryProducts = await prisma.treasuryProduct.findMany()
     * 
     * // Get first 10 TreasuryProducts
     * const treasuryProducts = await prisma.treasuryProduct.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const treasuryProductWithIdOnly = await prisma.treasuryProduct.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TreasuryProductFindManyArgs>(args?: SelectSubset<T, TreasuryProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreasuryProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TreasuryProduct.
     * @param {TreasuryProductCreateArgs} args - Arguments to create a TreasuryProduct.
     * @example
     * // Create one TreasuryProduct
     * const TreasuryProduct = await prisma.treasuryProduct.create({
     *   data: {
     *     // ... data to create a TreasuryProduct
     *   }
     * })
     * 
     */
    create<T extends TreasuryProductCreateArgs>(args: SelectSubset<T, TreasuryProductCreateArgs<ExtArgs>>): Prisma__TreasuryProductClient<$Result.GetResult<Prisma.$TreasuryProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TreasuryProducts.
     * @param {TreasuryProductCreateManyArgs} args - Arguments to create many TreasuryProducts.
     * @example
     * // Create many TreasuryProducts
     * const treasuryProduct = await prisma.treasuryProduct.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TreasuryProductCreateManyArgs>(args?: SelectSubset<T, TreasuryProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TreasuryProducts and returns the data saved in the database.
     * @param {TreasuryProductCreateManyAndReturnArgs} args - Arguments to create many TreasuryProducts.
     * @example
     * // Create many TreasuryProducts
     * const treasuryProduct = await prisma.treasuryProduct.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TreasuryProducts and only return the `id`
     * const treasuryProductWithIdOnly = await prisma.treasuryProduct.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TreasuryProductCreateManyAndReturnArgs>(args?: SelectSubset<T, TreasuryProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreasuryProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TreasuryProduct.
     * @param {TreasuryProductDeleteArgs} args - Arguments to delete one TreasuryProduct.
     * @example
     * // Delete one TreasuryProduct
     * const TreasuryProduct = await prisma.treasuryProduct.delete({
     *   where: {
     *     // ... filter to delete one TreasuryProduct
     *   }
     * })
     * 
     */
    delete<T extends TreasuryProductDeleteArgs>(args: SelectSubset<T, TreasuryProductDeleteArgs<ExtArgs>>): Prisma__TreasuryProductClient<$Result.GetResult<Prisma.$TreasuryProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TreasuryProduct.
     * @param {TreasuryProductUpdateArgs} args - Arguments to update one TreasuryProduct.
     * @example
     * // Update one TreasuryProduct
     * const treasuryProduct = await prisma.treasuryProduct.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TreasuryProductUpdateArgs>(args: SelectSubset<T, TreasuryProductUpdateArgs<ExtArgs>>): Prisma__TreasuryProductClient<$Result.GetResult<Prisma.$TreasuryProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TreasuryProducts.
     * @param {TreasuryProductDeleteManyArgs} args - Arguments to filter TreasuryProducts to delete.
     * @example
     * // Delete a few TreasuryProducts
     * const { count } = await prisma.treasuryProduct.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TreasuryProductDeleteManyArgs>(args?: SelectSubset<T, TreasuryProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TreasuryProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TreasuryProducts
     * const treasuryProduct = await prisma.treasuryProduct.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TreasuryProductUpdateManyArgs>(args: SelectSubset<T, TreasuryProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TreasuryProducts and returns the data updated in the database.
     * @param {TreasuryProductUpdateManyAndReturnArgs} args - Arguments to update many TreasuryProducts.
     * @example
     * // Update many TreasuryProducts
     * const treasuryProduct = await prisma.treasuryProduct.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TreasuryProducts and only return the `id`
     * const treasuryProductWithIdOnly = await prisma.treasuryProduct.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TreasuryProductUpdateManyAndReturnArgs>(args: SelectSubset<T, TreasuryProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreasuryProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TreasuryProduct.
     * @param {TreasuryProductUpsertArgs} args - Arguments to update or create a TreasuryProduct.
     * @example
     * // Update or create a TreasuryProduct
     * const treasuryProduct = await prisma.treasuryProduct.upsert({
     *   create: {
     *     // ... data to create a TreasuryProduct
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TreasuryProduct we want to update
     *   }
     * })
     */
    upsert<T extends TreasuryProductUpsertArgs>(args: SelectSubset<T, TreasuryProductUpsertArgs<ExtArgs>>): Prisma__TreasuryProductClient<$Result.GetResult<Prisma.$TreasuryProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TreasuryProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryProductCountArgs} args - Arguments to filter TreasuryProducts to count.
     * @example
     * // Count the number of TreasuryProducts
     * const count = await prisma.treasuryProduct.count({
     *   where: {
     *     // ... the filter for the TreasuryProducts we want to count
     *   }
     * })
    **/
    count<T extends TreasuryProductCountArgs>(
      args?: Subset<T, TreasuryProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TreasuryProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TreasuryProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TreasuryProductAggregateArgs>(args: Subset<T, TreasuryProductAggregateArgs>): Prisma.PrismaPromise<GetTreasuryProductAggregateType<T>>

    /**
     * Group by TreasuryProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TreasuryProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TreasuryProductGroupByArgs['orderBy'] }
        : { orderBy?: TreasuryProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TreasuryProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTreasuryProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TreasuryProduct model
   */
  readonly fields: TreasuryProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TreasuryProduct.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TreasuryProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Recommendation<T extends TreasuryProduct$RecommendationArgs<ExtArgs> = {}>(args?: Subset<T, TreasuryProduct$RecommendationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TreasuryProduct model
   */
  interface TreasuryProductFieldRefs {
    readonly id: FieldRef<"TreasuryProduct", 'String'>
    readonly name: FieldRef<"TreasuryProduct", 'String'>
    readonly category: FieldRef<"TreasuryProduct", 'String'>
    readonly description: FieldRef<"TreasuryProduct", 'String'>
    readonly features: FieldRef<"TreasuryProduct", 'String[]'>
    readonly eligibilityRules: FieldRef<"TreasuryProduct", 'Json'>
    readonly benefits: FieldRef<"TreasuryProduct", 'Json'>
    readonly pricing: FieldRef<"TreasuryProduct", 'Json'>
    readonly isActive: FieldRef<"TreasuryProduct", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * TreasuryProduct findUnique
   */
  export type TreasuryProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryProduct
     */
    select?: TreasuryProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasuryProduct
     */
    omit?: TreasuryProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasuryProductInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryProduct to fetch.
     */
    where: TreasuryProductWhereUniqueInput
  }

  /**
   * TreasuryProduct findUniqueOrThrow
   */
  export type TreasuryProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryProduct
     */
    select?: TreasuryProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasuryProduct
     */
    omit?: TreasuryProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasuryProductInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryProduct to fetch.
     */
    where: TreasuryProductWhereUniqueInput
  }

  /**
   * TreasuryProduct findFirst
   */
  export type TreasuryProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryProduct
     */
    select?: TreasuryProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasuryProduct
     */
    omit?: TreasuryProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasuryProductInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryProduct to fetch.
     */
    where?: TreasuryProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryProducts to fetch.
     */
    orderBy?: TreasuryProductOrderByWithRelationInput | TreasuryProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TreasuryProducts.
     */
    cursor?: TreasuryProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TreasuryProducts.
     */
    distinct?: TreasuryProductScalarFieldEnum | TreasuryProductScalarFieldEnum[]
  }

  /**
   * TreasuryProduct findFirstOrThrow
   */
  export type TreasuryProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryProduct
     */
    select?: TreasuryProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasuryProduct
     */
    omit?: TreasuryProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasuryProductInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryProduct to fetch.
     */
    where?: TreasuryProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryProducts to fetch.
     */
    orderBy?: TreasuryProductOrderByWithRelationInput | TreasuryProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TreasuryProducts.
     */
    cursor?: TreasuryProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TreasuryProducts.
     */
    distinct?: TreasuryProductScalarFieldEnum | TreasuryProductScalarFieldEnum[]
  }

  /**
   * TreasuryProduct findMany
   */
  export type TreasuryProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryProduct
     */
    select?: TreasuryProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasuryProduct
     */
    omit?: TreasuryProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasuryProductInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryProducts to fetch.
     */
    where?: TreasuryProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryProducts to fetch.
     */
    orderBy?: TreasuryProductOrderByWithRelationInput | TreasuryProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TreasuryProducts.
     */
    cursor?: TreasuryProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryProducts.
     */
    skip?: number
    distinct?: TreasuryProductScalarFieldEnum | TreasuryProductScalarFieldEnum[]
  }

  /**
   * TreasuryProduct create
   */
  export type TreasuryProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryProduct
     */
    select?: TreasuryProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasuryProduct
     */
    omit?: TreasuryProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasuryProductInclude<ExtArgs> | null
    /**
     * The data needed to create a TreasuryProduct.
     */
    data: XOR<TreasuryProductCreateInput, TreasuryProductUncheckedCreateInput>
  }

  /**
   * TreasuryProduct createMany
   */
  export type TreasuryProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TreasuryProducts.
     */
    data: TreasuryProductCreateManyInput | TreasuryProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TreasuryProduct createManyAndReturn
   */
  export type TreasuryProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryProduct
     */
    select?: TreasuryProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TreasuryProduct
     */
    omit?: TreasuryProductOmit<ExtArgs> | null
    /**
     * The data used to create many TreasuryProducts.
     */
    data: TreasuryProductCreateManyInput | TreasuryProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TreasuryProduct update
   */
  export type TreasuryProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryProduct
     */
    select?: TreasuryProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasuryProduct
     */
    omit?: TreasuryProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasuryProductInclude<ExtArgs> | null
    /**
     * The data needed to update a TreasuryProduct.
     */
    data: XOR<TreasuryProductUpdateInput, TreasuryProductUncheckedUpdateInput>
    /**
     * Choose, which TreasuryProduct to update.
     */
    where: TreasuryProductWhereUniqueInput
  }

  /**
   * TreasuryProduct updateMany
   */
  export type TreasuryProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TreasuryProducts.
     */
    data: XOR<TreasuryProductUpdateManyMutationInput, TreasuryProductUncheckedUpdateManyInput>
    /**
     * Filter which TreasuryProducts to update
     */
    where?: TreasuryProductWhereInput
    /**
     * Limit how many TreasuryProducts to update.
     */
    limit?: number
  }

  /**
   * TreasuryProduct updateManyAndReturn
   */
  export type TreasuryProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryProduct
     */
    select?: TreasuryProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TreasuryProduct
     */
    omit?: TreasuryProductOmit<ExtArgs> | null
    /**
     * The data used to update TreasuryProducts.
     */
    data: XOR<TreasuryProductUpdateManyMutationInput, TreasuryProductUncheckedUpdateManyInput>
    /**
     * Filter which TreasuryProducts to update
     */
    where?: TreasuryProductWhereInput
    /**
     * Limit how many TreasuryProducts to update.
     */
    limit?: number
  }

  /**
   * TreasuryProduct upsert
   */
  export type TreasuryProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryProduct
     */
    select?: TreasuryProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasuryProduct
     */
    omit?: TreasuryProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasuryProductInclude<ExtArgs> | null
    /**
     * The filter to search for the TreasuryProduct to update in case it exists.
     */
    where: TreasuryProductWhereUniqueInput
    /**
     * In case the TreasuryProduct found by the `where` argument doesn't exist, create a new TreasuryProduct with this data.
     */
    create: XOR<TreasuryProductCreateInput, TreasuryProductUncheckedCreateInput>
    /**
     * In case the TreasuryProduct was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TreasuryProductUpdateInput, TreasuryProductUncheckedUpdateInput>
  }

  /**
   * TreasuryProduct delete
   */
  export type TreasuryProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryProduct
     */
    select?: TreasuryProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasuryProduct
     */
    omit?: TreasuryProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasuryProductInclude<ExtArgs> | null
    /**
     * Filter which TreasuryProduct to delete.
     */
    where: TreasuryProductWhereUniqueInput
  }

  /**
   * TreasuryProduct deleteMany
   */
  export type TreasuryProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TreasuryProducts to delete
     */
    where?: TreasuryProductWhereInput
    /**
     * Limit how many TreasuryProducts to delete.
     */
    limit?: number
  }

  /**
   * TreasuryProduct.Recommendation
   */
  export type TreasuryProduct$RecommendationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    where?: RecommendationWhereInput
    orderBy?: RecommendationOrderByWithRelationInput | RecommendationOrderByWithRelationInput[]
    cursor?: RecommendationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecommendationScalarFieldEnum | RecommendationScalarFieldEnum[]
  }

  /**
   * TreasuryProduct without action
   */
  export type TreasuryProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryProduct
     */
    select?: TreasuryProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TreasuryProduct
     */
    omit?: TreasuryProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreasuryProductInclude<ExtArgs> | null
  }


  /**
   * Model Recommendation
   */

  export type AggregateRecommendation = {
    _count: RecommendationCountAggregateOutputType | null
    _min: RecommendationMinAggregateOutputType | null
    _max: RecommendationMaxAggregateOutputType | null
  }

  export type RecommendationMinAggregateOutputType = {
    id: string | null
    analysisId: string | null
    productId: string | null
    priority: string | null
    rationale: string | null
    status: string | null
    createdAt: Date | null
    approvedBy: string | null
    approvedAt: Date | null
  }

  export type RecommendationMaxAggregateOutputType = {
    id: string | null
    analysisId: string | null
    productId: string | null
    priority: string | null
    rationale: string | null
    status: string | null
    createdAt: Date | null
    approvedBy: string | null
    approvedAt: Date | null
  }

  export type RecommendationCountAggregateOutputType = {
    id: number
    analysisId: number
    productId: number
    priority: number
    rationale: number
    dataPoints: number
    benefitProjection: number
    status: number
    createdAt: number
    approvedBy: number
    approvedAt: number
    _all: number
  }


  export type RecommendationMinAggregateInputType = {
    id?: true
    analysisId?: true
    productId?: true
    priority?: true
    rationale?: true
    status?: true
    createdAt?: true
    approvedBy?: true
    approvedAt?: true
  }

  export type RecommendationMaxAggregateInputType = {
    id?: true
    analysisId?: true
    productId?: true
    priority?: true
    rationale?: true
    status?: true
    createdAt?: true
    approvedBy?: true
    approvedAt?: true
  }

  export type RecommendationCountAggregateInputType = {
    id?: true
    analysisId?: true
    productId?: true
    priority?: true
    rationale?: true
    dataPoints?: true
    benefitProjection?: true
    status?: true
    createdAt?: true
    approvedBy?: true
    approvedAt?: true
    _all?: true
  }

  export type RecommendationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recommendation to aggregate.
     */
    where?: RecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recommendations to fetch.
     */
    orderBy?: RecommendationOrderByWithRelationInput | RecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Recommendations
    **/
    _count?: true | RecommendationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecommendationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecommendationMaxAggregateInputType
  }

  export type GetRecommendationAggregateType<T extends RecommendationAggregateArgs> = {
        [P in keyof T & keyof AggregateRecommendation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecommendation[P]>
      : GetScalarType<T[P], AggregateRecommendation[P]>
  }




  export type RecommendationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecommendationWhereInput
    orderBy?: RecommendationOrderByWithAggregationInput | RecommendationOrderByWithAggregationInput[]
    by: RecommendationScalarFieldEnum[] | RecommendationScalarFieldEnum
    having?: RecommendationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecommendationCountAggregateInputType | true
    _min?: RecommendationMinAggregateInputType
    _max?: RecommendationMaxAggregateInputType
  }

  export type RecommendationGroupByOutputType = {
    id: string
    analysisId: string
    productId: string
    priority: string
    rationale: string
    dataPoints: string[]
    benefitProjection: JsonValue
    status: string
    createdAt: Date
    approvedBy: string | null
    approvedAt: Date | null
    _count: RecommendationCountAggregateOutputType | null
    _min: RecommendationMinAggregateOutputType | null
    _max: RecommendationMaxAggregateOutputType | null
  }

  type GetRecommendationGroupByPayload<T extends RecommendationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecommendationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecommendationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecommendationGroupByOutputType[P]>
            : GetScalarType<T[P], RecommendationGroupByOutputType[P]>
        }
      >
    >


  export type RecommendationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    analysisId?: boolean
    productId?: boolean
    priority?: boolean
    rationale?: boolean
    dataPoints?: boolean
    benefitProjection?: boolean
    status?: boolean
    createdAt?: boolean
    approvedBy?: boolean
    approvedAt?: boolean
    analysis?: boolean | AnalysisDefaultArgs<ExtArgs>
    product?: boolean | TreasuryProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recommendation"]>

  export type RecommendationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    analysisId?: boolean
    productId?: boolean
    priority?: boolean
    rationale?: boolean
    dataPoints?: boolean
    benefitProjection?: boolean
    status?: boolean
    createdAt?: boolean
    approvedBy?: boolean
    approvedAt?: boolean
    analysis?: boolean | AnalysisDefaultArgs<ExtArgs>
    product?: boolean | TreasuryProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recommendation"]>

  export type RecommendationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    analysisId?: boolean
    productId?: boolean
    priority?: boolean
    rationale?: boolean
    dataPoints?: boolean
    benefitProjection?: boolean
    status?: boolean
    createdAt?: boolean
    approvedBy?: boolean
    approvedAt?: boolean
    analysis?: boolean | AnalysisDefaultArgs<ExtArgs>
    product?: boolean | TreasuryProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recommendation"]>

  export type RecommendationSelectScalar = {
    id?: boolean
    analysisId?: boolean
    productId?: boolean
    priority?: boolean
    rationale?: boolean
    dataPoints?: boolean
    benefitProjection?: boolean
    status?: boolean
    createdAt?: boolean
    approvedBy?: boolean
    approvedAt?: boolean
  }

  export type RecommendationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "analysisId" | "productId" | "priority" | "rationale" | "dataPoints" | "benefitProjection" | "status" | "createdAt" | "approvedBy" | "approvedAt", ExtArgs["result"]["recommendation"]>
  export type RecommendationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    analysis?: boolean | AnalysisDefaultArgs<ExtArgs>
    product?: boolean | TreasuryProductDefaultArgs<ExtArgs>
  }
  export type RecommendationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    analysis?: boolean | AnalysisDefaultArgs<ExtArgs>
    product?: boolean | TreasuryProductDefaultArgs<ExtArgs>
  }
  export type RecommendationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    analysis?: boolean | AnalysisDefaultArgs<ExtArgs>
    product?: boolean | TreasuryProductDefaultArgs<ExtArgs>
  }

  export type $RecommendationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Recommendation"
    objects: {
      analysis: Prisma.$AnalysisPayload<ExtArgs>
      product: Prisma.$TreasuryProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      analysisId: string
      productId: string
      priority: string
      rationale: string
      dataPoints: string[]
      benefitProjection: Prisma.JsonValue
      status: string
      createdAt: Date
      approvedBy: string | null
      approvedAt: Date | null
    }, ExtArgs["result"]["recommendation"]>
    composites: {}
  }

  type RecommendationGetPayload<S extends boolean | null | undefined | RecommendationDefaultArgs> = $Result.GetResult<Prisma.$RecommendationPayload, S>

  type RecommendationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecommendationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecommendationCountAggregateInputType | true
    }

  export interface RecommendationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Recommendation'], meta: { name: 'Recommendation' } }
    /**
     * Find zero or one Recommendation that matches the filter.
     * @param {RecommendationFindUniqueArgs} args - Arguments to find a Recommendation
     * @example
     * // Get one Recommendation
     * const recommendation = await prisma.recommendation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecommendationFindUniqueArgs>(args: SelectSubset<T, RecommendationFindUniqueArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Recommendation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecommendationFindUniqueOrThrowArgs} args - Arguments to find a Recommendation
     * @example
     * // Get one Recommendation
     * const recommendation = await prisma.recommendation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecommendationFindUniqueOrThrowArgs>(args: SelectSubset<T, RecommendationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recommendation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationFindFirstArgs} args - Arguments to find a Recommendation
     * @example
     * // Get one Recommendation
     * const recommendation = await prisma.recommendation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecommendationFindFirstArgs>(args?: SelectSubset<T, RecommendationFindFirstArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recommendation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationFindFirstOrThrowArgs} args - Arguments to find a Recommendation
     * @example
     * // Get one Recommendation
     * const recommendation = await prisma.recommendation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecommendationFindFirstOrThrowArgs>(args?: SelectSubset<T, RecommendationFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Recommendations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recommendations
     * const recommendations = await prisma.recommendation.findMany()
     * 
     * // Get first 10 Recommendations
     * const recommendations = await prisma.recommendation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recommendationWithIdOnly = await prisma.recommendation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecommendationFindManyArgs>(args?: SelectSubset<T, RecommendationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Recommendation.
     * @param {RecommendationCreateArgs} args - Arguments to create a Recommendation.
     * @example
     * // Create one Recommendation
     * const Recommendation = await prisma.recommendation.create({
     *   data: {
     *     // ... data to create a Recommendation
     *   }
     * })
     * 
     */
    create<T extends RecommendationCreateArgs>(args: SelectSubset<T, RecommendationCreateArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Recommendations.
     * @param {RecommendationCreateManyArgs} args - Arguments to create many Recommendations.
     * @example
     * // Create many Recommendations
     * const recommendation = await prisma.recommendation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecommendationCreateManyArgs>(args?: SelectSubset<T, RecommendationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Recommendations and returns the data saved in the database.
     * @param {RecommendationCreateManyAndReturnArgs} args - Arguments to create many Recommendations.
     * @example
     * // Create many Recommendations
     * const recommendation = await prisma.recommendation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Recommendations and only return the `id`
     * const recommendationWithIdOnly = await prisma.recommendation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecommendationCreateManyAndReturnArgs>(args?: SelectSubset<T, RecommendationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Recommendation.
     * @param {RecommendationDeleteArgs} args - Arguments to delete one Recommendation.
     * @example
     * // Delete one Recommendation
     * const Recommendation = await prisma.recommendation.delete({
     *   where: {
     *     // ... filter to delete one Recommendation
     *   }
     * })
     * 
     */
    delete<T extends RecommendationDeleteArgs>(args: SelectSubset<T, RecommendationDeleteArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Recommendation.
     * @param {RecommendationUpdateArgs} args - Arguments to update one Recommendation.
     * @example
     * // Update one Recommendation
     * const recommendation = await prisma.recommendation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecommendationUpdateArgs>(args: SelectSubset<T, RecommendationUpdateArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Recommendations.
     * @param {RecommendationDeleteManyArgs} args - Arguments to filter Recommendations to delete.
     * @example
     * // Delete a few Recommendations
     * const { count } = await prisma.recommendation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecommendationDeleteManyArgs>(args?: SelectSubset<T, RecommendationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recommendations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recommendations
     * const recommendation = await prisma.recommendation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecommendationUpdateManyArgs>(args: SelectSubset<T, RecommendationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recommendations and returns the data updated in the database.
     * @param {RecommendationUpdateManyAndReturnArgs} args - Arguments to update many Recommendations.
     * @example
     * // Update many Recommendations
     * const recommendation = await prisma.recommendation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Recommendations and only return the `id`
     * const recommendationWithIdOnly = await prisma.recommendation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecommendationUpdateManyAndReturnArgs>(args: SelectSubset<T, RecommendationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Recommendation.
     * @param {RecommendationUpsertArgs} args - Arguments to update or create a Recommendation.
     * @example
     * // Update or create a Recommendation
     * const recommendation = await prisma.recommendation.upsert({
     *   create: {
     *     // ... data to create a Recommendation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recommendation we want to update
     *   }
     * })
     */
    upsert<T extends RecommendationUpsertArgs>(args: SelectSubset<T, RecommendationUpsertArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Recommendations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationCountArgs} args - Arguments to filter Recommendations to count.
     * @example
     * // Count the number of Recommendations
     * const count = await prisma.recommendation.count({
     *   where: {
     *     // ... the filter for the Recommendations we want to count
     *   }
     * })
    **/
    count<T extends RecommendationCountArgs>(
      args?: Subset<T, RecommendationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecommendationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recommendation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecommendationAggregateArgs>(args: Subset<T, RecommendationAggregateArgs>): Prisma.PrismaPromise<GetRecommendationAggregateType<T>>

    /**
     * Group by Recommendation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecommendationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecommendationGroupByArgs['orderBy'] }
        : { orderBy?: RecommendationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecommendationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecommendationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Recommendation model
   */
  readonly fields: RecommendationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recommendation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecommendationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    analysis<T extends AnalysisDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnalysisDefaultArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends TreasuryProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TreasuryProductDefaultArgs<ExtArgs>>): Prisma__TreasuryProductClient<$Result.GetResult<Prisma.$TreasuryProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Recommendation model
   */
  interface RecommendationFieldRefs {
    readonly id: FieldRef<"Recommendation", 'String'>
    readonly analysisId: FieldRef<"Recommendation", 'String'>
    readonly productId: FieldRef<"Recommendation", 'String'>
    readonly priority: FieldRef<"Recommendation", 'String'>
    readonly rationale: FieldRef<"Recommendation", 'String'>
    readonly dataPoints: FieldRef<"Recommendation", 'String[]'>
    readonly benefitProjection: FieldRef<"Recommendation", 'Json'>
    readonly status: FieldRef<"Recommendation", 'String'>
    readonly createdAt: FieldRef<"Recommendation", 'DateTime'>
    readonly approvedBy: FieldRef<"Recommendation", 'String'>
    readonly approvedAt: FieldRef<"Recommendation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Recommendation findUnique
   */
  export type RecommendationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * Filter, which Recommendation to fetch.
     */
    where: RecommendationWhereUniqueInput
  }

  /**
   * Recommendation findUniqueOrThrow
   */
  export type RecommendationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * Filter, which Recommendation to fetch.
     */
    where: RecommendationWhereUniqueInput
  }

  /**
   * Recommendation findFirst
   */
  export type RecommendationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * Filter, which Recommendation to fetch.
     */
    where?: RecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recommendations to fetch.
     */
    orderBy?: RecommendationOrderByWithRelationInput | RecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recommendations.
     */
    cursor?: RecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recommendations.
     */
    distinct?: RecommendationScalarFieldEnum | RecommendationScalarFieldEnum[]
  }

  /**
   * Recommendation findFirstOrThrow
   */
  export type RecommendationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * Filter, which Recommendation to fetch.
     */
    where?: RecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recommendations to fetch.
     */
    orderBy?: RecommendationOrderByWithRelationInput | RecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recommendations.
     */
    cursor?: RecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recommendations.
     */
    distinct?: RecommendationScalarFieldEnum | RecommendationScalarFieldEnum[]
  }

  /**
   * Recommendation findMany
   */
  export type RecommendationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * Filter, which Recommendations to fetch.
     */
    where?: RecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recommendations to fetch.
     */
    orderBy?: RecommendationOrderByWithRelationInput | RecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recommendations.
     */
    cursor?: RecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recommendations.
     */
    skip?: number
    distinct?: RecommendationScalarFieldEnum | RecommendationScalarFieldEnum[]
  }

  /**
   * Recommendation create
   */
  export type RecommendationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * The data needed to create a Recommendation.
     */
    data: XOR<RecommendationCreateInput, RecommendationUncheckedCreateInput>
  }

  /**
   * Recommendation createMany
   */
  export type RecommendationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Recommendations.
     */
    data: RecommendationCreateManyInput | RecommendationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Recommendation createManyAndReturn
   */
  export type RecommendationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * The data used to create many Recommendations.
     */
    data: RecommendationCreateManyInput | RecommendationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Recommendation update
   */
  export type RecommendationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * The data needed to update a Recommendation.
     */
    data: XOR<RecommendationUpdateInput, RecommendationUncheckedUpdateInput>
    /**
     * Choose, which Recommendation to update.
     */
    where: RecommendationWhereUniqueInput
  }

  /**
   * Recommendation updateMany
   */
  export type RecommendationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Recommendations.
     */
    data: XOR<RecommendationUpdateManyMutationInput, RecommendationUncheckedUpdateManyInput>
    /**
     * Filter which Recommendations to update
     */
    where?: RecommendationWhereInput
    /**
     * Limit how many Recommendations to update.
     */
    limit?: number
  }

  /**
   * Recommendation updateManyAndReturn
   */
  export type RecommendationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * The data used to update Recommendations.
     */
    data: XOR<RecommendationUpdateManyMutationInput, RecommendationUncheckedUpdateManyInput>
    /**
     * Filter which Recommendations to update
     */
    where?: RecommendationWhereInput
    /**
     * Limit how many Recommendations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Recommendation upsert
   */
  export type RecommendationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * The filter to search for the Recommendation to update in case it exists.
     */
    where: RecommendationWhereUniqueInput
    /**
     * In case the Recommendation found by the `where` argument doesn't exist, create a new Recommendation with this data.
     */
    create: XOR<RecommendationCreateInput, RecommendationUncheckedCreateInput>
    /**
     * In case the Recommendation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecommendationUpdateInput, RecommendationUncheckedUpdateInput>
  }

  /**
   * Recommendation delete
   */
  export type RecommendationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * Filter which Recommendation to delete.
     */
    where: RecommendationWhereUniqueInput
  }

  /**
   * Recommendation deleteMany
   */
  export type RecommendationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recommendations to delete
     */
    where?: RecommendationWhereInput
    /**
     * Limit how many Recommendations to delete.
     */
    limit?: number
  }

  /**
   * Recommendation without action
   */
  export type RecommendationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
  }


  /**
   * Model Report
   */

  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportAvgAggregateOutputType = {
    fileSize: number | null
    downloadCount: number | null
  }

  export type ReportSumAggregateOutputType = {
    fileSize: number | null
    downloadCount: number | null
  }

  export type ReportMinAggregateOutputType = {
    id: string | null
    title: string | null
    analysisId: string | null
    clientId: string | null
    format: string | null
    template: string | null
    createdAt: Date | null
    createdBy: string | null
    fileSize: number | null
    downloadCount: number | null
    status: string | null
    filePath: string | null
  }

  export type ReportMaxAggregateOutputType = {
    id: string | null
    title: string | null
    analysisId: string | null
    clientId: string | null
    format: string | null
    template: string | null
    createdAt: Date | null
    createdBy: string | null
    fileSize: number | null
    downloadCount: number | null
    status: string | null
    filePath: string | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    title: number
    analysisId: number
    clientId: number
    format: number
    template: number
    createdAt: number
    createdBy: number
    fileSize: number
    downloadCount: number
    status: number
    filePath: number
    _all: number
  }


  export type ReportAvgAggregateInputType = {
    fileSize?: true
    downloadCount?: true
  }

  export type ReportSumAggregateInputType = {
    fileSize?: true
    downloadCount?: true
  }

  export type ReportMinAggregateInputType = {
    id?: true
    title?: true
    analysisId?: true
    clientId?: true
    format?: true
    template?: true
    createdAt?: true
    createdBy?: true
    fileSize?: true
    downloadCount?: true
    status?: true
    filePath?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    title?: true
    analysisId?: true
    clientId?: true
    format?: true
    template?: true
    createdAt?: true
    createdBy?: true
    fileSize?: true
    downloadCount?: true
    status?: true
    filePath?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    title?: true
    analysisId?: true
    clientId?: true
    format?: true
    template?: true
    createdAt?: true
    createdBy?: true
    fileSize?: true
    downloadCount?: true
    status?: true
    filePath?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithAggregationInput | ReportOrderByWithAggregationInput[]
    by: ReportScalarFieldEnum[] | ReportScalarFieldEnum
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _avg?: ReportAvgAggregateInputType
    _sum?: ReportSumAggregateInputType
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }

  export type ReportGroupByOutputType = {
    id: string
    title: string
    analysisId: string
    clientId: string
    format: string
    template: string
    createdAt: Date
    createdBy: string
    fileSize: number
    downloadCount: number
    status: string
    filePath: string | null
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    analysisId?: boolean
    clientId?: boolean
    format?: boolean
    template?: boolean
    createdAt?: boolean
    createdBy?: boolean
    fileSize?: boolean
    downloadCount?: boolean
    status?: boolean
    filePath?: boolean
    analysis?: boolean | AnalysisDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    analysisId?: boolean
    clientId?: boolean
    format?: boolean
    template?: boolean
    createdAt?: boolean
    createdBy?: boolean
    fileSize?: boolean
    downloadCount?: boolean
    status?: boolean
    filePath?: boolean
    analysis?: boolean | AnalysisDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    analysisId?: boolean
    clientId?: boolean
    format?: boolean
    template?: boolean
    createdAt?: boolean
    createdBy?: boolean
    fileSize?: boolean
    downloadCount?: boolean
    status?: boolean
    filePath?: boolean
    analysis?: boolean | AnalysisDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectScalar = {
    id?: boolean
    title?: boolean
    analysisId?: boolean
    clientId?: boolean
    format?: boolean
    template?: boolean
    createdAt?: boolean
    createdBy?: boolean
    fileSize?: boolean
    downloadCount?: boolean
    status?: boolean
    filePath?: boolean
  }

  export type ReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "analysisId" | "clientId" | "format" | "template" | "createdAt" | "createdBy" | "fileSize" | "downloadCount" | "status" | "filePath", ExtArgs["result"]["report"]>
  export type ReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    analysis?: boolean | AnalysisDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type ReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    analysis?: boolean | AnalysisDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type ReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    analysis?: boolean | AnalysisDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $ReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Report"
    objects: {
      analysis: Prisma.$AnalysisPayload<ExtArgs>
      client: Prisma.$ClientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      analysisId: string
      clientId: string
      format: string
      template: string
      createdAt: Date
      createdBy: string
      fileSize: number
      downloadCount: number
      status: string
      filePath: string | null
    }, ExtArgs["result"]["report"]>
    composites: {}
  }

  type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = $Result.GetResult<Prisma.$ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportFindUniqueArgs>(args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Report that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportFindFirstArgs>(args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportFindManyArgs>(args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
     */
    create<T extends ReportCreateArgs>(args: SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reports.
     * @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportCreateManyArgs>(args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reports and returns the data saved in the database.
     * @param {ReportCreateManyAndReturnArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReportCreateManyAndReturnArgs>(args?: SelectSubset<T, ReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
     */
    delete<T extends ReportDeleteArgs>(args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportUpdateArgs>(args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportDeleteManyArgs>(args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportUpdateManyArgs>(args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports and returns the data updated in the database.
     * @param {ReportUpdateManyAndReturnArgs} args - Arguments to update many Reports.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReportUpdateManyAndReturnArgs>(args: SelectSubset<T, ReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
     */
    upsert<T extends ReportUpsertArgs>(args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Report model
   */
  readonly fields: ReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    analysis<T extends AnalysisDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnalysisDefaultArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Report model
   */
  interface ReportFieldRefs {
    readonly id: FieldRef<"Report", 'String'>
    readonly title: FieldRef<"Report", 'String'>
    readonly analysisId: FieldRef<"Report", 'String'>
    readonly clientId: FieldRef<"Report", 'String'>
    readonly format: FieldRef<"Report", 'String'>
    readonly template: FieldRef<"Report", 'String'>
    readonly createdAt: FieldRef<"Report", 'DateTime'>
    readonly createdBy: FieldRef<"Report", 'String'>
    readonly fileSize: FieldRef<"Report", 'Int'>
    readonly downloadCount: FieldRef<"Report", 'Int'>
    readonly status: FieldRef<"Report", 'String'>
    readonly filePath: FieldRef<"Report", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Report findUnique
   */
  export type ReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findFirst
   */
  export type ReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }

  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Report createManyAndReturn
   */
  export type ReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
  }

  /**
   * Report updateManyAndReturn
   */
  export type ReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }

  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to delete.
     */
    limit?: number
  }

  /**
   * Report without action
   */
  export type ReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
  }


  /**
   * Model SystemConfig
   */

  export type AggregateSystemConfig = {
    _count: SystemConfigCountAggregateOutputType | null
    _min: SystemConfigMinAggregateOutputType | null
    _max: SystemConfigMaxAggregateOutputType | null
  }

  export type SystemConfigMinAggregateOutputType = {
    id: string | null
    configKey: string | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type SystemConfigMaxAggregateOutputType = {
    id: string | null
    configKey: string | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type SystemConfigCountAggregateOutputType = {
    id: number
    configKey: number
    configValue: number
    updatedAt: number
    updatedBy: number
    _all: number
  }


  export type SystemConfigMinAggregateInputType = {
    id?: true
    configKey?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type SystemConfigMaxAggregateInputType = {
    id?: true
    configKey?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type SystemConfigCountAggregateInputType = {
    id?: true
    configKey?: true
    configValue?: true
    updatedAt?: true
    updatedBy?: true
    _all?: true
  }

  export type SystemConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemConfig to aggregate.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemConfigs
    **/
    _count?: true | SystemConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemConfigMaxAggregateInputType
  }

  export type GetSystemConfigAggregateType<T extends SystemConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemConfig[P]>
      : GetScalarType<T[P], AggregateSystemConfig[P]>
  }




  export type SystemConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemConfigWhereInput
    orderBy?: SystemConfigOrderByWithAggregationInput | SystemConfigOrderByWithAggregationInput[]
    by: SystemConfigScalarFieldEnum[] | SystemConfigScalarFieldEnum
    having?: SystemConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemConfigCountAggregateInputType | true
    _min?: SystemConfigMinAggregateInputType
    _max?: SystemConfigMaxAggregateInputType
  }

  export type SystemConfigGroupByOutputType = {
    id: string
    configKey: string
    configValue: JsonValue
    updatedAt: Date
    updatedBy: string
    _count: SystemConfigCountAggregateOutputType | null
    _min: SystemConfigMinAggregateOutputType | null
    _max: SystemConfigMaxAggregateOutputType | null
  }

  type GetSystemConfigGroupByPayload<T extends SystemConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemConfigGroupByOutputType[P]>
            : GetScalarType<T[P], SystemConfigGroupByOutputType[P]>
        }
      >
    >


  export type SystemConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    configKey?: boolean
    configValue?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["systemConfig"]>

  export type SystemConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    configKey?: boolean
    configValue?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["systemConfig"]>

  export type SystemConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    configKey?: boolean
    configValue?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["systemConfig"]>

  export type SystemConfigSelectScalar = {
    id?: boolean
    configKey?: boolean
    configValue?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }

  export type SystemConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "configKey" | "configValue" | "updatedAt" | "updatedBy", ExtArgs["result"]["systemConfig"]>

  export type $SystemConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      configKey: string
      configValue: Prisma.JsonValue
      updatedAt: Date
      updatedBy: string
    }, ExtArgs["result"]["systemConfig"]>
    composites: {}
  }

  type SystemConfigGetPayload<S extends boolean | null | undefined | SystemConfigDefaultArgs> = $Result.GetResult<Prisma.$SystemConfigPayload, S>

  type SystemConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SystemConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SystemConfigCountAggregateInputType | true
    }

  export interface SystemConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemConfig'], meta: { name: 'SystemConfig' } }
    /**
     * Find zero or one SystemConfig that matches the filter.
     * @param {SystemConfigFindUniqueArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemConfigFindUniqueArgs>(args: SelectSubset<T, SystemConfigFindUniqueArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SystemConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SystemConfigFindUniqueOrThrowArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindFirstArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemConfigFindFirstArgs>(args?: SelectSubset<T, SystemConfigFindFirstArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindFirstOrThrowArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SystemConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemConfigs
     * const systemConfigs = await prisma.systemConfig.findMany()
     * 
     * // Get first 10 SystemConfigs
     * const systemConfigs = await prisma.systemConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemConfigWithIdOnly = await prisma.systemConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemConfigFindManyArgs>(args?: SelectSubset<T, SystemConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SystemConfig.
     * @param {SystemConfigCreateArgs} args - Arguments to create a SystemConfig.
     * @example
     * // Create one SystemConfig
     * const SystemConfig = await prisma.systemConfig.create({
     *   data: {
     *     // ... data to create a SystemConfig
     *   }
     * })
     * 
     */
    create<T extends SystemConfigCreateArgs>(args: SelectSubset<T, SystemConfigCreateArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SystemConfigs.
     * @param {SystemConfigCreateManyArgs} args - Arguments to create many SystemConfigs.
     * @example
     * // Create many SystemConfigs
     * const systemConfig = await prisma.systemConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemConfigCreateManyArgs>(args?: SelectSubset<T, SystemConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemConfigs and returns the data saved in the database.
     * @param {SystemConfigCreateManyAndReturnArgs} args - Arguments to create many SystemConfigs.
     * @example
     * // Create many SystemConfigs
     * const systemConfig = await prisma.systemConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemConfigs and only return the `id`
     * const systemConfigWithIdOnly = await prisma.systemConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SystemConfig.
     * @param {SystemConfigDeleteArgs} args - Arguments to delete one SystemConfig.
     * @example
     * // Delete one SystemConfig
     * const SystemConfig = await prisma.systemConfig.delete({
     *   where: {
     *     // ... filter to delete one SystemConfig
     *   }
     * })
     * 
     */
    delete<T extends SystemConfigDeleteArgs>(args: SelectSubset<T, SystemConfigDeleteArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SystemConfig.
     * @param {SystemConfigUpdateArgs} args - Arguments to update one SystemConfig.
     * @example
     * // Update one SystemConfig
     * const systemConfig = await prisma.systemConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemConfigUpdateArgs>(args: SelectSubset<T, SystemConfigUpdateArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SystemConfigs.
     * @param {SystemConfigDeleteManyArgs} args - Arguments to filter SystemConfigs to delete.
     * @example
     * // Delete a few SystemConfigs
     * const { count } = await prisma.systemConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemConfigDeleteManyArgs>(args?: SelectSubset<T, SystemConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemConfigs
     * const systemConfig = await prisma.systemConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemConfigUpdateManyArgs>(args: SelectSubset<T, SystemConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemConfigs and returns the data updated in the database.
     * @param {SystemConfigUpdateManyAndReturnArgs} args - Arguments to update many SystemConfigs.
     * @example
     * // Update many SystemConfigs
     * const systemConfig = await prisma.systemConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SystemConfigs and only return the `id`
     * const systemConfigWithIdOnly = await prisma.systemConfig.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SystemConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, SystemConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SystemConfig.
     * @param {SystemConfigUpsertArgs} args - Arguments to update or create a SystemConfig.
     * @example
     * // Update or create a SystemConfig
     * const systemConfig = await prisma.systemConfig.upsert({
     *   create: {
     *     // ... data to create a SystemConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemConfig we want to update
     *   }
     * })
     */
    upsert<T extends SystemConfigUpsertArgs>(args: SelectSubset<T, SystemConfigUpsertArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SystemConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigCountArgs} args - Arguments to filter SystemConfigs to count.
     * @example
     * // Count the number of SystemConfigs
     * const count = await prisma.systemConfig.count({
     *   where: {
     *     // ... the filter for the SystemConfigs we want to count
     *   }
     * })
    **/
    count<T extends SystemConfigCountArgs>(
      args?: Subset<T, SystemConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemConfigAggregateArgs>(args: Subset<T, SystemConfigAggregateArgs>): Prisma.PrismaPromise<GetSystemConfigAggregateType<T>>

    /**
     * Group by SystemConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemConfigGroupByArgs['orderBy'] }
        : { orderBy?: SystemConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemConfig model
   */
  readonly fields: SystemConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemConfig model
   */
  interface SystemConfigFieldRefs {
    readonly id: FieldRef<"SystemConfig", 'String'>
    readonly configKey: FieldRef<"SystemConfig", 'String'>
    readonly configValue: FieldRef<"SystemConfig", 'Json'>
    readonly updatedAt: FieldRef<"SystemConfig", 'DateTime'>
    readonly updatedBy: FieldRef<"SystemConfig", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SystemConfig findUnique
   */
  export type SystemConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig findUniqueOrThrow
   */
  export type SystemConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig findFirst
   */
  export type SystemConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemConfigs.
     */
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig findFirstOrThrow
   */
  export type SystemConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemConfigs.
     */
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig findMany
   */
  export type SystemConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfigs to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig create
   */
  export type SystemConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a SystemConfig.
     */
    data: XOR<SystemConfigCreateInput, SystemConfigUncheckedCreateInput>
  }

  /**
   * SystemConfig createMany
   */
  export type SystemConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemConfigs.
     */
    data: SystemConfigCreateManyInput | SystemConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemConfig createManyAndReturn
   */
  export type SystemConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data used to create many SystemConfigs.
     */
    data: SystemConfigCreateManyInput | SystemConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemConfig update
   */
  export type SystemConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a SystemConfig.
     */
    data: XOR<SystemConfigUpdateInput, SystemConfigUncheckedUpdateInput>
    /**
     * Choose, which SystemConfig to update.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig updateMany
   */
  export type SystemConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemConfigs.
     */
    data: XOR<SystemConfigUpdateManyMutationInput, SystemConfigUncheckedUpdateManyInput>
    /**
     * Filter which SystemConfigs to update
     */
    where?: SystemConfigWhereInput
    /**
     * Limit how many SystemConfigs to update.
     */
    limit?: number
  }

  /**
   * SystemConfig updateManyAndReturn
   */
  export type SystemConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data used to update SystemConfigs.
     */
    data: XOR<SystemConfigUpdateManyMutationInput, SystemConfigUncheckedUpdateManyInput>
    /**
     * Filter which SystemConfigs to update
     */
    where?: SystemConfigWhereInput
    /**
     * Limit how many SystemConfigs to update.
     */
    limit?: number
  }

  /**
   * SystemConfig upsert
   */
  export type SystemConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the SystemConfig to update in case it exists.
     */
    where: SystemConfigWhereUniqueInput
    /**
     * In case the SystemConfig found by the `where` argument doesn't exist, create a new SystemConfig with this data.
     */
    create: XOR<SystemConfigCreateInput, SystemConfigUncheckedCreateInput>
    /**
     * In case the SystemConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemConfigUpdateInput, SystemConfigUncheckedUpdateInput>
  }

  /**
   * SystemConfig delete
   */
  export type SystemConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter which SystemConfig to delete.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig deleteMany
   */
  export type SystemConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemConfigs to delete
     */
    where?: SystemConfigWhereInput
    /**
     * Limit how many SystemConfigs to delete.
     */
    limit?: number
  }

  /**
   * SystemConfig without action
   */
  export type SystemConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
  }


  /**
   * Model AuditEntry
   */

  export type AggregateAuditEntry = {
    _count: AuditEntryCountAggregateOutputType | null
    _avg: AuditEntryAvgAggregateOutputType | null
    _sum: AuditEntrySumAggregateOutputType | null
    _min: AuditEntryMinAggregateOutputType | null
    _max: AuditEntryMaxAggregateOutputType | null
  }

  export type AuditEntryAvgAggregateOutputType = {
    userId: number | null
  }

  export type AuditEntrySumAggregateOutputType = {
    userId: number | null
  }

  export type AuditEntryMinAggregateOutputType = {
    id: string | null
    userId: number | null
    userName: string | null
    userEmail: string | null
    action: string | null
    resource: string | null
    resourceId: string | null
    details: string | null
    severity: string | null
    ipAddress: string | null
    userAgent: string | null
    timestamp: Date | null
  }

  export type AuditEntryMaxAggregateOutputType = {
    id: string | null
    userId: number | null
    userName: string | null
    userEmail: string | null
    action: string | null
    resource: string | null
    resourceId: string | null
    details: string | null
    severity: string | null
    ipAddress: string | null
    userAgent: string | null
    timestamp: Date | null
  }

  export type AuditEntryCountAggregateOutputType = {
    id: number
    userId: number
    userName: number
    userEmail: number
    action: number
    resource: number
    resourceId: number
    details: number
    severity: number
    ipAddress: number
    userAgent: number
    timestamp: number
    _all: number
  }


  export type AuditEntryAvgAggregateInputType = {
    userId?: true
  }

  export type AuditEntrySumAggregateInputType = {
    userId?: true
  }

  export type AuditEntryMinAggregateInputType = {
    id?: true
    userId?: true
    userName?: true
    userEmail?: true
    action?: true
    resource?: true
    resourceId?: true
    details?: true
    severity?: true
    ipAddress?: true
    userAgent?: true
    timestamp?: true
  }

  export type AuditEntryMaxAggregateInputType = {
    id?: true
    userId?: true
    userName?: true
    userEmail?: true
    action?: true
    resource?: true
    resourceId?: true
    details?: true
    severity?: true
    ipAddress?: true
    userAgent?: true
    timestamp?: true
  }

  export type AuditEntryCountAggregateInputType = {
    id?: true
    userId?: true
    userName?: true
    userEmail?: true
    action?: true
    resource?: true
    resourceId?: true
    details?: true
    severity?: true
    ipAddress?: true
    userAgent?: true
    timestamp?: true
    _all?: true
  }

  export type AuditEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditEntry to aggregate.
     */
    where?: AuditEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEntries to fetch.
     */
    orderBy?: AuditEntryOrderByWithRelationInput | AuditEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditEntries
    **/
    _count?: true | AuditEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuditEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuditEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditEntryMaxAggregateInputType
  }

  export type GetAuditEntryAggregateType<T extends AuditEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditEntry[P]>
      : GetScalarType<T[P], AggregateAuditEntry[P]>
  }




  export type AuditEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditEntryWhereInput
    orderBy?: AuditEntryOrderByWithAggregationInput | AuditEntryOrderByWithAggregationInput[]
    by: AuditEntryScalarFieldEnum[] | AuditEntryScalarFieldEnum
    having?: AuditEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditEntryCountAggregateInputType | true
    _avg?: AuditEntryAvgAggregateInputType
    _sum?: AuditEntrySumAggregateInputType
    _min?: AuditEntryMinAggregateInputType
    _max?: AuditEntryMaxAggregateInputType
  }

  export type AuditEntryGroupByOutputType = {
    id: string
    userId: number
    userName: string
    userEmail: string
    action: string
    resource: string
    resourceId: string | null
    details: string
    severity: string
    ipAddress: string
    userAgent: string | null
    timestamp: Date
    _count: AuditEntryCountAggregateOutputType | null
    _avg: AuditEntryAvgAggregateOutputType | null
    _sum: AuditEntrySumAggregateOutputType | null
    _min: AuditEntryMinAggregateOutputType | null
    _max: AuditEntryMaxAggregateOutputType | null
  }

  type GetAuditEntryGroupByPayload<T extends AuditEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditEntryGroupByOutputType[P]>
            : GetScalarType<T[P], AuditEntryGroupByOutputType[P]>
        }
      >
    >


  export type AuditEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userName?: boolean
    userEmail?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    details?: boolean
    severity?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditEntry"]>

  export type AuditEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userName?: boolean
    userEmail?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    details?: boolean
    severity?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditEntry"]>

  export type AuditEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userName?: boolean
    userEmail?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    details?: boolean
    severity?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditEntry"]>

  export type AuditEntrySelectScalar = {
    id?: boolean
    userId?: boolean
    userName?: boolean
    userEmail?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    details?: boolean
    severity?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    timestamp?: boolean
  }

  export type AuditEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "userName" | "userEmail" | "action" | "resource" | "resourceId" | "details" | "severity" | "ipAddress" | "userAgent" | "timestamp", ExtArgs["result"]["auditEntry"]>
  export type AuditEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuditEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditEntry"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: number
      userName: string
      userEmail: string
      action: string
      resource: string
      resourceId: string | null
      details: string
      severity: string
      ipAddress: string
      userAgent: string | null
      timestamp: Date
    }, ExtArgs["result"]["auditEntry"]>
    composites: {}
  }

  type AuditEntryGetPayload<S extends boolean | null | undefined | AuditEntryDefaultArgs> = $Result.GetResult<Prisma.$AuditEntryPayload, S>

  type AuditEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditEntryCountAggregateInputType | true
    }

  export interface AuditEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditEntry'], meta: { name: 'AuditEntry' } }
    /**
     * Find zero or one AuditEntry that matches the filter.
     * @param {AuditEntryFindUniqueArgs} args - Arguments to find a AuditEntry
     * @example
     * // Get one AuditEntry
     * const auditEntry = await prisma.auditEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditEntryFindUniqueArgs>(args: SelectSubset<T, AuditEntryFindUniqueArgs<ExtArgs>>): Prisma__AuditEntryClient<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditEntryFindUniqueOrThrowArgs} args - Arguments to find a AuditEntry
     * @example
     * // Get one AuditEntry
     * const auditEntry = await prisma.auditEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditEntryClient<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEntryFindFirstArgs} args - Arguments to find a AuditEntry
     * @example
     * // Get one AuditEntry
     * const auditEntry = await prisma.auditEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditEntryFindFirstArgs>(args?: SelectSubset<T, AuditEntryFindFirstArgs<ExtArgs>>): Prisma__AuditEntryClient<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEntryFindFirstOrThrowArgs} args - Arguments to find a AuditEntry
     * @example
     * // Get one AuditEntry
     * const auditEntry = await prisma.auditEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditEntryClient<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditEntries
     * const auditEntries = await prisma.auditEntry.findMany()
     * 
     * // Get first 10 AuditEntries
     * const auditEntries = await prisma.auditEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditEntryWithIdOnly = await prisma.auditEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditEntryFindManyArgs>(args?: SelectSubset<T, AuditEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditEntry.
     * @param {AuditEntryCreateArgs} args - Arguments to create a AuditEntry.
     * @example
     * // Create one AuditEntry
     * const AuditEntry = await prisma.auditEntry.create({
     *   data: {
     *     // ... data to create a AuditEntry
     *   }
     * })
     * 
     */
    create<T extends AuditEntryCreateArgs>(args: SelectSubset<T, AuditEntryCreateArgs<ExtArgs>>): Prisma__AuditEntryClient<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditEntries.
     * @param {AuditEntryCreateManyArgs} args - Arguments to create many AuditEntries.
     * @example
     * // Create many AuditEntries
     * const auditEntry = await prisma.auditEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditEntryCreateManyArgs>(args?: SelectSubset<T, AuditEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditEntries and returns the data saved in the database.
     * @param {AuditEntryCreateManyAndReturnArgs} args - Arguments to create many AuditEntries.
     * @example
     * // Create many AuditEntries
     * const auditEntry = await prisma.auditEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditEntries and only return the `id`
     * const auditEntryWithIdOnly = await prisma.auditEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditEntry.
     * @param {AuditEntryDeleteArgs} args - Arguments to delete one AuditEntry.
     * @example
     * // Delete one AuditEntry
     * const AuditEntry = await prisma.auditEntry.delete({
     *   where: {
     *     // ... filter to delete one AuditEntry
     *   }
     * })
     * 
     */
    delete<T extends AuditEntryDeleteArgs>(args: SelectSubset<T, AuditEntryDeleteArgs<ExtArgs>>): Prisma__AuditEntryClient<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditEntry.
     * @param {AuditEntryUpdateArgs} args - Arguments to update one AuditEntry.
     * @example
     * // Update one AuditEntry
     * const auditEntry = await prisma.auditEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditEntryUpdateArgs>(args: SelectSubset<T, AuditEntryUpdateArgs<ExtArgs>>): Prisma__AuditEntryClient<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditEntries.
     * @param {AuditEntryDeleteManyArgs} args - Arguments to filter AuditEntries to delete.
     * @example
     * // Delete a few AuditEntries
     * const { count } = await prisma.auditEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditEntryDeleteManyArgs>(args?: SelectSubset<T, AuditEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditEntries
     * const auditEntry = await prisma.auditEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditEntryUpdateManyArgs>(args: SelectSubset<T, AuditEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditEntries and returns the data updated in the database.
     * @param {AuditEntryUpdateManyAndReturnArgs} args - Arguments to update many AuditEntries.
     * @example
     * // Update many AuditEntries
     * const auditEntry = await prisma.auditEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditEntries and only return the `id`
     * const auditEntryWithIdOnly = await prisma.auditEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditEntry.
     * @param {AuditEntryUpsertArgs} args - Arguments to update or create a AuditEntry.
     * @example
     * // Update or create a AuditEntry
     * const auditEntry = await prisma.auditEntry.upsert({
     *   create: {
     *     // ... data to create a AuditEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditEntry we want to update
     *   }
     * })
     */
    upsert<T extends AuditEntryUpsertArgs>(args: SelectSubset<T, AuditEntryUpsertArgs<ExtArgs>>): Prisma__AuditEntryClient<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEntryCountArgs} args - Arguments to filter AuditEntries to count.
     * @example
     * // Count the number of AuditEntries
     * const count = await prisma.auditEntry.count({
     *   where: {
     *     // ... the filter for the AuditEntries we want to count
     *   }
     * })
    **/
    count<T extends AuditEntryCountArgs>(
      args?: Subset<T, AuditEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditEntryAggregateArgs>(args: Subset<T, AuditEntryAggregateArgs>): Prisma.PrismaPromise<GetAuditEntryAggregateType<T>>

    /**
     * Group by AuditEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditEntryGroupByArgs['orderBy'] }
        : { orderBy?: AuditEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditEntry model
   */
  readonly fields: AuditEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditEntry model
   */
  interface AuditEntryFieldRefs {
    readonly id: FieldRef<"AuditEntry", 'String'>
    readonly userId: FieldRef<"AuditEntry", 'Int'>
    readonly userName: FieldRef<"AuditEntry", 'String'>
    readonly userEmail: FieldRef<"AuditEntry", 'String'>
    readonly action: FieldRef<"AuditEntry", 'String'>
    readonly resource: FieldRef<"AuditEntry", 'String'>
    readonly resourceId: FieldRef<"AuditEntry", 'String'>
    readonly details: FieldRef<"AuditEntry", 'String'>
    readonly severity: FieldRef<"AuditEntry", 'String'>
    readonly ipAddress: FieldRef<"AuditEntry", 'String'>
    readonly userAgent: FieldRef<"AuditEntry", 'String'>
    readonly timestamp: FieldRef<"AuditEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditEntry findUnique
   */
  export type AuditEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEntry
     */
    omit?: AuditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEntryInclude<ExtArgs> | null
    /**
     * Filter, which AuditEntry to fetch.
     */
    where: AuditEntryWhereUniqueInput
  }

  /**
   * AuditEntry findUniqueOrThrow
   */
  export type AuditEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEntry
     */
    omit?: AuditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEntryInclude<ExtArgs> | null
    /**
     * Filter, which AuditEntry to fetch.
     */
    where: AuditEntryWhereUniqueInput
  }

  /**
   * AuditEntry findFirst
   */
  export type AuditEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEntry
     */
    omit?: AuditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEntryInclude<ExtArgs> | null
    /**
     * Filter, which AuditEntry to fetch.
     */
    where?: AuditEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEntries to fetch.
     */
    orderBy?: AuditEntryOrderByWithRelationInput | AuditEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditEntries.
     */
    cursor?: AuditEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditEntries.
     */
    distinct?: AuditEntryScalarFieldEnum | AuditEntryScalarFieldEnum[]
  }

  /**
   * AuditEntry findFirstOrThrow
   */
  export type AuditEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEntry
     */
    omit?: AuditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEntryInclude<ExtArgs> | null
    /**
     * Filter, which AuditEntry to fetch.
     */
    where?: AuditEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEntries to fetch.
     */
    orderBy?: AuditEntryOrderByWithRelationInput | AuditEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditEntries.
     */
    cursor?: AuditEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditEntries.
     */
    distinct?: AuditEntryScalarFieldEnum | AuditEntryScalarFieldEnum[]
  }

  /**
   * AuditEntry findMany
   */
  export type AuditEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEntry
     */
    omit?: AuditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEntryInclude<ExtArgs> | null
    /**
     * Filter, which AuditEntries to fetch.
     */
    where?: AuditEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEntries to fetch.
     */
    orderBy?: AuditEntryOrderByWithRelationInput | AuditEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditEntries.
     */
    cursor?: AuditEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEntries.
     */
    skip?: number
    distinct?: AuditEntryScalarFieldEnum | AuditEntryScalarFieldEnum[]
  }

  /**
   * AuditEntry create
   */
  export type AuditEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEntry
     */
    omit?: AuditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditEntry.
     */
    data: XOR<AuditEntryCreateInput, AuditEntryUncheckedCreateInput>
  }

  /**
   * AuditEntry createMany
   */
  export type AuditEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditEntries.
     */
    data: AuditEntryCreateManyInput | AuditEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditEntry createManyAndReturn
   */
  export type AuditEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEntry
     */
    omit?: AuditEntryOmit<ExtArgs> | null
    /**
     * The data used to create many AuditEntries.
     */
    data: AuditEntryCreateManyInput | AuditEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditEntry update
   */
  export type AuditEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEntry
     */
    omit?: AuditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditEntry.
     */
    data: XOR<AuditEntryUpdateInput, AuditEntryUncheckedUpdateInput>
    /**
     * Choose, which AuditEntry to update.
     */
    where: AuditEntryWhereUniqueInput
  }

  /**
   * AuditEntry updateMany
   */
  export type AuditEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditEntries.
     */
    data: XOR<AuditEntryUpdateManyMutationInput, AuditEntryUncheckedUpdateManyInput>
    /**
     * Filter which AuditEntries to update
     */
    where?: AuditEntryWhereInput
    /**
     * Limit how many AuditEntries to update.
     */
    limit?: number
  }

  /**
   * AuditEntry updateManyAndReturn
   */
  export type AuditEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEntry
     */
    omit?: AuditEntryOmit<ExtArgs> | null
    /**
     * The data used to update AuditEntries.
     */
    data: XOR<AuditEntryUpdateManyMutationInput, AuditEntryUncheckedUpdateManyInput>
    /**
     * Filter which AuditEntries to update
     */
    where?: AuditEntryWhereInput
    /**
     * Limit how many AuditEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditEntry upsert
   */
  export type AuditEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEntry
     */
    omit?: AuditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditEntry to update in case it exists.
     */
    where: AuditEntryWhereUniqueInput
    /**
     * In case the AuditEntry found by the `where` argument doesn't exist, create a new AuditEntry with this data.
     */
    create: XOR<AuditEntryCreateInput, AuditEntryUncheckedCreateInput>
    /**
     * In case the AuditEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditEntryUpdateInput, AuditEntryUncheckedUpdateInput>
  }

  /**
   * AuditEntry delete
   */
  export type AuditEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEntry
     */
    omit?: AuditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEntryInclude<ExtArgs> | null
    /**
     * Filter which AuditEntry to delete.
     */
    where: AuditEntryWhereUniqueInput
  }

  /**
   * AuditEntry deleteMany
   */
  export type AuditEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditEntries to delete
     */
    where?: AuditEntryWhereInput
    /**
     * Limit how many AuditEntries to delete.
     */
    limit?: number
  }

  /**
   * AuditEntry without action
   */
  export type AuditEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEntry
     */
    omit?: AuditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEntryInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    role: 'role',
    isEmailVerified: 'isEmailVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    type: 'type',
    expires: 'expires',
    blacklisted: 'blacklisted',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type TokenScalarFieldEnum = (typeof TokenScalarFieldEnum)[keyof typeof TokenScalarFieldEnum]


  export const ClientScalarFieldEnum: {
    id: 'id',
    name: 'name',
    accountIds: 'accountIds',
    relationshipManager: 'relationshipManager',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const StatementFileScalarFieldEnum: {
    id: 'id',
    filename: 'filename',
    type: 'type',
    size: 'size',
    uploadedAt: 'uploadedAt',
    status: 'status',
    clientId: 'clientId'
  };

  export type StatementFileScalarFieldEnum = (typeof StatementFileScalarFieldEnum)[keyof typeof StatementFileScalarFieldEnum]


  export const ParseResultScalarFieldEnum: {
    id: 'id',
    statementFileId: 'statementFileId',
    totalTransactions: 'totalTransactions',
    dateRangeStart: 'dateRangeStart',
    dateRangeEnd: 'dateRangeEnd',
    accounts: 'accounts',
    status: 'status',
    errors: 'errors',
    createdAt: 'createdAt'
  };

  export type ParseResultScalarFieldEnum = (typeof ParseResultScalarFieldEnum)[keyof typeof ParseResultScalarFieldEnum]


  export const AnalysisScalarFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    statementFileIds: 'statementFileIds',
    createdAt: 'createdAt',
    status: 'status',
    summary: 'summary',
    liquidityMetrics: 'liquidityMetrics',
    spendingBreakdown: 'spendingBreakdown',
    idleBalanceAnalysis: 'idleBalanceAnalysis'
  };

  export type AnalysisScalarFieldEnum = (typeof AnalysisScalarFieldEnum)[keyof typeof AnalysisScalarFieldEnum]


  export const TreasuryProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category: 'category',
    description: 'description',
    features: 'features',
    eligibilityRules: 'eligibilityRules',
    benefits: 'benefits',
    pricing: 'pricing',
    isActive: 'isActive'
  };

  export type TreasuryProductScalarFieldEnum = (typeof TreasuryProductScalarFieldEnum)[keyof typeof TreasuryProductScalarFieldEnum]


  export const RecommendationScalarFieldEnum: {
    id: 'id',
    analysisId: 'analysisId',
    productId: 'productId',
    priority: 'priority',
    rationale: 'rationale',
    dataPoints: 'dataPoints',
    benefitProjection: 'benefitProjection',
    status: 'status',
    createdAt: 'createdAt',
    approvedBy: 'approvedBy',
    approvedAt: 'approvedAt'
  };

  export type RecommendationScalarFieldEnum = (typeof RecommendationScalarFieldEnum)[keyof typeof RecommendationScalarFieldEnum]


  export const ReportScalarFieldEnum: {
    id: 'id',
    title: 'title',
    analysisId: 'analysisId',
    clientId: 'clientId',
    format: 'format',
    template: 'template',
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    fileSize: 'fileSize',
    downloadCount: 'downloadCount',
    status: 'status',
    filePath: 'filePath'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const SystemConfigScalarFieldEnum: {
    id: 'id',
    configKey: 'configKey',
    configValue: 'configValue',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy'
  };

  export type SystemConfigScalarFieldEnum = (typeof SystemConfigScalarFieldEnum)[keyof typeof SystemConfigScalarFieldEnum]


  export const AuditEntryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    userName: 'userName',
    userEmail: 'userEmail',
    action: 'action',
    resource: 'resource',
    resourceId: 'resourceId',
    details: 'details',
    severity: 'severity',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    timestamp: 'timestamp'
  };

  export type AuditEntryScalarFieldEnum = (typeof AuditEntryScalarFieldEnum)[keyof typeof AuditEntryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TokenType'
   */
  export type EnumTokenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenType'>
    


  /**
   * Reference to a field of type 'TokenType[]'
   */
  export type ListEnumTokenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isEmailVerified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    Token?: TokenListRelationFilter
    AuditEntry?: AuditEntryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Token?: TokenOrderByRelationAggregateInput
    AuditEntry?: AuditEntryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isEmailVerified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    Token?: TokenListRelationFilter
    AuditEntry?: AuditEntryListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    isEmailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TokenWhereInput = {
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    id?: IntFilter<"Token"> | number
    token?: StringFilter<"Token"> | string
    type?: EnumTokenTypeFilter<"Token"> | $Enums.TokenType
    expires?: DateTimeFilter<"Token"> | Date | string
    blacklisted?: BoolFilter<"Token"> | boolean
    createdAt?: DateTimeFilter<"Token"> | Date | string
    userId?: IntFilter<"Token"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires?: SortOrder
    blacklisted?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TokenWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    token?: StringFilter<"Token"> | string
    type?: EnumTokenTypeFilter<"Token"> | $Enums.TokenType
    expires?: DateTimeFilter<"Token"> | Date | string
    blacklisted?: BoolFilter<"Token"> | boolean
    createdAt?: DateTimeFilter<"Token"> | Date | string
    userId?: IntFilter<"Token"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires?: SortOrder
    blacklisted?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: TokenCountOrderByAggregateInput
    _avg?: TokenAvgOrderByAggregateInput
    _max?: TokenMaxOrderByAggregateInput
    _min?: TokenMinOrderByAggregateInput
    _sum?: TokenSumOrderByAggregateInput
  }

  export type TokenScalarWhereWithAggregatesInput = {
    AND?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    OR?: TokenScalarWhereWithAggregatesInput[]
    NOT?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Token"> | number
    token?: StringWithAggregatesFilter<"Token"> | string
    type?: EnumTokenTypeWithAggregatesFilter<"Token"> | $Enums.TokenType
    expires?: DateTimeWithAggregatesFilter<"Token"> | Date | string
    blacklisted?: BoolWithAggregatesFilter<"Token"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Token"> | Date | string
    userId?: IntWithAggregatesFilter<"Token"> | number
  }

  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: StringFilter<"Client"> | string
    name?: StringFilter<"Client"> | string
    accountIds?: StringNullableListFilter<"Client">
    relationshipManager?: StringFilter<"Client"> | string
    status?: StringFilter<"Client"> | string
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    StatementFile?: StatementFileListRelationFilter
    Analysis?: AnalysisListRelationFilter
    Report?: ReportListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    accountIds?: SortOrder
    relationshipManager?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    StatementFile?: StatementFileOrderByRelationAggregateInput
    Analysis?: AnalysisOrderByRelationAggregateInput
    Report?: ReportOrderByRelationAggregateInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    name?: StringFilter<"Client"> | string
    accountIds?: StringNullableListFilter<"Client">
    relationshipManager?: StringFilter<"Client"> | string
    status?: StringFilter<"Client"> | string
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    StatementFile?: StatementFileListRelationFilter
    Analysis?: AnalysisListRelationFilter
    Report?: ReportListRelationFilter
  }, "id">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    accountIds?: SortOrder
    relationshipManager?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClientCountOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Client"> | string
    name?: StringWithAggregatesFilter<"Client"> | string
    accountIds?: StringNullableListFilter<"Client">
    relationshipManager?: StringWithAggregatesFilter<"Client"> | string
    status?: StringWithAggregatesFilter<"Client"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
  }

  export type StatementFileWhereInput = {
    AND?: StatementFileWhereInput | StatementFileWhereInput[]
    OR?: StatementFileWhereInput[]
    NOT?: StatementFileWhereInput | StatementFileWhereInput[]
    id?: StringFilter<"StatementFile"> | string
    filename?: StringFilter<"StatementFile"> | string
    type?: StringFilter<"StatementFile"> | string
    size?: IntFilter<"StatementFile"> | number
    uploadedAt?: DateTimeFilter<"StatementFile"> | Date | string
    status?: StringFilter<"StatementFile"> | string
    clientId?: StringFilter<"StatementFile"> | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    ParseResult?: XOR<ParseResultNullableScalarRelationFilter, ParseResultWhereInput> | null
  }

  export type StatementFileOrderByWithRelationInput = {
    id?: SortOrder
    filename?: SortOrder
    type?: SortOrder
    size?: SortOrder
    uploadedAt?: SortOrder
    status?: SortOrder
    clientId?: SortOrder
    client?: ClientOrderByWithRelationInput
    ParseResult?: ParseResultOrderByWithRelationInput
  }

  export type StatementFileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StatementFileWhereInput | StatementFileWhereInput[]
    OR?: StatementFileWhereInput[]
    NOT?: StatementFileWhereInput | StatementFileWhereInput[]
    filename?: StringFilter<"StatementFile"> | string
    type?: StringFilter<"StatementFile"> | string
    size?: IntFilter<"StatementFile"> | number
    uploadedAt?: DateTimeFilter<"StatementFile"> | Date | string
    status?: StringFilter<"StatementFile"> | string
    clientId?: StringFilter<"StatementFile"> | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    ParseResult?: XOR<ParseResultNullableScalarRelationFilter, ParseResultWhereInput> | null
  }, "id">

  export type StatementFileOrderByWithAggregationInput = {
    id?: SortOrder
    filename?: SortOrder
    type?: SortOrder
    size?: SortOrder
    uploadedAt?: SortOrder
    status?: SortOrder
    clientId?: SortOrder
    _count?: StatementFileCountOrderByAggregateInput
    _avg?: StatementFileAvgOrderByAggregateInput
    _max?: StatementFileMaxOrderByAggregateInput
    _min?: StatementFileMinOrderByAggregateInput
    _sum?: StatementFileSumOrderByAggregateInput
  }

  export type StatementFileScalarWhereWithAggregatesInput = {
    AND?: StatementFileScalarWhereWithAggregatesInput | StatementFileScalarWhereWithAggregatesInput[]
    OR?: StatementFileScalarWhereWithAggregatesInput[]
    NOT?: StatementFileScalarWhereWithAggregatesInput | StatementFileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StatementFile"> | string
    filename?: StringWithAggregatesFilter<"StatementFile"> | string
    type?: StringWithAggregatesFilter<"StatementFile"> | string
    size?: IntWithAggregatesFilter<"StatementFile"> | number
    uploadedAt?: DateTimeWithAggregatesFilter<"StatementFile"> | Date | string
    status?: StringWithAggregatesFilter<"StatementFile"> | string
    clientId?: StringWithAggregatesFilter<"StatementFile"> | string
  }

  export type ParseResultWhereInput = {
    AND?: ParseResultWhereInput | ParseResultWhereInput[]
    OR?: ParseResultWhereInput[]
    NOT?: ParseResultWhereInput | ParseResultWhereInput[]
    id?: StringFilter<"ParseResult"> | string
    statementFileId?: StringFilter<"ParseResult"> | string
    totalTransactions?: IntFilter<"ParseResult"> | number
    dateRangeStart?: DateTimeFilter<"ParseResult"> | Date | string
    dateRangeEnd?: DateTimeFilter<"ParseResult"> | Date | string
    accounts?: JsonFilter<"ParseResult">
    status?: StringFilter<"ParseResult"> | string
    errors?: JsonNullableFilter<"ParseResult">
    createdAt?: DateTimeFilter<"ParseResult"> | Date | string
    statementFile?: XOR<StatementFileScalarRelationFilter, StatementFileWhereInput>
  }

  export type ParseResultOrderByWithRelationInput = {
    id?: SortOrder
    statementFileId?: SortOrder
    totalTransactions?: SortOrder
    dateRangeStart?: SortOrder
    dateRangeEnd?: SortOrder
    accounts?: SortOrder
    status?: SortOrder
    errors?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    statementFile?: StatementFileOrderByWithRelationInput
  }

  export type ParseResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    statementFileId?: string
    AND?: ParseResultWhereInput | ParseResultWhereInput[]
    OR?: ParseResultWhereInput[]
    NOT?: ParseResultWhereInput | ParseResultWhereInput[]
    totalTransactions?: IntFilter<"ParseResult"> | number
    dateRangeStart?: DateTimeFilter<"ParseResult"> | Date | string
    dateRangeEnd?: DateTimeFilter<"ParseResult"> | Date | string
    accounts?: JsonFilter<"ParseResult">
    status?: StringFilter<"ParseResult"> | string
    errors?: JsonNullableFilter<"ParseResult">
    createdAt?: DateTimeFilter<"ParseResult"> | Date | string
    statementFile?: XOR<StatementFileScalarRelationFilter, StatementFileWhereInput>
  }, "id" | "statementFileId">

  export type ParseResultOrderByWithAggregationInput = {
    id?: SortOrder
    statementFileId?: SortOrder
    totalTransactions?: SortOrder
    dateRangeStart?: SortOrder
    dateRangeEnd?: SortOrder
    accounts?: SortOrder
    status?: SortOrder
    errors?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ParseResultCountOrderByAggregateInput
    _avg?: ParseResultAvgOrderByAggregateInput
    _max?: ParseResultMaxOrderByAggregateInput
    _min?: ParseResultMinOrderByAggregateInput
    _sum?: ParseResultSumOrderByAggregateInput
  }

  export type ParseResultScalarWhereWithAggregatesInput = {
    AND?: ParseResultScalarWhereWithAggregatesInput | ParseResultScalarWhereWithAggregatesInput[]
    OR?: ParseResultScalarWhereWithAggregatesInput[]
    NOT?: ParseResultScalarWhereWithAggregatesInput | ParseResultScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ParseResult"> | string
    statementFileId?: StringWithAggregatesFilter<"ParseResult"> | string
    totalTransactions?: IntWithAggregatesFilter<"ParseResult"> | number
    dateRangeStart?: DateTimeWithAggregatesFilter<"ParseResult"> | Date | string
    dateRangeEnd?: DateTimeWithAggregatesFilter<"ParseResult"> | Date | string
    accounts?: JsonWithAggregatesFilter<"ParseResult">
    status?: StringWithAggregatesFilter<"ParseResult"> | string
    errors?: JsonNullableWithAggregatesFilter<"ParseResult">
    createdAt?: DateTimeWithAggregatesFilter<"ParseResult"> | Date | string
  }

  export type AnalysisWhereInput = {
    AND?: AnalysisWhereInput | AnalysisWhereInput[]
    OR?: AnalysisWhereInput[]
    NOT?: AnalysisWhereInput | AnalysisWhereInput[]
    id?: StringFilter<"Analysis"> | string
    clientId?: StringFilter<"Analysis"> | string
    statementFileIds?: StringNullableListFilter<"Analysis">
    createdAt?: DateTimeFilter<"Analysis"> | Date | string
    status?: StringFilter<"Analysis"> | string
    summary?: JsonFilter<"Analysis">
    liquidityMetrics?: JsonFilter<"Analysis">
    spendingBreakdown?: JsonFilter<"Analysis">
    idleBalanceAnalysis?: JsonFilter<"Analysis">
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    Recommendation?: RecommendationListRelationFilter
    Report?: ReportListRelationFilter
  }

  export type AnalysisOrderByWithRelationInput = {
    id?: SortOrder
    clientId?: SortOrder
    statementFileIds?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
    summary?: SortOrder
    liquidityMetrics?: SortOrder
    spendingBreakdown?: SortOrder
    idleBalanceAnalysis?: SortOrder
    client?: ClientOrderByWithRelationInput
    Recommendation?: RecommendationOrderByRelationAggregateInput
    Report?: ReportOrderByRelationAggregateInput
  }

  export type AnalysisWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnalysisWhereInput | AnalysisWhereInput[]
    OR?: AnalysisWhereInput[]
    NOT?: AnalysisWhereInput | AnalysisWhereInput[]
    clientId?: StringFilter<"Analysis"> | string
    statementFileIds?: StringNullableListFilter<"Analysis">
    createdAt?: DateTimeFilter<"Analysis"> | Date | string
    status?: StringFilter<"Analysis"> | string
    summary?: JsonFilter<"Analysis">
    liquidityMetrics?: JsonFilter<"Analysis">
    spendingBreakdown?: JsonFilter<"Analysis">
    idleBalanceAnalysis?: JsonFilter<"Analysis">
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    Recommendation?: RecommendationListRelationFilter
    Report?: ReportListRelationFilter
  }, "id">

  export type AnalysisOrderByWithAggregationInput = {
    id?: SortOrder
    clientId?: SortOrder
    statementFileIds?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
    summary?: SortOrder
    liquidityMetrics?: SortOrder
    spendingBreakdown?: SortOrder
    idleBalanceAnalysis?: SortOrder
    _count?: AnalysisCountOrderByAggregateInput
    _max?: AnalysisMaxOrderByAggregateInput
    _min?: AnalysisMinOrderByAggregateInput
  }

  export type AnalysisScalarWhereWithAggregatesInput = {
    AND?: AnalysisScalarWhereWithAggregatesInput | AnalysisScalarWhereWithAggregatesInput[]
    OR?: AnalysisScalarWhereWithAggregatesInput[]
    NOT?: AnalysisScalarWhereWithAggregatesInput | AnalysisScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Analysis"> | string
    clientId?: StringWithAggregatesFilter<"Analysis"> | string
    statementFileIds?: StringNullableListFilter<"Analysis">
    createdAt?: DateTimeWithAggregatesFilter<"Analysis"> | Date | string
    status?: StringWithAggregatesFilter<"Analysis"> | string
    summary?: JsonWithAggregatesFilter<"Analysis">
    liquidityMetrics?: JsonWithAggregatesFilter<"Analysis">
    spendingBreakdown?: JsonWithAggregatesFilter<"Analysis">
    idleBalanceAnalysis?: JsonWithAggregatesFilter<"Analysis">
  }

  export type TreasuryProductWhereInput = {
    AND?: TreasuryProductWhereInput | TreasuryProductWhereInput[]
    OR?: TreasuryProductWhereInput[]
    NOT?: TreasuryProductWhereInput | TreasuryProductWhereInput[]
    id?: StringFilter<"TreasuryProduct"> | string
    name?: StringFilter<"TreasuryProduct"> | string
    category?: StringFilter<"TreasuryProduct"> | string
    description?: StringFilter<"TreasuryProduct"> | string
    features?: StringNullableListFilter<"TreasuryProduct">
    eligibilityRules?: JsonFilter<"TreasuryProduct">
    benefits?: JsonFilter<"TreasuryProduct">
    pricing?: JsonFilter<"TreasuryProduct">
    isActive?: BoolFilter<"TreasuryProduct"> | boolean
    Recommendation?: RecommendationListRelationFilter
  }

  export type TreasuryProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    features?: SortOrder
    eligibilityRules?: SortOrder
    benefits?: SortOrder
    pricing?: SortOrder
    isActive?: SortOrder
    Recommendation?: RecommendationOrderByRelationAggregateInput
  }

  export type TreasuryProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: TreasuryProductWhereInput | TreasuryProductWhereInput[]
    OR?: TreasuryProductWhereInput[]
    NOT?: TreasuryProductWhereInput | TreasuryProductWhereInput[]
    category?: StringFilter<"TreasuryProduct"> | string
    description?: StringFilter<"TreasuryProduct"> | string
    features?: StringNullableListFilter<"TreasuryProduct">
    eligibilityRules?: JsonFilter<"TreasuryProduct">
    benefits?: JsonFilter<"TreasuryProduct">
    pricing?: JsonFilter<"TreasuryProduct">
    isActive?: BoolFilter<"TreasuryProduct"> | boolean
    Recommendation?: RecommendationListRelationFilter
  }, "id" | "name">

  export type TreasuryProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    features?: SortOrder
    eligibilityRules?: SortOrder
    benefits?: SortOrder
    pricing?: SortOrder
    isActive?: SortOrder
    _count?: TreasuryProductCountOrderByAggregateInput
    _max?: TreasuryProductMaxOrderByAggregateInput
    _min?: TreasuryProductMinOrderByAggregateInput
  }

  export type TreasuryProductScalarWhereWithAggregatesInput = {
    AND?: TreasuryProductScalarWhereWithAggregatesInput | TreasuryProductScalarWhereWithAggregatesInput[]
    OR?: TreasuryProductScalarWhereWithAggregatesInput[]
    NOT?: TreasuryProductScalarWhereWithAggregatesInput | TreasuryProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TreasuryProduct"> | string
    name?: StringWithAggregatesFilter<"TreasuryProduct"> | string
    category?: StringWithAggregatesFilter<"TreasuryProduct"> | string
    description?: StringWithAggregatesFilter<"TreasuryProduct"> | string
    features?: StringNullableListFilter<"TreasuryProduct">
    eligibilityRules?: JsonWithAggregatesFilter<"TreasuryProduct">
    benefits?: JsonWithAggregatesFilter<"TreasuryProduct">
    pricing?: JsonWithAggregatesFilter<"TreasuryProduct">
    isActive?: BoolWithAggregatesFilter<"TreasuryProduct"> | boolean
  }

  export type RecommendationWhereInput = {
    AND?: RecommendationWhereInput | RecommendationWhereInput[]
    OR?: RecommendationWhereInput[]
    NOT?: RecommendationWhereInput | RecommendationWhereInput[]
    id?: StringFilter<"Recommendation"> | string
    analysisId?: StringFilter<"Recommendation"> | string
    productId?: StringFilter<"Recommendation"> | string
    priority?: StringFilter<"Recommendation"> | string
    rationale?: StringFilter<"Recommendation"> | string
    dataPoints?: StringNullableListFilter<"Recommendation">
    benefitProjection?: JsonFilter<"Recommendation">
    status?: StringFilter<"Recommendation"> | string
    createdAt?: DateTimeFilter<"Recommendation"> | Date | string
    approvedBy?: StringNullableFilter<"Recommendation"> | string | null
    approvedAt?: DateTimeNullableFilter<"Recommendation"> | Date | string | null
    analysis?: XOR<AnalysisScalarRelationFilter, AnalysisWhereInput>
    product?: XOR<TreasuryProductScalarRelationFilter, TreasuryProductWhereInput>
  }

  export type RecommendationOrderByWithRelationInput = {
    id?: SortOrder
    analysisId?: SortOrder
    productId?: SortOrder
    priority?: SortOrder
    rationale?: SortOrder
    dataPoints?: SortOrder
    benefitProjection?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    approvedBy?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    analysis?: AnalysisOrderByWithRelationInput
    product?: TreasuryProductOrderByWithRelationInput
  }

  export type RecommendationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecommendationWhereInput | RecommendationWhereInput[]
    OR?: RecommendationWhereInput[]
    NOT?: RecommendationWhereInput | RecommendationWhereInput[]
    analysisId?: StringFilter<"Recommendation"> | string
    productId?: StringFilter<"Recommendation"> | string
    priority?: StringFilter<"Recommendation"> | string
    rationale?: StringFilter<"Recommendation"> | string
    dataPoints?: StringNullableListFilter<"Recommendation">
    benefitProjection?: JsonFilter<"Recommendation">
    status?: StringFilter<"Recommendation"> | string
    createdAt?: DateTimeFilter<"Recommendation"> | Date | string
    approvedBy?: StringNullableFilter<"Recommendation"> | string | null
    approvedAt?: DateTimeNullableFilter<"Recommendation"> | Date | string | null
    analysis?: XOR<AnalysisScalarRelationFilter, AnalysisWhereInput>
    product?: XOR<TreasuryProductScalarRelationFilter, TreasuryProductWhereInput>
  }, "id">

  export type RecommendationOrderByWithAggregationInput = {
    id?: SortOrder
    analysisId?: SortOrder
    productId?: SortOrder
    priority?: SortOrder
    rationale?: SortOrder
    dataPoints?: SortOrder
    benefitProjection?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    approvedBy?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    _count?: RecommendationCountOrderByAggregateInput
    _max?: RecommendationMaxOrderByAggregateInput
    _min?: RecommendationMinOrderByAggregateInput
  }

  export type RecommendationScalarWhereWithAggregatesInput = {
    AND?: RecommendationScalarWhereWithAggregatesInput | RecommendationScalarWhereWithAggregatesInput[]
    OR?: RecommendationScalarWhereWithAggregatesInput[]
    NOT?: RecommendationScalarWhereWithAggregatesInput | RecommendationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Recommendation"> | string
    analysisId?: StringWithAggregatesFilter<"Recommendation"> | string
    productId?: StringWithAggregatesFilter<"Recommendation"> | string
    priority?: StringWithAggregatesFilter<"Recommendation"> | string
    rationale?: StringWithAggregatesFilter<"Recommendation"> | string
    dataPoints?: StringNullableListFilter<"Recommendation">
    benefitProjection?: JsonWithAggregatesFilter<"Recommendation">
    status?: StringWithAggregatesFilter<"Recommendation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Recommendation"> | Date | string
    approvedBy?: StringNullableWithAggregatesFilter<"Recommendation"> | string | null
    approvedAt?: DateTimeNullableWithAggregatesFilter<"Recommendation"> | Date | string | null
  }

  export type ReportWhereInput = {
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    id?: StringFilter<"Report"> | string
    title?: StringFilter<"Report"> | string
    analysisId?: StringFilter<"Report"> | string
    clientId?: StringFilter<"Report"> | string
    format?: StringFilter<"Report"> | string
    template?: StringFilter<"Report"> | string
    createdAt?: DateTimeFilter<"Report"> | Date | string
    createdBy?: StringFilter<"Report"> | string
    fileSize?: IntFilter<"Report"> | number
    downloadCount?: IntFilter<"Report"> | number
    status?: StringFilter<"Report"> | string
    filePath?: StringNullableFilter<"Report"> | string | null
    analysis?: XOR<AnalysisScalarRelationFilter, AnalysisWhereInput>
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    analysisId?: SortOrder
    clientId?: SortOrder
    format?: SortOrder
    template?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    fileSize?: SortOrder
    downloadCount?: SortOrder
    status?: SortOrder
    filePath?: SortOrderInput | SortOrder
    analysis?: AnalysisOrderByWithRelationInput
    client?: ClientOrderByWithRelationInput
  }

  export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    title?: StringFilter<"Report"> | string
    analysisId?: StringFilter<"Report"> | string
    clientId?: StringFilter<"Report"> | string
    format?: StringFilter<"Report"> | string
    template?: StringFilter<"Report"> | string
    createdAt?: DateTimeFilter<"Report"> | Date | string
    createdBy?: StringFilter<"Report"> | string
    fileSize?: IntFilter<"Report"> | number
    downloadCount?: IntFilter<"Report"> | number
    status?: StringFilter<"Report"> | string
    filePath?: StringNullableFilter<"Report"> | string | null
    analysis?: XOR<AnalysisScalarRelationFilter, AnalysisWhereInput>
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
  }, "id">

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    analysisId?: SortOrder
    clientId?: SortOrder
    format?: SortOrder
    template?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    fileSize?: SortOrder
    downloadCount?: SortOrder
    status?: SortOrder
    filePath?: SortOrderInput | SortOrder
    _count?: ReportCountOrderByAggregateInput
    _avg?: ReportAvgOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
    _sum?: ReportSumOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    OR?: ReportScalarWhereWithAggregatesInput[]
    NOT?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Report"> | string
    title?: StringWithAggregatesFilter<"Report"> | string
    analysisId?: StringWithAggregatesFilter<"Report"> | string
    clientId?: StringWithAggregatesFilter<"Report"> | string
    format?: StringWithAggregatesFilter<"Report"> | string
    template?: StringWithAggregatesFilter<"Report"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
    createdBy?: StringWithAggregatesFilter<"Report"> | string
    fileSize?: IntWithAggregatesFilter<"Report"> | number
    downloadCount?: IntWithAggregatesFilter<"Report"> | number
    status?: StringWithAggregatesFilter<"Report"> | string
    filePath?: StringNullableWithAggregatesFilter<"Report"> | string | null
  }

  export type SystemConfigWhereInput = {
    AND?: SystemConfigWhereInput | SystemConfigWhereInput[]
    OR?: SystemConfigWhereInput[]
    NOT?: SystemConfigWhereInput | SystemConfigWhereInput[]
    id?: StringFilter<"SystemConfig"> | string
    configKey?: StringFilter<"SystemConfig"> | string
    configValue?: JsonFilter<"SystemConfig">
    updatedAt?: DateTimeFilter<"SystemConfig"> | Date | string
    updatedBy?: StringFilter<"SystemConfig"> | string
  }

  export type SystemConfigOrderByWithRelationInput = {
    id?: SortOrder
    configKey?: SortOrder
    configValue?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type SystemConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    configKey?: string
    AND?: SystemConfigWhereInput | SystemConfigWhereInput[]
    OR?: SystemConfigWhereInput[]
    NOT?: SystemConfigWhereInput | SystemConfigWhereInput[]
    configValue?: JsonFilter<"SystemConfig">
    updatedAt?: DateTimeFilter<"SystemConfig"> | Date | string
    updatedBy?: StringFilter<"SystemConfig"> | string
  }, "id" | "configKey">

  export type SystemConfigOrderByWithAggregationInput = {
    id?: SortOrder
    configKey?: SortOrder
    configValue?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    _count?: SystemConfigCountOrderByAggregateInput
    _max?: SystemConfigMaxOrderByAggregateInput
    _min?: SystemConfigMinOrderByAggregateInput
  }

  export type SystemConfigScalarWhereWithAggregatesInput = {
    AND?: SystemConfigScalarWhereWithAggregatesInput | SystemConfigScalarWhereWithAggregatesInput[]
    OR?: SystemConfigScalarWhereWithAggregatesInput[]
    NOT?: SystemConfigScalarWhereWithAggregatesInput | SystemConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SystemConfig"> | string
    configKey?: StringWithAggregatesFilter<"SystemConfig"> | string
    configValue?: JsonWithAggregatesFilter<"SystemConfig">
    updatedAt?: DateTimeWithAggregatesFilter<"SystemConfig"> | Date | string
    updatedBy?: StringWithAggregatesFilter<"SystemConfig"> | string
  }

  export type AuditEntryWhereInput = {
    AND?: AuditEntryWhereInput | AuditEntryWhereInput[]
    OR?: AuditEntryWhereInput[]
    NOT?: AuditEntryWhereInput | AuditEntryWhereInput[]
    id?: StringFilter<"AuditEntry"> | string
    userId?: IntFilter<"AuditEntry"> | number
    userName?: StringFilter<"AuditEntry"> | string
    userEmail?: StringFilter<"AuditEntry"> | string
    action?: StringFilter<"AuditEntry"> | string
    resource?: StringFilter<"AuditEntry"> | string
    resourceId?: StringNullableFilter<"AuditEntry"> | string | null
    details?: StringFilter<"AuditEntry"> | string
    severity?: StringFilter<"AuditEntry"> | string
    ipAddress?: StringFilter<"AuditEntry"> | string
    userAgent?: StringNullableFilter<"AuditEntry"> | string | null
    timestamp?: DateTimeFilter<"AuditEntry"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AuditEntryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    userEmail?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    details?: SortOrder
    severity?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditEntryWhereInput | AuditEntryWhereInput[]
    OR?: AuditEntryWhereInput[]
    NOT?: AuditEntryWhereInput | AuditEntryWhereInput[]
    userId?: IntFilter<"AuditEntry"> | number
    userName?: StringFilter<"AuditEntry"> | string
    userEmail?: StringFilter<"AuditEntry"> | string
    action?: StringFilter<"AuditEntry"> | string
    resource?: StringFilter<"AuditEntry"> | string
    resourceId?: StringNullableFilter<"AuditEntry"> | string | null
    details?: StringFilter<"AuditEntry"> | string
    severity?: StringFilter<"AuditEntry"> | string
    ipAddress?: StringFilter<"AuditEntry"> | string
    userAgent?: StringNullableFilter<"AuditEntry"> | string | null
    timestamp?: DateTimeFilter<"AuditEntry"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AuditEntryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    userEmail?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    details?: SortOrder
    severity?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: AuditEntryCountOrderByAggregateInput
    _avg?: AuditEntryAvgOrderByAggregateInput
    _max?: AuditEntryMaxOrderByAggregateInput
    _min?: AuditEntryMinOrderByAggregateInput
    _sum?: AuditEntrySumOrderByAggregateInput
  }

  export type AuditEntryScalarWhereWithAggregatesInput = {
    AND?: AuditEntryScalarWhereWithAggregatesInput | AuditEntryScalarWhereWithAggregatesInput[]
    OR?: AuditEntryScalarWhereWithAggregatesInput[]
    NOT?: AuditEntryScalarWhereWithAggregatesInput | AuditEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditEntry"> | string
    userId?: IntWithAggregatesFilter<"AuditEntry"> | number
    userName?: StringWithAggregatesFilter<"AuditEntry"> | string
    userEmail?: StringWithAggregatesFilter<"AuditEntry"> | string
    action?: StringWithAggregatesFilter<"AuditEntry"> | string
    resource?: StringWithAggregatesFilter<"AuditEntry"> | string
    resourceId?: StringNullableWithAggregatesFilter<"AuditEntry"> | string | null
    details?: StringWithAggregatesFilter<"AuditEntry"> | string
    severity?: StringWithAggregatesFilter<"AuditEntry"> | string
    ipAddress?: StringWithAggregatesFilter<"AuditEntry"> | string
    userAgent?: StringNullableWithAggregatesFilter<"AuditEntry"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"AuditEntry"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    name?: string | null
    password: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Token?: TokenCreateNestedManyWithoutUserInput
    AuditEntry?: AuditEntryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    name?: string | null
    password: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
    AuditEntry?: AuditEntryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Token?: TokenUpdateManyWithoutUserNestedInput
    AuditEntry?: AuditEntryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Token?: TokenUncheckedUpdateManyWithoutUserNestedInput
    AuditEntry?: AuditEntryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    name?: string | null
    password: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenCreateInput = {
    token: string
    type: $Enums.TokenType
    expires: Date | string
    blacklisted: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTokenInput
  }

  export type TokenUncheckedCreateInput = {
    id?: number
    token: string
    type: $Enums.TokenType
    expires: Date | string
    blacklisted: boolean
    createdAt?: Date | string
    userId: number
  }

  export type TokenUpdateInput = {
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type TokenCreateManyInput = {
    id?: number
    token: string
    type: $Enums.TokenType
    expires: Date | string
    blacklisted: boolean
    createdAt?: Date | string
    userId: number
  }

  export type TokenUpdateManyMutationInput = {
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ClientCreateInput = {
    id?: string
    name: string
    accountIds?: ClientCreateaccountIdsInput | string[]
    relationshipManager: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    StatementFile?: StatementFileCreateNestedManyWithoutClientInput
    Analysis?: AnalysisCreateNestedManyWithoutClientInput
    Report?: ReportCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    id?: string
    name: string
    accountIds?: ClientCreateaccountIdsInput | string[]
    relationshipManager: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    StatementFile?: StatementFileUncheckedCreateNestedManyWithoutClientInput
    Analysis?: AnalysisUncheckedCreateNestedManyWithoutClientInput
    Report?: ReportUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountIds?: ClientUpdateaccountIdsInput | string[]
    relationshipManager?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    StatementFile?: StatementFileUpdateManyWithoutClientNestedInput
    Analysis?: AnalysisUpdateManyWithoutClientNestedInput
    Report?: ReportUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountIds?: ClientUpdateaccountIdsInput | string[]
    relationshipManager?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    StatementFile?: StatementFileUncheckedUpdateManyWithoutClientNestedInput
    Analysis?: AnalysisUncheckedUpdateManyWithoutClientNestedInput
    Report?: ReportUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyInput = {
    id?: string
    name: string
    accountIds?: ClientCreateaccountIdsInput | string[]
    relationshipManager: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountIds?: ClientUpdateaccountIdsInput | string[]
    relationshipManager?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountIds?: ClientUpdateaccountIdsInput | string[]
    relationshipManager?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatementFileCreateInput = {
    id?: string
    filename: string
    type: string
    size: number
    uploadedAt?: Date | string
    status?: string
    client: ClientCreateNestedOneWithoutStatementFileInput
    ParseResult?: ParseResultCreateNestedOneWithoutStatementFileInput
  }

  export type StatementFileUncheckedCreateInput = {
    id?: string
    filename: string
    type: string
    size: number
    uploadedAt?: Date | string
    status?: string
    clientId: string
    ParseResult?: ParseResultUncheckedCreateNestedOneWithoutStatementFileInput
  }

  export type StatementFileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    client?: ClientUpdateOneRequiredWithoutStatementFileNestedInput
    ParseResult?: ParseResultUpdateOneWithoutStatementFileNestedInput
  }

  export type StatementFileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    ParseResult?: ParseResultUncheckedUpdateOneWithoutStatementFileNestedInput
  }

  export type StatementFileCreateManyInput = {
    id?: string
    filename: string
    type: string
    size: number
    uploadedAt?: Date | string
    status?: string
    clientId: string
  }

  export type StatementFileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type StatementFileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
  }

  export type ParseResultCreateInput = {
    id?: string
    totalTransactions: number
    dateRangeStart: Date | string
    dateRangeEnd: Date | string
    accounts: JsonNullValueInput | InputJsonValue
    status: string
    errors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    statementFile: StatementFileCreateNestedOneWithoutParseResultInput
  }

  export type ParseResultUncheckedCreateInput = {
    id?: string
    statementFileId: string
    totalTransactions: number
    dateRangeStart: Date | string
    dateRangeEnd: Date | string
    accounts: JsonNullValueInput | InputJsonValue
    status: string
    errors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ParseResultUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalTransactions?: IntFieldUpdateOperationsInput | number
    dateRangeStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateRangeEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    errors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statementFile?: StatementFileUpdateOneRequiredWithoutParseResultNestedInput
  }

  export type ParseResultUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    statementFileId?: StringFieldUpdateOperationsInput | string
    totalTransactions?: IntFieldUpdateOperationsInput | number
    dateRangeStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateRangeEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    errors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParseResultCreateManyInput = {
    id?: string
    statementFileId: string
    totalTransactions: number
    dateRangeStart: Date | string
    dateRangeEnd: Date | string
    accounts: JsonNullValueInput | InputJsonValue
    status: string
    errors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ParseResultUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalTransactions?: IntFieldUpdateOperationsInput | number
    dateRangeStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateRangeEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    errors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParseResultUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    statementFileId?: StringFieldUpdateOperationsInput | string
    totalTransactions?: IntFieldUpdateOperationsInput | number
    dateRangeStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateRangeEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    errors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalysisCreateInput = {
    id?: string
    statementFileIds?: AnalysisCreatestatementFileIdsInput | string[]
    createdAt?: Date | string
    status?: string
    summary: JsonNullValueInput | InputJsonValue
    liquidityMetrics: JsonNullValueInput | InputJsonValue
    spendingBreakdown: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis: JsonNullValueInput | InputJsonValue
    client: ClientCreateNestedOneWithoutAnalysisInput
    Recommendation?: RecommendationCreateNestedManyWithoutAnalysisInput
    Report?: ReportCreateNestedManyWithoutAnalysisInput
  }

  export type AnalysisUncheckedCreateInput = {
    id?: string
    clientId: string
    statementFileIds?: AnalysisCreatestatementFileIdsInput | string[]
    createdAt?: Date | string
    status?: string
    summary: JsonNullValueInput | InputJsonValue
    liquidityMetrics: JsonNullValueInput | InputJsonValue
    spendingBreakdown: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis: JsonNullValueInput | InputJsonValue
    Recommendation?: RecommendationUncheckedCreateNestedManyWithoutAnalysisInput
    Report?: ReportUncheckedCreateNestedManyWithoutAnalysisInput
  }

  export type AnalysisUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    statementFileIds?: AnalysisUpdatestatementFileIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    summary?: JsonNullValueInput | InputJsonValue
    liquidityMetrics?: JsonNullValueInput | InputJsonValue
    spendingBreakdown?: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis?: JsonNullValueInput | InputJsonValue
    client?: ClientUpdateOneRequiredWithoutAnalysisNestedInput
    Recommendation?: RecommendationUpdateManyWithoutAnalysisNestedInput
    Report?: ReportUpdateManyWithoutAnalysisNestedInput
  }

  export type AnalysisUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    statementFileIds?: AnalysisUpdatestatementFileIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    summary?: JsonNullValueInput | InputJsonValue
    liquidityMetrics?: JsonNullValueInput | InputJsonValue
    spendingBreakdown?: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis?: JsonNullValueInput | InputJsonValue
    Recommendation?: RecommendationUncheckedUpdateManyWithoutAnalysisNestedInput
    Report?: ReportUncheckedUpdateManyWithoutAnalysisNestedInput
  }

  export type AnalysisCreateManyInput = {
    id?: string
    clientId: string
    statementFileIds?: AnalysisCreatestatementFileIdsInput | string[]
    createdAt?: Date | string
    status?: string
    summary: JsonNullValueInput | InputJsonValue
    liquidityMetrics: JsonNullValueInput | InputJsonValue
    spendingBreakdown: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis: JsonNullValueInput | InputJsonValue
  }

  export type AnalysisUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    statementFileIds?: AnalysisUpdatestatementFileIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    summary?: JsonNullValueInput | InputJsonValue
    liquidityMetrics?: JsonNullValueInput | InputJsonValue
    spendingBreakdown?: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis?: JsonNullValueInput | InputJsonValue
  }

  export type AnalysisUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    statementFileIds?: AnalysisUpdatestatementFileIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    summary?: JsonNullValueInput | InputJsonValue
    liquidityMetrics?: JsonNullValueInput | InputJsonValue
    spendingBreakdown?: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis?: JsonNullValueInput | InputJsonValue
  }

  export type TreasuryProductCreateInput = {
    id?: string
    name: string
    category: string
    description: string
    features?: TreasuryProductCreatefeaturesInput | string[]
    eligibilityRules: JsonNullValueInput | InputJsonValue
    benefits: JsonNullValueInput | InputJsonValue
    pricing: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    Recommendation?: RecommendationCreateNestedManyWithoutProductInput
  }

  export type TreasuryProductUncheckedCreateInput = {
    id?: string
    name: string
    category: string
    description: string
    features?: TreasuryProductCreatefeaturesInput | string[]
    eligibilityRules: JsonNullValueInput | InputJsonValue
    benefits: JsonNullValueInput | InputJsonValue
    pricing: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    Recommendation?: RecommendationUncheckedCreateNestedManyWithoutProductInput
  }

  export type TreasuryProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    features?: TreasuryProductUpdatefeaturesInput | string[]
    eligibilityRules?: JsonNullValueInput | InputJsonValue
    benefits?: JsonNullValueInput | InputJsonValue
    pricing?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    Recommendation?: RecommendationUpdateManyWithoutProductNestedInput
  }

  export type TreasuryProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    features?: TreasuryProductUpdatefeaturesInput | string[]
    eligibilityRules?: JsonNullValueInput | InputJsonValue
    benefits?: JsonNullValueInput | InputJsonValue
    pricing?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    Recommendation?: RecommendationUncheckedUpdateManyWithoutProductNestedInput
  }

  export type TreasuryProductCreateManyInput = {
    id?: string
    name: string
    category: string
    description: string
    features?: TreasuryProductCreatefeaturesInput | string[]
    eligibilityRules: JsonNullValueInput | InputJsonValue
    benefits: JsonNullValueInput | InputJsonValue
    pricing: JsonNullValueInput | InputJsonValue
    isActive?: boolean
  }

  export type TreasuryProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    features?: TreasuryProductUpdatefeaturesInput | string[]
    eligibilityRules?: JsonNullValueInput | InputJsonValue
    benefits?: JsonNullValueInput | InputJsonValue
    pricing?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TreasuryProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    features?: TreasuryProductUpdatefeaturesInput | string[]
    eligibilityRules?: JsonNullValueInput | InputJsonValue
    benefits?: JsonNullValueInput | InputJsonValue
    pricing?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RecommendationCreateInput = {
    id?: string
    priority: string
    rationale: string
    dataPoints?: RecommendationCreatedataPointsInput | string[]
    benefitProjection: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    approvedBy?: string | null
    approvedAt?: Date | string | null
    analysis: AnalysisCreateNestedOneWithoutRecommendationInput
    product: TreasuryProductCreateNestedOneWithoutRecommendationInput
  }

  export type RecommendationUncheckedCreateInput = {
    id?: string
    analysisId: string
    productId: string
    priority: string
    rationale: string
    dataPoints?: RecommendationCreatedataPointsInput | string[]
    benefitProjection: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    approvedBy?: string | null
    approvedAt?: Date | string | null
  }

  export type RecommendationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    rationale?: StringFieldUpdateOperationsInput | string
    dataPoints?: RecommendationUpdatedataPointsInput | string[]
    benefitProjection?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysis?: AnalysisUpdateOneRequiredWithoutRecommendationNestedInput
    product?: TreasuryProductUpdateOneRequiredWithoutRecommendationNestedInput
  }

  export type RecommendationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    rationale?: StringFieldUpdateOperationsInput | string
    dataPoints?: RecommendationUpdatedataPointsInput | string[]
    benefitProjection?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RecommendationCreateManyInput = {
    id?: string
    analysisId: string
    productId: string
    priority: string
    rationale: string
    dataPoints?: RecommendationCreatedataPointsInput | string[]
    benefitProjection: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    approvedBy?: string | null
    approvedAt?: Date | string | null
  }

  export type RecommendationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    rationale?: StringFieldUpdateOperationsInput | string
    dataPoints?: RecommendationUpdatedataPointsInput | string[]
    benefitProjection?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RecommendationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    rationale?: StringFieldUpdateOperationsInput | string
    dataPoints?: RecommendationUpdatedataPointsInput | string[]
    benefitProjection?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReportCreateInput = {
    id?: string
    title: string
    format: string
    template: string
    createdAt?: Date | string
    createdBy: string
    fileSize?: number
    downloadCount?: number
    status?: string
    filePath?: string | null
    analysis: AnalysisCreateNestedOneWithoutReportInput
    client: ClientCreateNestedOneWithoutReportInput
  }

  export type ReportUncheckedCreateInput = {
    id?: string
    title: string
    analysisId: string
    clientId: string
    format: string
    template: string
    createdAt?: Date | string
    createdBy: string
    fileSize?: number
    downloadCount?: number
    status?: string
    filePath?: string | null
  }

  export type ReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    downloadCount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    analysis?: AnalysisUpdateOneRequiredWithoutReportNestedInput
    client?: ClientUpdateOneRequiredWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    analysisId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    downloadCount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReportCreateManyInput = {
    id?: string
    title: string
    analysisId: string
    clientId: string
    format: string
    template: string
    createdAt?: Date | string
    createdBy: string
    fileSize?: number
    downloadCount?: number
    status?: string
    filePath?: string | null
  }

  export type ReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    downloadCount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    analysisId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    downloadCount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SystemConfigCreateInput = {
    id?: string
    configKey: string
    configValue: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    updatedBy: string
  }

  export type SystemConfigUncheckedCreateInput = {
    id?: string
    configKey: string
    configValue: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    updatedBy: string
  }

  export type SystemConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    configKey?: StringFieldUpdateOperationsInput | string
    configValue?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: StringFieldUpdateOperationsInput | string
  }

  export type SystemConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    configKey?: StringFieldUpdateOperationsInput | string
    configValue?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: StringFieldUpdateOperationsInput | string
  }

  export type SystemConfigCreateManyInput = {
    id?: string
    configKey: string
    configValue: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    updatedBy: string
  }

  export type SystemConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    configKey?: StringFieldUpdateOperationsInput | string
    configValue?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: StringFieldUpdateOperationsInput | string
  }

  export type SystemConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    configKey?: StringFieldUpdateOperationsInput | string
    configValue?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: StringFieldUpdateOperationsInput | string
  }

  export type AuditEntryCreateInput = {
    id?: string
    userName: string
    userEmail: string
    action: string
    resource: string
    resourceId?: string | null
    details: string
    severity: string
    ipAddress: string
    userAgent?: string | null
    timestamp?: Date | string
    user: UserCreateNestedOneWithoutAuditEntryInput
  }

  export type AuditEntryUncheckedCreateInput = {
    id?: string
    userId: number
    userName: string
    userEmail: string
    action: string
    resource: string
    resourceId?: string | null
    details: string
    severity: string
    ipAddress: string
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type AuditEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAuditEntryNestedInput
  }

  export type AuditEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    userName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEntryCreateManyInput = {
    id?: string
    userId: number
    userName: string
    userEmail: string
    action: string
    resource: string
    resourceId?: string | null
    details: string
    severity: string
    ipAddress: string
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type AuditEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    userName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TokenListRelationFilter = {
    every?: TokenWhereInput
    some?: TokenWhereInput
    none?: TokenWhereInput
  }

  export type AuditEntryListRelationFilter = {
    every?: AuditEntryWhereInput
    some?: AuditEntryWhereInput
    none?: AuditEntryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumTokenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeFilter<$PrismaModel> | $Enums.TokenType
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires?: SortOrder
    blacklisted?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type TokenAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type TokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires?: SortOrder
    blacklisted?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type TokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires?: SortOrder
    blacklisted?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type TokenSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type EnumTokenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel> | $Enums.TokenType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenTypeFilter<$PrismaModel>
    _max?: NestedEnumTokenTypeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type StatementFileListRelationFilter = {
    every?: StatementFileWhereInput
    some?: StatementFileWhereInput
    none?: StatementFileWhereInput
  }

  export type AnalysisListRelationFilter = {
    every?: AnalysisWhereInput
    some?: AnalysisWhereInput
    none?: AnalysisWhereInput
  }

  export type ReportListRelationFilter = {
    every?: ReportWhereInput
    some?: ReportWhereInput
    none?: ReportWhereInput
  }

  export type StatementFileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnalysisOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    accountIds?: SortOrder
    relationshipManager?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    relationshipManager?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    relationshipManager?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientScalarRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type ParseResultNullableScalarRelationFilter = {
    is?: ParseResultWhereInput | null
    isNot?: ParseResultWhereInput | null
  }

  export type StatementFileCountOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    type?: SortOrder
    size?: SortOrder
    uploadedAt?: SortOrder
    status?: SortOrder
    clientId?: SortOrder
  }

  export type StatementFileAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type StatementFileMaxOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    type?: SortOrder
    size?: SortOrder
    uploadedAt?: SortOrder
    status?: SortOrder
    clientId?: SortOrder
  }

  export type StatementFileMinOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    type?: SortOrder
    size?: SortOrder
    uploadedAt?: SortOrder
    status?: SortOrder
    clientId?: SortOrder
  }

  export type StatementFileSumOrderByAggregateInput = {
    size?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StatementFileScalarRelationFilter = {
    is?: StatementFileWhereInput
    isNot?: StatementFileWhereInput
  }

  export type ParseResultCountOrderByAggregateInput = {
    id?: SortOrder
    statementFileId?: SortOrder
    totalTransactions?: SortOrder
    dateRangeStart?: SortOrder
    dateRangeEnd?: SortOrder
    accounts?: SortOrder
    status?: SortOrder
    errors?: SortOrder
    createdAt?: SortOrder
  }

  export type ParseResultAvgOrderByAggregateInput = {
    totalTransactions?: SortOrder
  }

  export type ParseResultMaxOrderByAggregateInput = {
    id?: SortOrder
    statementFileId?: SortOrder
    totalTransactions?: SortOrder
    dateRangeStart?: SortOrder
    dateRangeEnd?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ParseResultMinOrderByAggregateInput = {
    id?: SortOrder
    statementFileId?: SortOrder
    totalTransactions?: SortOrder
    dateRangeStart?: SortOrder
    dateRangeEnd?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ParseResultSumOrderByAggregateInput = {
    totalTransactions?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type RecommendationListRelationFilter = {
    every?: RecommendationWhereInput
    some?: RecommendationWhereInput
    none?: RecommendationWhereInput
  }

  export type RecommendationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnalysisCountOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    statementFileIds?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
    summary?: SortOrder
    liquidityMetrics?: SortOrder
    spendingBreakdown?: SortOrder
    idleBalanceAnalysis?: SortOrder
  }

  export type AnalysisMaxOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
  }

  export type AnalysisMinOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
  }

  export type TreasuryProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    features?: SortOrder
    eligibilityRules?: SortOrder
    benefits?: SortOrder
    pricing?: SortOrder
    isActive?: SortOrder
  }

  export type TreasuryProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
  }

  export type TreasuryProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AnalysisScalarRelationFilter = {
    is?: AnalysisWhereInput
    isNot?: AnalysisWhereInput
  }

  export type TreasuryProductScalarRelationFilter = {
    is?: TreasuryProductWhereInput
    isNot?: TreasuryProductWhereInput
  }

  export type RecommendationCountOrderByAggregateInput = {
    id?: SortOrder
    analysisId?: SortOrder
    productId?: SortOrder
    priority?: SortOrder
    rationale?: SortOrder
    dataPoints?: SortOrder
    benefitProjection?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    approvedBy?: SortOrder
    approvedAt?: SortOrder
  }

  export type RecommendationMaxOrderByAggregateInput = {
    id?: SortOrder
    analysisId?: SortOrder
    productId?: SortOrder
    priority?: SortOrder
    rationale?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    approvedBy?: SortOrder
    approvedAt?: SortOrder
  }

  export type RecommendationMinOrderByAggregateInput = {
    id?: SortOrder
    analysisId?: SortOrder
    productId?: SortOrder
    priority?: SortOrder
    rationale?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    approvedBy?: SortOrder
    approvedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    analysisId?: SortOrder
    clientId?: SortOrder
    format?: SortOrder
    template?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    fileSize?: SortOrder
    downloadCount?: SortOrder
    status?: SortOrder
    filePath?: SortOrder
  }

  export type ReportAvgOrderByAggregateInput = {
    fileSize?: SortOrder
    downloadCount?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    analysisId?: SortOrder
    clientId?: SortOrder
    format?: SortOrder
    template?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    fileSize?: SortOrder
    downloadCount?: SortOrder
    status?: SortOrder
    filePath?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    analysisId?: SortOrder
    clientId?: SortOrder
    format?: SortOrder
    template?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    fileSize?: SortOrder
    downloadCount?: SortOrder
    status?: SortOrder
    filePath?: SortOrder
  }

  export type ReportSumOrderByAggregateInput = {
    fileSize?: SortOrder
    downloadCount?: SortOrder
  }

  export type SystemConfigCountOrderByAggregateInput = {
    id?: SortOrder
    configKey?: SortOrder
    configValue?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type SystemConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    configKey?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type SystemConfigMinOrderByAggregateInput = {
    id?: SortOrder
    configKey?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type AuditEntryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    userEmail?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    details?: SortOrder
    severity?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditEntryAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type AuditEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    userEmail?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    details?: SortOrder
    severity?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditEntryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    userEmail?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    details?: SortOrder
    severity?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditEntrySumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type TokenCreateNestedManyWithoutUserInput = {
    create?: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput> | TokenCreateWithoutUserInput[] | TokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenCreateOrConnectWithoutUserInput | TokenCreateOrConnectWithoutUserInput[]
    createMany?: TokenCreateManyUserInputEnvelope
    connect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
  }

  export type AuditEntryCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditEntryCreateWithoutUserInput, AuditEntryUncheckedCreateWithoutUserInput> | AuditEntryCreateWithoutUserInput[] | AuditEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditEntryCreateOrConnectWithoutUserInput | AuditEntryCreateOrConnectWithoutUserInput[]
    createMany?: AuditEntryCreateManyUserInputEnvelope
    connect?: AuditEntryWhereUniqueInput | AuditEntryWhereUniqueInput[]
  }

  export type TokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput> | TokenCreateWithoutUserInput[] | TokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenCreateOrConnectWithoutUserInput | TokenCreateOrConnectWithoutUserInput[]
    createMany?: TokenCreateManyUserInputEnvelope
    connect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
  }

  export type AuditEntryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditEntryCreateWithoutUserInput, AuditEntryUncheckedCreateWithoutUserInput> | AuditEntryCreateWithoutUserInput[] | AuditEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditEntryCreateOrConnectWithoutUserInput | AuditEntryCreateOrConnectWithoutUserInput[]
    createMany?: AuditEntryCreateManyUserInputEnvelope
    connect?: AuditEntryWhereUniqueInput | AuditEntryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput> | TokenCreateWithoutUserInput[] | TokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenCreateOrConnectWithoutUserInput | TokenCreateOrConnectWithoutUserInput[]
    upsert?: TokenUpsertWithWhereUniqueWithoutUserInput | TokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TokenCreateManyUserInputEnvelope
    set?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    disconnect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    delete?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    connect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    update?: TokenUpdateWithWhereUniqueWithoutUserInput | TokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TokenUpdateManyWithWhereWithoutUserInput | TokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TokenScalarWhereInput | TokenScalarWhereInput[]
  }

  export type AuditEntryUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditEntryCreateWithoutUserInput, AuditEntryUncheckedCreateWithoutUserInput> | AuditEntryCreateWithoutUserInput[] | AuditEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditEntryCreateOrConnectWithoutUserInput | AuditEntryCreateOrConnectWithoutUserInput[]
    upsert?: AuditEntryUpsertWithWhereUniqueWithoutUserInput | AuditEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditEntryCreateManyUserInputEnvelope
    set?: AuditEntryWhereUniqueInput | AuditEntryWhereUniqueInput[]
    disconnect?: AuditEntryWhereUniqueInput | AuditEntryWhereUniqueInput[]
    delete?: AuditEntryWhereUniqueInput | AuditEntryWhereUniqueInput[]
    connect?: AuditEntryWhereUniqueInput | AuditEntryWhereUniqueInput[]
    update?: AuditEntryUpdateWithWhereUniqueWithoutUserInput | AuditEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditEntryUpdateManyWithWhereWithoutUserInput | AuditEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditEntryScalarWhereInput | AuditEntryScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput> | TokenCreateWithoutUserInput[] | TokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenCreateOrConnectWithoutUserInput | TokenCreateOrConnectWithoutUserInput[]
    upsert?: TokenUpsertWithWhereUniqueWithoutUserInput | TokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TokenCreateManyUserInputEnvelope
    set?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    disconnect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    delete?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    connect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    update?: TokenUpdateWithWhereUniqueWithoutUserInput | TokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TokenUpdateManyWithWhereWithoutUserInput | TokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TokenScalarWhereInput | TokenScalarWhereInput[]
  }

  export type AuditEntryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditEntryCreateWithoutUserInput, AuditEntryUncheckedCreateWithoutUserInput> | AuditEntryCreateWithoutUserInput[] | AuditEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditEntryCreateOrConnectWithoutUserInput | AuditEntryCreateOrConnectWithoutUserInput[]
    upsert?: AuditEntryUpsertWithWhereUniqueWithoutUserInput | AuditEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditEntryCreateManyUserInputEnvelope
    set?: AuditEntryWhereUniqueInput | AuditEntryWhereUniqueInput[]
    disconnect?: AuditEntryWhereUniqueInput | AuditEntryWhereUniqueInput[]
    delete?: AuditEntryWhereUniqueInput | AuditEntryWhereUniqueInput[]
    connect?: AuditEntryWhereUniqueInput | AuditEntryWhereUniqueInput[]
    update?: AuditEntryUpdateWithWhereUniqueWithoutUserInput | AuditEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditEntryUpdateManyWithWhereWithoutUserInput | AuditEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditEntryScalarWhereInput | AuditEntryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTokenInput = {
    create?: XOR<UserCreateWithoutTokenInput, UserUncheckedCreateWithoutTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutTokenInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTokenTypeFieldUpdateOperationsInput = {
    set?: $Enums.TokenType
  }

  export type UserUpdateOneRequiredWithoutTokenNestedInput = {
    create?: XOR<UserCreateWithoutTokenInput, UserUncheckedCreateWithoutTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutTokenInput
    upsert?: UserUpsertWithoutTokenInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTokenInput, UserUpdateWithoutTokenInput>, UserUncheckedUpdateWithoutTokenInput>
  }

  export type ClientCreateaccountIdsInput = {
    set: string[]
  }

  export type StatementFileCreateNestedManyWithoutClientInput = {
    create?: XOR<StatementFileCreateWithoutClientInput, StatementFileUncheckedCreateWithoutClientInput> | StatementFileCreateWithoutClientInput[] | StatementFileUncheckedCreateWithoutClientInput[]
    connectOrCreate?: StatementFileCreateOrConnectWithoutClientInput | StatementFileCreateOrConnectWithoutClientInput[]
    createMany?: StatementFileCreateManyClientInputEnvelope
    connect?: StatementFileWhereUniqueInput | StatementFileWhereUniqueInput[]
  }

  export type AnalysisCreateNestedManyWithoutClientInput = {
    create?: XOR<AnalysisCreateWithoutClientInput, AnalysisUncheckedCreateWithoutClientInput> | AnalysisCreateWithoutClientInput[] | AnalysisUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AnalysisCreateOrConnectWithoutClientInput | AnalysisCreateOrConnectWithoutClientInput[]
    createMany?: AnalysisCreateManyClientInputEnvelope
    connect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
  }

  export type ReportCreateNestedManyWithoutClientInput = {
    create?: XOR<ReportCreateWithoutClientInput, ReportUncheckedCreateWithoutClientInput> | ReportCreateWithoutClientInput[] | ReportUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutClientInput | ReportCreateOrConnectWithoutClientInput[]
    createMany?: ReportCreateManyClientInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type StatementFileUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<StatementFileCreateWithoutClientInput, StatementFileUncheckedCreateWithoutClientInput> | StatementFileCreateWithoutClientInput[] | StatementFileUncheckedCreateWithoutClientInput[]
    connectOrCreate?: StatementFileCreateOrConnectWithoutClientInput | StatementFileCreateOrConnectWithoutClientInput[]
    createMany?: StatementFileCreateManyClientInputEnvelope
    connect?: StatementFileWhereUniqueInput | StatementFileWhereUniqueInput[]
  }

  export type AnalysisUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<AnalysisCreateWithoutClientInput, AnalysisUncheckedCreateWithoutClientInput> | AnalysisCreateWithoutClientInput[] | AnalysisUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AnalysisCreateOrConnectWithoutClientInput | AnalysisCreateOrConnectWithoutClientInput[]
    createMany?: AnalysisCreateManyClientInputEnvelope
    connect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<ReportCreateWithoutClientInput, ReportUncheckedCreateWithoutClientInput> | ReportCreateWithoutClientInput[] | ReportUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutClientInput | ReportCreateOrConnectWithoutClientInput[]
    createMany?: ReportCreateManyClientInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type ClientUpdateaccountIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type StatementFileUpdateManyWithoutClientNestedInput = {
    create?: XOR<StatementFileCreateWithoutClientInput, StatementFileUncheckedCreateWithoutClientInput> | StatementFileCreateWithoutClientInput[] | StatementFileUncheckedCreateWithoutClientInput[]
    connectOrCreate?: StatementFileCreateOrConnectWithoutClientInput | StatementFileCreateOrConnectWithoutClientInput[]
    upsert?: StatementFileUpsertWithWhereUniqueWithoutClientInput | StatementFileUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: StatementFileCreateManyClientInputEnvelope
    set?: StatementFileWhereUniqueInput | StatementFileWhereUniqueInput[]
    disconnect?: StatementFileWhereUniqueInput | StatementFileWhereUniqueInput[]
    delete?: StatementFileWhereUniqueInput | StatementFileWhereUniqueInput[]
    connect?: StatementFileWhereUniqueInput | StatementFileWhereUniqueInput[]
    update?: StatementFileUpdateWithWhereUniqueWithoutClientInput | StatementFileUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: StatementFileUpdateManyWithWhereWithoutClientInput | StatementFileUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: StatementFileScalarWhereInput | StatementFileScalarWhereInput[]
  }

  export type AnalysisUpdateManyWithoutClientNestedInput = {
    create?: XOR<AnalysisCreateWithoutClientInput, AnalysisUncheckedCreateWithoutClientInput> | AnalysisCreateWithoutClientInput[] | AnalysisUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AnalysisCreateOrConnectWithoutClientInput | AnalysisCreateOrConnectWithoutClientInput[]
    upsert?: AnalysisUpsertWithWhereUniqueWithoutClientInput | AnalysisUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: AnalysisCreateManyClientInputEnvelope
    set?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    disconnect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    delete?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    connect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    update?: AnalysisUpdateWithWhereUniqueWithoutClientInput | AnalysisUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: AnalysisUpdateManyWithWhereWithoutClientInput | AnalysisUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: AnalysisScalarWhereInput | AnalysisScalarWhereInput[]
  }

  export type ReportUpdateManyWithoutClientNestedInput = {
    create?: XOR<ReportCreateWithoutClientInput, ReportUncheckedCreateWithoutClientInput> | ReportCreateWithoutClientInput[] | ReportUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutClientInput | ReportCreateOrConnectWithoutClientInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutClientInput | ReportUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: ReportCreateManyClientInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutClientInput | ReportUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutClientInput | ReportUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type StatementFileUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<StatementFileCreateWithoutClientInput, StatementFileUncheckedCreateWithoutClientInput> | StatementFileCreateWithoutClientInput[] | StatementFileUncheckedCreateWithoutClientInput[]
    connectOrCreate?: StatementFileCreateOrConnectWithoutClientInput | StatementFileCreateOrConnectWithoutClientInput[]
    upsert?: StatementFileUpsertWithWhereUniqueWithoutClientInput | StatementFileUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: StatementFileCreateManyClientInputEnvelope
    set?: StatementFileWhereUniqueInput | StatementFileWhereUniqueInput[]
    disconnect?: StatementFileWhereUniqueInput | StatementFileWhereUniqueInput[]
    delete?: StatementFileWhereUniqueInput | StatementFileWhereUniqueInput[]
    connect?: StatementFileWhereUniqueInput | StatementFileWhereUniqueInput[]
    update?: StatementFileUpdateWithWhereUniqueWithoutClientInput | StatementFileUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: StatementFileUpdateManyWithWhereWithoutClientInput | StatementFileUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: StatementFileScalarWhereInput | StatementFileScalarWhereInput[]
  }

  export type AnalysisUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<AnalysisCreateWithoutClientInput, AnalysisUncheckedCreateWithoutClientInput> | AnalysisCreateWithoutClientInput[] | AnalysisUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AnalysisCreateOrConnectWithoutClientInput | AnalysisCreateOrConnectWithoutClientInput[]
    upsert?: AnalysisUpsertWithWhereUniqueWithoutClientInput | AnalysisUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: AnalysisCreateManyClientInputEnvelope
    set?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    disconnect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    delete?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    connect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    update?: AnalysisUpdateWithWhereUniqueWithoutClientInput | AnalysisUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: AnalysisUpdateManyWithWhereWithoutClientInput | AnalysisUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: AnalysisScalarWhereInput | AnalysisScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<ReportCreateWithoutClientInput, ReportUncheckedCreateWithoutClientInput> | ReportCreateWithoutClientInput[] | ReportUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutClientInput | ReportCreateOrConnectWithoutClientInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutClientInput | ReportUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: ReportCreateManyClientInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutClientInput | ReportUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutClientInput | ReportUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ClientCreateNestedOneWithoutStatementFileInput = {
    create?: XOR<ClientCreateWithoutStatementFileInput, ClientUncheckedCreateWithoutStatementFileInput>
    connectOrCreate?: ClientCreateOrConnectWithoutStatementFileInput
    connect?: ClientWhereUniqueInput
  }

  export type ParseResultCreateNestedOneWithoutStatementFileInput = {
    create?: XOR<ParseResultCreateWithoutStatementFileInput, ParseResultUncheckedCreateWithoutStatementFileInput>
    connectOrCreate?: ParseResultCreateOrConnectWithoutStatementFileInput
    connect?: ParseResultWhereUniqueInput
  }

  export type ParseResultUncheckedCreateNestedOneWithoutStatementFileInput = {
    create?: XOR<ParseResultCreateWithoutStatementFileInput, ParseResultUncheckedCreateWithoutStatementFileInput>
    connectOrCreate?: ParseResultCreateOrConnectWithoutStatementFileInput
    connect?: ParseResultWhereUniqueInput
  }

  export type ClientUpdateOneRequiredWithoutStatementFileNestedInput = {
    create?: XOR<ClientCreateWithoutStatementFileInput, ClientUncheckedCreateWithoutStatementFileInput>
    connectOrCreate?: ClientCreateOrConnectWithoutStatementFileInput
    upsert?: ClientUpsertWithoutStatementFileInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutStatementFileInput, ClientUpdateWithoutStatementFileInput>, ClientUncheckedUpdateWithoutStatementFileInput>
  }

  export type ParseResultUpdateOneWithoutStatementFileNestedInput = {
    create?: XOR<ParseResultCreateWithoutStatementFileInput, ParseResultUncheckedCreateWithoutStatementFileInput>
    connectOrCreate?: ParseResultCreateOrConnectWithoutStatementFileInput
    upsert?: ParseResultUpsertWithoutStatementFileInput
    disconnect?: ParseResultWhereInput | boolean
    delete?: ParseResultWhereInput | boolean
    connect?: ParseResultWhereUniqueInput
    update?: XOR<XOR<ParseResultUpdateToOneWithWhereWithoutStatementFileInput, ParseResultUpdateWithoutStatementFileInput>, ParseResultUncheckedUpdateWithoutStatementFileInput>
  }

  export type ParseResultUncheckedUpdateOneWithoutStatementFileNestedInput = {
    create?: XOR<ParseResultCreateWithoutStatementFileInput, ParseResultUncheckedCreateWithoutStatementFileInput>
    connectOrCreate?: ParseResultCreateOrConnectWithoutStatementFileInput
    upsert?: ParseResultUpsertWithoutStatementFileInput
    disconnect?: ParseResultWhereInput | boolean
    delete?: ParseResultWhereInput | boolean
    connect?: ParseResultWhereUniqueInput
    update?: XOR<XOR<ParseResultUpdateToOneWithWhereWithoutStatementFileInput, ParseResultUpdateWithoutStatementFileInput>, ParseResultUncheckedUpdateWithoutStatementFileInput>
  }

  export type StatementFileCreateNestedOneWithoutParseResultInput = {
    create?: XOR<StatementFileCreateWithoutParseResultInput, StatementFileUncheckedCreateWithoutParseResultInput>
    connectOrCreate?: StatementFileCreateOrConnectWithoutParseResultInput
    connect?: StatementFileWhereUniqueInput
  }

  export type StatementFileUpdateOneRequiredWithoutParseResultNestedInput = {
    create?: XOR<StatementFileCreateWithoutParseResultInput, StatementFileUncheckedCreateWithoutParseResultInput>
    connectOrCreate?: StatementFileCreateOrConnectWithoutParseResultInput
    upsert?: StatementFileUpsertWithoutParseResultInput
    connect?: StatementFileWhereUniqueInput
    update?: XOR<XOR<StatementFileUpdateToOneWithWhereWithoutParseResultInput, StatementFileUpdateWithoutParseResultInput>, StatementFileUncheckedUpdateWithoutParseResultInput>
  }

  export type AnalysisCreatestatementFileIdsInput = {
    set: string[]
  }

  export type ClientCreateNestedOneWithoutAnalysisInput = {
    create?: XOR<ClientCreateWithoutAnalysisInput, ClientUncheckedCreateWithoutAnalysisInput>
    connectOrCreate?: ClientCreateOrConnectWithoutAnalysisInput
    connect?: ClientWhereUniqueInput
  }

  export type RecommendationCreateNestedManyWithoutAnalysisInput = {
    create?: XOR<RecommendationCreateWithoutAnalysisInput, RecommendationUncheckedCreateWithoutAnalysisInput> | RecommendationCreateWithoutAnalysisInput[] | RecommendationUncheckedCreateWithoutAnalysisInput[]
    connectOrCreate?: RecommendationCreateOrConnectWithoutAnalysisInput | RecommendationCreateOrConnectWithoutAnalysisInput[]
    createMany?: RecommendationCreateManyAnalysisInputEnvelope
    connect?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
  }

  export type ReportCreateNestedManyWithoutAnalysisInput = {
    create?: XOR<ReportCreateWithoutAnalysisInput, ReportUncheckedCreateWithoutAnalysisInput> | ReportCreateWithoutAnalysisInput[] | ReportUncheckedCreateWithoutAnalysisInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutAnalysisInput | ReportCreateOrConnectWithoutAnalysisInput[]
    createMany?: ReportCreateManyAnalysisInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type RecommendationUncheckedCreateNestedManyWithoutAnalysisInput = {
    create?: XOR<RecommendationCreateWithoutAnalysisInput, RecommendationUncheckedCreateWithoutAnalysisInput> | RecommendationCreateWithoutAnalysisInput[] | RecommendationUncheckedCreateWithoutAnalysisInput[]
    connectOrCreate?: RecommendationCreateOrConnectWithoutAnalysisInput | RecommendationCreateOrConnectWithoutAnalysisInput[]
    createMany?: RecommendationCreateManyAnalysisInputEnvelope
    connect?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutAnalysisInput = {
    create?: XOR<ReportCreateWithoutAnalysisInput, ReportUncheckedCreateWithoutAnalysisInput> | ReportCreateWithoutAnalysisInput[] | ReportUncheckedCreateWithoutAnalysisInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutAnalysisInput | ReportCreateOrConnectWithoutAnalysisInput[]
    createMany?: ReportCreateManyAnalysisInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type AnalysisUpdatestatementFileIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ClientUpdateOneRequiredWithoutAnalysisNestedInput = {
    create?: XOR<ClientCreateWithoutAnalysisInput, ClientUncheckedCreateWithoutAnalysisInput>
    connectOrCreate?: ClientCreateOrConnectWithoutAnalysisInput
    upsert?: ClientUpsertWithoutAnalysisInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutAnalysisInput, ClientUpdateWithoutAnalysisInput>, ClientUncheckedUpdateWithoutAnalysisInput>
  }

  export type RecommendationUpdateManyWithoutAnalysisNestedInput = {
    create?: XOR<RecommendationCreateWithoutAnalysisInput, RecommendationUncheckedCreateWithoutAnalysisInput> | RecommendationCreateWithoutAnalysisInput[] | RecommendationUncheckedCreateWithoutAnalysisInput[]
    connectOrCreate?: RecommendationCreateOrConnectWithoutAnalysisInput | RecommendationCreateOrConnectWithoutAnalysisInput[]
    upsert?: RecommendationUpsertWithWhereUniqueWithoutAnalysisInput | RecommendationUpsertWithWhereUniqueWithoutAnalysisInput[]
    createMany?: RecommendationCreateManyAnalysisInputEnvelope
    set?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    disconnect?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    delete?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    connect?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    update?: RecommendationUpdateWithWhereUniqueWithoutAnalysisInput | RecommendationUpdateWithWhereUniqueWithoutAnalysisInput[]
    updateMany?: RecommendationUpdateManyWithWhereWithoutAnalysisInput | RecommendationUpdateManyWithWhereWithoutAnalysisInput[]
    deleteMany?: RecommendationScalarWhereInput | RecommendationScalarWhereInput[]
  }

  export type ReportUpdateManyWithoutAnalysisNestedInput = {
    create?: XOR<ReportCreateWithoutAnalysisInput, ReportUncheckedCreateWithoutAnalysisInput> | ReportCreateWithoutAnalysisInput[] | ReportUncheckedCreateWithoutAnalysisInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutAnalysisInput | ReportCreateOrConnectWithoutAnalysisInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutAnalysisInput | ReportUpsertWithWhereUniqueWithoutAnalysisInput[]
    createMany?: ReportCreateManyAnalysisInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutAnalysisInput | ReportUpdateWithWhereUniqueWithoutAnalysisInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutAnalysisInput | ReportUpdateManyWithWhereWithoutAnalysisInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type RecommendationUncheckedUpdateManyWithoutAnalysisNestedInput = {
    create?: XOR<RecommendationCreateWithoutAnalysisInput, RecommendationUncheckedCreateWithoutAnalysisInput> | RecommendationCreateWithoutAnalysisInput[] | RecommendationUncheckedCreateWithoutAnalysisInput[]
    connectOrCreate?: RecommendationCreateOrConnectWithoutAnalysisInput | RecommendationCreateOrConnectWithoutAnalysisInput[]
    upsert?: RecommendationUpsertWithWhereUniqueWithoutAnalysisInput | RecommendationUpsertWithWhereUniqueWithoutAnalysisInput[]
    createMany?: RecommendationCreateManyAnalysisInputEnvelope
    set?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    disconnect?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    delete?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    connect?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    update?: RecommendationUpdateWithWhereUniqueWithoutAnalysisInput | RecommendationUpdateWithWhereUniqueWithoutAnalysisInput[]
    updateMany?: RecommendationUpdateManyWithWhereWithoutAnalysisInput | RecommendationUpdateManyWithWhereWithoutAnalysisInput[]
    deleteMany?: RecommendationScalarWhereInput | RecommendationScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutAnalysisNestedInput = {
    create?: XOR<ReportCreateWithoutAnalysisInput, ReportUncheckedCreateWithoutAnalysisInput> | ReportCreateWithoutAnalysisInput[] | ReportUncheckedCreateWithoutAnalysisInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutAnalysisInput | ReportCreateOrConnectWithoutAnalysisInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutAnalysisInput | ReportUpsertWithWhereUniqueWithoutAnalysisInput[]
    createMany?: ReportCreateManyAnalysisInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutAnalysisInput | ReportUpdateWithWhereUniqueWithoutAnalysisInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutAnalysisInput | ReportUpdateManyWithWhereWithoutAnalysisInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type TreasuryProductCreatefeaturesInput = {
    set: string[]
  }

  export type RecommendationCreateNestedManyWithoutProductInput = {
    create?: XOR<RecommendationCreateWithoutProductInput, RecommendationUncheckedCreateWithoutProductInput> | RecommendationCreateWithoutProductInput[] | RecommendationUncheckedCreateWithoutProductInput[]
    connectOrCreate?: RecommendationCreateOrConnectWithoutProductInput | RecommendationCreateOrConnectWithoutProductInput[]
    createMany?: RecommendationCreateManyProductInputEnvelope
    connect?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
  }

  export type RecommendationUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<RecommendationCreateWithoutProductInput, RecommendationUncheckedCreateWithoutProductInput> | RecommendationCreateWithoutProductInput[] | RecommendationUncheckedCreateWithoutProductInput[]
    connectOrCreate?: RecommendationCreateOrConnectWithoutProductInput | RecommendationCreateOrConnectWithoutProductInput[]
    createMany?: RecommendationCreateManyProductInputEnvelope
    connect?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
  }

  export type TreasuryProductUpdatefeaturesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RecommendationUpdateManyWithoutProductNestedInput = {
    create?: XOR<RecommendationCreateWithoutProductInput, RecommendationUncheckedCreateWithoutProductInput> | RecommendationCreateWithoutProductInput[] | RecommendationUncheckedCreateWithoutProductInput[]
    connectOrCreate?: RecommendationCreateOrConnectWithoutProductInput | RecommendationCreateOrConnectWithoutProductInput[]
    upsert?: RecommendationUpsertWithWhereUniqueWithoutProductInput | RecommendationUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: RecommendationCreateManyProductInputEnvelope
    set?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    disconnect?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    delete?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    connect?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    update?: RecommendationUpdateWithWhereUniqueWithoutProductInput | RecommendationUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: RecommendationUpdateManyWithWhereWithoutProductInput | RecommendationUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: RecommendationScalarWhereInput | RecommendationScalarWhereInput[]
  }

  export type RecommendationUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<RecommendationCreateWithoutProductInput, RecommendationUncheckedCreateWithoutProductInput> | RecommendationCreateWithoutProductInput[] | RecommendationUncheckedCreateWithoutProductInput[]
    connectOrCreate?: RecommendationCreateOrConnectWithoutProductInput | RecommendationCreateOrConnectWithoutProductInput[]
    upsert?: RecommendationUpsertWithWhereUniqueWithoutProductInput | RecommendationUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: RecommendationCreateManyProductInputEnvelope
    set?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    disconnect?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    delete?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    connect?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    update?: RecommendationUpdateWithWhereUniqueWithoutProductInput | RecommendationUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: RecommendationUpdateManyWithWhereWithoutProductInput | RecommendationUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: RecommendationScalarWhereInput | RecommendationScalarWhereInput[]
  }

  export type RecommendationCreatedataPointsInput = {
    set: string[]
  }

  export type AnalysisCreateNestedOneWithoutRecommendationInput = {
    create?: XOR<AnalysisCreateWithoutRecommendationInput, AnalysisUncheckedCreateWithoutRecommendationInput>
    connectOrCreate?: AnalysisCreateOrConnectWithoutRecommendationInput
    connect?: AnalysisWhereUniqueInput
  }

  export type TreasuryProductCreateNestedOneWithoutRecommendationInput = {
    create?: XOR<TreasuryProductCreateWithoutRecommendationInput, TreasuryProductUncheckedCreateWithoutRecommendationInput>
    connectOrCreate?: TreasuryProductCreateOrConnectWithoutRecommendationInput
    connect?: TreasuryProductWhereUniqueInput
  }

  export type RecommendationUpdatedataPointsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AnalysisUpdateOneRequiredWithoutRecommendationNestedInput = {
    create?: XOR<AnalysisCreateWithoutRecommendationInput, AnalysisUncheckedCreateWithoutRecommendationInput>
    connectOrCreate?: AnalysisCreateOrConnectWithoutRecommendationInput
    upsert?: AnalysisUpsertWithoutRecommendationInput
    connect?: AnalysisWhereUniqueInput
    update?: XOR<XOR<AnalysisUpdateToOneWithWhereWithoutRecommendationInput, AnalysisUpdateWithoutRecommendationInput>, AnalysisUncheckedUpdateWithoutRecommendationInput>
  }

  export type TreasuryProductUpdateOneRequiredWithoutRecommendationNestedInput = {
    create?: XOR<TreasuryProductCreateWithoutRecommendationInput, TreasuryProductUncheckedCreateWithoutRecommendationInput>
    connectOrCreate?: TreasuryProductCreateOrConnectWithoutRecommendationInput
    upsert?: TreasuryProductUpsertWithoutRecommendationInput
    connect?: TreasuryProductWhereUniqueInput
    update?: XOR<XOR<TreasuryProductUpdateToOneWithWhereWithoutRecommendationInput, TreasuryProductUpdateWithoutRecommendationInput>, TreasuryProductUncheckedUpdateWithoutRecommendationInput>
  }

  export type AnalysisCreateNestedOneWithoutReportInput = {
    create?: XOR<AnalysisCreateWithoutReportInput, AnalysisUncheckedCreateWithoutReportInput>
    connectOrCreate?: AnalysisCreateOrConnectWithoutReportInput
    connect?: AnalysisWhereUniqueInput
  }

  export type ClientCreateNestedOneWithoutReportInput = {
    create?: XOR<ClientCreateWithoutReportInput, ClientUncheckedCreateWithoutReportInput>
    connectOrCreate?: ClientCreateOrConnectWithoutReportInput
    connect?: ClientWhereUniqueInput
  }

  export type AnalysisUpdateOneRequiredWithoutReportNestedInput = {
    create?: XOR<AnalysisCreateWithoutReportInput, AnalysisUncheckedCreateWithoutReportInput>
    connectOrCreate?: AnalysisCreateOrConnectWithoutReportInput
    upsert?: AnalysisUpsertWithoutReportInput
    connect?: AnalysisWhereUniqueInput
    update?: XOR<XOR<AnalysisUpdateToOneWithWhereWithoutReportInput, AnalysisUpdateWithoutReportInput>, AnalysisUncheckedUpdateWithoutReportInput>
  }

  export type ClientUpdateOneRequiredWithoutReportNestedInput = {
    create?: XOR<ClientCreateWithoutReportInput, ClientUncheckedCreateWithoutReportInput>
    connectOrCreate?: ClientCreateOrConnectWithoutReportInput
    upsert?: ClientUpsertWithoutReportInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutReportInput, ClientUpdateWithoutReportInput>, ClientUncheckedUpdateWithoutReportInput>
  }

  export type UserCreateNestedOneWithoutAuditEntryInput = {
    create?: XOR<UserCreateWithoutAuditEntryInput, UserUncheckedCreateWithoutAuditEntryInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditEntryInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAuditEntryNestedInput = {
    create?: XOR<UserCreateWithoutAuditEntryInput, UserUncheckedCreateWithoutAuditEntryInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditEntryInput
    upsert?: UserUpsertWithoutAuditEntryInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditEntryInput, UserUpdateWithoutAuditEntryInput>, UserUncheckedUpdateWithoutAuditEntryInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumTokenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeFilter<$PrismaModel> | $Enums.TokenType
  }

  export type NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel> | $Enums.TokenType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenTypeFilter<$PrismaModel>
    _max?: NestedEnumTokenTypeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TokenCreateWithoutUserInput = {
    token: string
    type: $Enums.TokenType
    expires: Date | string
    blacklisted: boolean
    createdAt?: Date | string
  }

  export type TokenUncheckedCreateWithoutUserInput = {
    id?: number
    token: string
    type: $Enums.TokenType
    expires: Date | string
    blacklisted: boolean
    createdAt?: Date | string
  }

  export type TokenCreateOrConnectWithoutUserInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
  }

  export type TokenCreateManyUserInputEnvelope = {
    data: TokenCreateManyUserInput | TokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuditEntryCreateWithoutUserInput = {
    id?: string
    userName: string
    userEmail: string
    action: string
    resource: string
    resourceId?: string | null
    details: string
    severity: string
    ipAddress: string
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type AuditEntryUncheckedCreateWithoutUserInput = {
    id?: string
    userName: string
    userEmail: string
    action: string
    resource: string
    resourceId?: string | null
    details: string
    severity: string
    ipAddress: string
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type AuditEntryCreateOrConnectWithoutUserInput = {
    where: AuditEntryWhereUniqueInput
    create: XOR<AuditEntryCreateWithoutUserInput, AuditEntryUncheckedCreateWithoutUserInput>
  }

  export type AuditEntryCreateManyUserInputEnvelope = {
    data: AuditEntryCreateManyUserInput | AuditEntryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TokenUpsertWithWhereUniqueWithoutUserInput = {
    where: TokenWhereUniqueInput
    update: XOR<TokenUpdateWithoutUserInput, TokenUncheckedUpdateWithoutUserInput>
    create: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
  }

  export type TokenUpdateWithWhereUniqueWithoutUserInput = {
    where: TokenWhereUniqueInput
    data: XOR<TokenUpdateWithoutUserInput, TokenUncheckedUpdateWithoutUserInput>
  }

  export type TokenUpdateManyWithWhereWithoutUserInput = {
    where: TokenScalarWhereInput
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyWithoutUserInput>
  }

  export type TokenScalarWhereInput = {
    AND?: TokenScalarWhereInput | TokenScalarWhereInput[]
    OR?: TokenScalarWhereInput[]
    NOT?: TokenScalarWhereInput | TokenScalarWhereInput[]
    id?: IntFilter<"Token"> | number
    token?: StringFilter<"Token"> | string
    type?: EnumTokenTypeFilter<"Token"> | $Enums.TokenType
    expires?: DateTimeFilter<"Token"> | Date | string
    blacklisted?: BoolFilter<"Token"> | boolean
    createdAt?: DateTimeFilter<"Token"> | Date | string
    userId?: IntFilter<"Token"> | number
  }

  export type AuditEntryUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditEntryWhereUniqueInput
    update: XOR<AuditEntryUpdateWithoutUserInput, AuditEntryUncheckedUpdateWithoutUserInput>
    create: XOR<AuditEntryCreateWithoutUserInput, AuditEntryUncheckedCreateWithoutUserInput>
  }

  export type AuditEntryUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditEntryWhereUniqueInput
    data: XOR<AuditEntryUpdateWithoutUserInput, AuditEntryUncheckedUpdateWithoutUserInput>
  }

  export type AuditEntryUpdateManyWithWhereWithoutUserInput = {
    where: AuditEntryScalarWhereInput
    data: XOR<AuditEntryUpdateManyMutationInput, AuditEntryUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditEntryScalarWhereInput = {
    AND?: AuditEntryScalarWhereInput | AuditEntryScalarWhereInput[]
    OR?: AuditEntryScalarWhereInput[]
    NOT?: AuditEntryScalarWhereInput | AuditEntryScalarWhereInput[]
    id?: StringFilter<"AuditEntry"> | string
    userId?: IntFilter<"AuditEntry"> | number
    userName?: StringFilter<"AuditEntry"> | string
    userEmail?: StringFilter<"AuditEntry"> | string
    action?: StringFilter<"AuditEntry"> | string
    resource?: StringFilter<"AuditEntry"> | string
    resourceId?: StringNullableFilter<"AuditEntry"> | string | null
    details?: StringFilter<"AuditEntry"> | string
    severity?: StringFilter<"AuditEntry"> | string
    ipAddress?: StringFilter<"AuditEntry"> | string
    userAgent?: StringNullableFilter<"AuditEntry"> | string | null
    timestamp?: DateTimeFilter<"AuditEntry"> | Date | string
  }

  export type UserCreateWithoutTokenInput = {
    email: string
    name?: string | null
    password: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    AuditEntry?: AuditEntryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTokenInput = {
    id?: number
    email: string
    name?: string | null
    password: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    AuditEntry?: AuditEntryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTokenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTokenInput, UserUncheckedCreateWithoutTokenInput>
  }

  export type UserUpsertWithoutTokenInput = {
    update: XOR<UserUpdateWithoutTokenInput, UserUncheckedUpdateWithoutTokenInput>
    create: XOR<UserCreateWithoutTokenInput, UserUncheckedCreateWithoutTokenInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTokenInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTokenInput, UserUncheckedUpdateWithoutTokenInput>
  }

  export type UserUpdateWithoutTokenInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    AuditEntry?: AuditEntryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTokenInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    AuditEntry?: AuditEntryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type StatementFileCreateWithoutClientInput = {
    id?: string
    filename: string
    type: string
    size: number
    uploadedAt?: Date | string
    status?: string
    ParseResult?: ParseResultCreateNestedOneWithoutStatementFileInput
  }

  export type StatementFileUncheckedCreateWithoutClientInput = {
    id?: string
    filename: string
    type: string
    size: number
    uploadedAt?: Date | string
    status?: string
    ParseResult?: ParseResultUncheckedCreateNestedOneWithoutStatementFileInput
  }

  export type StatementFileCreateOrConnectWithoutClientInput = {
    where: StatementFileWhereUniqueInput
    create: XOR<StatementFileCreateWithoutClientInput, StatementFileUncheckedCreateWithoutClientInput>
  }

  export type StatementFileCreateManyClientInputEnvelope = {
    data: StatementFileCreateManyClientInput | StatementFileCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type AnalysisCreateWithoutClientInput = {
    id?: string
    statementFileIds?: AnalysisCreatestatementFileIdsInput | string[]
    createdAt?: Date | string
    status?: string
    summary: JsonNullValueInput | InputJsonValue
    liquidityMetrics: JsonNullValueInput | InputJsonValue
    spendingBreakdown: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis: JsonNullValueInput | InputJsonValue
    Recommendation?: RecommendationCreateNestedManyWithoutAnalysisInput
    Report?: ReportCreateNestedManyWithoutAnalysisInput
  }

  export type AnalysisUncheckedCreateWithoutClientInput = {
    id?: string
    statementFileIds?: AnalysisCreatestatementFileIdsInput | string[]
    createdAt?: Date | string
    status?: string
    summary: JsonNullValueInput | InputJsonValue
    liquidityMetrics: JsonNullValueInput | InputJsonValue
    spendingBreakdown: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis: JsonNullValueInput | InputJsonValue
    Recommendation?: RecommendationUncheckedCreateNestedManyWithoutAnalysisInput
    Report?: ReportUncheckedCreateNestedManyWithoutAnalysisInput
  }

  export type AnalysisCreateOrConnectWithoutClientInput = {
    where: AnalysisWhereUniqueInput
    create: XOR<AnalysisCreateWithoutClientInput, AnalysisUncheckedCreateWithoutClientInput>
  }

  export type AnalysisCreateManyClientInputEnvelope = {
    data: AnalysisCreateManyClientInput | AnalysisCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type ReportCreateWithoutClientInput = {
    id?: string
    title: string
    format: string
    template: string
    createdAt?: Date | string
    createdBy: string
    fileSize?: number
    downloadCount?: number
    status?: string
    filePath?: string | null
    analysis: AnalysisCreateNestedOneWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutClientInput = {
    id?: string
    title: string
    analysisId: string
    format: string
    template: string
    createdAt?: Date | string
    createdBy: string
    fileSize?: number
    downloadCount?: number
    status?: string
    filePath?: string | null
  }

  export type ReportCreateOrConnectWithoutClientInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutClientInput, ReportUncheckedCreateWithoutClientInput>
  }

  export type ReportCreateManyClientInputEnvelope = {
    data: ReportCreateManyClientInput | ReportCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type StatementFileUpsertWithWhereUniqueWithoutClientInput = {
    where: StatementFileWhereUniqueInput
    update: XOR<StatementFileUpdateWithoutClientInput, StatementFileUncheckedUpdateWithoutClientInput>
    create: XOR<StatementFileCreateWithoutClientInput, StatementFileUncheckedCreateWithoutClientInput>
  }

  export type StatementFileUpdateWithWhereUniqueWithoutClientInput = {
    where: StatementFileWhereUniqueInput
    data: XOR<StatementFileUpdateWithoutClientInput, StatementFileUncheckedUpdateWithoutClientInput>
  }

  export type StatementFileUpdateManyWithWhereWithoutClientInput = {
    where: StatementFileScalarWhereInput
    data: XOR<StatementFileUpdateManyMutationInput, StatementFileUncheckedUpdateManyWithoutClientInput>
  }

  export type StatementFileScalarWhereInput = {
    AND?: StatementFileScalarWhereInput | StatementFileScalarWhereInput[]
    OR?: StatementFileScalarWhereInput[]
    NOT?: StatementFileScalarWhereInput | StatementFileScalarWhereInput[]
    id?: StringFilter<"StatementFile"> | string
    filename?: StringFilter<"StatementFile"> | string
    type?: StringFilter<"StatementFile"> | string
    size?: IntFilter<"StatementFile"> | number
    uploadedAt?: DateTimeFilter<"StatementFile"> | Date | string
    status?: StringFilter<"StatementFile"> | string
    clientId?: StringFilter<"StatementFile"> | string
  }

  export type AnalysisUpsertWithWhereUniqueWithoutClientInput = {
    where: AnalysisWhereUniqueInput
    update: XOR<AnalysisUpdateWithoutClientInput, AnalysisUncheckedUpdateWithoutClientInput>
    create: XOR<AnalysisCreateWithoutClientInput, AnalysisUncheckedCreateWithoutClientInput>
  }

  export type AnalysisUpdateWithWhereUniqueWithoutClientInput = {
    where: AnalysisWhereUniqueInput
    data: XOR<AnalysisUpdateWithoutClientInput, AnalysisUncheckedUpdateWithoutClientInput>
  }

  export type AnalysisUpdateManyWithWhereWithoutClientInput = {
    where: AnalysisScalarWhereInput
    data: XOR<AnalysisUpdateManyMutationInput, AnalysisUncheckedUpdateManyWithoutClientInput>
  }

  export type AnalysisScalarWhereInput = {
    AND?: AnalysisScalarWhereInput | AnalysisScalarWhereInput[]
    OR?: AnalysisScalarWhereInput[]
    NOT?: AnalysisScalarWhereInput | AnalysisScalarWhereInput[]
    id?: StringFilter<"Analysis"> | string
    clientId?: StringFilter<"Analysis"> | string
    statementFileIds?: StringNullableListFilter<"Analysis">
    createdAt?: DateTimeFilter<"Analysis"> | Date | string
    status?: StringFilter<"Analysis"> | string
    summary?: JsonFilter<"Analysis">
    liquidityMetrics?: JsonFilter<"Analysis">
    spendingBreakdown?: JsonFilter<"Analysis">
    idleBalanceAnalysis?: JsonFilter<"Analysis">
  }

  export type ReportUpsertWithWhereUniqueWithoutClientInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutClientInput, ReportUncheckedUpdateWithoutClientInput>
    create: XOR<ReportCreateWithoutClientInput, ReportUncheckedCreateWithoutClientInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutClientInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutClientInput, ReportUncheckedUpdateWithoutClientInput>
  }

  export type ReportUpdateManyWithWhereWithoutClientInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutClientInput>
  }

  export type ReportScalarWhereInput = {
    AND?: ReportScalarWhereInput | ReportScalarWhereInput[]
    OR?: ReportScalarWhereInput[]
    NOT?: ReportScalarWhereInput | ReportScalarWhereInput[]
    id?: StringFilter<"Report"> | string
    title?: StringFilter<"Report"> | string
    analysisId?: StringFilter<"Report"> | string
    clientId?: StringFilter<"Report"> | string
    format?: StringFilter<"Report"> | string
    template?: StringFilter<"Report"> | string
    createdAt?: DateTimeFilter<"Report"> | Date | string
    createdBy?: StringFilter<"Report"> | string
    fileSize?: IntFilter<"Report"> | number
    downloadCount?: IntFilter<"Report"> | number
    status?: StringFilter<"Report"> | string
    filePath?: StringNullableFilter<"Report"> | string | null
  }

  export type ClientCreateWithoutStatementFileInput = {
    id?: string
    name: string
    accountIds?: ClientCreateaccountIdsInput | string[]
    relationshipManager: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Analysis?: AnalysisCreateNestedManyWithoutClientInput
    Report?: ReportCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutStatementFileInput = {
    id?: string
    name: string
    accountIds?: ClientCreateaccountIdsInput | string[]
    relationshipManager: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Analysis?: AnalysisUncheckedCreateNestedManyWithoutClientInput
    Report?: ReportUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutStatementFileInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutStatementFileInput, ClientUncheckedCreateWithoutStatementFileInput>
  }

  export type ParseResultCreateWithoutStatementFileInput = {
    id?: string
    totalTransactions: number
    dateRangeStart: Date | string
    dateRangeEnd: Date | string
    accounts: JsonNullValueInput | InputJsonValue
    status: string
    errors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ParseResultUncheckedCreateWithoutStatementFileInput = {
    id?: string
    totalTransactions: number
    dateRangeStart: Date | string
    dateRangeEnd: Date | string
    accounts: JsonNullValueInput | InputJsonValue
    status: string
    errors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ParseResultCreateOrConnectWithoutStatementFileInput = {
    where: ParseResultWhereUniqueInput
    create: XOR<ParseResultCreateWithoutStatementFileInput, ParseResultUncheckedCreateWithoutStatementFileInput>
  }

  export type ClientUpsertWithoutStatementFileInput = {
    update: XOR<ClientUpdateWithoutStatementFileInput, ClientUncheckedUpdateWithoutStatementFileInput>
    create: XOR<ClientCreateWithoutStatementFileInput, ClientUncheckedCreateWithoutStatementFileInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutStatementFileInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutStatementFileInput, ClientUncheckedUpdateWithoutStatementFileInput>
  }

  export type ClientUpdateWithoutStatementFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountIds?: ClientUpdateaccountIdsInput | string[]
    relationshipManager?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Analysis?: AnalysisUpdateManyWithoutClientNestedInput
    Report?: ReportUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutStatementFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountIds?: ClientUpdateaccountIdsInput | string[]
    relationshipManager?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Analysis?: AnalysisUncheckedUpdateManyWithoutClientNestedInput
    Report?: ReportUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ParseResultUpsertWithoutStatementFileInput = {
    update: XOR<ParseResultUpdateWithoutStatementFileInput, ParseResultUncheckedUpdateWithoutStatementFileInput>
    create: XOR<ParseResultCreateWithoutStatementFileInput, ParseResultUncheckedCreateWithoutStatementFileInput>
    where?: ParseResultWhereInput
  }

  export type ParseResultUpdateToOneWithWhereWithoutStatementFileInput = {
    where?: ParseResultWhereInput
    data: XOR<ParseResultUpdateWithoutStatementFileInput, ParseResultUncheckedUpdateWithoutStatementFileInput>
  }

  export type ParseResultUpdateWithoutStatementFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalTransactions?: IntFieldUpdateOperationsInput | number
    dateRangeStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateRangeEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    errors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParseResultUncheckedUpdateWithoutStatementFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalTransactions?: IntFieldUpdateOperationsInput | number
    dateRangeStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateRangeEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    errors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatementFileCreateWithoutParseResultInput = {
    id?: string
    filename: string
    type: string
    size: number
    uploadedAt?: Date | string
    status?: string
    client: ClientCreateNestedOneWithoutStatementFileInput
  }

  export type StatementFileUncheckedCreateWithoutParseResultInput = {
    id?: string
    filename: string
    type: string
    size: number
    uploadedAt?: Date | string
    status?: string
    clientId: string
  }

  export type StatementFileCreateOrConnectWithoutParseResultInput = {
    where: StatementFileWhereUniqueInput
    create: XOR<StatementFileCreateWithoutParseResultInput, StatementFileUncheckedCreateWithoutParseResultInput>
  }

  export type StatementFileUpsertWithoutParseResultInput = {
    update: XOR<StatementFileUpdateWithoutParseResultInput, StatementFileUncheckedUpdateWithoutParseResultInput>
    create: XOR<StatementFileCreateWithoutParseResultInput, StatementFileUncheckedCreateWithoutParseResultInput>
    where?: StatementFileWhereInput
  }

  export type StatementFileUpdateToOneWithWhereWithoutParseResultInput = {
    where?: StatementFileWhereInput
    data: XOR<StatementFileUpdateWithoutParseResultInput, StatementFileUncheckedUpdateWithoutParseResultInput>
  }

  export type StatementFileUpdateWithoutParseResultInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    client?: ClientUpdateOneRequiredWithoutStatementFileNestedInput
  }

  export type StatementFileUncheckedUpdateWithoutParseResultInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
  }

  export type ClientCreateWithoutAnalysisInput = {
    id?: string
    name: string
    accountIds?: ClientCreateaccountIdsInput | string[]
    relationshipManager: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    StatementFile?: StatementFileCreateNestedManyWithoutClientInput
    Report?: ReportCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutAnalysisInput = {
    id?: string
    name: string
    accountIds?: ClientCreateaccountIdsInput | string[]
    relationshipManager: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    StatementFile?: StatementFileUncheckedCreateNestedManyWithoutClientInput
    Report?: ReportUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutAnalysisInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutAnalysisInput, ClientUncheckedCreateWithoutAnalysisInput>
  }

  export type RecommendationCreateWithoutAnalysisInput = {
    id?: string
    priority: string
    rationale: string
    dataPoints?: RecommendationCreatedataPointsInput | string[]
    benefitProjection: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    approvedBy?: string | null
    approvedAt?: Date | string | null
    product: TreasuryProductCreateNestedOneWithoutRecommendationInput
  }

  export type RecommendationUncheckedCreateWithoutAnalysisInput = {
    id?: string
    productId: string
    priority: string
    rationale: string
    dataPoints?: RecommendationCreatedataPointsInput | string[]
    benefitProjection: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    approvedBy?: string | null
    approvedAt?: Date | string | null
  }

  export type RecommendationCreateOrConnectWithoutAnalysisInput = {
    where: RecommendationWhereUniqueInput
    create: XOR<RecommendationCreateWithoutAnalysisInput, RecommendationUncheckedCreateWithoutAnalysisInput>
  }

  export type RecommendationCreateManyAnalysisInputEnvelope = {
    data: RecommendationCreateManyAnalysisInput | RecommendationCreateManyAnalysisInput[]
    skipDuplicates?: boolean
  }

  export type ReportCreateWithoutAnalysisInput = {
    id?: string
    title: string
    format: string
    template: string
    createdAt?: Date | string
    createdBy: string
    fileSize?: number
    downloadCount?: number
    status?: string
    filePath?: string | null
    client: ClientCreateNestedOneWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutAnalysisInput = {
    id?: string
    title: string
    clientId: string
    format: string
    template: string
    createdAt?: Date | string
    createdBy: string
    fileSize?: number
    downloadCount?: number
    status?: string
    filePath?: string | null
  }

  export type ReportCreateOrConnectWithoutAnalysisInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutAnalysisInput, ReportUncheckedCreateWithoutAnalysisInput>
  }

  export type ReportCreateManyAnalysisInputEnvelope = {
    data: ReportCreateManyAnalysisInput | ReportCreateManyAnalysisInput[]
    skipDuplicates?: boolean
  }

  export type ClientUpsertWithoutAnalysisInput = {
    update: XOR<ClientUpdateWithoutAnalysisInput, ClientUncheckedUpdateWithoutAnalysisInput>
    create: XOR<ClientCreateWithoutAnalysisInput, ClientUncheckedCreateWithoutAnalysisInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutAnalysisInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutAnalysisInput, ClientUncheckedUpdateWithoutAnalysisInput>
  }

  export type ClientUpdateWithoutAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountIds?: ClientUpdateaccountIdsInput | string[]
    relationshipManager?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    StatementFile?: StatementFileUpdateManyWithoutClientNestedInput
    Report?: ReportUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountIds?: ClientUpdateaccountIdsInput | string[]
    relationshipManager?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    StatementFile?: StatementFileUncheckedUpdateManyWithoutClientNestedInput
    Report?: ReportUncheckedUpdateManyWithoutClientNestedInput
  }

  export type RecommendationUpsertWithWhereUniqueWithoutAnalysisInput = {
    where: RecommendationWhereUniqueInput
    update: XOR<RecommendationUpdateWithoutAnalysisInput, RecommendationUncheckedUpdateWithoutAnalysisInput>
    create: XOR<RecommendationCreateWithoutAnalysisInput, RecommendationUncheckedCreateWithoutAnalysisInput>
  }

  export type RecommendationUpdateWithWhereUniqueWithoutAnalysisInput = {
    where: RecommendationWhereUniqueInput
    data: XOR<RecommendationUpdateWithoutAnalysisInput, RecommendationUncheckedUpdateWithoutAnalysisInput>
  }

  export type RecommendationUpdateManyWithWhereWithoutAnalysisInput = {
    where: RecommendationScalarWhereInput
    data: XOR<RecommendationUpdateManyMutationInput, RecommendationUncheckedUpdateManyWithoutAnalysisInput>
  }

  export type RecommendationScalarWhereInput = {
    AND?: RecommendationScalarWhereInput | RecommendationScalarWhereInput[]
    OR?: RecommendationScalarWhereInput[]
    NOT?: RecommendationScalarWhereInput | RecommendationScalarWhereInput[]
    id?: StringFilter<"Recommendation"> | string
    analysisId?: StringFilter<"Recommendation"> | string
    productId?: StringFilter<"Recommendation"> | string
    priority?: StringFilter<"Recommendation"> | string
    rationale?: StringFilter<"Recommendation"> | string
    dataPoints?: StringNullableListFilter<"Recommendation">
    benefitProjection?: JsonFilter<"Recommendation">
    status?: StringFilter<"Recommendation"> | string
    createdAt?: DateTimeFilter<"Recommendation"> | Date | string
    approvedBy?: StringNullableFilter<"Recommendation"> | string | null
    approvedAt?: DateTimeNullableFilter<"Recommendation"> | Date | string | null
  }

  export type ReportUpsertWithWhereUniqueWithoutAnalysisInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutAnalysisInput, ReportUncheckedUpdateWithoutAnalysisInput>
    create: XOR<ReportCreateWithoutAnalysisInput, ReportUncheckedCreateWithoutAnalysisInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutAnalysisInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutAnalysisInput, ReportUncheckedUpdateWithoutAnalysisInput>
  }

  export type ReportUpdateManyWithWhereWithoutAnalysisInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutAnalysisInput>
  }

  export type RecommendationCreateWithoutProductInput = {
    id?: string
    priority: string
    rationale: string
    dataPoints?: RecommendationCreatedataPointsInput | string[]
    benefitProjection: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    approvedBy?: string | null
    approvedAt?: Date | string | null
    analysis: AnalysisCreateNestedOneWithoutRecommendationInput
  }

  export type RecommendationUncheckedCreateWithoutProductInput = {
    id?: string
    analysisId: string
    priority: string
    rationale: string
    dataPoints?: RecommendationCreatedataPointsInput | string[]
    benefitProjection: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    approvedBy?: string | null
    approvedAt?: Date | string | null
  }

  export type RecommendationCreateOrConnectWithoutProductInput = {
    where: RecommendationWhereUniqueInput
    create: XOR<RecommendationCreateWithoutProductInput, RecommendationUncheckedCreateWithoutProductInput>
  }

  export type RecommendationCreateManyProductInputEnvelope = {
    data: RecommendationCreateManyProductInput | RecommendationCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type RecommendationUpsertWithWhereUniqueWithoutProductInput = {
    where: RecommendationWhereUniqueInput
    update: XOR<RecommendationUpdateWithoutProductInput, RecommendationUncheckedUpdateWithoutProductInput>
    create: XOR<RecommendationCreateWithoutProductInput, RecommendationUncheckedCreateWithoutProductInput>
  }

  export type RecommendationUpdateWithWhereUniqueWithoutProductInput = {
    where: RecommendationWhereUniqueInput
    data: XOR<RecommendationUpdateWithoutProductInput, RecommendationUncheckedUpdateWithoutProductInput>
  }

  export type RecommendationUpdateManyWithWhereWithoutProductInput = {
    where: RecommendationScalarWhereInput
    data: XOR<RecommendationUpdateManyMutationInput, RecommendationUncheckedUpdateManyWithoutProductInput>
  }

  export type AnalysisCreateWithoutRecommendationInput = {
    id?: string
    statementFileIds?: AnalysisCreatestatementFileIdsInput | string[]
    createdAt?: Date | string
    status?: string
    summary: JsonNullValueInput | InputJsonValue
    liquidityMetrics: JsonNullValueInput | InputJsonValue
    spendingBreakdown: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis: JsonNullValueInput | InputJsonValue
    client: ClientCreateNestedOneWithoutAnalysisInput
    Report?: ReportCreateNestedManyWithoutAnalysisInput
  }

  export type AnalysisUncheckedCreateWithoutRecommendationInput = {
    id?: string
    clientId: string
    statementFileIds?: AnalysisCreatestatementFileIdsInput | string[]
    createdAt?: Date | string
    status?: string
    summary: JsonNullValueInput | InputJsonValue
    liquidityMetrics: JsonNullValueInput | InputJsonValue
    spendingBreakdown: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis: JsonNullValueInput | InputJsonValue
    Report?: ReportUncheckedCreateNestedManyWithoutAnalysisInput
  }

  export type AnalysisCreateOrConnectWithoutRecommendationInput = {
    where: AnalysisWhereUniqueInput
    create: XOR<AnalysisCreateWithoutRecommendationInput, AnalysisUncheckedCreateWithoutRecommendationInput>
  }

  export type TreasuryProductCreateWithoutRecommendationInput = {
    id?: string
    name: string
    category: string
    description: string
    features?: TreasuryProductCreatefeaturesInput | string[]
    eligibilityRules: JsonNullValueInput | InputJsonValue
    benefits: JsonNullValueInput | InputJsonValue
    pricing: JsonNullValueInput | InputJsonValue
    isActive?: boolean
  }

  export type TreasuryProductUncheckedCreateWithoutRecommendationInput = {
    id?: string
    name: string
    category: string
    description: string
    features?: TreasuryProductCreatefeaturesInput | string[]
    eligibilityRules: JsonNullValueInput | InputJsonValue
    benefits: JsonNullValueInput | InputJsonValue
    pricing: JsonNullValueInput | InputJsonValue
    isActive?: boolean
  }

  export type TreasuryProductCreateOrConnectWithoutRecommendationInput = {
    where: TreasuryProductWhereUniqueInput
    create: XOR<TreasuryProductCreateWithoutRecommendationInput, TreasuryProductUncheckedCreateWithoutRecommendationInput>
  }

  export type AnalysisUpsertWithoutRecommendationInput = {
    update: XOR<AnalysisUpdateWithoutRecommendationInput, AnalysisUncheckedUpdateWithoutRecommendationInput>
    create: XOR<AnalysisCreateWithoutRecommendationInput, AnalysisUncheckedCreateWithoutRecommendationInput>
    where?: AnalysisWhereInput
  }

  export type AnalysisUpdateToOneWithWhereWithoutRecommendationInput = {
    where?: AnalysisWhereInput
    data: XOR<AnalysisUpdateWithoutRecommendationInput, AnalysisUncheckedUpdateWithoutRecommendationInput>
  }

  export type AnalysisUpdateWithoutRecommendationInput = {
    id?: StringFieldUpdateOperationsInput | string
    statementFileIds?: AnalysisUpdatestatementFileIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    summary?: JsonNullValueInput | InputJsonValue
    liquidityMetrics?: JsonNullValueInput | InputJsonValue
    spendingBreakdown?: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis?: JsonNullValueInput | InputJsonValue
    client?: ClientUpdateOneRequiredWithoutAnalysisNestedInput
    Report?: ReportUpdateManyWithoutAnalysisNestedInput
  }

  export type AnalysisUncheckedUpdateWithoutRecommendationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    statementFileIds?: AnalysisUpdatestatementFileIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    summary?: JsonNullValueInput | InputJsonValue
    liquidityMetrics?: JsonNullValueInput | InputJsonValue
    spendingBreakdown?: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis?: JsonNullValueInput | InputJsonValue
    Report?: ReportUncheckedUpdateManyWithoutAnalysisNestedInput
  }

  export type TreasuryProductUpsertWithoutRecommendationInput = {
    update: XOR<TreasuryProductUpdateWithoutRecommendationInput, TreasuryProductUncheckedUpdateWithoutRecommendationInput>
    create: XOR<TreasuryProductCreateWithoutRecommendationInput, TreasuryProductUncheckedCreateWithoutRecommendationInput>
    where?: TreasuryProductWhereInput
  }

  export type TreasuryProductUpdateToOneWithWhereWithoutRecommendationInput = {
    where?: TreasuryProductWhereInput
    data: XOR<TreasuryProductUpdateWithoutRecommendationInput, TreasuryProductUncheckedUpdateWithoutRecommendationInput>
  }

  export type TreasuryProductUpdateWithoutRecommendationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    features?: TreasuryProductUpdatefeaturesInput | string[]
    eligibilityRules?: JsonNullValueInput | InputJsonValue
    benefits?: JsonNullValueInput | InputJsonValue
    pricing?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TreasuryProductUncheckedUpdateWithoutRecommendationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    features?: TreasuryProductUpdatefeaturesInput | string[]
    eligibilityRules?: JsonNullValueInput | InputJsonValue
    benefits?: JsonNullValueInput | InputJsonValue
    pricing?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AnalysisCreateWithoutReportInput = {
    id?: string
    statementFileIds?: AnalysisCreatestatementFileIdsInput | string[]
    createdAt?: Date | string
    status?: string
    summary: JsonNullValueInput | InputJsonValue
    liquidityMetrics: JsonNullValueInput | InputJsonValue
    spendingBreakdown: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis: JsonNullValueInput | InputJsonValue
    client: ClientCreateNestedOneWithoutAnalysisInput
    Recommendation?: RecommendationCreateNestedManyWithoutAnalysisInput
  }

  export type AnalysisUncheckedCreateWithoutReportInput = {
    id?: string
    clientId: string
    statementFileIds?: AnalysisCreatestatementFileIdsInput | string[]
    createdAt?: Date | string
    status?: string
    summary: JsonNullValueInput | InputJsonValue
    liquidityMetrics: JsonNullValueInput | InputJsonValue
    spendingBreakdown: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis: JsonNullValueInput | InputJsonValue
    Recommendation?: RecommendationUncheckedCreateNestedManyWithoutAnalysisInput
  }

  export type AnalysisCreateOrConnectWithoutReportInput = {
    where: AnalysisWhereUniqueInput
    create: XOR<AnalysisCreateWithoutReportInput, AnalysisUncheckedCreateWithoutReportInput>
  }

  export type ClientCreateWithoutReportInput = {
    id?: string
    name: string
    accountIds?: ClientCreateaccountIdsInput | string[]
    relationshipManager: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    StatementFile?: StatementFileCreateNestedManyWithoutClientInput
    Analysis?: AnalysisCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutReportInput = {
    id?: string
    name: string
    accountIds?: ClientCreateaccountIdsInput | string[]
    relationshipManager: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    StatementFile?: StatementFileUncheckedCreateNestedManyWithoutClientInput
    Analysis?: AnalysisUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutReportInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutReportInput, ClientUncheckedCreateWithoutReportInput>
  }

  export type AnalysisUpsertWithoutReportInput = {
    update: XOR<AnalysisUpdateWithoutReportInput, AnalysisUncheckedUpdateWithoutReportInput>
    create: XOR<AnalysisCreateWithoutReportInput, AnalysisUncheckedCreateWithoutReportInput>
    where?: AnalysisWhereInput
  }

  export type AnalysisUpdateToOneWithWhereWithoutReportInput = {
    where?: AnalysisWhereInput
    data: XOR<AnalysisUpdateWithoutReportInput, AnalysisUncheckedUpdateWithoutReportInput>
  }

  export type AnalysisUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    statementFileIds?: AnalysisUpdatestatementFileIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    summary?: JsonNullValueInput | InputJsonValue
    liquidityMetrics?: JsonNullValueInput | InputJsonValue
    spendingBreakdown?: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis?: JsonNullValueInput | InputJsonValue
    client?: ClientUpdateOneRequiredWithoutAnalysisNestedInput
    Recommendation?: RecommendationUpdateManyWithoutAnalysisNestedInput
  }

  export type AnalysisUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    statementFileIds?: AnalysisUpdatestatementFileIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    summary?: JsonNullValueInput | InputJsonValue
    liquidityMetrics?: JsonNullValueInput | InputJsonValue
    spendingBreakdown?: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis?: JsonNullValueInput | InputJsonValue
    Recommendation?: RecommendationUncheckedUpdateManyWithoutAnalysisNestedInput
  }

  export type ClientUpsertWithoutReportInput = {
    update: XOR<ClientUpdateWithoutReportInput, ClientUncheckedUpdateWithoutReportInput>
    create: XOR<ClientCreateWithoutReportInput, ClientUncheckedCreateWithoutReportInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutReportInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutReportInput, ClientUncheckedUpdateWithoutReportInput>
  }

  export type ClientUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountIds?: ClientUpdateaccountIdsInput | string[]
    relationshipManager?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    StatementFile?: StatementFileUpdateManyWithoutClientNestedInput
    Analysis?: AnalysisUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountIds?: ClientUpdateaccountIdsInput | string[]
    relationshipManager?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    StatementFile?: StatementFileUncheckedUpdateManyWithoutClientNestedInput
    Analysis?: AnalysisUncheckedUpdateManyWithoutClientNestedInput
  }

  export type UserCreateWithoutAuditEntryInput = {
    email: string
    name?: string | null
    password: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Token?: TokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuditEntryInput = {
    id?: number
    email: string
    name?: string | null
    password: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuditEntryInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditEntryInput, UserUncheckedCreateWithoutAuditEntryInput>
  }

  export type UserUpsertWithoutAuditEntryInput = {
    update: XOR<UserUpdateWithoutAuditEntryInput, UserUncheckedUpdateWithoutAuditEntryInput>
    create: XOR<UserCreateWithoutAuditEntryInput, UserUncheckedCreateWithoutAuditEntryInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditEntryInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditEntryInput, UserUncheckedUpdateWithoutAuditEntryInput>
  }

  export type UserUpdateWithoutAuditEntryInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Token?: TokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditEntryInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Token?: TokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TokenCreateManyUserInput = {
    id?: number
    token: string
    type: $Enums.TokenType
    expires: Date | string
    blacklisted: boolean
    createdAt?: Date | string
  }

  export type AuditEntryCreateManyUserInput = {
    id?: string
    userName: string
    userEmail: string
    action: string
    resource: string
    resourceId?: string | null
    details: string
    severity: string
    ipAddress: string
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type TokenUpdateWithoutUserInput = {
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEntryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEntryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEntryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatementFileCreateManyClientInput = {
    id?: string
    filename: string
    type: string
    size: number
    uploadedAt?: Date | string
    status?: string
  }

  export type AnalysisCreateManyClientInput = {
    id?: string
    statementFileIds?: AnalysisCreatestatementFileIdsInput | string[]
    createdAt?: Date | string
    status?: string
    summary: JsonNullValueInput | InputJsonValue
    liquidityMetrics: JsonNullValueInput | InputJsonValue
    spendingBreakdown: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis: JsonNullValueInput | InputJsonValue
  }

  export type ReportCreateManyClientInput = {
    id?: string
    title: string
    analysisId: string
    format: string
    template: string
    createdAt?: Date | string
    createdBy: string
    fileSize?: number
    downloadCount?: number
    status?: string
    filePath?: string | null
  }

  export type StatementFileUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    ParseResult?: ParseResultUpdateOneWithoutStatementFileNestedInput
  }

  export type StatementFileUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    ParseResult?: ParseResultUncheckedUpdateOneWithoutStatementFileNestedInput
  }

  export type StatementFileUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AnalysisUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    statementFileIds?: AnalysisUpdatestatementFileIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    summary?: JsonNullValueInput | InputJsonValue
    liquidityMetrics?: JsonNullValueInput | InputJsonValue
    spendingBreakdown?: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis?: JsonNullValueInput | InputJsonValue
    Recommendation?: RecommendationUpdateManyWithoutAnalysisNestedInput
    Report?: ReportUpdateManyWithoutAnalysisNestedInput
  }

  export type AnalysisUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    statementFileIds?: AnalysisUpdatestatementFileIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    summary?: JsonNullValueInput | InputJsonValue
    liquidityMetrics?: JsonNullValueInput | InputJsonValue
    spendingBreakdown?: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis?: JsonNullValueInput | InputJsonValue
    Recommendation?: RecommendationUncheckedUpdateManyWithoutAnalysisNestedInput
    Report?: ReportUncheckedUpdateManyWithoutAnalysisNestedInput
  }

  export type AnalysisUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    statementFileIds?: AnalysisUpdatestatementFileIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    summary?: JsonNullValueInput | InputJsonValue
    liquidityMetrics?: JsonNullValueInput | InputJsonValue
    spendingBreakdown?: JsonNullValueInput | InputJsonValue
    idleBalanceAnalysis?: JsonNullValueInput | InputJsonValue
  }

  export type ReportUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    downloadCount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    analysis?: AnalysisUpdateOneRequiredWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    analysisId?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    downloadCount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReportUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    analysisId?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    downloadCount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecommendationCreateManyAnalysisInput = {
    id?: string
    productId: string
    priority: string
    rationale: string
    dataPoints?: RecommendationCreatedataPointsInput | string[]
    benefitProjection: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    approvedBy?: string | null
    approvedAt?: Date | string | null
  }

  export type ReportCreateManyAnalysisInput = {
    id?: string
    title: string
    clientId: string
    format: string
    template: string
    createdAt?: Date | string
    createdBy: string
    fileSize?: number
    downloadCount?: number
    status?: string
    filePath?: string | null
  }

  export type RecommendationUpdateWithoutAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    rationale?: StringFieldUpdateOperationsInput | string
    dataPoints?: RecommendationUpdatedataPointsInput | string[]
    benefitProjection?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    product?: TreasuryProductUpdateOneRequiredWithoutRecommendationNestedInput
  }

  export type RecommendationUncheckedUpdateWithoutAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    rationale?: StringFieldUpdateOperationsInput | string
    dataPoints?: RecommendationUpdatedataPointsInput | string[]
    benefitProjection?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RecommendationUncheckedUpdateManyWithoutAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    rationale?: StringFieldUpdateOperationsInput | string
    dataPoints?: RecommendationUpdatedataPointsInput | string[]
    benefitProjection?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReportUpdateWithoutAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    downloadCount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    client?: ClientUpdateOneRequiredWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    downloadCount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReportUncheckedUpdateManyWithoutAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    downloadCount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecommendationCreateManyProductInput = {
    id?: string
    analysisId: string
    priority: string
    rationale: string
    dataPoints?: RecommendationCreatedataPointsInput | string[]
    benefitProjection: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    approvedBy?: string | null
    approvedAt?: Date | string | null
  }

  export type RecommendationUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    rationale?: StringFieldUpdateOperationsInput | string
    dataPoints?: RecommendationUpdatedataPointsInput | string[]
    benefitProjection?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analysis?: AnalysisUpdateOneRequiredWithoutRecommendationNestedInput
  }

  export type RecommendationUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisId?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    rationale?: StringFieldUpdateOperationsInput | string
    dataPoints?: RecommendationUpdatedataPointsInput | string[]
    benefitProjection?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RecommendationUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisId?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    rationale?: StringFieldUpdateOperationsInput | string
    dataPoints?: RecommendationUpdatedataPointsInput | string[]
    benefitProjection?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}