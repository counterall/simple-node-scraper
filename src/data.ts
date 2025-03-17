import { Storage } from '@google-cloud/storage';
import localData from './db.json';
import type { Data } from './type';
import * as dotenv from 'dotenv';
dotenv.config();

const storage = new Storage();
const BUCKET_NAME = 'simple_node_scraper_json_bucket'
const FILE_NAME = 'db.json';

export default async function loadData(): Promise<Data> {
  if (process.env.NODE_ENV === 'production') {
    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(FILE_NAME);
    const [contents] = await file.download();
    const data = JSON.parse(contents.toString('utf8')) as Data
    return data;
  } else {
    return localData as unknown as Data;
  }
}
