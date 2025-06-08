import { DataSource } from 'typeorm';
import * as dbConfig from '../ormconfig';

export default new DataSource(dbConfig as any); 