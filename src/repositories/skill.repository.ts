import {DefaultCrudRepository} from '@loopback/repository';
import {Skill, SkillRelations} from '../models';
import {SkillDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SkillRepository extends DefaultCrudRepository<
  Skill,
  typeof Skill.prototype.id,
  SkillRelations
> {
  constructor(@inject('datasources.skillDB') dataSource: SkillDbDataSource) {
    super(Skill, dataSource);
  }
}
