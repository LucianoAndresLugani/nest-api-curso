import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

    async getProducts(): Promise<Product[]> {
        const products = await this.productModel.find();
        return products;
    }

    async getProduct(productId: string): Promise<Product> {
        const product = await this.productModel.findById(productId);
        return product;
    }

    async createProduct(CreateProductDto: CreateProductDto): Promise<Product>{
        const product= new this.productModel(CreateProductDto);
        return await product.save();
    }

    async deleteProduct(productId: string): Promise<Product> {
        const product = await this.productModel.findByIdAndDelete(productId);
        return product;
    }

    async updateProduct(productID: string, createProductDto: CreateProductDto): Promise<Product> {
        const updateProduct = await this.productModel.findByIdAndUpdate(productID, createProductDto, {new:true});
        return updateProduct;
    }
}

