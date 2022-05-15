import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from 'src/typeorm';
import { GameDto } from 'src/dto/game.dto';


@Injectable()
export class GameService {

    constructor(@InjectRepository(Game) private readonly gamesRepository: Repository<Game> ) {}
    
    async create(gameDto: GameDto) {
        const game = this.gamesRepository.create({...gameDto});
        return this.gamesRepository.save(game);
    }

    async findAll() {
        return this.gamesRepository.find();
    }

    async findOne(id: string) { 
        const game =  await this.gamesRepository.findOne(id);
        if (!game)
            throw new NotFoundException(`Game [${id}] not found`);
        return game;
    }


}