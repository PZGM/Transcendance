import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from 'src/typeorm';


@Injectable()
export class GameService {

    constructor(
        @InjectRepository(Game)
        private readonly gamesRepository: Repository<Game>,
    ) {}

    async findOne(id: string) { 
        const game =  await this.gamesRepository.findOne(id);
        if (!game)
            throw new NotFoundException(`Game [${id}] not found`);
        return game;
    }
}