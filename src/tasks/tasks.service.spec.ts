import { Test } from "@nestjs/testing";
import { TaskStatus } from "./task-status.enum";
import { TasksRepository } from "./tasks.repository";
import { TasksService } from "./tasks.service";

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
});

const mockUser = {
    username: 'Ariel',
    id: 'id1',
    password: 'password',
    tasks: [],
}

describe('TasksService',()=>{
let tasksService: TasksService;
let tasksRepository;
beforeEach(async ()=>{
    // Initialize a NestJS module with dependencies
    const module = await Test.createTestingModule({
        providers: [
            TasksService,
            { provide: TasksRepository, useFactory: mockTasksRepository},
        ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
});

describe('Get Tasks',()=>{
    it('calls tasksRepository.getTasks and returns the result', async () => {
        tasksRepository.getTasks.mockResolvedValue('someValue');
        const result = await tasksService.getTasks(null, mockUser);
        expect(result).toEqual('someValue');
    })
});

describe('getTasksById',()=>{
    it('calls tasksRepository.getTasksById and returns the task', async()=>{
        const mockTask={
            title: 'Test title',
            description: 'test desc',
            id: 'someId',
            status: TaskStatus.OPEN
        };
        tasksRepository.findOne.mockResolvedValue(mockTask);
        const result = await tasksService.getTaskById('someId',mockUser);
        expect(result).toEqual(mockTask);
    });

    it('calls tasksRepository.findOne and handles the error', async()=>{
        
        tasksRepository.findOne.mockResolvedValue(null);
        expect(tasksService.getTaskById('someId',mockUser)).rejects.toThrow('not found');
    });
});

});