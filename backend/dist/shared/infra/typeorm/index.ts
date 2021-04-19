import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? '172.22.0.2' : host,
      database: process.env.NODE_ENV === 'test' ? 'rentx_test' : defaultOptions.database
    })
  )
}