import { Test, TestingModule } from '@nestjs/testing';
import { EducationService } from '../service/education.service';
import { EducationController } from './education.controller';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/app/admin/guard/jwt.guard';
import { GetEducationDTO, UpdateEducationDTO } from '../dto/education.dto';
import { HttpStatus } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Connection } from 'typeorm';

describe('EducationController', () => {
  let controller: EducationController;
  let service: EducationService;

  const qr = {
    manager: {},
  } as QueryRunner;

  class ConnectionMock {
    createQueryRunner(): QueryRunner {
      return qr;
    }
  }

  const mockEduService = {
    getEducation: jest.fn().mockResolvedValue([
      [
        {
          id: 1,
          title: 'Edu 1',
          score: 'Description 1',
        },
        {
          id: 2,
          title: 'Edu 2',
          score: 'Description 2',
        },
      ],
      2,
    ]),
    saveEducation: jest.fn().mockResolvedValue({
      id: 1,
      title: 'Edu 1',
      score: 'Description 1',
    }),
    updateEduSubInfo: jest.fn().mockResolvedValue([
      {
        id: 1,
        content: 'sub 1',
      },
      {
        id: 2,
        content: 'sub 2',
      },
    ]),
    updateEducation: jest.fn().mockResolvedValue({
      id: 1,
      title: 'Edu 1',
      score: 'Description 1',
      subInfo: [
        {
          id: 1,
          content: 'sub 1',
        },
        {
          id: 2,
          content: 'sub 2',
        },
      ],
    }),
    deleteEducation: jest.fn().mockResolvedValue({}),
  };

  const mockResponse = () => {
    const response: Partial<Response> = {};
    response.status = jest.fn().mockReturnValue(response);
    response.json = jest.fn().mockReturnValue(response);
    return response as Response;
  };

  beforeEach(async () => {
    Object.assign(qr.manager, {
      save: jest.fn(),
    });
    qr.connect = jest.fn();
    qr.release = jest.fn();
    qr.startTransaction = jest.fn();
    qr.commitTransaction = jest.fn();
    qr.rollbackTransaction = jest.fn();
    qr.release = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationController],
      providers: [
        {
          provide: EducationService,
          useValue: mockEduService,
        },
        {
          provide: Connection,
          useClass: ConnectionMock,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      .compile();

    controller = module.get<EducationController>(EducationController);
    service = module.get<EducationService>(EducationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllEdu', () => {
    it('should return all education with pagination', async () => {
      const query: GetEducationDTO = { limit: 10, offset: 0 };
      const response = mockResponse();
      await controller.getAllEducation(response, query);

      expect(service.getEducation).toHaveBeenCalledWith(query);
      expect(response.status).toHaveBeenLastCalledWith(HttpStatus.OK);
      expect(response.json).toHaveBeenCalledWith({
        educations: [
          {
            id: 1,
            title: 'Edu 1',
            score: 'Description 1',
          },
          {
            id: 2,
            title: 'Edu 2',
            score: 'Description 2',
          },
        ],
        pagination: {
          total: 2,
          limit: query.limit,
          offset: query.offset,
        },
      });
    });
  });

  describe('updateEdu', () => {
    it('should update and return the edu', async () => {
      const payload: UpdateEducationDTO = {
        title: 'Edu 1',
        score: 'Description 1',
        subInfo: [
          {
            id: 1,
            content: 'sub 1',
          },
          {
            id: 2,
            content: 'sub 2',
          },
        ],
      };
      const res = mockResponse();

      await controller.updateEducation(res, 1, payload);

      expect(service.updateEducation).toHaveBeenCalledWith(1, payload);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        education: {
          id: 1,
          title: 'Edu 1',
          score: 'Description 1',
          subInfo: [
            {
              id: 1,
              content: 'sub 1',
            },
            {
              id: 2,
              content: 'sub 2',
            },
          ],
        },
      });
    });
  });
});
