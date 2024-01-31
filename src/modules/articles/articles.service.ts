import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { SyncArticleDto } from './dto/sync-article.dto';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  protected readonly logger = new Logger(ArticlesService.name);
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>
  ) {}

  async getAllArticles(): Promise<Article[]> {
    try {
      this.logger.log('Getting articles');
      return this.articleModel.find().sort({ _id: -1 }).exec();
    } catch (e) {
      this.logger.error(`Failed to get all articles`);
      throw new HttpException(
        'Failed to get all articles',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async searchForArticle(search: string): Promise<Article[]> {
    try {
      this.logger.log(`Trying to search article for: ${search}`);
      return this.articleModel
        .find({ name: new RegExp(search, 'i') })
        .sort({ _id: -1 })
        .exec();
    } catch (e) {
      this.logger.error(`Failed to search article for ${search}`);
      throw new HttpException(
        `Failed to search article for ${search}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getArticle({ id }) {
    try {
      if (!id || id === 'undefined') {
        return;
      }
      this.logger.log(`Getting article by id: ${id}`);
      return this.articleModel.findById(new Types.ObjectId(id.toString()));
    } catch (e) {
      this.logger.error(`Failed to get article by: ${id}`);
      throw new HttpException(
        'Failed to get article',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createArticle(articleToCreate: SyncArticleDto) {
    try {
      this.logger.log(`Creating article: ${JSON.stringify(articleToCreate)}`);
      return this.articleModel.create(articleToCreate);
    } catch (e) {
      this.logger.error(`Failed to create article`);
      throw new HttpException(
        'Failed to create article',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateArticle(id: string, articleToUpdate: SyncArticleDto) {
    try {
      this.logger.log(
        `Trying to update article with id: ${id} for: ${JSON.stringify(articleToUpdate)}`
      );
      return this.articleModel.findByIdAndUpdate(
        new Types.ObjectId(id.toString()),
        articleToUpdate,
        {
          new: true,
        }
      );
    } catch (e) {
      this.logger.error(`Failed to update article with id: ${id}`);
      throw new HttpException(
        'Failed to update article',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteArticle(payload: string[]) {
    try {
      this.logger.log(
        `Trying to delete articles by ids: ${JSON.stringify(payload)}`
      );
      return this.articleModel.deleteMany({ _id: { $in: payload } });
    } catch (e) {
      this.logger.error(
        `Failed to delete article with ids:  ${JSON.stringify(payload)}`
      );
      throw new HttpException(
        'Failed to delete article',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
