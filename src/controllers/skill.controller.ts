import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Skill} from '../models';
import {SkillRepository} from '../repositories';

export class SkillController {
  constructor(
    @repository(SkillRepository)
    public skillRepository: SkillRepository,
  ) {}

  @post('/skill', {
    responses: {
      '200': {
        description: 'Skill model instance',
        content: {'application/json': {schema: {'x-ts-type': Skill}}},
      },
    },
  })
  async create(@requestBody() skill: Skill): Promise<Skill> {
    return await this.skillRepository.create(skill);
  }

  @get('/skill/count', {
    responses: {
      '200': {
        description: 'Skill model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Skill)) where?: Where<Skill>,
  ): Promise<Count> {
    return await this.skillRepository.count(where);
  }

  @get('/skill/{key}', {
    responses: {
      '200': {
        description: 'Array of Skills model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Skill}},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('key') key: string,

    @param.query.object('filter', getFilterSchemaFor(Skill))
    filter?: Filter<Skill>,
  ): Promise<Object[]> {
    filter = {
      limit: 10,
      fields: {skillName: true},

      where: {skillName: {regexp: `/^${key}/ig`}},
    };

    return (await this.skillRepository.find(filter, {limit: 10})).map(
      skill => skill.skillName,
    );
  }
  /** get array of object  */
  @get('/skill/fullObj/{key}', {
    responses: {
      '200': {
        description: 'Array of Skills model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Skill}},
          },
        },
      },
    },
  })
  async findFullObject(
    @param.path.string('key') key: string,

    @param.query.object('filter', getFilterSchemaFor(Skill))
    filter?: Filter<Skill>,
  ): Promise<Object[]> {
    filter = {
      limit: 10,

      where: {skillName: {regexp: `/^${key}/ig`}},
    };

    return await this.skillRepository.find(filter, {limit: 10});
  }

  @patch('/skill', {
    responses: {
      '200': {
        description: 'Skill PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skill, {partial: true}),
        },
      },
    })
    skill: Skill,
    @param.query.object('where', getWhereSchemaFor(Skill)) where?: Where<Skill>,
  ): Promise<Count> {
    return await this.skillRepository.updateAll(skill, where);
  }

  @get('/skill/{id}', {
    responses: {
      '200': {
        description: 'Skill model instance',
        content: {'application/json': {schema: {'x-ts-type': Skill}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Skill> {
    return await this.skillRepository.findById(id);
  }

  @patch('/skill/{id}', {
    responses: {
      '204': {
        description: 'Skill PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skill, {partial: true}),
        },
      },
    })
    skill: Skill,
  ): Promise<void> {
    await this.skillRepository.updateById(id, skill);
  }

  @put('/skill/{id}', {
    responses: {
      '204': {
        description: 'Skill PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() skill: Skill,
  ): Promise<void> {
    await this.skillRepository.replaceById(id, skill);
  }

  @del('/skill/{id}', {
    responses: {
      '204': {
        description: 'Skill DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.skillRepository.deleteById(id);
  }
}
