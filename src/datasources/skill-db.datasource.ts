import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './skill-db.datasource.json';

export class SkillDbDataSource extends juggler.DataSource {
  static dataSourceName = 'skillDB';

  constructor(
    @inject('datasources.config.skillDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
