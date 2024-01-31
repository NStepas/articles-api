import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { SyncArticleDto } from './dto/sync-article.dto';
import { ArticlesService } from './articles.service';
import { JwtGuard } from 'src/core/auth/guards/jwt.guard';
import { Article } from './schemas/article.schema';

@Controller('article')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('/')
  async getAllArticles(@Query('search') search: string = null) {
    if (!search) {
      return this.articlesService.getAllArticles();
    }
    return this.articlesService.searchForArticle(search);
  }

  @Get('/:id')
  async getArticle(@Param() id: any): Promise<Article> {
    return this.articlesService.getArticle(id);
  }

  @Post('/')
  @UseGuards(JwtGuard)
  async createArticle(@Body() createArticle: SyncArticleDto): Promise<Article> {
    return this.articlesService.createArticle(createArticle);
  }

  @Patch('/:id')
  @UseGuards(JwtGuard)
  async updateArticle(
    @Param('id') id: string,
    @Body() articleDto: SyncArticleDto
  ) {
    return this.articlesService.updateArticle(id, articleDto);
  }

  @Delete('/')
  @UseGuards(JwtGuard)
  async deleteArticle(@Body() payload: string[]) {
    return this.articlesService.deleteArticle(payload);
  }
}
