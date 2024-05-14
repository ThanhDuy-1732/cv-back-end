import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from 'src/schemas/comment.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getComments(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  async getComment(name: string): Promise<Comment> {
    return this.commentModel.findOne({ name }).exec();
  }

  async createComment({
    name,
    email,
    text,
  }: {
    name: string;
    email: string;
    text: string;
  }): Promise<Comment> {
    const comment = new this.commentModel({
      name,
      email,
      text,
      date: new Date().toISOString(),
    });
    return await comment.save();
  }
}
