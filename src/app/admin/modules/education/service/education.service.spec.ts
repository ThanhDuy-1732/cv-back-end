import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { EducationService } from './education.service';
import { Education } from 'src/app/admin/entities/education.entity';
import { EducationSubInfo } from 'src/app/admin/entities/educationSubInfo.entity';

describe('EducationService', () => {
  let service: EducationService;
  let educationRepository: Repository<Education>;
  let eduSubInfoRepository: Repository<EducationSubInfo>;
  let dataSource: DataSource;
  let queryRunner: QueryRunner;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EducationService,
        {
          provide: getRepositoryToken(Education),
          useValue: {
            findAndCount: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(EducationSubInfo),
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            softDelete: jest.fn(),
          },
        },
        {
          provide: DataSource,
          useValue: {
            createQueryRunner: jest.fn().mockReturnValue({
              connect: jest.fn(),
              startTransaction: jest.fn(),
              commitTransaction: jest.fn(),
              rollbackTransaction: jest.fn(),
              release: jest.fn(),
              manager: {
                save: jest.fn(),
                softDelete: jest.fn(),
              },
            }),
          },
        },
      ],
    }).compile();

    service = module.get<EducationService>(EducationService);
    educationRepository = module.get<Repository<Education>>(
      getRepositoryToken(Education),
    );
    eduSubInfoRepository = module.get<Repository<EducationSubInfo>>(
      getRepositoryToken(EducationSubInfo),
    );
    dataSource = module.get<DataSource>(DataSource);
    queryRunner = dataSource.createQueryRunner();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test cases go here...
  describe('getEducation', () => {
    it('should return educations with subInfo', async () => {
      const mockEducations = [
        {
          id: 1,
          subInfo: [],
          _id: '1',
          time: 'test',
          title: 'test',
          score: 'test',
          location: 'test',
          createdDate: new Date(),
          updatedDate: new Date(),
          deletedDate: null,
        },
      ];
      const mockCount = 1;

      jest
        .spyOn(educationRepository, 'findAndCount')
        .mockResolvedValue([mockEducations, mockCount]);

      const result = await service.getEducation({ limit: 10, offset: 0 });

      expect(educationRepository.findAndCount).toHaveBeenCalledWith({
        relations: { subInfo: true },
        take: 10,
        skip: 0,
        withDeleted: false,
      });
      expect(result).toEqual([mockEducations, mockCount]);
    });
  });

  describe('saveEducation', () => {
    it('should save education with subInfo and return it', async () => {
      const mockEducationData = {
        _id: '123',
        time: '2024-08-12',
        score: 'A+',
        title: 'NestJS Course',
        location: 'Online',
        subInfo: [{ content: 'Sub Info 1' }],
      };

      const mockSavedEducation = {
        id: 1,
        ...mockEducationData,
        subInfo: [{ id: 1, content: 'Sub Info 1' }],
      };

      jest
        .spyOn(queryRunner.manager, 'save')
        .mockResolvedValueOnce(mockSavedEducation.subInfo[0]);
      jest
        .spyOn(queryRunner.manager, 'save')
        .mockResolvedValueOnce(mockSavedEducation);

      const result = await service.saveEducation(mockEducationData);

      expect(queryRunner.connect).toHaveBeenCalled();
      expect(queryRunner.startTransaction).toHaveBeenCalled();
      expect(queryRunner.manager.save).toHaveBeenCalledTimes(2); // Once for subInfo and once for Education
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
      expect(result).toEqual(mockSavedEducation);
    });

    it('should rollback transaction if an error occurs', async () => {
      const mockEducationData = {
        _id: '123',
        time: '2024-08-12',
        score: 'A+',
        title: 'NestJS Course',
        location: 'Online',
        subInfo: [{ content: 'Sub Info 1' }],
      };

      jest
        .spyOn(queryRunner.manager, 'save')
        .mockRejectedValue(new Error('Save failed'));

      await expect(service.saveEducation(mockEducationData)).rejects.toThrow(
        'Save failed',
      );
      expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
    });
  });

  describe('updateEduSubInfo', () => {
    it('should update and delete subInfo as needed', async () => {
      const mockExistingSubInfo = [
        {
          id: 1,
          content: 'Old Info',
          education: null,
          createdDate: new Date(),
          updatedDate: new Date(),
          deletedDate: null,
        },
        {
          id: 3,
          content: 'Old Info',
          education: null,
          createdDate: new Date(),
          updatedDate: new Date(),
          deletedDate: null,
        },
      ];
      const mockUpdatedSubInfo = [
        {
          id: 1,
          content: 'Updated Info',
        },
      ];
      const mockNewSubInfo = [{ content: 'New Info' }];

      jest
        .spyOn(eduSubInfoRepository, 'find')
        .mockResolvedValue(mockExistingSubInfo);
      jest.spyOn(queryRunner.manager, 'softDelete').mockResolvedValueOnce(null);
      jest
        .spyOn(queryRunner.manager, 'save')
        .mockResolvedValueOnce(mockUpdatedSubInfo[0]);
      jest
        .spyOn(queryRunner.manager, 'save')
        .mockResolvedValueOnce({ id: 2, content: 'New Info' });

      const result = await service.updateEduSubInfo({
        id: 1,
        subInfo: [...mockUpdatedSubInfo, ...mockNewSubInfo],
        queryRunner,
      });

      expect(eduSubInfoRepository.find).toHaveBeenCalledWith({
        relations: { education: true },
        where: { education: { id: 1 } },
      });
      expect(queryRunner.manager.save).toHaveBeenCalledTimes(2);
      expect(result).toEqual([
        {
          id: 1,
          content: 'Updated Info',
        },
        { id: 2, content: 'New Info' },
      ]);
    });
  });
});
