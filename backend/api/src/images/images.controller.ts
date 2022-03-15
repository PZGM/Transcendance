import { Controller, Delete, Get, NotFoundException, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import * as multer from 'multer';
import path = require('path');
import { AuthentificatedGuard, FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { ImagesService } from './images.service';
import { v4 as uuidv4 } from 'uuid';
import { PrimaryColumnCannotBeNullableError } from 'typeorm';


export const storage = {
    storage: multer.diskStorage({
       destination: function (req, file, cb) {
           cb(null, './uploads/images')
         },
       filename: (req, file, cb) => {
           const filename: string = uuidv4();
           const extension: string = path.parse(file.originalname).ext;
   
           cb(null, `${filename}${extension}`)
       }
     })
}

@ApiTags('Images')
@Controller('images')
export class ImagesController { 
    
    constructor(private readonly userService: ImagesService) {}

    @UseGuards(FullyAuthentificatedGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', storage))
    uploadImage(@UploadedFile() file): string {
        return (process.env.IMAGES_PATH_URL + path.parse(file.path).name + path.parse(file.path).ext);
    }

    @UseGuards(FullyAuthentificatedGuard)
    @Get('/:path')
    getImage(@Res() res, @Param('path') path: string){
        res.sendFile(path,{ root: './uploads/images' })
    }

    @UseGuards(FullyAuthentificatedGuard)
    @Delete('/:path')
    removeImage(@Param('path') path: string){
        try {
            const fs = require('fs');
            fs.unlinkSync('./uploads/images/' + path);
            return 'Image deleted';
          } catch(err) {
            console.error(err);
            throw new NotFoundException();
          }
    }

}