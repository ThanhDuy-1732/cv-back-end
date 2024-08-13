import { Test, TestingModule } from '@nestjs/testing';
import { AwardController } from './award.controller';
import { AwardService } from '../service/award.service';
import { JwtAuthGuard } from 'src/app/admin/guard/jwt.guard';
import { Response } from 'express';
import { CreateAwardDTO, GetAwardsDTO, UpdateAwardDTO } from '../dto/award.dto';
import { HttpStatus } from '@nestjs/common';

describe('AwardController', () => {
  let controller: AwardController;
  let service: AwardService;

  const mockAwardService = {
    getAwards: jest.fn().mockResolvedValue([
      [
        {
          id: 1,
          name: 'Award 1',
          description: 'Description 1',
        },
        {
          id: 2,
          name: 'Award 2',
          description: 'Description 2',
        },
      ],
      2,
    ]),

    saveAward: jest.fn().mockResolvedValue({
      id: 1,
      _id: 'test',
      time: 'test',
      title: 'test',
      location: 'test',
      position: 'test',
    }),

    updateAward: jest.fn().mockResolvedValue({
      id: 1,
      _id: 'test',
      time: 'test',
      title: 'test',
      location: 'test',
      position: 'test',
    }),

    deleteAward: jest.fn().mockResolvedValue({}),
  };

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwardController],
      providers: [
        {
          provide: AwardService,
          useValue: mockAwardService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      .compile();

    controller = module.get<AwardController>(AwardController);
    service = module.get<AwardService>(AwardService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllAward', () => {
    it('should return all awards with pagination', async () => {
      const query: GetAwardsDTO = { limit: 10, offset: 0 };
      const res = mockResponse();

      await controller.getAllAward(res, query);

      expect(service.getAwards).toHaveBeenCalledWith(query);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        awards: [
          { id: 1, name: 'Award 1', description: 'Description 1' },
          { id: 2, name: 'Award 2', description: 'Description 2' },
        ],
        pagination: {
          total: 2,
          limit: query.limit,
          offset: query.offset,
        },
      });
    });
  });

  describe('saveAward', () => {
    it('should save and return the award', async () => {
      const payload: CreateAwardDTO = {
        _id: 'test',
        time: 'test',
        title: 'test',
        location: 'test',
        position: 'test',
      };
      const res = mockResponse();

      await controller.saveAward(res, payload);

      expect(service.saveAward).toHaveBeenCalledWith(payload);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        award: {
          id: 1,
          _id: 'test',
          time: 'test',
          title: 'test',
          location: 'test',
          position: 'test',
        },
      });
    });
  });

  describe('updateAward', () => {
    it('should update and return the award', async () => {
      const payload: UpdateAwardDTO = {
        _id: 'test',
        time: 'test',
        title: 'test',
        location: 'test',
        position: 'test',
      };
      const res = mockResponse();

      await controller.updateAward(res, 1, payload);

      expect(service.updateAward).toHaveBeenCalledWith(1, payload);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        award: {
          id: 1,
          _id: 'test',
          time: 'test',
          title: 'test',
          location: 'test',
          position: 'test',
        },
      });
    });
  });

  describe('deleteAward', () => {
    it('should delete', async () => {
      const res = mockResponse();

      await controller.deleteAward(res, 1);

      expect(service.deleteAward).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    });
  });
});
