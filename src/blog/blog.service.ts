import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import {Blog} from './blog.model';
import { User } from '../user/user.model';


@Injectable()
export class BlogService{
 constructor(@InjectModel(Blog) private blogModel :typeof Blog){
   console.log('BlogService: Constructor called, blogModel:', this.blogModel);
 }
//Create

async createBlog(blogData:string ,userId:number):Promise<Blog> {
    try {
        const newBlog = await this.blogModel.create({
            blogData,
            userId
        } as any);

        return newBlog;
    } catch (error) {
        console.error('Error in createBlog:', error);
        throw error;
    }
}

//Get all blogs
async getAllBlogs():Promise<Blog[]>{
    try {
        return await this.blogModel.findAll({
          include: [User],
        });
    } catch (error) {
        console.error('Error in getAllBlogs:', error);
        throw error;
    }
}

async getBlogById(id:number):Promise<Blog>{
    const blog = await this.blogModel.findOne({
        where:{id},
        include: [User],
    });
    if(!blog){
        throw new Error('Blog not found');
    }
    return blog;

}

//update blog

async updateBlog(id:number,blogData:string): Promise<Blog>{
    const blog = await this.blogModel.findOne({where:{id}});
    if(blog){
        blog.blogData=blogData;
        await blog.save();
        return blog;

    }
    throw new Error('blog not found');

}

//delete blog 
async deleteBlog(id:number):Promise<void>{
    const blog=await this.blogModel.findOne({where:{id}});
    if(blog){
        await blog.destroy();

    }
    else{
        throw new Error('blognot found');
    }

    }
    async getBlogsByUserId(userId: number): Promise<Blog[]> {
        try {
          const blogs = await this.blogModel.findAll({
            where: { userId },
          });
      
          return blogs;
        } catch (error) {
          console.error('Error fetching blogs for user:', error);
          throw error;
        }
}
}
