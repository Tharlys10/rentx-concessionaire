import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

export default async (host = "rentxdatabase"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'rentxdatabase' : host,
      database: process.env.NODE_ENV === 'test' ? 'rentx_test' : defaultOptions.database
    })
  )
}